function Setup() {
    var wave = document.getElementById("wave").value;
    var level = parseFloat(document.getElementById("level").value);
    document.getElementById("leveldisp").innerHTML = level;
}

var audioContext = new AudioContext();

// 英語版キーマップ
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

// 日本語版キーマップ（JIS配列）
var japaneseKeymap = {
  // 数字キー
  'Digit1': 48, 'Digit2': 52, 'Digit3': 56, 'Digit4': 60, 'Digit5': 64,
  'Digit6': 68, 'Digit7': 72, 'Digit8': 76, 'Digit9': 79, 'Digit0': 82,
  
  // アルファベットキー
  'KeyQ': 49, 'KeyW': 53, 'KeyE': 57, 'KeyR': 61, 'KeyT': 65, 'KeyY': 69,
  'KeyU': 73, 'KeyI': 77, 'KeyO': 80, 'KeyP': 83,
  'KeyA': 50, 'KeyS': 54, 'KeyD': 58, 'KeyF': 62, 'KeyG': 66, 'KeyH': 70,
  'KeyJ': 74, 'KeyK': 78, 'KeyL': 81,
  'KeyZ': 51, 'KeyX': 55, 'KeyC': 59, 'KeyV': 63, 'KeyB': 67, 'KeyN': 71,
  'KeyM': 75,
  
  // 記号キー
  'Minus': 84,
  
  // 日本語入力で使用される追加キー
  'BracketLeft': 49,  // [
  'BracketRight': 80, // ]
  'Semicolon': 81,    // ;
  'Quote': 83,        // '
  'Comma': 75,        // ,
  'Period': 79,       // .
  'Slash': 71,        // /
  'Backslash': 55,    // \
  'Equal': 84,        // =
  'Backquote': 48,    // `
}

// 日本語入力対応のためのキー処理関数
function handleKeyEvent(event) {
  // テキストエリア内でのみ動作
  if (event.target.tagName !== 'TEXTAREA') {
    return;
  }

  // 既に処理済みの場合はスキップ
  if (event.processed) {
    return;
  }

  // キーコードを取得（複数の方法で試行）
  var keyCode = null;
  var noteNumber = null;

  // 1. まず英語版キーマップで確認
  if (keymap.hasOwnProperty(event.keyCode)) {
    keyCode = event.keyCode;
    noteNumber = keymap[keyCode];
  }
  // 2. 日本語版キーマップで確認
  else if (japaneseKeymap.hasOwnProperty(event.code)) {
    keyCode = event.code;
    noteNumber = japaneseKeymap[keyCode];
  }
  // 3. keyCodeを直接使用
  else if (keymap.hasOwnProperty(event.keyCode)) {
    keyCode = event.keyCode;
    noteNumber = keymap[keyCode];
  }

  // キーコードが存在しない場合はスキップ
  if (noteNumber === null) {
    return;
  }

  // リピートキーの場合はスキップ
  if (event.repeat === true) {
    return;
  }

  // 処理済みフラグを設定
  event.processed = true;

  var osc = audioContext.createOscillator();
  var freq = 440.0 * Math.pow(2.0, (noteNumber - 69.0) / 12.0);
  var wave = document.getElementById("wave").value;
  var level = parseFloat(document.getElementById("level").value);
  var gain = new GainNode(audioContext);

  osc.frequency.value = freq;
  osc.type = wave;
  gain.gain.value = level;

  document.getElementById("keyAudioFreq").innerHTML = freq;

  osc.connect(gain).connect(audioContext.destination);
  osc.start();

  // キーアップ時の処理
  function checkKeyUp(keyUpEvent) {
    // 同じキーかどうかを複数の方法で確認
    var isSameKey = false;
    
    if (keyUpEvent.keyCode === event.keyCode) {
      isSameKey = true;
    } else if (keyUpEvent.code === event.code) {
      isSameKey = true;
    } else if (keyUpEvent.key === event.key) {
      isSameKey = true;
    }

    if (!isSameKey) {
      return;
    }

    osc.stop();
    document.removeEventListener('keyup', checkKeyUp);
  }

  document.addEventListener('keyup', checkKeyUp);
}

// 複数のイベントリスナーを設定して日本語入力に対応
document.addEventListener('keydown', handleKeyEvent);
document.addEventListener('keypress', handleKeyEvent);

// テキストエリアにフォーカスした時にAudioContextを開始
document.addEventListener('DOMContentLoaded', function() {
  var textarea = document.querySelector('.textarea');
  
  textarea.addEventListener('focus', function() {
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
  });

  // ページ読み込み時にAudioContextを開始
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
});
