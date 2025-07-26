// Web Audio APIの初期化
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

// 各パッドに割り当てる周波数（Hz）
const padFrequencies = [
  523.25, // ド（C5）
  587.33, // レ（D5）
  659.25, // ミ（E5）
  783.99, // ソ（G5）
  392.00  // 掌球：低めのソ（G4）
];

// 音を鳴らす関数
function playPadSound(index) {
  // --- 肉球ボタンの色変化 ---
  let targetEl = null;
  if (index >= 0 && index <= 3) {
    // 指球
    const digitals = document.querySelectorAll('.digital');
    targetEl = digitals[index];
  } else if (index === 4) {
    // 掌球
    targetEl = document.querySelector('.metacarpal');
  }
  if (targetEl) {
    targetEl.classList.add('active');
    setTimeout(() => targetEl.classList.remove('active'), 200);
  }
  const ctx = getAudioCtx();
  const wave = document.getElementById('wave')?.value || 'sine';
  const freq = padFrequencies[index];
  const level = parseFloat(document.getElementById('level')?.value || '0.5');
  const freqDisp = document.getElementById('keyAudioFreq');
  if (freqDisp) freqDisp.textContent = freq.toFixed(2);

  if (wave === 'animalstep') {
    // --- AnimalStep: ノイズ＋サイン波の合成 ---
    // ノイズバッファ生成
    const bufferSize = 0.08 * ctx.sampleRate; // 80ms
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.7; // ノイズ
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // サイン波
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;

    // ゲイン
    const gain = ctx.createGain();
    gain.gain.value = 0;
    const now = ctx.currentTime;
    // アタック・リリース（短め）
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(level, now + 0.01);
    gain.gain.linearRampToValueAtTime(0, now + 0.08);

    // ノイズ用ゲイン（さらに短い）
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0;
    noiseGain.gain.setValueAtTime(0, now);
    noiseGain.gain.linearRampToValueAtTime(level * 0.7, now + 0.005);
    noiseGain.gain.linearRampToValueAtTime(0, now + 0.04);

    // フィルター
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1000;

    // 合成
    osc.connect(gain).connect(filter).connect(ctx.destination);
    noise.connect(noiseGain).connect(filter);
    filter.connect(ctx.destination);

    osc.start();
    osc.stop(now + 0.09);
    noise.start();
    noise.stop(now + 0.045);
    return;
  }

  if (wave === 'pawtap') {
    // --- PawTap: 軽やかな肉球タップ音（トライアングル波＋短いノイズ） ---
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = freq * 1.5; // 少し高め

    // ノイズバッファ（短め）
    const bufferSize = 0.03 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const gain = ctx.createGain();
    const noiseGain = ctx.createGain();
    const now = ctx.currentTime;

    // 軽やかなアタック
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(level, now + 0.005);
    gain.gain.linearRampToValueAtTime(0, now + 0.06);

    noiseGain.gain.setValueAtTime(0, now);
    noiseGain.gain.linearRampToValueAtTime(level * 0.4, now + 0.002);
    noiseGain.gain.linearRampToValueAtTime(0, now + 0.02);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800;

    osc.connect(gain).connect(filter).connect(ctx.destination);
    noise.connect(noiseGain).connect(filter);

    osc.start();
    osc.stop(now + 0.07);
    noise.start();
    noise.stop(now + 0.025);
    return;
  }

  if (wave === 'softstep') {
    // --- SoftStep: 柔らかい足裏の着地音（サイン波＋低周波ノイズ） ---
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq * 0.7; // 低め

    // 低周波ノイズ
    const bufferSize = 0.12 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const gain = ctx.createGain();
    const noiseGain = ctx.createGain();
    const now = ctx.currentTime;

    // 柔らかいアタック
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(level, now + 0.02);
    gain.gain.linearRampToValueAtTime(level * 0.8, now + 0.08);
    gain.gain.linearRampToValueAtTime(0, now + 0.15);

    noiseGain.gain.setValueAtTime(0, now);
    noiseGain.gain.linearRampToValueAtTime(level * 0.6, now + 0.01);
    noiseGain.gain.linearRampToValueAtTime(0, now + 0.08);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 600;

    osc.connect(gain).connect(filter).connect(ctx.destination);
    noise.connect(noiseGain).connect(filter);

    osc.start();
    osc.stop(now + 0.16);
    noise.start();
    noise.stop(now + 0.09);
    return;
  }

  if (wave === 'clawclick') {
    // --- ClawClick: 爪の軽いクリック音（短いノイズ＋高周波成分） ---
    // 短いノイズバッファ
    const bufferSize = 0.02 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.8;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // 高周波のサイン波
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq * 2.5; // 高め

    const gain = ctx.createGain();
    const noiseGain = ctx.createGain();
    const now = ctx.currentTime;

    // 短いアタック
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(level * 0.6, now + 0.001);
    gain.gain.linearRampToValueAtTime(0, now + 0.03);

    noiseGain.gain.setValueAtTime(0, now);
    noiseGain.gain.linearRampToValueAtTime(level * 0.8, now + 0.0005);
    noiseGain.gain.linearRampToValueAtTime(0, now + 0.015);

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass'; // 高音重視
    filter.frequency.value = 2000;

    osc.connect(gain).connect(filter).connect(ctx.destination);
    noise.connect(noiseGain).connect(filter);

    osc.start();
    osc.stop(now + 0.035);
    noise.start();
    noise.stop(now + 0.018);
    return;
  }

  if (wave === 'rubber') {
    // --- Rubber: ゴムのような弾力感のある音 ---
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = freq * 0.8;
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(level, now + 0.01);
    gain.gain.linearRampToValueAtTime(level * 0.7, now + 0.08);
    gain.gain.linearRampToValueAtTime(0, now + 0.22);
    // ピッチを揺らす
    osc.frequency.setValueAtTime(freq * 0.8, now);
    osc.frequency.linearRampToValueAtTime(freq * 1.1, now + 0.22);
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 900;
    osc.connect(gain).connect(filter).connect(ctx.destination);
    osc.start();
    osc.stop(now + 0.23);
    return;
  }

  if (wave === 'bubble') {
    // --- Bubble: 泡のはじける音 ---
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq * 0.5;
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(level, now + 0.005);
    gain.gain.linearRampToValueAtTime(0, now + 0.09);
    // ピッチを急激に下げる
    osc.frequency.setValueAtTime(freq * 1.2, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.3, now + 0.09);
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 700;
    osc.connect(gain).connect(filter).connect(ctx.destination);
    osc.start();
    osc.stop(now + 0.1);
    return;
  }

  if (wave === 'woodtap') {
    // --- WoodTap: 木を叩いたような音 ---
    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.value = freq * 1.1;
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(level, now + 0.002);
    gain.gain.linearRampToValueAtTime(0, now + 0.04);
    // 軽いノイズを加える
    const bufferSize = 0.01 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.2;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = level * 0.3;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1200;
    osc.connect(gain).connect(filter).connect(ctx.destination);
    noise.connect(noiseGain).connect(filter);
    osc.start();
    osc.stop(now + 0.045);
    noise.start();
    noise.stop(now + 0.012);
    return;
  }

  if (wave === 'bell') {
    // --- Bell: 柔らかいベルのような音 ---
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq * 2;
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(level, now + 0.01);
    gain.gain.linearRampToValueAtTime(level * 0.5, now + 0.12);
    gain.gain.linearRampToValueAtTime(0, now + 0.35);
    // 倍音を加える
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = freq * 3.01;
    const gain2 = ctx.createGain();
    gain2.gain.setValueAtTime(0, now);
    gain2.gain.linearRampToValueAtTime(level * 0.5, now + 0.01);
    gain2.gain.linearRampToValueAtTime(0, now + 0.18);
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1800;
    osc.connect(gain).connect(filter).connect(ctx.destination);
    osc2.connect(gain2).connect(filter);
    osc.start();
    osc2.start();
    osc.stop(now + 0.36);
    osc2.stop(now + 0.19);
    return;
  }

  // --- 通常の音色 ---
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 1200;
  // 修正: すべての基本波形を正しく反映
  if (['sine', 'square', 'sawtooth', 'triangle'].includes(wave)) {
    osc.type = wave;
  } else {
    osc.type = 'triangle';
  }
  osc.frequency.value = freq;
  const now = ctx.currentTime;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(level, now + 0.03);
  gain.gain.linearRampToValueAtTime(level * 0.7, now + 0.15);
  gain.gain.linearRampToValueAtTime(0, now + 0.35);
  osc.connect(filter).connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(now + 0.37);
}

