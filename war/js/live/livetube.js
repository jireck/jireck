var COLOR = "#00FF7F"

window.onload = function() {
	var checkedData = localStorage.getItem("checkedData");
	if (checkedData) { // checkedData != undefined && checkedData != null と同じ
		try {
			var parsedCheckedData = JSON.parse(checkedData);
		} catch (e) {
			return;
		}
		var names = parsedCheckedData.checkedNames;
		for ( var i = 0; i < names.length; i++) {
			var checkElement = document.getElementById("check_" + names[i]);
			if (checkElement) {
				checkElement.checked = true;
			}
			var nameElement = document.getElementById("name_" + names[i]);
			if (nameElement) {
				nameElement.style.backgroundColor = COLOR;
			}
		}
	}

	// NG配信者削除処理
	var ngCheckedData = localStorage.getItem("ngCheckedData");
	if (ngCheckedData) {
		try {
			var parsedNgCheckedData = JSON.parse(ngCheckedData);
		} catch (e) {
			return;
		}
		var names = parsedNgCheckedData.checkedNames;
		for ( var i = 0; i < names.length; i++) {
			// $("#liveList").remove("#tr_" + names[i]);
			// $("#tr_" + names[i]).remove(); jqueryでは$()のスペースを区切りとみなすためNG
			var nameElement = document.getElementById("tr_" + names[i]);
			if (nameElement) {
				var parent = nameElement.parentNode;
				parent.removeChild(nameElement);
			}
		}
	}

	// title チェック
	var checkedTitle = localStorage.getItem("checkedTitle");
	if (checkedTitle) {
		try {
			var parsedCheckedTitle = JSON.parse(checkedTitle);
		} catch (e) {
			return;
		}
		var titles = parsedCheckedTitle.checkedTitles;

		for ( var i = 0; i < titles.length; i++) {
			var checkedTitleElements = getElementsContains(titles[i]);
			for ( var j = 0; j < checkedTitleElements.length; j++) {
				checkedTitleElements[j].style.backgroundColor = COLOR;
			}
		}

	}
}
function check(checked, checkedName) {

	// スペースを「+」に置換
	// checkedName.replace(/\s/g, "+");

	// ローカルストレージから取得
	// JSON→オブジェクト
	var checkedData = localStorage.getItem("checkedData");
	if (checkedData) {
		try {
			checkedData = JSON.parse(checkedData);
		} catch (e) {
			return;
		}
	} else {
		checkedData = new CheckedData();
	}
	if (checked) {
		checkedData.checkedNames.push(checkedName);
		// checkedData.add(checkedName);
		document.getElementById("name_" + checkedName).style.backgroundColor = COLOR;
	} else {
		var index = checkedData.checkedNames.indexOf(checkedName);
		checkedData.checkedNames.splice(index, 1);
		// checkedData.remove(checkedName);
		document.getElementById("name_" + checkedName).style.backgroundColor = null;
	}

	// オブジェクト→JSON
	// ローカルストレージ格納
	localStorage.setItem("checkedData", JSON.stringify(checkedData));

}

// NGチェック
function ngCheck(checkedName) {

	result = confirm("「" + checkedName + "」をNGリストに追加します。よろしいですか？");
	if (!result) {
		return;
	}

	// スペースを「+」に置換
	// checkedName = checkedName.replace(/\s/g, "+");

	// ローカルストレージから取得
	// JSON→オブジェクト
	var ngCheckedData = localStorage.getItem("ngCheckedData");
	if (ngCheckedData) {
		try {
			ngCheckedData = JSON.parse(ngCheckedData);
		} catch (e) {
			return;
		}
	} else {
		ngCheckedData = new CheckedData();
	}

	ngCheckedData.checkedNames.push(checkedName);
	// $("#liveList").remove("#tr_" + checkedName);
	// $("#tr_" + checkedName).remove();

	// 要素の削除
	var nameElement = document.getElementById("tr_" + checkedName);
	var parent = nameElement.parentNode;
	parent.removeChild(nameElement);

	// オブジェクト→JSON
	// ローカルストレージ格納
	localStorage.setItem("ngCheckedData", JSON.stringify(ngCheckedData));

}

// チェックした配信者名を配列で格納しておくクラス
var CheckedData = function() {
	this.checkedNames = [];

	// this.add = function(checkedName) { // functionはlocalstorageに保存できない？
	// this.checkedNames.push(checkedName);
	// }
	//
	// this.remove = function(checkedName) {
	// var index = this.checkedNames.indexOf(checkedName);
	// this.checkedNames.splice(index,1);
	// }

}

// @param reg マッチング用文字列
function getElementsContains(reg) {
	var children = document.body.getElementsByTagName('*');
	var elements = [], child;
	var re = new RegExp(reg, "g");
	for ( var i = 0, length = children.length; i < length; i++) {
		child = children[i];
		if (child.id.substr(0, 6) === "title_" && child.id.search(re) !== -1) {
			elements.push(child);
		}
	}
	return elements;
}

// localStorage.removeItem('checkedName'); // 1件削除
