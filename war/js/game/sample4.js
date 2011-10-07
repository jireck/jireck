///**************************************************
// * グローバル変数定義
// **************************************************/
var canvas;
var context;
var minX = 0; // キャンバスの最小X
var maxX; // キャンバスの最大X

var hero; // 主人公
var enemies = []; // 敵キャラ群
var backObjects = []; // 背景群
var blocks = []; // ブロック群
var myShots = []; // 舞ショット群

var baseX; // 基準となるX

// 音
var endAudio;
var bgmAudio;
var clearAudio;

//イメージオブジェクトの生成
var inmanRight1Image = new Image();
inmanRight1Image.src = "/img/game/inmanRight1.png";
var inmanRight2Image = new Image();
inmanRight2Image.src = "/img/game/inmanRight2.png";
var inmanRight3Image = new Image();
inmanRight3Image.src = "/img/game/inmanRight3.png";
var inmanLeft1Image = new Image();
inmanLeft1Image.src = "/img/game/inmanLeft1.png";
var inmanLeft2Image = new Image();
inmanLeft2Image.src = "/img/game/inmanLeft2.png";
var inmanLeft3Image = new Image();
inmanLeft3Image.src = "/img/game/inmanLeft3.png";
var enemyImage = new Image();
enemyImage.src = "/img/game/enemy.png";
var treeImage = new Image();
treeImage.src = "/img/game/tree.png";
var cloudImage = new Image();
cloudImage.src = "/img/game/cloud.png";
var groundImage = new Image();
groundImage.src = "/img/game/ground.png";
var goalImage = new Image();
goalImage.src = "/img/game/goal.png";
var ingirlImage = new Image();
ingirlImage.src = "/img/game/ingirl.png";
var bossImage = new Image();
bossImage.src = "/img/game/boss.png";
var blockImage = new Image();
blockImage.src = "/img/game/block.png";
var crione1Image = new Image();
crione1Image.src = "/img/game/crione1.png";
var crione2Image = new Image();
crione2Image.src = "/img/game/crione2.png";

// 時間
var startTime;
var time;
var limitTime;

var timerId; // intervalのタイマーID

// ポイント
var kuguriPoint;
var point;

var goalDrawFlag;; // ゴールを描画したか

// キー入力フラグ
var zKeyFlag = false;
var rightKeyFlag = false;
var leftKeyFlag = false;
var pauseFlag = false;

var clearFlag;
var clearName;
var score;

var startFlag = false;


///**************************************************
// * 各種処理関数定義
// **************************************************/

// 初期表示
window.onload = function () {
	// canvas オブジェクトを取得
	canvas = window.document.getElementById("screen");
	maxX = canvas.width;
	context = canvas.getContext("2d");
	limitTime = 100;

	// スタートボタンを描画
	context.font = "bold 18px 'arial black'";
	context.fillStyle = "rgb(0, 0, 0)";
	context.textAlign = "center";
	context.fillText("インマンのくぐっ天国 Ver3.0", canvas.width / 2, 100);
	context.fillText("START:ENTER KEY", canvas.width / 2, 120);

	initComponent();
}

// コンポーネントの初期化
function initComponent() {
	hero = new Hero();
	hero.draw();

	// 最初の地面描画
	var backObject = new BackObject("ground");
	backObject.x = 0;
	backObject.draw();
	backObjects.push(backObject);
	backObject = new BackObject("ground");
	backObject.x = groundImage.width;
	backObject.draw();
	backObjects.push(backObject);
	backObject = new BackObject("ground");
	backObject.x = canvas.width;
	backObject.draw();
	backObjects.push(backObject);
}

// ゲームメインループ
function loop() {
	var now = new Date();
	time = now - startTime;
	time /= 1000;
	time = Math.floor(time);
	time = limitTime - time;

	// ブロック追加
	if (!goalDrawFlag && !parseInt(Math.random() * 200)) {
		blocks.push(new Block(blockImage));
	}
	// 敵追加
	if (!goalDrawFlag && !parseInt(Math.random() * 60)) {
		enemies.push(new Enemy(enemyImage, 2, 10));
	}
	// 空を飛ぶ敵追加
	if (!goalDrawFlag && !parseInt(Math.random() * 150)) {
		enemies.push(new FlyingEnemy(crione1Image, crione2Image, 2, 20));
	}

	update();

	// ゴール
	if (baseX > 5000 && ! goalDrawFlag) {
		var backObject = new BackObject("goal");
		backObject.x = canvas.width + 20;
		backObject.draw();
		backObjects.push(backObject);
		goalDrawFlag = true;
		var boss = new Enemy(bossImage, 15, 100);
		boss.speed = 2;
		boss.radius = 60;
		enemies.push(boss);

		var ingirl = new Enemy(ingirlImage, 100, 1000);
		ingirl.speed = 0;
		ingirl.radius = 0;
		ingirl.x = maxX + 100;
		enemies.push(ingirl);

		var block = new Block(blockImage);
		block.x = canvas.width -200;
		block.draw();
		blocks.push(block);

	}

	if (time == 0) {
		gameover();
	}

}

