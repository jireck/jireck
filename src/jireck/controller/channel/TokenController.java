package jireck.controller.channel;

import jireck.self.ConnectedUser;
import jireck.service.channel.ChatService;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;

public class TokenController extends Controller {

    private ChatService chatService = new ChatService();

    @Override
    public Navigation run() throws Exception {
        ConnectedUser user = (ConnectedUser) request.getAttribute("user)");
        chatService.setToken(user);
        requestScope("user", user);
        return null;
    }
}
