
function chatIn(errorMsg, inputMsg) {
	msg = window.prompt("お名前を入力して下さい。" + errorMsg, inputMsg);
	if (msg == null) {
		return;
	}
	if (msg.indexOf(",") != -1) {
		chatIn("「,」（カンマ）は使用できません。", msg);
	} else if (msg.length > 10) {
		chatIn("10文字以内でお願いします。", msg);
	} else {
		location.href = "chatRoom?username=" + msg;
	}
}
