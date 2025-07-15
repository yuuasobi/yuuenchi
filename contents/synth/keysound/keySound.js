function Setup() {
    var wave = document.getElementById("wave").value;
    var level = parseFloat(document.getElementById("level").value);
    document.getElementById("leveldisp").innerHTML = level;
}

var audioContext = new AudioContext();
var keymap = {
  49: 48, //1:C2
  81: 49, //Q:C#2
  65: 50, //A:D2
  90: 51, //Z:D#2
  50: 52, //2:E2
  87: 53, //W:F2
  83: 54, //S:F#2
  88: 55, //X:G2
  51: 56, //3:G#2
  69: 57, //E:A2
  68: 58, //D:A#2
  67: 59, //C:B2
  52: 60, //4:C3
  82: 61, //R:C#3
  70: 62, //F:D3
  86: 63, //V:D#3
  53: 64, //5:E3
  84: 65, //T:F3
  71: 66, //G:F#3
  66: 67, //B:G3
  54: 68, //6:G#3
  89: 69, //Y:A3
  72: 70, //H:A#3
  78: 71, //N:B3
  55: 72, //7:C4
  85: 73, //U:C#4
  74: 74, //J:D4
  77: 75, //M:D#4
  56: 76, //8:E4
  73: 77, //I:F4
  75: 78, //K:F#4
  57: 79, //9:G4
  79: 80, //O:G#4
  76: 81, //L:A4
  48: 82, //0:A#4
  80: 83, //P:B4
  189: 84, //-:C5
}

document.onkeydown = function(keyDownEvent) {
  if (keyDownEvent.repeat === true) {
    return;
  }

  var osc = audioContext.createOscillator();
  var freq = 440.0 * Math.pow(2.0, (keymap[keyDownEvent.keyCode] - 69.0) / 12.0);
  var wave = document.getElementById("wave").value;
  var level = parseFloat(document.getElementById("level").value);
  var gain = new GainNode(audioContext);

  osc.frequency.value = freq;
  osc.type = wave;
  gain.gain.value = level;

  document.getElementById("keyAudioFreq").innerHTML = freq;

  osc.connect(gain).connect(audioContext.destination);
  osc.start();

  document.addEventListener('keyup', checkKeyUp);
  function checkKeyUp(keyUpEvent) {
    if (keyUpEvent.keyCode !== keyDownEvent.keyCode) {
      return;
    }

    osc.stop();
    document.removeEventListener('keyup', checkKeyUp);
  }
}
