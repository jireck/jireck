package jireck.controller.channel;

import org.slim3.tester.ControllerTestCase;
import org.junit.Test;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

public class ChatControllerTest extends ControllerTestCase {

    @Test
    public void run() throws Exception {
        tester.start("/channel/chat");
        ChatController controller = tester.getController();
        assertThat(controller, is(notNullValue()));
        assertThat(tester.isRedirect(), is(false));
        assertThat(tester.getDestinationPath(), is("/channel/chat.jsp"));
    }
}
