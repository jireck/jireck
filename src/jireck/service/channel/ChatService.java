package jireck.service.channel;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import jireck.self.ConnectCheckTask;
import jireck.self.ConnectedUser;

import com.google.appengine.api.channel.ChannelFailureException;
import com.google.appengine.api.channel.ChannelMessage;
import com.google.appengine.api.channel.ChannelService;
import com.google.appengine.api.channel.ChannelServiceFactory;


public class ChatService {

    /**
     * スタート.
     * @param input
     * @return
     */
    public ConnectedUser start(Map<String, Object> input) {
        // 一意なユーザーID
        String userId = Long.toString(System.currentTimeMillis()) + input.get("username");

//        // 接続者全員を同一ユーザIDとする
//        String userId = "room1";

        ConnectedUser user = new ConnectedUser();
        user.setUserId(userId);
        user.setToken(getToken(userId));

        user.setUserName((String) input.get("username"));

        return user;
    }

    /**
     * トークンの取得.
     * @param userId
     * @return トークン（生存時間2時間） TODO トークン（生存時間2時間）
     */
    private String getToken(String userId){
        ChannelService channelService = ChannelServiceFactory.getChannelService();

        // ゲームのパラメータとかユーザIdを元にして一意なIdを作りましょう
        // ここでは簡易化のために、userIdをそのまま使っています
        String token = channelService.createChannel(userId);
        return token;
    }

    /**
     * 入室中のユーザー全員にメッセージを送る.<br/>
     * ユーザーリストに存在しないユーザーがいた場合はそのユーザーを削除する.
     * @param input
     * @param userList 入室中のユーザーのリスト
     * @return 入室中のユーザーのリスト
     */
    public List<ConnectedUser> chat(Map<String, Object> input, List<ConnectedUser> userList) {
        ChannelService channelService = ChannelServiceFactory.getChannelService();
        ConnectedUser connectedUser = new ConnectedUser();
        connectedUser.setUserId((String) input.get("userId"));
        int index = userList.indexOf(connectedUser);
        connectedUser = userList.get(index);

        // TODO 文字コード
//        String msg = URLEncoder.encode("ここが送信文字列","UTF-8");
//        ChannelMessage cm = new ChannelMessage(client_id , msg);
//        cs.sendMessage(cm);

        // リストの中身を削除する処理はIteratorを使う必要がある？
        for (Iterator<ConnectedUser> iterator = userList.iterator(); iterator.hasNext();) {
            ConnectedUser user = iterator.next();

            // ChannelFailureExceptionの対処 GAEにdeployすると発生する可能性があるらしい
            try {
                channelService.sendMessage(new ChannelMessage(user.getUserId(), connectedUser.getUserName() + ">" + (String)input.get("text")));
            } catch (ChannelFailureException e) {
                iterator.remove(); // TODO 削除処理は分割する？
                // TODO ログ出力
                throw e;
            }
        }
        return userList;
    }

    /**
     * ユーザーの接続チェック.
     * @param input
     * @param userList
     */
    public List<ConnectedUser> connectCheck(Map<String, Object> input, List<ConnectedUser> userList) {
        for (ConnectedUser user : userList) {
            if (user.getUserId().equals((String)input.get("userId"))) {
                user.countReset();
            }
        }

        List<ConnectedUser> resultList = ConnectCheckTask.connectCheck(userList);
        return resultList;
    }

    public void notifyUserList(List<ConnectedUser> userList) {
        ChannelService channelService = ChannelServiceFactory.getChannelService();
        StringBuilder nameCSV = new StringBuilder();
        for (ConnectedUser connectedUser : userList) {
            nameCSV.append(connectedUser.getUserName() + ",");
        }
        // 最後のカンマを削除
        nameCSV.deleteCharAt(nameCSV.length() - 1);

        for (ConnectedUser user : userList) {
            channelService.sendMessage(new ChannelMessage(user.getUserId(),  "uul" + nameCSV.toString()));
        }
    }
}
