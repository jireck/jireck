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

public class ChatRoomController extends Controller {

    private ChatService chatService = new ChatService();

    @SuppressWarnings("unchecked")
    @Override
    public Navigation run() throws Exception {
        ConnectedUser user = chatService.start(new RequestMap(request));

        List<ConnectedUser> userList = (List<ConnectedUser>) Memcache.get("userList");
        if (userList == null) {
            userList = new ArrayList<ConnectedUser>();
        }

        userList.add(user);

        Memcache.put("userList", userList);

        QueueFactory.getDefaultQueue().add(Builder.withUrl("/channel/taskqueue/notifyUserList").param("userListName", "userList").countdownMillis(5000));

        requestScope("userId", user.getUserId());
        requestScope("token", user.getToken());
        return forward("chatRoom.jsp");
    }
}
