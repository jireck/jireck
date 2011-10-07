package jireck.controller.live.room;

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

public class RoomController extends Controller {

    private ChatService chatService = new ChatService();

    @Override
    public Navigation run() throws Exception {
        ConnectedUser user = chatService.start(new RequestMap(request));

        // ユーザーリスト名
        String userListName = (String) request.getAttribute("userListName");

        @SuppressWarnings("unchecked")
        List<ConnectedUser> userList = (List<ConnectedUser>) Memcache.get(userListName);
        if (userList == null) {
            userList = new ArrayList<ConnectedUser>();
        }

        userList.add(user);

        Memcache.put(userListName, userList);

        QueueFactory.getDefaultQueue().add(Builder.withUrl("/channel/taskqueue/notifyUserList").param("userListName", userListName).countdownMillis(5000));

        requestScope("userId", user.getUserId());
        requestScope("token", user.getToken());
        return forward("index.jsp");
    }
}
