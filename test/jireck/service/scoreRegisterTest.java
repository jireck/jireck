package jireck.service;

import org.slim3.tester.AppEngineTestCase;
import org.junit.Test;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

public class scoreRegisterTest extends AppEngineTestCase {

    private ScoreService service = new ScoreService();

    @Test
    public void test() throws Exception {
        assertThat(service, is(notNullValue()));
    }
}
