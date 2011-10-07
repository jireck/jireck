package jireck.controller.channel;

import org.slim3.tester.ControllerTestCase;
import org.junit.Test;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

public class ChatRoomControllerTest extends ControllerTestCase {

    @Test
    public void run() throws Exception {
        tester.start("/channel/chatRoom");
        ChatRoomController controller = tester.getController();
        assertThat(controller, is(notNullValue()));
        assertThat(tester.isRedirect(), is(false));
        assertThat(tester.getDestinationPath(), is("/channel/chatRoom.jsp"));
    }
}
