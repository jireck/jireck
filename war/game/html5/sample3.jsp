<%@page pageEncoding="UTF-8" isELIgnored="false" session="false"%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>SAMPLE3</title>
	<link rel="stylesheet" href="${pagecontext.request.contextpath}css/game/sample3.css" type="text/css" />
	<script language="JavaScript" src="/js/game/sample3.js"></script>
</head>
<body>
	<audio id="audio1"><source src="/audio/game/sample1.m4a"><source src="/audio/game/sample1.ogg"></audio>
	<button onclick="play()">PLAY</button>
	<button onclick="pause()">PAUSE</button>
	<p>参考:<a href="http://homepage2.nifty.com/t_ishii/site/html5game/index.html">初めてのHTML5ゲーム作成</a></p>
</body>
</html>
