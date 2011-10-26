package jireck.service.channel;

import java.util.Date;
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
        setToken(user);

        user.setUserName((String) input.get("username"));

        return user;
    }

    /**
     * トークンを生成し、ユーザーにセット.
     * @param user
     */
    public void setToken(ConnectedUser user){
        ChannelService channelService = ChannelServiceFactory.getChannelService();

        // ゲームのパラメータとかユーザIdを元にして一意なIdを作りましょう
        // ここでは簡易化のために、userIdをそのまま使っています
        String token = channelService.createChannel(user.getUserId()); // トークン（生存時間2時間）
        user.setToken(token);
    }

    /**
     * 入室中のユーザー全員にメッセージを送る.<br/>
     * ユーザーリストに存在しないユーザーがいた場合はそのユーザーを削除する.
     * @param input
     * @param userList 入室中のユーザーのリスト
     * @return 入室中のユーザーのリスト
     */
    public List<ConnectedUser> chat(Map<String, Object> input, List<ConnectedUser> userList) {
        ConnectedUser connectedUser = new ConnectedUser();
        connectedUser.setUserId((String) input.get("userId"));
        int index = userList.indexOf(connectedUser);
        connectedUser = userList.get(index);

        // 前回の書き込みから3秒以上経過している場合
        Date currentDate = new Date();
        if (currentDate.getTime() - connectedUser.getPreSendMessageTime().getTime() > 3000) {
            sendMessageToAll(userList, connectedUser.getUserName() + "/username/" + (String)input.get("text"));
            connectedUser.setPreSendMessageTime(currentDate); // 現在日時を設定
        } else {
            sendMessage(connectedUser.getUserId(), "システム" + "/username/" + "しばらく時間を置いて書き込んでください。");
        }

        return userList;
    }

    /**
     * 送信対象ユーザー全員にシステムからのメッセージを送信。
     *
     * @param userList 送信対象ユーザーリスト
     * @param message メッセージ
     * @return ユーザーリスト
     */
    public List<ConnectedUser> sendSystemMessage(List<ConnectedUser> userList, String message) {
        sendMessageToAll(userList, "システム" + "/username/" + message);
        return userList;
    }

    /**
     * 送信対象ユーザー全員にメッセージを送信。
     * <p>
     * 対象ユーザーが存在しなかった場合は、リストから削除される可能性有り。
     * </p>
     *
     * @param userList 送信対象ユーザーリスト
     * @param message メッセージ
     */
    private void sendMessageToAll(List<ConnectedUser> userList, String message) {

        // リストの中身を削除する処理はIteratorを使う必要がある？
        for (Iterator<ConnectedUser> iterator = userList.iterator(); iterator.hasNext();) {
            ConnectedUser user = iterator.next();

            // ChannelFailureExceptionの対処 GAEにdeployすると発生する可能性があるらしい
            try {
                sendMessage(user.getUserId(), message);
            } catch (ChannelFailureException e) {
                iterator.remove(); // TODO 削除処理は分割する？
                // TODO ログ出力
                throw e;
            }
        }
    }

    /**
     * 送信対象ユーザーにメッセージを送信。
     * <p>
     * 対象ユーザーが存在しなかった場合は例外が出る可能性有り。
     * </p>
     *
     * @param userId 送信対象ユーザー ID
     * @param message メッセージ
     */
    private void sendMessage(String userId, String message) {
        ChannelService channelService = ChannelServiceFactory.getChannelService();

        // TODO 文字コード
        //      String msg = URLEncoder.encode("ここが送信文字列","UTF-8");
        //      ChannelMessage cm = new ChannelMessage(client_id , msg);
        //      cs.sendMessage(cm);
            // ChannelFailureExceptionの対処 GAEにdeployすると発生する可能性があるらしい
        try {
            channelService.sendMessage(new ChannelMessage(userId, message));
        } catch (ChannelFailureException e) {
            // TODO ログ出力
            throw e;
        }
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

    /**
     * ユーザーリストを全ユーザーに通知する。
     *
     * @param userList
     */
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
