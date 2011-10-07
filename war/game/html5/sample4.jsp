<%@page pageEncoding="UTF-8" isELIgnored="false" session="false"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>SAMPLE4:インマンのくぐっ天国</title>
	<link rel="stylesheet" href="/css/game/sample4.css" type="text/css" />
	<script language="JavaScript" src="/js/jquery-1.5.2.min.js"></script>
	<script language="JavaScript" src="/js/game/sample4.js"></script>
	<script language="JavaScript" src="/js/game/sample4_event.js"></script>
	<script language="JavaScript" src="/js/game/sample4_component.js"></script>
	<script language="JavaScript" src="/js/game/sample4_check.js"></script>
</head>
<body>
	<audio id="endAudio"><source src="/audio/game/end.m4a"><source src="/audio/game/end.ogg"></audio>
	<audio id="clearAudio"><source src="/audio/game/clear.m4a"><source src="/audio/game/clear.ogg"></audio>
	<audio id="bgmAudio"><source src="/audio/game/stage1.m4a"><source src="/audio/game/stage1.ogg"></audio>
	<canvas id="screen" width="600" height="350" class="floatLeft"></canvas>
	<div id="ranking">
		<h3>ランキング</h3>
		<table border="0">
			<tr>
				<th>順位</th>
				<th>名前</th>
				<th>スコア</th>
			</tr>
			<c:forEach var="score" items="${scoreList}" varStatus="status">
			<tr>
				<td>
					${f:h(status.count)}位
				</td>
				<td align="center">
					${f:h(score.name)}
				</td>
				<td align="right">
					${f:h(score.score)}
				</td>
			</tr>
			</c:forEach>
		</table>
	</div>
	<hr class="floatClear" />

	<ul>
		<lh>【操作方法】</lh>
		<li>→：右移動</li>
		<li>←：左移動</li>
		<li>Z：ジャンプ</li>
		<li>X：赤い何かを撃つ</li>
		<li>P：一時停止</li>
	</ul>
</body>
</html>
