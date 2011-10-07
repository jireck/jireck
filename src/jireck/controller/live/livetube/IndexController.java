package jireck.controller.live.livetube;

import jireck.service.live.ReadLiveService;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;

public class IndexController extends Controller {

    private ReadLiveService service = new ReadLiveService();

    @Override
    public Navigation run() throws Exception {
        requestScope("feed", service.readLive(/*new RequestMap(request)*/));
        return forward("index.jsp");
    }
}
