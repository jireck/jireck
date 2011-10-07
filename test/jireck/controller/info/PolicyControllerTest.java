package jireck.controller.info;

import org.slim3.tester.ControllerTestCase;
import org.junit.Test;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

public class PolicyControllerTest extends ControllerTestCase {

    @Test
    public void run() throws Exception {
        tester.start("/info/policy");
        PolicyController controller = tester.getController();
        assertThat(controller, is(notNullValue()));
        assertThat(tester.isRedirect(), is(false));
        assertThat(tester.getDestinationPath(), is("/info/policy.jsp"));
    }
}
