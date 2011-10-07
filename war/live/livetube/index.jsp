<%@page pageEncoding="UTF-8" isELIgnored="false" session="false"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="f" uri="http://www.slim3.org/functions"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="stylesheet" type="text/css" href="/css/live/livetube.css" />
<title>Livetube 配信一覧</title>
<script language="JavaScript" src="/js/json2.js"></script>
<script language="JavaScript" src="/js/live/livetube.js"></script>
</head>
<body>
<h3><a href="http://livetube.cc/">Livetube</a></h3>
<a href="management">チェックデータの管理</a>
	<table id="liveList" border="1">
		<tr>
			<th colspan="2">名前</th>
			<th>タイトル</th>
			<th>NG</th>
		</tr>
		<c:forEach var="entry" items="${feed.entries}">
			<tr id="tr_${entry.author}">
				<td>
					<input id="check_${entry.author}" type="checkbox" name="check" onchange="check(this.checked, '${entry.author}')" />
				</td>
				<td id="name_${entry.author}">
					<div class="width150">
						<a href="http://livetube.cc/${entry.author}" title="${f:h(entry.author)}">${f:h(entry.author)}</a>
					</div>
				</td>
				<td>
					<div class="width500">
						<a href="${entry.link}" title="${f:h(entry.title)}">${f:h(entry.title)}</a>
					</div>
				</td>
<!--				<td>-->
<!--					<fmt:formatDate value="${entry.publishedDate}" type="both" timeZone="Asia/Tokyo" />-->
<!--				</td>-->
				<td>
					<button onclick="ngCheck('${entry.author}')">NG</button>
				</td>
			</tr>
		</c:forEach>
	</table>
</body>
</html>
