package jireck.controller.game.html5;

import jireck.service.ScoreService;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.util.RequestMap;

public class SendScoreController extends Controller {

    private ScoreService ScoreRegisterService = new ScoreService();

    @Override
    public Navigation run() throws Exception {
        ScoreRegisterService.register(new RequestMap(request));
        return null;
    }
}
