package jireck.controller.channel.taskqueue;

import java.util.List;

import jireck.self.ConnectedUser;
import jireck.service.channel.ChatService;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.memcache.Memcache;

/**
 * ユーザーリスト変更通知コントローラー。
 *
 * @author jireck
 *
 */
public class NotifyUserListController extends Controller {

    private ChatService chatService = new ChatService();

    @SuppressWarnings("unchecked")
    @Override
    public Navigation run() throws Exception {
        List<ConnectedUser> userList = (List<ConnectedUser>) Memcache.get(request.getAttribute("userListName"));
        chatService.notifyUserList(userList);
        return null;
    }
}
