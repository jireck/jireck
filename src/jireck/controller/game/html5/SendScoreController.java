package jireck.controller.game.html5;

import java.util.Date;
import java.util.Map;

import jireck.service.ScoreService;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.memcache.Memcache;
import org.slim3.util.RequestMap;

/**
 * スコア送信コントローラー。
 *
 * @author jireck
 *
 */
public class SendScoreController extends Controller {

    private ScoreService ScoreRegisterService = new ScoreService();

    @Override
    public Navigation run() throws Exception {

        String gameId = (String) request.getAttribute("gameId");

        @SuppressWarnings("unchecked")
        Map<String, Date> gameIdMap = (Map<String, Date>)Memcache.get("gameIdMap");
        if (gameIdMap.get(gameId) != null) {
            ScoreRegisterService.register(new RequestMap(request));
            gameIdMap.remove(gameId);
            Memcache.put("gameIdMap", gameIdMap);
        } else {
            response.setContentType("text/plain");
            response.getWriter().print("ERROR");
        }

        return null;
    }
}
