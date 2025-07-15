var beattype = 4;
var keysharp = null;
var keyflat = null;
var pitch = ["C", "D", "E", "F", "G", "A", "B"];
var movechord = [pitch[0], pitch[1]+"m", pitch[2]+"m", pitch[3],　pitch[4], pitch[5]+"m"];
var chordset = [];
var chordflag = false;
var chordflowtype = "random";
var fifthcircle;
var keysharpcount = 0;
var keyflatcount = 0;

var keyflatchord = [
  ["F", "G", "A", "Bb", "C", "D", "E"],
  ["Bb", "C", "D", "Eb", "F", "G", "A"],
  ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
  ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
  ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"],
  ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"],
  ["Cb", "Db", "Eb", "Fb", "Gb", "Ab", "Bb"]
];

var keysharpchord = [
  ["G", "A", "B", "C", "D", "E", "F#"],
  ["D", "E", "F#", "G", "A", "B", "C#"],
  ["A", "B", "C#", "D", "E", "F#", "G#"],
  ["E", "F#", "G#", "A", "B", "C#", "D#"],
  ["B", "C#", "D#", "E", "F#", "G#", "A#"],
  ["F#", "G#", "A#", "B", "C#", "D#", "E#"],
  ["C#", "D#", "E#", "F#", "G#", "A#", "B#"]
];

$(function() {

  //小節のメモリ初期化
  for (var n = 0; n < 13; n++) {

    //要素作成
    var bar = document.createElement("div");
    bar.id = "bar" + n;
    bar.className = "bar";
    document.getElementById("beatset").appendChild(bar);

    //スタイル指定
    var barset = document.getElementById("bar" + n).style;
    var style = {
      transform: 'var(--barset, rotate(30deg))',
    }
    for(var prop in style) {
      barset[prop] = style[prop]
    }
    barset.setProperty('--barset', 'rotate(' + 30 * n + 'deg)');
  }

  //拍のメモリ初期化
  for (var n = 0; n < 49; n++) {

    //要素作成
    var fourbeat = document.createElement("div");
    fourbeat.id = "fourbeat" + n;
    fourbeat.className = "beat";
    document.getElementById("beatset").appendChild(fourbeat);

    //スタイル指定
    var beatset = document.getElementById("fourbeat" + n).style;
    var style = {
      transform: 'var(--beatset, rotate(7.5deg))',
    }
    for(var prop in style) {
      beatset[prop] = style[prop]
    }
    beatset.setProperty('--beatset', 'rotate(' + 7.5 * n + 'deg)');
  }

  //再生バー初期化
  var playbar = document.createElement("div");
  playbar.id = "playbarinitial";
  document.getElementById("playbar").appendChild(playbar);
});

//ビート変更処理
function beatchange() {

  if (beattype === 4) {
    beattype = 8;
    document.getElementById("beattype").innerHTML = '8beat';
    for (var n = 0; n < 49; n++) {
      var fourbeat = document.getElementById("fourbeat" + n);
      fourbeat.remove();
    }
    for (var n = 0; n < 97; n++) {
      var eightbeat = document.createElement("div");
      eightbeat.id = "eightbeat" + n;
      eightbeat.className = "beat";
      document.getElementById("beatset").appendChild(eightbeat);

      var beatset = document.getElementById("eightbeat" + n).style;
      var style = {
        transform: 'var(--beatset, rotate(3.75deg))',
      }
      for(var prop in style) {
        beatset[prop] = style[prop]
      }
      beatset.setProperty('--beatset', 'rotate(' + 3.75 * n + 'deg)');
    }
  } else if (beattype === 8) {
      beattype = 3;
      document.getElementById("beattype").innerHTML = '3beat';
      for (var n = 0; n < 97; n++) {
        var eightbeat = document.getElementById("eightbeat" + n);
        eightbeat.remove();
      }
      for (var n = 0; n < 37; n++) {
        var threebeat = document.createElement("div");
        threebeat.id = "threebeat" + n;
        threebeat.className = "beat";
        document.getElementById("beatset").appendChild(threebeat);

        var beatset = document.getElementById("threebeat" + n).style;
        var style = {
          transform: 'var(--beatset, rotate(10deg))',
        }
        for(var prop in style) {
          beatset[prop] = style[prop]
        }
        beatset.setProperty('--beatset', 'rotate(' + 10 * n + 'deg)');
      }
  } else if (beattype === 3) {
      beattype = 4;
      document.getElementById("beattype").innerHTML = '4beat';
      for (var n = 0; n < 37; n++) {
        var threebeat = document.getElementById("threebeat" + n);
        threebeat.remove();
      }
      for (var n = 0; n < 49; n++) {
        var fourbeat = document.createElement("div");
        fourbeat.id = "fourbeat" + n;
        fourbeat.className = "beat";
        document.getElementById("beatset").appendChild(fourbeat);

        var beatset = document.getElementById("fourbeat" + n).style;
        var style = {
          transform: 'var(--beatset, rotate(7.5deg))',
        }
        for(var prop in style) {
          beatset[prop] = style[prop]
        }
        beatset.setProperty('--beatset', 'rotate(' + 7.5 * n + 'deg)');
      }
  }
}

