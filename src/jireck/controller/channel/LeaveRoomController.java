package jireck.controller.channel;

import java.util.List;

import jireck.self.ConnectedUser;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.memcache.Memcache;

import com.google.appengine.api.taskqueue.QueueFactory;
import com.google.appengine.api.taskqueue.TaskOptions.Builder;

public class LeaveRoomController extends Controller {

    @Override
    public Navigation run() throws Exception {

        String userListName = (String) request.getAttribute("userListName");

        @SuppressWarnings("unchecked")
        List<ConnectedUser> userList = (List<ConnectedUser>) Memcache.get(userListName);

        ConnectedUser disconnectUser = new ConnectedUser();
        disconnectUser.setUserId((String) request.getAttribute("userId"));

        userList.remove(disconnectUser);

        Memcache.put(userListName, userList);

        QueueFactory.getDefaultQueue().add(Builder.withUrl("/channel/taskqueue/notifyUserList").param("userListName", userListName));

        return redirect((String) request.getAttribute("redirect"));

    }
}
