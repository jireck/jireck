package jireck.controller.channel;

import java.util.List;

import jireck.self.ConnectedUser;
import jireck.service.channel.ChatService;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.memcache.Memcache;
import org.slim3.util.RequestMap;

public class ChatController extends Controller {

    private ChatService chatService = new ChatService();

    @SuppressWarnings("unchecked")
    @Override
    public Navigation run() throws Exception {

        String userListName = (String) request.getAttribute("userListName");

        List<ConnectedUser> resultList = chatService.chat(new RequestMap(request), (List<ConnectedUser>)Memcache.get(userListName));
        Memcache.put(userListName, resultList);
        return null;
    }
}
