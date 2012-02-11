//var A = 5;
//
//function plusc(A) {
//	return function pluscc(B) {
//		return A+B
//	};
//}
//
//function test(){
////	var plus1 = plusc(1);
////	console.log(plus1(2));
//
//var begin = new Date() - 0;
//var element = document.getElementById('animation');
//var id = setInterval(function(){
//  var current = new Date() - begin;
//  if (current > 1000){
//    clearInterval(id);
//    current = 1000; // 1000以上になっているので，調整する
//  }
//  element.style.top = current / 10 + 250 + 'px';
//}, 10); // 10ms置きに実行
//
//}

/*
function easing(time, from, distance, duration){
  return distance * time / duration + from;
}
function test(){
	var begin = new Date() - 0;
	var element = document.getElementById('animation');
	var from = 250; // 初期値
	var distance = 100; // 変動値
	var duration = 500; // 継続時間
	var id = setInterval(function(){
		var time = new Date() - begin; // 経過時間
		var current = easing(time, from, distance, duration);
		if (time > duration) {
			clearInterval(id);
			current = from + distance;
		}
		element.style.top = current + 'px';
		element.style.left = current + 'px';
	}, 10); // 10ms置きに実行
	animation();
}
*/

window.onload = function () {
	animation();
}


function animation() {
	$("#inman").animate({
			top : 200,
			left : 200
        },
        1000);

	$("#inman").animate({
		top : -100,
		left : 3000
    },
    1000);
}