//コード進行生成
function chord() {
  var chordedit = document.getElementById("m0").style;
  var style = {
    color: 'black'
  }
  for(var prop in style) {
    chordedit[prop] = style[prop]
  }
  if (chordflowtype == "random") {
    chordflag = true;
    chordset = [];
    if (keyflat == null && keysharp == null) {
      pitch = ["C", "D", "E", "F", "G", "A", "B"];
      movechord = [pitch[0], pitch[1]+"m", pitch[2]+"m", pitch[3],　pitch[4], pitch[5]+"m"];
    }  else if (keyflat >= 0 && keysharp == null) {
      pitch = keyflatchord[keyflat];
      movechord = [pitch[0], pitch[1]+"m", pitch[2]+"m", pitch[3],　pitch[4], pitch[5]+"m"];
    }  else if (keyflat == null && keysharp >= 0) {
      pitch = keysharpchord[keysharp];
      movechord = [pitch[0], pitch[1]+"m", pitch[2]+"m", pitch[3],　pitch[4], pitch[5]+"m"];
    }
    for (var c = 0; c < 12; c++) {
      var chord = Math.floor(Math.random() * (movechord.length));
      document.getElementById('m' + c).value = movechord[chord];
      chordset.push(chord);
    }
  } else if (chordflowtype !== "random" && chordflowtype !== "fifths") {
    chordflag == true;
    for (var c = 0; c < 12; c++) {
      document.getElementById('m' + c).value = movechord[chordset[c]];
    }
  } else if (chordflowtype == "fifths") {
    keysharp = null;
    keyflat = null;
    chordflag = false;
    keysharpcount = 0;
    keyflatcount = 0;
    document.getElementById("keysharpcount").innerHTML = "";
    document.getElementById("keyflatcount").innerHTML = "";
    pitch = ["C", "G", "D", "A", "E", "B", "Bb/F#", "Db", "Ab", "Eb", "Bb", "F"];
    for (var c = 0; c < 12; c++) {
      document.getElementById('m' + c).value = pitch[c];
    }
  }
}

//コード進行生成タイプチェンジ
function chordflowtypeplus() {
  if (chordflowtype == "random") {
    chordflowtype = "kanon";
    document.getElementById('chordflowtype').innerHTML = "kanon";
    chordset = [0, 4, 5, 2, 3, 0, 3, 4, 0, 4, 5, 2];
  } else if (chordflowtype == "kanon") {
    chordflowtype = "1625";
    document.getElementById('chordflowtype').innerHTML = "1625";
    chordset = [0, 5, 1, 4, 0, 5, 1, 4, 0, 5, 1, 4];
  } else if (chordflowtype == "1625") {
    chordflowtype = "4536";
    document.getElementById('chordflowtype').innerHTML = "4536";
    chordset = [3, 4, 2, 5, 3, 4, 2, 5, 3, 4, 2, 5];
  } else if (chordflowtype == "4536") {
    chordflowtype = "fifths";
    document.getElementById('chordflowtype').innerHTML = "fifths";
  } else if (chordflowtype == "fifths") {
    chordflowtype = "random";
    document.getElementById('chordflowtype').innerHTML = "random";
  }
}

