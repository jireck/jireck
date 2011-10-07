package jireck.controller.live.livetube;

import org.slim3.tester.ControllerTestCase;
import org.junit.Test;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

public class ManagementControllerTest extends ControllerTestCase {

    @Test
    public void run() throws Exception {
        tester.start("/live/livetube/management");
        ManagementController controller = tester.getController();
        assertThat(controller, is(notNullValue()));
        assertThat(tester.isRedirect(), is(false));
        assertThat(tester.getDestinationPath(), is("/live/livetube/management.jsp"));
    }
}
