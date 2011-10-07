///**************************************************
// * 最上位コンポーネント
// **************************************************/
function Component(x, y, imageMap, imageState) {
	this.x = x;
	this.y = y;
	this.imageMap = imageMap; // 画像データのマップ
	this.imageState = imageState; // 描画する画像の状態
	this.leftFlag = false; // 左を向いていること

	// 描画
	this.draw = function() {
		var key;
		var image;

		// ヒーローインスタンスだった場合
		if (this instanceof Hero) {
			if (this.leftFlag) {
				key = "left" + this.imageState % 4;
			} else {
				key = "right" + this.imageState % 4;
			}

			image = this.imageMap[key];

			if (! this.jumpFlag && ! this.onBlockFlag) { // TODO 注意？

				// 画像表示位置切り替え
				this.y = canvas.height - image.height - groundImage.height;
			}
		} else {
			key = this.imageState;
			image = this.imageMap[key];
		}
		context.drawImage( image, this.x, this.y);
	}

	// 移動（画面移動による）
	this.move = function(value) {
		this.x -= value;
		if (minX - 300 > this.x) { // 画面外判定
			return false;
		}
		return true;
	}
}

///**************************************************
// * ジャンプ可能なコンポーネント
// **************************************************/
function JumpableComponent(x, y, tob, imageMap, imageState) {
	this.maxY = y;
	this.jumpSpeed = 0;
	this.jumpFlag = false;
	this.tob = tob;

	// 親クラスコンストラクタ呼び出し（フィールドの継承）
	Component.call(this, x, y, imageMap, imageState);

	this.jump = function() {
		this.y += this.jumpSpeed;
		this.jumpSpeed += tob;

		// 上下判定
		if (tob > 0) {
			if (this.y > this.maxY) {
				this.y = this.maxY;
				this.jumpFlag = false;
			}
		} else {
			if (this.y < this.maxY) {
				this.y = this.maxY;
				this.jumpFlag = false;
			}
		}
	}
}
JumpableComponent.prototype = new Component();

///**************************************************
// * 主人公
// **************************************************/
var Hero = function() {
	var x = ( canvas.width - inmanRight1Image.width ) / 2;
	this.moveSize = 10;
	this.maxX = x;
	this.minY = 100;
	this.radius = 20; // 半径
	this.centerX;
	this.centerY;
	this.underY;
	this.onBlockFlag = false;
	this.deadFlag = false;
	this.count = 0; // 画像切り替え用カウント

	var y = canvas.height - inmanRight1Image.height - groundImage.height;
	// 親クラスコンストラクタ呼び出し（フィールドの継承）
	JumpableComponent.call(this, x, y, 1, {right0:inmanRight1Image, right1:inmanRight2Image, right2:inmanRight3Image, right3:inmanRight2Image, left0:inmanLeft1Image, left1:inmanLeft2Image, left2:inmanLeft3Image, left3:inmanLeft2Image}, 0);

	this.selfMove = function() {
		if (zKeyFlag) {
			if (! this.jumpFlag) {
				this.jumpSpeed = -15;
				this.jumpFlag = true;
			}
		}
		if (rightKeyFlag) {
			this.x += this.moveSize;
			if (this.x > this.maxX) {
				this.x = this.maxX;
				addBaseX(this.moveSize);
			}

			if (this.leftFlag) {
				this.leftFlag = false;
			}

			this.count++;

			// 画像切り替え
			if (this.count > 3) {
				this.count = 0;
				this.imageState++;
//				if (this.imageState === "right1") {
//					this.imageState = "right2";
//				} else if (this.image === inmanRight2Image) {
//					this.image = inmanRight3Image;
//				} else {
//					this.image = inmanRight1Image;
//				}
			}
		} else if (leftKeyFlag) {
			this.x -= this.moveSize;
			if (this.x < minX) {
				this.x = minX;
			}
			if (! this.leftFlag) {
				this.leftFlag = true;
			}
			this.count++;

			// 画像切り替え
			if (this.count > 3) {
				this.count = 0;
				this.imageState++;
//				if (this.image === inmanLeft1Image) {
//					this.image = inmanLeft2Image;
//				} else if (this.image === inmanLeft2Image) {
//					this.image = inmanLeft3Image;
//				} else {
//					this.image = inmanLeft1Image;
//				}
			}
		} else {
			this.count = 0;
		}
		if (this.jumpFlag) {
			this.jump();
		}
		this.centerX = this.x + inmanRight1Image.width / 2;
		this.centerY = this.y + inmanRight1Image.height / 2;
		this.underY = this.y + inmanRight1Image.height;

	}

	// 描画
	this.draw = function () {
//		if (this.leftFlag) {
//			this.image = inmanLeftImage;
//		} else {
//			this.image = inmanRightImage;
//		}
		// 親クラスメソッド呼び出し
		Hero.prototype.draw.call(this);
	}
}
Hero.prototype = new JumpableComponent();

///**************************************************
// * 舞ショット
// **************************************************/
var MyShot = function(x, y, distance) {
	this.x = x;
	this.y = y;
	this.radius = 4; // 半径
	this.distance = distance; // 移動距離

	this.selfMove = function() {
		this.x += this.distance;
		if (this.x > maxX || this.x < minX) {
			return false;
		}
		return true;
	}

	// 移動（画面移動による）
	this.move = function(value) {
		this.x -= value;
		if (this.x > maxX || this.x < minX) { // 画面外判定
			return false;
		}
		return true;
	}

	this.draw = function() {
		context.save();
		context.beginPath();
		context.translate(this.x, this.y);
		context.moveTo(-6, 0);
		context.lineTo(6, 0);
		context.strokeStyle = "rgb(255, 0, 0)";
		context.lineWidth = 4;
		context.lineCap = "round";
		context.stroke();
		context.restore();
	}
}