function chordflowtypeminus() {
  if (chordflowtype == "random") {
    chordflowtype = "fifths";
    document.getElementById('chordflowtype').innerHTML = "fifths";
  }  else if (chordflowtype == "fifths") {
    chordflowtype = "4536";
    document.getElementById('chordflowtype').innerHTML = "4536";
    chordset = [3, 4, 2, 5, 3, 4, 2, 5, 3, 4, 2, 5];
  } else if (chordflowtype == "4536") {
    chordflowtype = "1625";
    document.getElementById('chordflowtype').innerHTML = "1625";
    chordset = [0, 5, 1, 4, 0, 5, 1, 4, 0, 5, 1, 4];
  } else if (chordflowtype == "1625") {
    chordflowtype = "kanon";
    document.getElementById('chordflowtype').innerHTML = "kanon";
    chordset = [0, 4, 5, 2, 3, 0, 3, 4, 0, 4, 5, 2];
  } else if (chordflowtype == "kanon") {
    chordflowtype = "random";
    document.getElementById('chordflowtype').innerHTML = "random";
  }
}

//キーチェンジプラス
function keyplus() {
  if (chordflag == false) {
    for (var n = 0; n < 12; n++) {
      fifthcircle = document.getElementById('m' + n);
      fifthcircle.id = 'm' + (n - 1);
    }
    fifthcircle = document.getElementById('m-1');
    fifthcircle.id = 'm11';
    if (keyflat == null && keysharp == null) {
      keysharp = 0;
      keysharpcount++;
      document.getElementById("keysharpcount").innerHTML = keysharpcount;
    } else if (keyflat == null && keysharp >= 0) {
      if (keysharp < 5) {
        keysharp++;
        keysharpcount++;
        document.getElementById("keysharpcount").innerHTML = keysharpcount;
      } else if (keysharp == 5) {
        keysharpcount = 0;
        keyflatcount = 5;
        keysharp = null;
        keyflat = 4;
        document.getElementById("keysharpcount").innerHTML = "";
        document.getElementById("keyflatcount").innerHTML = keyflatcount;
      }
    } else if (keyflat > 0 && keysharp == null) {
      keyflat--;
      keyflatcount--;
      document.getElementById("keyflatcount").innerHTML = keyflatcount;
    } else if (keyflat == 0 && keysharp == null) {
      keyflat = null;
      keyflatcount = 0;
      document.getElementById("keyflatcount").innerHTML = "";
    }
  } else if (chordflag == true) {
    if (keyflat > 0 && keysharp == null) {
      keyflat--;
      keyflatcount--;
      document.getElementById("keyflatcount").innerHTML = keyflatcount;
      pitch = keyflatchord[keyflat];
      movechord = [pitch[0], pitch[1]+"m", pitch[2]+"m", pitch[3],　pitch[4], pitch[5]+"m"];
      for (var c = 0; c < 12; c++) {
        document.getElementById('m' + c).value = movechord[chordset[c]];
      }
    } else if (keyflat == 0 && keysharp == null) {
      keyflat = null;
      keyflatcount = 0;
      document.getElementById("keyflatcount").innerHTML = "";
      pitch = ["C", "D", "E", "F", "G", "A", "B"];
      movechord = [pitch[0], pitch[1]+"m", pitch[2]+"m", pitch[3],　pitch[4], pitch[5]+"m"];
      for (var c = 0; c < 12; c++) {
        document.getElementById('m' + c).value = movechord[chordset[c]];
      }
    } else if (keyflat == null && keysharp == null) {
      keysharp = 0;
      keysharpcount++;
      document.getElementById("keysharpcount").innerHTML = keysharpcount;
      pitch = keysharpchord[keysharp];
      movechord = [pitch[0], pitch[1]+"m", pitch[2]+"m", pitch[3],　pitch[4], pitch[5]+"m"];
      for (var c = 0; c < 12; c++) {
        document.getElementById('m' + c).value = movechord[chordset[c]];
      }
    } else if (keyflat == null && keysharp >= 0) {
      if (keysharp < 6) {
        keysharp++;
        keysharpcount++;
        document.getElementById("keysharpcount").innerHTML = keysharpcount;
        pitch = keysharpchord[keysharp];
        movechord = [pitch[0], pitch[1]+"m", pitch[2]+"m", pitch[3],　pitch[4], pitch[5]+"m"];
        for (var c = 0; c < 12; c++) {
          document.getElementById('m' + c).value = movechord[chordset[c]];
        }
      }
    }
  }
}

