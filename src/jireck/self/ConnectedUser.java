package jireck.self;

import java.io.Serializable;

public class ConnectedUser implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    /**
     * ユーザーID.
     */
    private String userId;

    /**
     * ユーザーの名前.
     */
    private String userName;

    /**
     * トークン.
     */
    private String token;

    /**
     * タイムカウント.
     */
    private int timeCount = 0;

    /**
     * タイムカウントをインクリメントする.
     */
    public void incrementTimeCount() {
        timeCount++;
    }

    public void countReset() {
        timeCount = 0;
    }

    /**
     * ユーザーID.を取得します。
     * @return ユーザーID.
     */
    public String getUserId() {
        return userId;
    }

    /**
     * ユーザーID.を設定します。
     * @param userId ユーザーID.
     */
    public void setUserId(String userId) {
        this.userId = userId;
    }

    /**
     * ユーザーの名前.を取得します。
     * @return ユーザーの名前.
     */
    public String getUserName() {
        return userName;
    }

    /**
     * ユーザーの名前.を設定します。
     * @param userName ユーザーの名前.
     */
    public void setUserName(String userName) {
        this.userName = userName;
    }

    /**
     * トークン.を取得します。
     * @return トークン.
     */
    public String getToken() {
        return token;
    }

    /**
     * トークン.を設定します。
     * @param token トークン.
     */
    public void setToken(String token) {
        this.token = token;
    }

    /**
     * タイムカウント.を取得します。
     * @return タイムカウント.
     */
    public int getTimeCount() {
        return timeCount;
    }

    /**
     * タイムカウント.を設定します。
     * @param timeCount タイムカウント.
     */
    public void setTimeCount(int timeCount) {
        this.timeCount = timeCount;
    }

    @Override
    public boolean equals(Object obj) {
        ConnectedUser user = (ConnectedUser)obj;
        return userId == null ? false : userId.equals(user.getUserId());
    }

}
