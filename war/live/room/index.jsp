<%@page pageEncoding="UTF-8" isELIgnored="false" session="false"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="f" uri="http://www.slim3.org/functions"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>live room Index</title>
	<script src='/_ah/channel/jsapi'></script>
	<script language="JavaScript" src="/js/jquery-1.5.2.min.js"></script>
	<link rel="stylesheet" type="text/css" href="/css/live/room.css" />
</head>
<body>



	<!--body内に記述しないと動かない？-->
	<script type="text/javascript"><!--

	var token;
	var userId;
	var user;
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

		userId = '${user.userId}';
		token = '${user.token}';

		channel = new goog.appengine.Channel(token);
		socket = channel.open();
		socket.onopen = onOpened;
		socket.onmessage = onMessage;
		socket.onerror = onError;
	//	socket.onclose = onClose;
		isInitialized = true;


	}

	// サーバーに接続中であることを通知
	function onOpened() {
		// 5分ごとに接続中の通知
		setInterval(notifyConnect, 300000);

		// 100分ごとにトークンの再取得
		setInterval(getToken, 6000000);
	}
	function notifyConnect() {
		var url = "/channel/notifyConnect?userListName=roomUserList";
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
			var allMessage = convert(data);
			var messageArray = allMessage.split('/username/'); // ユーザ名とメッセージに分割
			$("#messageList").append('<li><b>' + messageArray[0] + '</b><br />' + messageArray[1] + '</li>');
		}
		// メッセージリストの高さを取得し、スクロールトップに指定
		var e = document.getElementById("messageListDiv");
		e.scrollTop = e.scrollHeight;
	}

	// トークンを再取得する。
	function getToken() {
		var url = "/channel/token";
		var map = new Object();
		map["user"] = '${user}';
		map["userListName"] = "roomUserList";
		$.post(url, map);
	}


	function onError() {
		location.href = "/live";
	}

	window.onbeforeunload = function () {
		disconnect();
	}

	function disconnect() {
		socket.close();
		socket = null;
	//	isInitialized = false;
	//	isConnected = false;
	//	token = null;
	//	userId = null;
		var url = "/channel/disconnect";
		var map = new Object();
		map["userListName"] = "roomUserList";
		map["userId"] = userId;
		$.post(url, map);
	}

	function leaveRoom() {
		location.href = "/live";
	}


	function send() {
		var text = document.getElementById("message").value;

		// 1文字未満の場合は処理終了
		if (text.length < 1) {
			return;
		}
		if (text.length > 99) {
			alert('文字数が多すぎます');
			return;
		}

		var url = "/channel/chat";
		var map = new Object();
		map["userId"] = userId;
		map["text"] = text;
		map["userListName"] = "roomUserList";
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



	<div id="wmp">
		<!-- width="285" [ムービーの高さ(240px) + ShowControls(45px)] -->
		<object
		    id="wmp2"
		    width="620" height="385"
		    classid="CLSID:22D6F312-B0F6-11D0-94AB-0080C74C7E95"
		    codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,4,5,715"
		    standby="Loading MicrosoftR WindowsR Media Player components..."
		    type="application/x-oleobject">

		    <param name="FileName" value="mms://jireck.dyndns.org:8989/" /><!-- Filename属性は絶対・相対パスどちらでもOK -->
		    <param name="ShowControls" value="true" /><!-- コントロール表示 -->
		    <param name="AutoStart" value="ture" /><!-- 自動再生する -->

		    <!-- コントロール表示（showcontrols="1"）、自動再生する（autostart="1"） -->
		    <embed
		        name="wmp2"
		        type="application/x-mplayer2"
		        pluginspage="http://www.microsoft.com/Windows/MediaPlayer/"
		        src="mms://jireck.dyndns.org:8989/"
		        width="620" height="385"
		        autostart="1"
		        showcontrols="1"><!-- src属性は絶対パス指定 -->
		    </embed>

		</object>
	</div>

	<div id="chat">
		<table>
			<tr>
				<td>
					<div id="messageListDiv">
						<ul id="messageList">
						</ul>
					</div>
				</td>
			</tr>
			<tr>
				<td>
					<input id="message" type="text" name="text" size="50" maxlength="99" onkeypress="keyEvent(event.keyCode)"/>
					<button onclick="send()">SEND</button>
				</td>
			</tr>
			<tr>
				<td colspan="2">
					<div id="userListDiv">
						<ul id="userList">
							<lh>入室ユーザー</lh>
						</ul>
					</div>
				</td>
			</tr>

		</table>
	<button onclick="leaveRoom()">退室</button>
	</div>

<div id="clear" style="clear: both;"></div>














</body>
</html>
