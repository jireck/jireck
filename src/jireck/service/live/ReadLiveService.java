package jireck.service.live;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

import com.sun.syndication.feed.synd.SyndFeed;
import com.sun.syndication.fetcher.FeedFetcher;
import com.sun.syndication.fetcher.FetcherException;
import com.sun.syndication.fetcher.impl.HttpURLFeedFetcher;
import com.sun.syndication.io.FeedException;

/**
 * ライブRSSフィードの読み込みサービス.
 * @author jireck
 *
 */
public class ReadLiveService {

    private static final String FEED_URL = "http://livetube.cc/index.live.xml";

    public SyndFeed readLive() {

        FeedFetcher fetcher = new HttpURLFeedFetcher();

        SyndFeed feed = null;
        try {
            feed = fetcher.retrieveFeed(new URL(FEED_URL));
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (FeedException e) {
            e.printStackTrace();
        } catch (FetcherException e) {
            e.printStackTrace();
        }

        return feed;
    }
}