//キーチェンジマイナス
function keyminus() {
  if (chordflag == false) {
    for (var n = 11; n >= 0; n--) {
      fifthcircle = document.getElementById('m' + n);
      fifthcircle.id = 'm' + (n + 1);
    }
    fifthcircle = document.getElementById('m12');
    fifthcircle.id = 'm0';
    if (keyflat == null && keysharp == null) {
      keyflat = 0;
      keyflatcount++;
      document.getElementById("keyflatcount").innerHTML = keyflatcount;
    } else if (keyflat >= 0 && keysharp == null) {
      if (keyflat < 5) {
        keyflat++;
        keyflatcount++;
        document.getElementById("keyflatcount").innerHTML = keyflatcount;
      } else if (keyflat == 5) {
        keyflatcount = 0;
        keysharpcount = 5;
        keysharp = 4;
        keyflat = null;
        document.getElementById("keysharpcount").innerHTML = keysharpcount;
        document.getElementById("keyflatcount").innerHTML = "";
      }
    } else if (keyflat == null && keysharp > 0) {
      keysharp--;
      keysharpcount--;
      document.getElementById("keysharpcount").innerHTML = keysharpcount;
    } else if (keyflat == null && keysharp == 0) {
      keysharp = null;
      keysharpcount = 0;
      document.getElementById("keysharpcount").innerHTML = "";
    }
  } else if (chordflag == true) {
    if (keyflat == null && keysharp > 0) {
      keysharp--;
      keysharpcount--;
      document.getElementById("keysharpcount").innerHTML = keysharpcount;
      pitch = keysharpchord[keysharp];
      movechord = [pitch[0], pitch[1]+"m", pitch[2]+"m", pitch[3],　pitch[4], pitch[5]+"m"];
      for (var c = 0; c < 12; c++) {
        document.getElementById('m' + c).value = movechord[chordset[c]];
      }
    } else if (keyflat == null && keysharp == 0) {
      keysharp = null;
      keysharpcount = 0;
      document.getElementById("keysharpcount").innerHTML = "";
      pitch = ["C", "D", "E", "F", "G", "A", "B"];
      movechord = [pitch[0], pitch[1]+"m", pitch[2]+"m", pitch[3],　pitch[4], pitch[5]+"m"];
      for (var c = 0; c < 12; c++) {
        document.getElementById('m' + c).value = movechord[chordset[c]];
      }
    } else if (keyflat == null && keysharp == null) {
        keyflat = 0;
        keyflatcount++;
        document.getElementById("keyflatcount").innerHTML = keyflatcount;
        pitch = keyflatchord[keyflat];
        movechord = [pitch[0], pitch[1]+"m", pitch[2]+"m", pitch[3],　pitch[4], pitch[5]+"m"];
        for (var c = 0; c < 12; c++) {
          document.getElementById('m' + c).value = movechord[chordset[c]];
        }
    } else if (keyflat >= 0 && keysharp == null) {
      if (keyflat < 6) {
        keyflat++;
        keyflatcount++;
        document.getElementById("keyflatcount").innerHTML = keyflatcount;
        pitch = keyflatchord[keyflat];
        movechord = [pitch[0], pitch[1]+"m", pitch[2]+"m", pitch[3],　pitch[4], pitch[5]+"m"];
        for (var c = 0; c < 12; c++) {
          document.getElementById('m' + c).value = movechord[chordset[c]];
        }
      }
    }
  }
}