// イベント登録
function setupPadEvents() {
  // 指球
  const digitals = document.querySelectorAll('.digital');
  digitals.forEach((el, i) => {
    el.style.cursor = 'pointer';
    el.onclick = () => playPadSound(i);
  });
  // 掌球
  const metacarpal = document.querySelector('.metacarpal');
  if (metacarpal) {
    metacarpal.style.cursor = 'pointer';
    metacarpal.onclick = () => playPadSound(4);
  }
}

// 音量スライダー表示更新
function Setup() {
  const level = document.getElementById('level')?.value;
  const disp = document.getElementById('leveldisp');
  if (disp && level !== undefined) disp.textContent = level;
}

// 初期化
window.addEventListener('DOMContentLoaded', () => {
  setupPadEvents();
  Setup();

  // テンキー対応
  window.addEventListener('keydown', (e) => {
    // Numpad4, Numpad5, Numpad6, Numpad3, Numpad0
    if (e.code === 'Numpad4') playPadSound(0); // 左端
    if (e.code === 'Numpad5') playPadSound(1);
    if (e.code === 'Numpad6') playPadSound(2);
    if (e.code === 'Numpad3') playPadSound(3); // 右端
    if (e.code === 'Numpad0') playPadSound(4); // 掌球
  });

  // Auto Play 機能の初期化
  setupAutoPlay();
});

