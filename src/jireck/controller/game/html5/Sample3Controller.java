package jireck.controller.game.html5;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;

public class Sample3Controller extends Controller {

    @Override
    public Navigation run() throws Exception {
        return forward("sample3.jsp");
    }
}
