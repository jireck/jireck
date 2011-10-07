package jireck.service.live;

import org.slim3.tester.AppEngineTestCase;
import org.junit.Test;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

public class ReadLiveTest extends AppEngineTestCase {

    private ReadLiveService service = new ReadLiveService();

    @Test
    public void test() throws Exception {
        assertThat(service, is(notNullValue()));
    }
}
