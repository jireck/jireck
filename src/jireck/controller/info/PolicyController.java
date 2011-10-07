package jireck.controller.info;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;

public class PolicyController extends Controller {

    @Override
    public Navigation run() throws Exception {
        return forward("policy.jsp");
    }
}
