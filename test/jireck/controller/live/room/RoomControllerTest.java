package jireck.controller.live.room;

import org.slim3.tester.ControllerTestCase;
import org.junit.Test;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

public class RoomControllerTest extends ControllerTestCase {

    @Test
    public void run() throws Exception {
        tester.start("/live/room/room");
        RoomController controller = tester.getController();
        assertThat(controller, is(notNullValue()));
        assertThat(tester.isRedirect(), is(false));
        assertThat(tester.getDestinationPath(), is(nullValue()));
    }
}
