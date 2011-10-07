// イメージオブジェクトの生成
var image = new Image();
image.src = "/img/game/User-web-2.0-linkedin-64.png";

// スプライトパラメータ
//var keyLeft = 0;
//var keyRight = 0;
//var spriteX = 100;
//var spriteY = 50;

// タスク用配列
var taskArray = [];

// タスクの定義
var Task = function(x, y) {
	this.add = 30;
	this.x = x;
	this.y = y;
	// 更新関数
	this.update = function(canvas, context) {
		var minX = 0;
		var maxX = canvas.width - image.width;
		this.x += this.add;
		if (this.x < minX) {
			this.x = minX;
			this.add *= -1;
		}
		if (this.x > maxX) {
			this.x = maxX;
			this.add *= -1;
		}
	}
	// 描画関数
	this.draw = function(canvas, context) {
		// 画像描画
		context.drawImage(image, 0, 0,
				image.width, image.height,
				this.x, this.y,
				image.width, image.height);
	}
}

//// 更新
//function update() {
//	var canvas = window.document.getElementById("screen");
//	var minX = 0;
//	var maxX = canvas.width - image.width;
//
//	if (keyLeft) {
//		spriteX -= 20;
//		if (spriteX < minX) {
//			spriteX = minX;
//		}
//		keyLeft = 0;
//		return true;
//	} else if (keyRight) {
//		spriteX += 20;
//		if (spriteX > maxX) {
//			spriteX = maxX;
//		}
//		keyRight = 0;
//		return true;
//	}
//	return false;
//}
//
//// 描画
//function draw() {
//	// canvas オブジェクトを取得
//	var canvas = window.document.getElementById("screen");
//	var context = canvas.getContext("2d");
//
//	// キャンバスのクリア
//	context.clearRect(0, 0, canvas.width, canvas.height);
//
//	// 画像描画
//	context.drawImage( image, 0, 0,
//			image.width, image.height, spriteX, spriteY,
//			image.width, image.height );
//
//	// 四角形を描画
//	context.fillStyle = "rgb(192, 80, 77)";
//	context.fillRect(50, 150, 300, 100);
//
//	// 文字を描画
//	context.font = "bold 18px 'ＭＳ　Ｐゴシック'";
//	context.fillStyle = "rgb(255, 255, 255)";
//	context.fillText("spriteX=" + spriteX + ", spriteY=" + spriteY, 60, 175);
//}

// メインループ
function loop() {
	var canvas = window.document.getElementById("screen");
	var context = canvas.getContext("2d");
	// 更新
	for (var i = 0; i < taskArray.length; i++) {
		taskArray[i].update(canvas, context);
	}
	// クリア
	context.clearRect(0, 0, canvas.width, canvas.height);
	// タスクを描画
	for (var i = 0; i < taskArray.length; i++) {
		taskArray[i].draw(canvas, context);
	}
}

//// キーボードイベント処理
//window.onkeydown = function(event) {
//	switch(event.keyCode) {
//		case 37: // 「←」
//			keyLeft = 1;
//			break;
//		case 39: // 「→」
//			keyRight = 1;
//			break;
//	}
//}

// メインループを定期的に呼ばれるようにする
function init() {
	// タスクを作成
	taskArray[0] = new Task(50, 50);
	taskArray[1] = new Task(300, 150);
	setInterval(loop, 300);
}

