
//キーボードイベント処理
window.onkeydown = function(event) {
	//console.log(event.keyCode);

	if (! startFlag) {
		if (event.keyCode == 13) { // 「ENTER」
			start();
		}
	} else if (!hero.deadFlag){
		switch(event.keyCode) {
			case 37: // 「←」
				leftKeyFlag = true;
				break;
			case 39: // 「→」
				rightKeyFlag = true;
				break;
			case 90: // 「Z」
				zKeyFlag = true;
				break;
			case 80: // 「P」
				pause();
				break;
			case 88: // 「X」
				var distance = 20;
				var shotX = hero.x + inmanRight1Image.width;
				if (hero.leftFlag) { // 左を向いている場合
					distance = -20;
					shotX = hero.x;
				}
				shot(shotX, hero.centerY, distance);
				break;
		}
	}
}
window.onkeyup = function(event) {
	switch(event.keyCode) {
		case 37: // 「←」
			leftKeyFlag = false;
			break;
		case 39: // 「→」
			rightKeyFlag = false;
			break;
		case 90: // 「Z」
			zKeyFlag = false;
			break;
	}
}

// ゲームスタート
function start() {
	startTime = new Date();
	baseX = canvas.width / 2;
	kuguriPoint = 0;
	point = 0;
	goalDrawFlag = false;
	clearFlag = false;
	clearName = "";
	score = 0;
	startFlag = true;

	// 各種オーディオ取得
	endAudio = document.getElementById('endAudio');
	bgmAudio = document.getElementById('bgmAudio');
	clearAudio = document.getElementById('clearAudio');


	update();

	// BGMループ再生
	bgmAudio.volume = 0.2;
	bgmAudio.addEventListener('ended', function(){bgmAudio.play()}, false);
	bgmAudio.currentTime = 2;
	bgmAudio.play();

	initComponent();

	// メインループ開始
	timerId = setInterval(loop, 50);

}

// 一時停止
function pause() {
	if (!pauseFlag) {
		// メインループ終了
		over();
		pauseFlag = true;
		context.font = "bold 26px 'arial black'";
		context.fillStyle = "rgb(0, 0, 0)";
		context.fillText("PAUSE", canvas.width / 2, 100);
	} else {
		// メインループ開始
		timerId = setInterval(loop, 50);
		bgmAudio.play();
		pauseFlag = false;
	}
}

// 名前入力
$(document).keypress(function(event) {
	var result = true;
	if (clearFlag) {
		if (event.keyCode == 13) { // ENTER
			sendScore();
			update();
			clearFlag = false;
			context.font = "bold 26px 'arial black'";
			context.fillStyle = "rgb(0, 0, 200)";
			context.fillText("登録されました。", canvas.width / 2, 100);
			context.fillText("RESTART:ENTER KEY", canvas.width / 2, 150);
			finalize();
			return;
		}
		if (event.keyCode == 8) { // BACKSPACE
			clearName = clearName.substring(0, clearName.length - 1);
			result = false;
		}
		var charcode = event.which;
		if (clearName.length > 9) { // 10文字まで
			clearName = clearName.substring(0, 9);
		}
		var inputText = String.fromCharCode(charcode);

		// 半角英数、スペース、「.」,「-」のみ連結
		if (inputText.match( /[A-Za-z0-9\s.-]+/ )) {
			clearName = clearName.concat(inputText);
		}
		clearDraw();
		return result;
	}
});

// スコア送信
function sendScore() {
	var url = "sendScore";
	var map = new Object();
	map["score"] = score;
	map["name"] = clearName;
	$.post(url, map);
	setTimeout(loadRanking, 1000);
}
function loadRanking() {
	$("#ranking").load("sample4 #ranking");
}

// ショット
function shot(x, y, distance){
	if (myShots.length < 3) {
		myShots.push(new MyShot(x, y, distance));
	}
}
