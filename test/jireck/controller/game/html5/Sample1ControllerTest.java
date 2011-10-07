package jireck.controller.game.html5;

import org.slim3.tester.ControllerTestCase;
import org.junit.Test;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

public class Sample1ControllerTest extends ControllerTestCase {

    @Test
    public void run() throws Exception {
        tester.start("/game/html5/sample1");
        Sample1Controller controller = tester.getController();
        assertThat(controller, is(notNullValue()));
        assertThat(tester.isRedirect(), is(false));
        assertThat(tester.getDestinationPath(), is("/game/html5/sample1.jsp"));
    }
}
