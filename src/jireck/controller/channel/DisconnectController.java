package jireck.controller.channel;

import java.util.List;

import jireck.self.ConnectedUser;
import jireck.service.channel.ChatService;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.memcache.Memcache;

import com.google.appengine.api.taskqueue.QueueFactory;
import com.google.appengine.api.taskqueue.TaskOptions.Builder;

/**
 * 切断コントローラー。
 *
 * @author jireck
 *
 */
public class DisconnectController extends Controller {

    private ChatService chatService = new ChatService();

    @Override
    public Navigation run() throws Exception {
        String userListName = (String) request.getAttribute("userListName");

        @SuppressWarnings("unchecked")
        List<ConnectedUser> userList = (List<ConnectedUser>) Memcache.get(userListName);

        // 削除対象ユーザー
        ConnectedUser disconnectUser = new ConnectedUser();
        disconnectUser.setUserId((String) request.getAttribute("userId"));

        // 削除対象ユーザー名取得
        String userName = userList.get(userList.indexOf(disconnectUser)).getUserName();

        userList.remove(disconnectUser); // 削除

        Memcache.put(userListName, userList); // 格納

        // ユーザリストにユーザが存在する場合はユーザリストの変更を通知する
        if (! userList.isEmpty()) {
            // 退室メッセージ送信
            chatService.sendSystemMessage(userList, userName + "さんが退室されました。");

            // ユーザーリスト変更を通知
            QueueFactory.getDefaultQueue().add(Builder.withUrl("/channel/taskqueue/notifyUserList").param("userListName", userListName));
        }

        return null;
    }
}
