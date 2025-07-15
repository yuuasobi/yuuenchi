var status = 0; // 0:停止中 1:動作中
var time = 0;
var playpaused = 0; // 0:完全停止　1:一時停止中
var playstatus = document.getElementById("playstatus");
var timerLabel = document.getElementById('timerLabel');
var startTime, timeout;
var lapTime = 0;
document.inputdisabled.bpm.disabled = "";

//Enter無効
document.onkeypress = enter;
function enter(){
  if( window.event.keyCode == 13 ){
    return false;
  }
}

// 再生/一時停止ボタン
function playbutton(){
  if (status == 0) {
    status = 1;
    document.inputdisabled.bpm.disabled = "true";
    playstatus.innerHTML = "■";
    timer();
    var playbarstart = document.createElement("span");
    playbarstart.id = "playbarstart";
    document.getElementById("playbar").appendChild(playbarstart);
    var playbar = document.getElementById("playbarstart").style;
    var bpm = document.getElementById("bpm").value / 120;
    var style = {
      position: 'absolute',
      bottom: '50%',
      left: '50%',
      backgroundColor: 'orange',
      transformOrigin: '50% 100%',
      width: '2px',
      height: '110px',
      animationPlayState: 'running',
      zIndex: '1',
      animation: 'var(--bpm, rotation-s 24s linear infinite)'
    }
    for(var prop in style) {
      playbar[prop] = style[prop]
    }
    if (playpaused == 0) {
      document.getElementById("playbarinitial").remove();
      playbar.getPropertyValue("--bpm");
      playbar.setProperty('--bpm', 'rotation-s ' + '24' / bpm + 's' + ' linear infinite');
    }
  } else if (status == 1) {
    status = 0;
    clearTimeout(timeout);
    lapTime += Date.now() - startTime;
    playpaused = 1;
    playstatus.innerHTML = "▶";
    var playbar = document.getElementById("playbarstart").style;
    var style = {
      animationPlayState: 'paused'
    }
    for(var prop in style) {
      playbar[prop] = style[prop]
    }
  }
}

// RESETボタン
function reset(){
  if (status == 1 || playpaused == 1) {
    document.getElementById("playbarstart").remove();
    var playbarreset = document.createElement("div");
    playbarreset.id = "playbarinitial";
    document.getElementById("playbar").appendChild(playbarreset);
    status = 0;
    playpaused = 0;
    time = 0;
    lapTime = 0;
    playstatus.innerHTML = "▶";
    document.inputdisabled.bpm.disabled = "";
  }
  timerLabel.innerHTML = '00:00.000';
  clearTimeout(timeout);
}

// 時間処理
function timer() {
  startTime = Date.now();
  countUp();
}

function countUp() {
  var d = new Date(Date.now() - startTime + lapTime);
  var m = String(d.getMinutes()).padStart(2, '0');
  var s = String(d.getSeconds()).padStart(2, '0');
  var ms = String(d.getMilliseconds()).padStart(3, '0');

  timerLabel.innerHTML = `${m}:${s}.${ms}`;
  timeout = setTimeout(function(){
    countUp();
  }, 10);
}
