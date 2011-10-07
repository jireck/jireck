package jireck.controller.channel;

import java.util.ArrayList;
import java.util.List;

import jireck.self.ConnectedUser;
import jireck.service.channel.ChatService;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.memcache.Memcache;
import org.slim3.util.RequestMap;

import com.google.appengine.api.taskqueue.QueueFactory;
import com.google.appengine.api.taskqueue.TaskOptions.Builder;

public class NotifyConnectController extends Controller {

    private ChatService chatService = new ChatService();

    @SuppressWarnings("unchecked")
    @Override
    public Navigation run() throws Exception {

        String userListName = (String) request.getAttribute("userListName");

        List<ConnectedUser> userList = (ArrayList<ConnectedUser>)Memcache.get(userListName);

        int preSize = userList.size();

        List<ConnectedUser> resultList = chatService.connectCheck(new RequestMap(request), userList);

        Memcache.put(userListName, resultList);

        // 接続ユーザー数が減っていた場合はクライアントに通知
        if (preSize > resultList.size()) {
            QueueFactory.getDefaultQueue().add(Builder.withUrl("/channel/taskqueue/notifyUserList").param("userListName", userListName));
        }

        return null;
    }
}
