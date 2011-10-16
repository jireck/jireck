<%@page pageEncoding="UTF-8" isELIgnored="false" session="false"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="f" uri="http://www.slim3.org/functions"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>channel ChatRoom</title>

<link rel="stylesheet" type="text/css" href="/css/channel/channel.css" />
<script src='/_ah/channel/jsapi'></script>
	<script language="JavaScript" src="/js/jquery-1.5.2.min.js"></script>
</head>
<body>


<!--body内に記述しないと動かない？-->
<script type="text/javascript"><!--

var token;
var userId;
var socket;
var isInitialized = false;
var isConnected = false;
var gettingToken = false;





window.onload = function () {
    if(isInitialized == true){
        //alert("既に初期化済みです");
	    return;
    }
    if(isConnected == true){
        //alert("既に接続済みです");
        return;
	}

	userId = '${userId}';
	token = '${token}';

	channel = new goog.appengine.Channel(token);
	socket = channel.open();
	socket.onopen = onOpened;
	socket.onmessage = onMessage;
//	socket.onerror = onError;
//	socket.onclose = onClose;
	isInitialized = true;

}

// サーバーに接続中であることを通知
function onOpened() {
	// 5分ごとに接続中の通知
	timerId = setInterval(notifyConnect, 300000);
}
function notifyConnect() {
	var url = "notifyConnect?userListName=userList";
	var map = new Object();
	map["userId"] = userId;
	$.post(url, map);
}

// messageは文字コード「laten1」で送られてくる
// function socketMessage(msg) {
// msg.data = msg.data.replace(/\+/g,' ');
// alert(decodeURIComponent(msg.data));
// }
function onMessage(message) {
	var data = message.data;
//	var data = $.parseJSON(message.data);
//	var content = data.content;
	if (data.substring(0,3) == "uul") {
		$("#userList").empty();
		var userArray = data.substring(3).split(",");
		for (var i = 0; i < userArray.length; i++) {
			$("#userList").prepend(' \
					<li>' + convert(userArray[i]) + '</li>');
		}
		$("#userList").prepend(' \
				<lh>入室ユーザー</lh>');
	} else {
		$("#messageList").prepend('<li><pre>' + convert(data) + '</pre></li>');
	}
}


function disconnect() {
	socket.close();
	socket = null;
//	isInitialized = false;
//	isConnected = false;
//	token = null;
//	userId = null;
	location.href = "/channel/leaveRoom?userListName=userList&userId=" + userId + "&redirect=/channel";
}


function send() {
	var url = "chat?userListName=userList";
	var map = new Object();
	map["userId"] = userId;
	map["text"] = document.getElementById("message").value;
	document.getElementById("message").value = "";
	$.post(url, map);
}

function convert(str){
	var len = str.length;
	var out = ""; // 変換後の文字列入れ物

	for(i=0;i<len;i++){ // 文字列の数だけループ
		var ones = str.charAt(i);   // １文字ずつ取り出してonesに代入
		switch(ones){
			// 置換してoutに代入していく
			case '&' : out += '&amp;';  break;  //  & → &amp;
			case '<' : out += '&lt;';   break;  // < → &lt;
			case '>' : out += '&gt;';   break;  // > → &gt;
			case '"' : out += '&quot;'; break;  // " → &quot;
			//  それ以外はスルーしてoutに入れる
			default : out += ones; break;
		}
	}
	return out;
}

function keyEvent(keyCode) {
	if (keyCode == 13) { // 「ENTER」
		send();
	}
}

--></script>












<input id="message" type="text" name="text" size="50" maxlength="20" onkeypress="keyEvent(event.keyCode)"/>
<button onclick="send()">SEND</button>

<button onclick="disconnect()">退室</button>

<table>
	<tr>
		<td>
			<div class="width500">
				<ul id="messageList">
				</ul>
			</div>
		</td>
		<td>
			<div class="width150">
				<ul id="userList">
					<lh>入室ユーザー</lh>
				</ul>
			</div>
		</td>
	</tr>
</table>

</body>
</html>
