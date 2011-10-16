<%@page pageEncoding="UTF-8" isELIgnored="false" session="false"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>WMP</title>
</head>
<body>
			<!-- width="285" [ムービーの高さ(240px) + ShowControls(45px)] -->
			<object
			    id="wmp2"
			    width="420" height="385"
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
			        width="420" height="385"
			        autostart="1"
			        showcontrols="1"><!-- src属性は絶対パス指定 -->
			    </embed>

			</object>
</body>
</html>