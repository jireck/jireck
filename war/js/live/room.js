function roomIn(errorMsg, inputMsg) {
	msg = window.prompt("お名前を入力して下さい。" + errorMsg, inputMsg);
	if (msg == null) {
		return;
	}
	if (msg.indexOf(",") != -1) {
		roomIn("「,」（カンマ）は使用できません。", msg);
	} else if (msg.length > 10 || msg.length < 1) {
		roomIn("1文字以上、10文字以内でお願いします。", msg);
	} else {
		location.href = "/live/room/room?username=" + msg + "&userListName=roomUserList";
	}
}