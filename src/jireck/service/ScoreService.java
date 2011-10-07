package jireck.service;

import java.util.List;
import java.util.Map;

import jireck.meta.ScoreMeta;
import jireck.model.Score;

import org.slim3.datastore.Datastore;
import org.slim3.util.BeanUtil;

import com.google.appengine.api.datastore.Transaction;


/**
 * スコアサービス.
 * @author jireck
 *
 */
public class ScoreService {

    private ScoreMeta t = new ScoreMeta();

    /**
     * スコアの登録.
     * @param input スコア情報
     */
    public void register(Map<String, Object> input){
        Score score = new Score();
        BeanUtil.copy(input, score);
        Transaction tx = Datastore.beginTransaction();
        Datastore.put(score);
        tx.commit();
    }

    /**
     * スコアリストの取得.
     * @return スコアのリスト
     */
    public List<Score> find(){
        return Datastore.query(t).sort(t.score.desc).limit(10).asList();
    }
}
