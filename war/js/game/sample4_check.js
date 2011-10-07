
// 当たり判定
function hitCheck() {
	for (i = 0; i < enemies.length; i++) {
		var d2 = (enemies[i].centerX - hero.centerX) * (enemies[i].centerX - hero.centerX) + (enemies[i].centerY - hero.centerY) * (enemies[i].centerY - hero.centerY);
		var r2 = (enemies[i].radius + hero.radius) * (enemies[i].radius + hero.radius);
		if (d2 < r2) {
			hero.deadFlag = true;
			rightKeyFlag = false;
			leftKeyFlag = false;
			gameover();
			break;
		}
	}
}

// ショット当たり判定
function myShotHitCheck() {
	for (var enemiesIndex = 0; enemiesIndex < enemies.length; enemiesIndex++) {
		for (var myShotsIndex = 0; myShotsIndex < myShots.length; myShotsIndex++) {
			var d2 = (enemies[enemiesIndex].centerX - myShots[myShotsIndex].x) * (enemies[enemiesIndex].centerX - myShots[myShotsIndex].x) + (enemies[enemiesIndex].centerY - myShots[myShotsIndex].y) * (enemies[enemiesIndex].centerY - myShots[myShotsIndex].y);
			var r2 = (enemies[enemiesIndex].radius + myShots[myShotsIndex].radius) * (enemies[enemiesIndex].radius + myShots[myShotsIndex].radius);

			// ヒットと判定された場合
			if (d2 < r2) {
				enemies[enemiesIndex].hp -= 1;
				myShots.splice(myShotsIndex, 1);

				// HPが0以下の場合
				if (enemies[enemiesIndex].hp <= 0) {
					point += enemies[enemiesIndex].point;
					enemies.splice(enemiesIndex, 1); // 敵の削除
					enemiesIndex--;
					break;
				}
			}
		}
	}
}

// ブロックのっかりチェック
function onBlockCheck() {
	for (i = 0; i < blocks.length; i++) {
		if (blocks[i].x + blocks[i].imageMap["normal"].width > hero.centerX && blocks[i].x < hero.centerX) {
			if (blocks[i].y >= hero.underY && blocks[i].y - 5 <= hero.underY) {
				if (!hero.onBlockFlag && hero.jumpSpeed >= 0) {
					hero.jumpSpeed = 0;
					hero.jumpFlag = false;
					hero.y = blocks[i].y - inmanRight1Image.height;
					hero.onBlockFlag = true;
				}
				return true;
			}
		}
	}
	if (hero.onBlockFlag) {
		hero.jumpFlag = true;
		hero.onBlockFlag = false;
	}
	return false;
}

// くぐり判定
function kuguriCheck() {
	for (i = 0; i < enemies.length; i++) {
		if (enemies[i].centerX + 8 > hero.centerX && enemies[i].centerX - 8 < hero.centerX) {
			if (enemies[i].y < hero.y) {
				if (!enemies[i].kuguriFlag) { // 一回のジャンプで一度しかくぐりポイントは入らない
					kuguriPoint += 1;
					enemies[i].kuguriFlag = true;
				}
			}
		}
	}
}