var canvas;
var ctx;
var WIDTH;
var HEIGHT;
var myShip;
var button = false;
var myShots = [];
var enemies = [];

// オンロード
function onload() {
    canvas = document.getElementById("field");
    if (!canvas.getContext) return;
    ctx = canvas.getContext("2d");
	WIDTH = canvas.width;
	HEIGHT = canvas.height;

    // 三角形描画
    ctx.beginPath();
    ctx.moveTo(150, 140);
    ctx.lineTo(140, 160);
    ctx.lineTo(160, 160);
    ctx.fillStyle = "rgb(64, 64, 255)";
    ctx.fill();


	// マウスイベント検出
	canvas.onmousedown = function() {
		button = true;
	}
	canvas.onmouseup = function() {
		button = false;
	}

	myShip = new MyShip();

    setInterval(loop, 1000 / 30);
}

// メインループ
function loop() {
	hitTest();
	move();
	draw(ctx);
	if (!parseInt(Math.random() * 20)) {
		enemies.push(new Enemy());
	}
}

// 自機
var MyShip = function() {
	this.x = WIDTH / 2;
	this.y = HEIGHT * 9 / 10;
	this.count = 0;

	this.move = function() {
		this.x = (this.x + 4 * (button ? 1 : -1) + WIDTH) % WIDTH; // キャンバス範囲内に収める

		if (--this.count < 0) {
			this.count = 5;
			myShots.push(new MyShot(this.x, this.y - 5));
		}
	}

	this.draw = function (ctx) {
		ctx.save();
		ctx.beginPath();
		ctx.translate(this.x, this.y);
		ctx.moveTo(0, -10);
		ctx.lineTo(-10, 10);
		ctx.lineTo(10, 10);
		ctx.fillStyle = ("rgb(64, 64, 255");
		ctx.fill();
		ctx.restore();
	}
}

var MyShot = function(x, y) {
	this.x = x;
	this.y = y;
	this.radius = 4; // 半径

	this.move = function() {
		this.y -= 10;
		if (this.y < -20) {
			return false;
		}
		return true;
	}

	this.draw = function(ctx) {
		ctx.save();
		ctx.beginPath();
		ctx.translate(this.x, this.y);
		ctx.moveTo(0, -6);
		ctx.lineTo(0, 6);
		ctx.strokeStyle = "rgb(255, 0, 0)";
		ctx.lineWidth = 4;
		ctx.lineCap = "round";
		ctx.stroke();
		ctx.restore();
	}
}

// 移動
function moveObjs(objs) {
	for (var n = 0; n < objs.length; n++) {
		if (!objs[n].move()) {
			objs.splice(n, 1);
			n--;
		}
	}
}

// 描画
function drawObjs(objs, ctx) {
	for (var n = 0; n < objs.length; n++) {
		objs[n].draw(ctx);
	}
}

// 敵機
var Enemy = function() {
	this.x = Math.random() * WIDTH;
	this.y = -20;
	this.radius = 10; // 半径

	this.move = function() {
		this.y += 5;
		if (HEIGHT + 20 < this.y) {
			return false;
		}
		return true;
	}

	this.draw = function(ctx) {
		ctx.save();
		ctx.beginPath();
		ctx.translate(this.x, this.y);
		ctx.moveTo(0, 10);
		ctx.lineTo(-10, -10);
		ctx.lineTo(10, -10);
		ctx.fillStyle = "rgb(64, 255, 64)";
		ctx.fill();
		ctx.restore();
	}
}

// ムーブ
function move() {
	moveObjs(enemies);
	moveObjs(myShots);
	myShip.move();
}

// ドロー
function draw(ctx) {
	ctx.beginPath();
	ctx.clearRect(0, 0, WIDTH, HEIGHT);

	drawObjs(enemies, ctx);
	drawObjs(myShots, ctx);
	myShip.draw(ctx);
}


// 衝突判定テスト
function hitTest() {
	for (var n = 0; n < enemies.length; n++) {
		for (var m = 0; m < myShots.length; m++) {
			var d2 = (enemies[n].x - myShots[m].x) * (enemies[n].x - myShots[m].x) + (enemies[n].y - myShots[m].y) * (enemies[n].y - myShots[m].y);
			var r2 = (enemies[n].radius + myShots[m].radius) * (enemies[n].radius + myShots[m].radius);
			if (d2 < r2) {
				myShots.splice(m, 1);
				enemies.splice(n, 1);
				n--;
				break;
			}
		}
	}
}