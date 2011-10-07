var audio1;

// 音声再生テスト
function play() {
	audio1 = document.getElementById('audio1');
	audio1.volume = 0.5;
	audio1.addEventListener('ended', function(){audio1.play()}, false);
	audio1.play();
}

function pause() {
	if (audio1 == null) {
		return false;
	}
	audio1.pause();
}