// 画面の更新
function update() {
	// キャンバスクリア
	context.clearRect(0, 0, canvas.width, canvas.height);

	drawObjs(backObjects);
	drawObjs(blocks);
	drawObjs(enemies);
	drawObjs(myShots);
//	hero.draw();

	if (! clearFlag) {
		moveObjs(backObjects);
		hero.selfMove();
		moveObjs(enemies);
		moveObjs(myShots);
		if (!hero.deadFlag) {
			hitCheck();
			myShotHitCheck();
			kuguriCheck();
			onBlockCheck();
		}

		// 時間表示
		context.font = "bold 12px 'ＭＳ　Ｐゴシック'";
		context.fillStyle = "rgb(0, 0, 0)";
		context.fillText("TIME:" + time, canvas.width -100, 20);
		context.fillText("POINT:" + point, canvas.width -100, 40);
		context.fillText("KUGURIPOINT:" + kuguriPoint, canvas.width -100, 60);
	}
	hero.draw();
}

//移動
function moveObjs(objs) {
	for (var n = 0; n < objs.length; n++) {
		if (!objs[n].selfMove()) {
			// objを削除
			objs.splice(n, 1);
			n--;
		}
	}
}
// 描画
function drawObjs(objs) {
	for (var n = 0; n < objs.length; n++) {
		objs[n].draw();
	}
}

function addBaseX(value) {
	baseX += value;
	for (var n = 0; n < backObjects.length; n++) {
		if (!backObjects[n].move(value)) {
			// objを削除
			backObjects.splice(n, 1);
			n--;
		}
	}
	for (var n = 0; n < enemies.length; n++) {
		if (!enemies[n].move(value)) {
			// objを削除
			enemies.splice(n, 1);
			n--;
		}
	}
	for (var n = 0; n < blocks.length; n++) {
		if (!blocks[n].move(value)) {
			// objを削除
			blocks.splice(n, 1);
			n--;
		}
	}
	for (var n = 0; n < myShots.length; n++) {
		if (!myShots[n].move(value)) {
			// objを削除
			myShots.splice(n, 1);
			n--;
		}
	}
	if (baseX % 300 == 0) {
		// 背景追加
		// 0～9のランダムな整数を2で割った余りが0の場合
		if (Math.floor(Math.random()*10) % 2 == 0) {
			var kind = "cloud";
		} else {
			var kind = "tree";
		}
		var backObject = new BackObject(kind);
		backObjects.push(backObject);

		backObject = new BackObject("ground");
		backObject.x = canvas.width - value;
		backObject.draw(context);
		backObjects.push(backObject);
	}

	if (baseX > 5000 + canvas.width / 2 + 100) {
		clear();
	}
}

// ゲームオーバー
function gameover() {
	hero.jumpSpeed = -2;
	hero.jumpFlag = true;
	hero.maxY = 500;

	setTimeout( function() {
		over();

		// 文字を描画
		context.font = "bold 22px 'arial black'";
		context.fillStyle = "rgb(0, 0, 200)";
		context.textAlign = "center";
		context.fillText("GAME OVER", canvas.width / 2, 100);
		context.fillText("RESTART:ENTER KEY", canvas.width / 2, 150);
	}, 1500);

	endAudio.volume;
	endAudio.play();

	setTimeout(finalize, 2000);
}

function clear() {

	clearAudio.play();

	over();
	context.font = "bold 26px 'arial black'";
	context.fillStyle = "rgb(0, 0, 200)";
	context.textAlign = "center";
	context.fillText("CONGRATULATIONS!", canvas.width / 2, 50);

	context.font = "bold 18px 'arial black'";
	context.fillStyle = "rgb(0, 0, 200)";
	context.fillText("TIME:" + time, canvas.width / 2, 80);
	context.fillText("POINT:" + point, canvas.width / 2, 110);
	context.fillText("KUGURIPOINT:" + kuguriPoint, canvas.width / 2, 140);
	context.font = "bold 26px 'arial black'";
	context.fillStyle = "rgb(255, 0, 0)";

	if (kuguriPoint == 0) {
		score = time;
	} else {
		score = kuguriPoint * time;
	}
	score += point;
	context.fillText("SCORE:" + score, canvas.width / 2, 170);
	ending();
	setTimeout(clearDraw, 5000);
}

function over() {
	// メインループ終了
	clearInterval(timerId);

	bgmAudio.pause();
}

function clearDraw() {
	clearFlag = true;
	update();
	context.font = "bold 22px 'arial black'";
	context.fillStyle = "rgb(0, 0, 200)";
	context.fillText("名前を入力してENTERでスコアの登録ができます。", canvas.width / 2, 100);
	context.fillText("SCORE:" + score, canvas.width / 2, 150);
	context.fillStyle = "rgb(255, 0, 0)";
	context.fillText("NAME:" + clearName, canvas.width / 2, 200);
}

function finalize() {
	// 敵キャラ、背景クリア
	enemies = [];
	backObjects = [];
	blocks = [];;
	myShots = [];
	startFlag = false;
}

function ending() {

}

