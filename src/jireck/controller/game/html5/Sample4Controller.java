package jireck.controller.game.html5;

import java.util.List;

import jireck.model.Score;
import jireck.service.ScoreService;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;

public class Sample4Controller extends Controller {
    private ScoreService service = new ScoreService();

    @Override
    public Navigation run() throws Exception {
        List<Score> scoreList = service.find();
        requestScope("scoreList", scoreList);
        return forward("sample4.jsp");
    }
}