// Auto Play 機能
let autoPlayInterval = null;
let isAutoPlaying = false;

function setupAutoPlay() {
  // インターバルスライダーのイベントリスナー
  const intervalSlider = document.getElementById('auto-interval');
  const intervalDisplay = document.getElementById('interval-display');
  
  if (intervalSlider && intervalDisplay) {
    intervalSlider.addEventListener('input', function() {
      intervalDisplay.textContent = this.value + 's';
      
      // Auto Play中の場合、新しい間隔で再設定
      if (isAutoPlaying) {
        toggleAutoPlay(); // 一度停止
        setTimeout(() => {
          toggleAutoPlay(); // 新しい間隔で再開
        }, 100);
      }
    });
  }
}

function toggleAutoPlay() {
  const button = document.getElementById('auto-play-button');
  const icon = button.querySelector('.auto-play-icon');
  const text = button.querySelector('.auto-play-text');
  const intervalSlider = document.getElementById('auto-interval');
  
  if (isAutoPlaying) {
    // Auto Playを停止
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
    isAutoPlaying = false;
    
    // ボタンの見た目を更新
    button.classList.remove('active');
    icon.textContent = '▶';
    text.textContent = 'Auto Play';
  } else {
    // Auto Playを開始
    isAutoPlaying = true;
    
    // ボタンの見た目を更新
    button.classList.add('active');
    icon.textContent = '⏸';
    text.textContent = 'Stop';
    
    // 設定された間隔でランダムな肉球音を再生
    const interval = parseFloat(intervalSlider.value) * 1000; // 秒をミリ秒に変換
    
    autoPlayInterval = setInterval(() => {
      // ランダムな肉球を選択（0-4: 指球4つ + 掌球1つ）
      const randomPad = Math.floor(Math.random() * 5);
      playPadSound(randomPad);
    }, interval);
  }
}

// ランダムな間隔で音を鳴らす関数（より自然な感じ）
function playRandomPadWithVariation() {
  const randomPad = Math.floor(Math.random() * 5);
  playPadSound(randomPad);
  
  // 次の再生までの間隔をランダムに設定（0.5秒〜2.0秒）
  const minInterval = 500;
  const maxInterval = 2000;
  const randomInterval = Math.random() * (maxInterval - minInterval) + minInterval;
  
  setTimeout(() => {
    if (isAutoPlaying) {
      playRandomPadWithVariation();
    }
  }, randomInterval);
}