///**************************************************
// * 敵
// **************************************************/
function Enemy(image, hp, point) {
	this.centerX;
	this.centerY;
	this.radius = 20; // 半径
	this.speed = 5;
	this.kuguriFlag = false;
	this.hp = hp;
	this.point = point;

	var x = canvas.width + 20;
	var y = canvas.height - image.height - groundImage.height;
	// 親クラスコンストラクタ呼び出し（フィールドの継承）
	JumpableComponent.call(this, x, y, 1, { normal : image }, "normal");

	this.selfMove = function() {
		// ランダムな0～99の整数が1だった場合
		if (Math.floor/* 小数点以下切り上げ */(Math.random()*100) == 1) {
			if (! this.jumpFlag) {
				this.jumpSpeed = -12;
				this.jumpFlag = true;
			}
		}
		if (this.jumpFlag) {
			this.jump();
		} else {
			this.kuguriFlag = false;
		}
		this.x -= this.speed;
		this.calcCenter();
		if (minX - 50 > this.x) { // 画面外判定
			return false;
		}
		return true;
	}

	// 移動
	this.move = function(value) {
		var result = Enemy.prototype.move.call(this, value); // 親クラスメソッド呼び出し
		this.calcCenter();
		return result;
	}

	// 中心座標計算
	this.calcCenter = function() {
		this.centerX = this.x + this.imageMap["normal"].width / 2;
		this.centerY = this.y + this.imageMap["normal"].height / 2;
	}
}
Enemy.prototype = new JumpableComponent();

///**************************************************
// * 空を飛ぶ敵
// **************************************************/
function FlyingEnemy(image1, image2, hp, point) {
	this.centerX;
	this.centerY;
	this.radius = image1.width / 2; // 半径
	this.speed = 6;
	this.kuguriFlag = true;
	this.hp = hp;
	this.point = point;
	this.image1 = image1;
	this.image2 = image2;
	this.count = 0;

	var x = canvas.width + 20;
	var y = canvas.height / 2 - 50;
	// 親クラスコンストラクタ呼び出し（フィールドの継承）
	JumpableComponent.call(this, x, y, -1, { up : image1, down : image2 }, "up");

	this.selfMove = function() {
		this.x -= this.speed;
		this.calcCenter();
		if (minX - 50 > this.x) { // 画面外判定
			return false;
		}

		// ランダムな0～99の整数が1だった場合
		if (Math.floor/* 小数点以下切り上げ */(Math.random()*60) == 1) {
			if (! this.jumpFlag) {
				this.jumpSpeed = 12;
				this.jumpFlag = true;
			}
		}
		if (this.jumpFlag) {
			this.jump();
		}

		// 画像切り替え
		this.count++;
		if (this.count > 5) {
			this.count = 0;
			if (this.imageState === "up") {
				this.imageState = "down";
			} else {
				this.imageState = "up";
			}
		}

		return true;
	}

	// 移動
	this.move = function(value) {
		var result = Enemy.prototype.move.call(this, value); // 親クラスメソッド呼び出し
		this.calcCenter();
		return result;
	}

	// 中心座標計算
	this.calcCenter = function() {
		this.centerX = this.x + this.imageMap["up"].width / 2;
		this.centerY = this.y + this.imageMap["up"].height / 2;
	}
}
FlyingEnemy.prototype = new JumpableComponent();

///**************************************************
// * 背景
// **************************************************/
var BackObject = function(kind) {
	this.distance; // ヒーローからの距離（遠くのものは遅く動かす）
	this.speed;

	this.setDistance = function(distance) {
		this.distance = distance;
	}
	this.setSpeed = function(speed) {
		this.speed = speed;
	}

	// 初期化
	var y;
	var image;
	switch(kind) {
		case "ground": // 「地面」
			image = groundImage;
			y = canvas.height - image.height;
			this.setDistance(1);
			this.setSpeed(0);
			break;
		case "cloud": // 「雲」
			image = cloudImage;
			y = canvas.height - image.height - groundImage.height -150;
			this.setDistance(2);
			this.setSpeed(0.2);
			break;
		case "tree": // 「木」
			image = treeImage;
			y = canvas.height - image.height - groundImage.height -50;
			this.setDistance(1);
			this.setSpeed(0);
			break;
		case "goal": // 「ゴール」
			image = goalImage;
			y = canvas.height - image.height - groundImage.height;
			this.setDistance(1);
			this.setSpeed(0);
			break;
	}

	var x = canvas.width + 20;

	// 親クラスコンストラクタ呼び出し（フィールドの継承）
	Component.call(this, x, y, {normal : image}, "normal");

	this.selfMove = function() {
		this.x -= this.speed;
		if (minX - 300 > this.x) { // 画面外判定
			return false;
		}
		return true;
	}
}
BackObject.prototype = new Component();

///**************************************************
// * 障害物など
// **************************************************/
var Block = function(image) {
	var x = canvas.width + 20;
	var y = canvas.height - image.height - groundImage.height -50;

	// 親クラスコンストラクタ呼び出し（フィールドの継承）
	Component.call(this, x, y, {normal : image}, "normal");
}
Block.prototype = new Component();



