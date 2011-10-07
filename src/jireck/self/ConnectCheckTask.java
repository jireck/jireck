package jireck.self;

import java.util.Iterator;
import java.util.List;

/**
 * ユーザーの接続チェックタスク。
 * @author jireck
 *
 */
public class ConnectCheckTask {

    public static List<ConnectedUser> connectCheck(List<ConnectedUser> userList) {

        // リストの中身を削除する処理はIteratorを使う必要がある
        for (Iterator<ConnectedUser> iterator = userList.iterator(); iterator.hasNext();) {
            ConnectedUser user = iterator.next();
            user.incrementTimeCount();

            if (user.getTimeCount() > userList.size() * 2) {
                iterator.remove();
            }
        }

        return userList;
    }

}
