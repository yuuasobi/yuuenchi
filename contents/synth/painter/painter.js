function Setup() {
    var level = parseFloat(document.getElementById("level").value);
    document.getElementById("leveldisp").innerHTML = level;
    var osc2freq = parseFloat(document.getElementById("osc2freq").value);
    document.getElementById("osc2freqdisp").innerHTML = osc2freq;
}

$(function() {
  var canvas = document.getElementById('mycanvas');
  if (!canvas || !canvas.getContext) return false;
  var ctx = canvas.getContext('2d');

  var startX, startY, x, y;
      borderWidth = 10;
      isDrawing = false;

  var audioContext = new(window.AudioContext || window.webkitAudioContext)();
  var osc = audioContext.createOscillator();
  var osc2 = audioContext.createOscillator();
  var play = false;
  var galleryCount = 0;
  ctx.lineWidth = 3;

  $('#mycanvas').mousedown(function(e) {
    isDrawing = true;
    startX = e.pageX - $(this).offset().left - borderWidth;
    startY = e.pageY - $(this).offset().top - borderWidth;
    ctx.beginPath();
  })
  .mousemove(function(e){
    if (!isDrawing) return;
    x = e.pageX - $(this).offset().left - borderWidth;
    y = e.pageY - $(this).offset().top - borderWidth;
    ctx.moveTo(startX, startY);
    ctx.lineTo(x, y);
    ctx.stroke();
    startX = x;
    startY = y;
    document.getElementById("CoordinateX").innerHTML = x;
    document.getElementById("CoordinateY").innerHTML = y;

    // var freq = 440.0 * Math.pow(2.0, (48 - 69.0) / 12.0);
    var osc2freq = parseFloat(document.getElementById("osc2freq").value);
    var freq = x + y;
    var freq2 = freq * osc2freq;
    var wave = document.getElementById("wave").value;
    var wave2 = document.getElementById("wave2").value;
    var level = parseFloat(document.getElementById("level").value);

    var gain = new GainNode(audioContext);

    osc.frequency.value = freq;
    osc2.frequency.value = freq2;
    osc.type = wave;
    osc2.type = wave2;
    gain.gain.value = level;

    if (play === false) {
        osc.connect(gain).connect(audioContext.destination);
        osc2.connect(gain).connect(audioContext.destination);
        osc.start();
        osc2.start();
        play = true;
      }
  })
  .mouseup(function() {
    isDrawing = false;
    if (play === true) {
      osc.stop();
      osc2.stop();
      play = false;
      osc = audioContext.createOscillator();
      osc2 = audioContext.createOscillator();
    }
  })
  .mouseleave(function() {
    isDrawing = false;
    if (play === true) {
      osc.stop();
      osc2.stop();
      play = false;
      osc = audioContext.createOscillator();
      osc2 = audioContext.createOscillator();
    }
  });

  $('#penColor').change(function() {
    ctx.strokeStyle = $(this).val();
  });

  $('#penWidth').change(function() {
    ctx.lineWidth = $(this).val();
  });

  $('#erase').click(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  $('#save').click(function() {
    if ( galleryCount <= 5 ) {
      var img = $('<img>').attr({
        width: 100,
        height: 50,
        padding: 10,
        src: canvas.toDataURL()
      });
      galleryCount++;
    } else {
      return
    }

    var link = $('<a>').attr({
      href: canvas.toDataURL().replace('image/png', 'application/pctet-stream'),
      download: new Date().getTime() + '.png'
    })
    $('#gallery').append(link.append(img.addClass('thumnail')));
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

});
