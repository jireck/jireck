window.onload = function () {
	var checkedData = localStorage.getItem("checkedData");
	if (checkedData) { // checkedData != undefined && checkedData != null と同じ
		try {
			var parsedCheckedData = JSON.parse(checkedData);
		} catch(e) {
			return;
		}
		var names = parsedCheckedData.checkedNames;
		for (var i = 0; i < names.length; i++) {
			// 要素（テーブルのレコード）を追加
			$("#checkedList").append(' \
			<tr> \
				<td><a href="http://livetube.cc/' + names[i] + '">' + names[i] + '</a><td> \
				<td><button onclick="remove(\'' + names[i] + '\')">削除</button><td> \
			</tr>');
		}
	}

	var ngCheckedData = localStorage.getItem("ngCheckedData");
	if (ngCheckedData) {
		try {
			var parsedNgCheckedData = JSON.parse(ngCheckedData);
		} catch(e) {
			return;
		}
		var names = parsedNgCheckedData.checkedNames;
		for (var i = 0; i < names.length; i++) {
			// 要素（テーブルのレコード）を追加
			$("#ngCheckedList").append(' \
			<tr> \
				<td><a href="http://livetube.cc/' + names[i] + '">' + names[i] + '</a><td> \
				<td><button onclick="ngRemove(\'' + names[i] + '\')">NG解除</button><td> \
			</tr>');
		}
	}
}


// nameに指定された名前をローカルストレージのチェックデータから削除
function remove(name) {
	result = confirm("「" + name + "」をリストから削除します。よろしいですか？");
	if (! result) {
		return;
	}

	// 取得
	var checkedData = localStorage.getItem("checkedData");
	if (checkedData) {
		try {
			// JSON→オブジェクト
			checkedData = JSON.parse(checkedData);
		} catch(e) {
			return;
		}
	} else {
		return;
	}

	var index = checkedData.checkedNames.indexOf(name);
	checkedData.checkedNames.splice(index,1);

	// オブジェクト→JSON→再セット
	localStorage.setItem("checkedData", JSON.stringify(checkedData));

	// リスト（テーブル）の中身を消去
	$("#checkedList").empty();
	$("#ngCheckedList").empty();

	// 再追加
	onload();
}

// nameに指定されたNG配信者名をローカルストレージのチェックデータから削除
function ngRemove(name) {
	result = confirm("「" + name + "」のNG設定を解除します。よろしいですか？");
	if (! result) {
		return;
	}

	// 取得
	var checkedData = localStorage.getItem("ngCheckedData");
	if (checkedData) {
		try {
			// JSON→オブジェクト
			checkedData = JSON.parse(checkedData);
		} catch(e) {
			return;
		}
	} else {
		return;
	}

	var index = checkedData.checkedNames.indexOf(name);
	checkedData.checkedNames.splice(index,1);

	// オブジェクト→JSON→再セット
	localStorage.setItem("ngCheckedData", JSON.stringify(checkedData));

	// リスト（テーブル）の中身を消去
	$("#checkedList").empty();
	$("#ngCheckedList").empty();

	// 再追加
	onload();
}

function clearAll() {
	result = confirm("全てのチェックデータを消去します。よろしいですか？");
	if (! result) {
		return;
	}

	localStorage.clear(); // 全て消す
	location.reload();
}