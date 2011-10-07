<%@page pageEncoding="UTF-8" isELIgnored="false" session="false"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="f" uri="http://www.slim3.org/functions"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>チェックデータの管理</title>
<script language="JavaScript" src="/js/jquery-1.5.2.min.js"></script>
<script language="JavaScript" src="/js/live/management.js"></script>
</head>
<body>
<h3>チェック配信者リスト</h3>
<table id="checkedList" border="0"></table>
<hr />
<h3>NG配信者リスト</h3>
<table id="ngCheckedList" border="0"></table>
<hr />
<br />
<button title="全てのチェックデータをクリアする" onclick="clearAll()">チェックを全てクリア</button>
　<a href=".">戻る</a>

</body>
</html>
