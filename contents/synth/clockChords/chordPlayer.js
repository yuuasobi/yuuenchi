// Web Audio API の初期化
let audioContext;
let isPlaying = false;
let currentChordIndex = 0;
let chordProgression = [];
let padOscillators = []; // パッド音のオシレーターを管理
let hihatGain = null; // ハイハット用のゲインノード
let melodyOscillators = []; // メロディ音のオシレーターを管理

// 音量設定（ミキサー用）
let volumeSettings = {
    tick: 0.8,
    chord: 0.6,
    pad: 0.4,
    melody: 0.5
};

// 音色設定（ミキサー用）
let toneSettings = {
    tick: 'clock',
    chord: 'clockwork',
    pad: 'ambient',
    melody: 'needle'
};

// ミキサーの初期化
function initializeMixer() {
    const volumeSliders = ['tick-volume', 'chord-volume', 'pad-volume', 'melody-volume'];
    const toneSelectors = ['tick-tone', 'chord-tone', 'pad-tone', 'melody-tone'];
    
    // 音量スライダーの初期化
    volumeSliders.forEach(sliderId => {
        const slider = document.getElementById(sliderId);
        const valueDisplay = document.getElementById(sliderId + '-value');
        
        if (slider && valueDisplay) {
            // 初期値を設定
            const settingKey = sliderId.replace('-volume', '');
            slider.value = volumeSettings[settingKey];
            valueDisplay.textContent = volumeSettings[settingKey];
            
            // イベントリスナーを追加
            slider.addEventListener('input', function() {
                const value = parseFloat(this.value);
                const settingKey = this.id.replace('-volume', '');
                volumeSettings[settingKey] = value;
                valueDisplay.textContent = value.toFixed(1);
                
                // パッド音の音量をリアルタイムで更新
                if (settingKey === 'pad' && isPlaying) {
                    updatePadVolume();
                }
            });
        }
    });
    
    // 音色セレクターの初期化
    toneSelectors.forEach(selectorId => {
        const selector = document.getElementById(selectorId);
        
        if (selector) {
            // 初期値を設定
            const settingKey = selectorId.replace('-tone', '');
            selector.value = toneSettings[settingKey];
            
            // イベントリスナーを追加
            selector.addEventListener('change', function() {
                const value = this.value;
                const settingKey = this.id.replace('-tone', '');
                toneSettings[settingKey] = value;
                console.log(`Tone changed for ${settingKey}: ${value}`);
            });
        }
    });
}

// 音量設定を取得
function getVolume(type) {
    // リアルタイムでスライダーから値を取得
    const slider = document.getElementById(`${type}-volume`);
    if (slider) {
        return parseFloat(slider.value);
    }
    return volumeSettings[type] || 1.0;
}

// 音色設定を取得
function getTone(type) {
    // リアルタイムでセレクターから値を取得
    const selector = document.getElementById(`${type}-tone`);
    if (selector) {
        return selector.value;
    }
    return toneSettings[type] || 'default';
}

// 音階の周波数マッピング
const noteFrequencies = {
    'C': 261.63, 'C#': 277.18, 'Db': 277.18,
    'D': 293.66, 'D#': 311.13, 'Eb': 311.13,
    'E': 329.63,
    'F': 349.23, 'F#': 369.99, 'Gb': 369.99,
    'G': 392.00, 'G#': 415.30, 'Ab': 415.30,
    'A': 440.00, 'A#': 466.16, 'Bb': 466.16,
    'B': 493.88
};

// コードの構成音マッピング
const chordIntervals = {
    'maj': [0, 4, 7],      // メジャーコード: ルート, 長3度, 完全5度
    'min': [0, 3, 7],      // マイナーコード: ルート, 短3度, 完全5度
    'dim': [0, 3, 6],      // ディミニッシュコード: ルート, 短3度, 減5度
    'aug': [0, 4, 8],      // オーグメントコード: ルート, 長3度, 増5度
    '7': [0, 4, 7, 10],    // セブンスコード: ルート, 長3度, 完全5度, 短7度
    'm7': [0, 3, 7, 10],   // マイナーセブンスコード: ルート, 短3度, 完全5度, 短7度
    'm7b5': [0, 3, 6, 10], // マイナーセブンスフラットファイブ: ルート, 短3度, 減5度, 短7度
    'maj7': [0, 4, 7, 11], // メジャーセブンスコード: ルート, 長3度, 完全5度, 長7度
    'sus2': [0, 2, 7],     // サスツー: ルート, 長2度, 完全5度
    'sus4': [0, 5, 7]      // サスフォー: ルート, 完全4度, 完全5度
};

// 音階の順序（シャープ・フラット対応）
const noteOrder = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const noteAliases = {
    'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#',
    'Cb': 'B', 'Fb': 'E'
};

// メロディパターンの定義
const melodyPatterns = [
    [0, 2, 4, 7],      // ルート→2度→4度→7度
    [0, 4, 7, 12],     // ルート→3度→5度→オクターブ
    [0, 2, 5, 7],      // ルート→2度→5度→7度
    [0, 3, 7, 10],     // ルート→3度→5度→7度（マイナー）
    [0, 4, 7, 11],     // ルート→3度→5度→7度（メジャー7th）
    [0, 2, 4, 6],      // ルート→2度→4度→6度
    [0, 3, 5, 7],      // ルート→3度→5度→7度
    [0, 4, 8, 12]      // ルート→3度→5度→オクターブ（オーグメント）
];

// 初期化処理
document.addEventListener('DOMContentLoaded', function() {
    initializeMixer();
});

// コード進行を再生する関数
function playChordProgression() {
    if (isPlaying) {
        stopChordProgression();
        return;
    }

    // コード進行を取得（clockChords用：m0からm11）
    chordProgression = [];
    for (let i = 0; i < 12; i++) {
        const chordElement = document.getElementById(`m${i}`);
        if (chordElement && chordElement.value.trim()) {
            chordProgression.push(chordElement.value.trim());
        }
    }

    if (chordProgression.length === 0) {
        alert('コード進行が生成されていません。先にコード生成ボタンを押してください。');
        return;
    }

    // Web Audio API を初期化
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    // ハイハット用のゲインノードを初期化
    if (!hihatGain) {
        hihatGain = audioContext.createGain();
        hihatGain.gain.setValueAtTime(0.3, audioContext.currentTime);
        hihatGain.connect(audioContext.destination);
    }

    // 再生バーを開始
    startPlayBar();

    // 再生状態を更新
    isPlaying = true;
    currentChordIndex = 0;
    updatePlayButton();
    highlightCurrentChord();

    // 最初のコードを再生
    playNextChord();
}

// 再生バーを開始
function startPlayBar() {
    // 既存の再生バーを削除
    const existingPlayBar = document.getElementById("playbarstart");
    if (existingPlayBar) {
        existingPlayBar.remove();
    }
    
    // デフォルト位置の針も削除
    const initialPlayBar = document.getElementById("playbarinitial");
    if (initialPlayBar) {
        initialPlayBar.remove();
    }

    // 少し遅延してから新しい再生バーを作成（DOMの更新を待つ）
    setTimeout(() => {
        // 新しい再生バーを作成
        var playbarstart = document.createElement("span");
        playbarstart.id = "playbarstart";
        document.getElementById("playbar").appendChild(playbarstart);
        
        var playbar = document.getElementById("playbarstart").style;
        var bpm = document.getElementById('bpm').value / 120;
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
        
        playbar.getPropertyValue('--bpm');
        playbar.setProperty('--bpm', `rotation-s ${24 / bpm}s linear infinite`);
    }, 10);
}

// 再生バーを停止
function stopPlayBar() {
    var playbar = document.getElementById("playbarstart");
    if (playbar) {
        playbar.style.animationPlayState = 'paused';
    }
}

// 再生バーをリセット
function resetPlayBar() {
    const existingPlayBar = document.getElementById("playbarstart");
    if (existingPlayBar) {
        existingPlayBar.remove();
    }
    
    var playbarreset = document.createElement("div");
    playbarreset.id = "playbarinitial";
    document.getElementById("playbar").appendChild(playbarreset);
}

// 再生バーをデフォルト位置に戻す
function resetPlayBarToDefault() {
    const existingPlayBar = document.getElementById("playbarstart");
    if (existingPlayBar) {
        existingPlayBar.remove();
    }
    
    // 既存のデフォルト位置の針も削除
    const existingInitialPlayBar = document.getElementById("playbarinitial");
    if (existingInitialPlayBar) {
        existingInitialPlayBar.remove();
    }
    
    // 少し遅延してからデフォルト位置の針を作成
    setTimeout(() => {
        // デフォルト位置の針を作成
        var playbarreset = document.createElement("div");
        playbarreset.id = "playbarinitial";
        playbarreset.style.position = 'absolute';
        playbarreset.style.bottom = '50%';
        playbarreset.style.left = '50%';
        playbarreset.style.backgroundColor = 'orange';
        playbarreset.style.transformOrigin = '50% 100%';
        playbarreset.style.width = '2px';
        playbarreset.style.height = '110px';
        playbarreset.style.transform = 'translateX(-50%) rotate(0deg)';
        playbarreset.style.zIndex = '1';
        
        document.getElementById("playbar").appendChild(playbarreset);
    }, 10);
}

// 次のコードを再生（自然な繋がり）
function playNextChord() {
    if (!isPlaying) {
        stopChordProgression();
        return;
    }

    //12ードをループ再生
    const chordIndex = currentChordIndex % 12
    const chord = chordProgression[chordIndex];
    
    console.log(`Playing chord ${currentChordIndex}: ${chord} (index: ${chordIndex})`);
    
    // テンポに基づいて次のコードを再生
    const bpmElement = document.getElementById('bpm');
    const bpm = bpmElement ? parseInt(bpmElement.textContent) || 120 : 120;
    const beatDuration = (60 / bpm) * 1000; // ミリ秒
    const chordDuration = beatDuration * 4; //4拍分（1小節）

    // 現在のコードをハイライト
    highlightCurrentChord();

    // ピアノ音でコードを再生（アタック音）
    playChord(chord);

    // メロディフレーズを再生
    playMelodyPhrase(chord);

    // パッド音の処理（自然な繋がり）
    if (currentChordIndex === 0) {
        // 最初のコードの場合、新しいパッド音を開始
        console.log('Starting initial pad chord');
        playPadChord(chord);
    } else {
        // 2番目以降のコードの場合、前のパッド音をフェードアウトしながら新しいパッド音を開始
        console.log('Fading to next pad chord');
        fadePadTransition(chord);
    }

    // チクタク音を4拍分再生（重複を防ぐ）
    playClockTickSequence(bpm, 4);

    setTimeout(() => {
        currentChordIndex++;
        playNextChord();
    }, chordDuration);
}

// パッド音の自然な繋がり（フェード効果）
function fadePadTransition(newChordName) {
    if (!audioContext) return;

    console.log('Fading pad transition to:', newChordName);

    // 前のパッド音をフェードアウト（0.5秒かけて）
    padOscillators.forEach((osc) => {
        if (osc && osc.gainNode) {
            osc.gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
            setTimeout(() => {
                if (osc && typeof osc.stop === 'function') {
                    osc.stop();
                }
            }, 500);
        }
    });
    padOscillators = [];

    // 新しいパッド音をフェードイン（0.3秒遅れて開始）
    setTimeout(() => {
        playPadChord(newChordName);
    }, 200);
}

// 現在のコードをハイライト表示
function highlightCurrentChord() {
    // すべてのコード列のハイライトを解除
    clearChordHighlights();
    
    if (!isPlaying) return;
    
    // 現在のコード列をハイライト（ループ再生対応）
    const chordIndex = currentChordIndex % 12; // 0始まり、12でループ
    const chordElement = document.getElementById(`m${chordIndex}`);
    const degreeElement = document.getElementById(`num${chordIndex}`);
    const functionElement = document.getElementById(`f${chordIndex}`);
    
    if (chordElement) {
        chordElement.style.backgroundColor = '#ffeb3b';
        chordElement.style.color = '#000';
        chordElement.style.fontWeight = 'bold';
        chordElement.style.borderRadius = '4px';
        chordElement.style.padding = '2px 4px';
    }
    
    if (degreeElement) {
        degreeElement.style.backgroundColor = '#ffeb3b';
        degreeElement.style.color = '#000';
        degreeElement.style.fontWeight = 'bold';
        degreeElement.style.borderRadius = '4px';
        degreeElement.style.padding = '2px 4px';
    }
    
    if (functionElement) {
        functionElement.style.backgroundColor = '#ffeb3b';
        functionElement.style.color = '#000';
        functionElement.style.fontWeight = 'bold';
        functionElement.style.borderRadius = '4px';
        functionElement.style.padding = '2px 4px';
    }
}

// すべてのコード列のハイライトを解除
function clearChordHighlights() {
    for (let i = 0; i < 12; i++) {
        const chordElement = document.getElementById(`m${i}`);
        const degreeElement = document.getElementById(`num${i}`);
        const functionElement = document.getElementById(`f${i}`);
        
        if (chordElement) {
            chordElement.style.backgroundColor = '';
            chordElement.style.color = '';
            chordElement.style.fontWeight = '';
            chordElement.style.borderRadius = '';
            chordElement.style.padding = '';
        }
        
        if (degreeElement) {
            degreeElement.style.backgroundColor = '';
            degreeElement.style.color = '';
            degreeElement.style.fontWeight = '';
            degreeElement.style.borderRadius = '';
            degreeElement.style.padding = '';
        }
        
        if (functionElement) {
            functionElement.style.backgroundColor = '';
            functionElement.style.color = '';
            functionElement.style.fontWeight = '';
            functionElement.style.borderRadius = '';
            functionElement.style.padding = '';
        }
    }
}

// メロディフレーズを再生（サックス音色）
function playMelodyPhrase(chordName) {
    if (!audioContext) return;

    // コード名を解析
    const { root, quality } = parseChord(chordName);
    if (!root || !quality) {
        console.log(`コード解析エラー: ${chordName}`);
        return;
    }

    // ルート音を正規化（フラットをシャープに変換）
    const normalizedRoot = noteAliases[root] || root;
    
    // ランダムにメロディパターンを選択
    const pattern = melodyPatterns[Math.floor(Math.random() * melodyPatterns.length)];
    
    // メロディの音を生成
    const melodyNotes = pattern.map(interval => {
        const noteIndex = noteOrder.indexOf(normalizedRoot);
        const targetNoteIndex = (noteIndex + interval) % 12;
        const targetNote = noteOrder[targetNoteIndex];
        const freq = noteFrequencies[targetNote];
        return freq;
    }).filter(freq => freq > 0);

    // メロディを再生
    melodyNotes.forEach((freq, index) => {
        const delay = index * 0.3; // 各音の間隔
        playSaxNote(freq, 0.25, 1.2, delay);
    });
}

// チクタク音を指定拍数分再生（重複を防ぐ）
function playClockTickSequence(bpm, beats) {
    if (!isPlaying) return;
    
    const beatDuration = (60 / bpm) * 1000; // ミリ秒
    
    // 最初のチクタク音を再生
    playClockTick();
    
    // 残りの拍数分を再帰的に再生
    if (beats > 1) {
        setTimeout(() => {
            if (isPlaying) {
                playClockTickSequence(bpm, beats - 1);
            }
        }, beatDuration);
    }
}

// ハイハットのリズムを開始（後方互換性のため残す）
function startHihatRhythm(bpm) {
    if (!isPlaying) return;
    
    const beatDuration = (60 / bpm) * 1000; // ミリ秒
    
    // チクタク音（時計の針音）を再生
    playClockTick();
    
    // 次のビートで再帰的に呼び出し（4拍分のみ）
    setTimeout(() => {
        if (isPlaying) {
            startHihatRhythm(bpm);
        }
    }, beatDuration);
}

// 時計のチクタク音を再生
function playClockTick() {
    if (!audioContext) return;
    
    const tickVolume = getVolume('tick');
    const tickTone = getTone('tick');
    
    console.log(`Playing tick with tone: ${tickTone}`);
    
    // 音色に応じてオシレータータイプを変更
    let mainOscType = 'sine';
    let subOscType = 'triangle';
    let mainFreq = 800;
    let subFreq = 200;
    
    switch (tickTone) {
        case 'mechanical':
            mainOscType = 'square';
            subOscType = 'sawtooth';
            mainFreq = 1000;
            subFreq = 300;
            break;
        case 'digital':
            mainOscType = 'square';
            subOscType = 'square';
            mainFreq = 1200;
            subFreq = 400;
            break;
        case 'analog':
            mainOscType = 'triangle';
            subOscType = 'sine';
            mainFreq = 600;
            subFreq = 150;
            break;
        default: // clock
            mainOscType = 'sine';
            subOscType = 'triangle';
            mainFreq = 800;
            subFreq = 200;
    }
    
    // メインの秒針音（より短く、シャープ）
    const tickOsc = audioContext.createOscillator();
    const tickGain = audioContext.createGain();
    const tickFilter = audioContext.createBiquadFilter();
    
    // 音色に応じた音色
    tickOsc.type = mainOscType;
    tickOsc.frequency.setValueAtTime(mainFreq, audioContext.currentTime);
    tickOsc.frequency.exponentialRampToValueAtTime(mainFreq * 0.75, audioContext.currentTime + 0.02);
    
    // 非常に短いアタックとリリース（カチッという音）
    tickGain.gain.setValueAtTime(0, audioContext.currentTime);
    tickGain.gain.linearRampToValueAtTime(0.3 * tickVolume, audioContext.currentTime + 0.001);
    tickGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.05);
    
    // ハイパスフィルターで高音を強調
    tickFilter.type = 'highpass';
    tickFilter.frequency.value = mainFreq * 0.75;
    
    tickOsc.connect(tickGain).connect(tickFilter).connect(audioContext.destination);
    tickOsc.start();
    tickOsc.stop(audioContext.currentTime + 0.06);
    
    // 補助的な機械音（時計の歯車音）
    const gearOsc = audioContext.createOscillator();
    const gearGain = audioContext.createGain();
    const gearFilter = audioContext.createBiquadFilter();
    
    gearOsc.type = subOscType;
    gearOsc.frequency.setValueAtTime(subFreq, audioContext.currentTime);
    gearOsc.frequency.exponentialRampToValueAtTime(subFreq * 0.75, audioContext.currentTime + 0.03);
    
    gearGain.gain.setValueAtTime(0, audioContext.currentTime);
    gearGain.gain.linearRampToValueAtTime(0.1 * tickVolume, audioContext.currentTime + 0.002);
    gearGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.08);
    
    gearFilter.type = 'lowpass';
    gearFilter.frequency.value = subFreq * 2;
    
    gearOsc.connect(gearGain).connect(gearFilter).connect(audioContext.destination);
    gearOsc.start();
    gearOsc.stop(audioContext.currentTime + 0.09);
}

// 時計らしいコード音を再生
function playChord(chordName) {
    if (!audioContext) return;
    
    console.log('Playing chord:', chordName);
    const { root, quality } = parseChord(chordName);
    console.log('Parsed chord:', { root, quality });
    
    if (!root || !quality) {
        console.log('Invalid chord:', chordName);
        return;
    }
    
    const rootFreq = noteFrequencies[root];
    if (!rootFreq) {
        console.log('Invalid root frequency for:', root);
        return;
    }
    
    const intervals = chordIntervals[quality] || chordIntervals['maj'];
    console.log('Using intervals:', intervals);
    
    // 時計らしい音色でコードを再生
    intervals.forEach((interval, index) => {
        const frequency = rootFreq * Math.pow(2, interval / 12);
        console.log(`Playing note ${index}: ${frequency}Hz`);
        playClockChordNote(frequency, 0.4, 0.8, index * 0.05);
    });
}

// 時計らしいコード音の個別音を再生
function playClockChordNote(frequency, volume, duration, delay = 0) {
    if (!audioContext) return;
    
    const chordVolume = getVolume('chord');
    const chordTone = getTone('chord');
    
    console.log('Playing chord note:', { frequency, volume, duration, delay, chordVolume, chordTone });
    
    // 音色に応じてオシレータータイプを変更
    let mainOscType = 'square';
    let subOscType = 'triangle';
    let mainFreq = frequency;
    let subFreq = frequency * 2;
    let filterFreq = 600;
    
    switch (chordTone) {
        case 'gear':
            mainOscType = 'sawtooth';
            subOscType = 'square';
            mainFreq = frequency * 0.8;
            subFreq = frequency * 1.5;
            filterFreq = 800;
            break;
        case 'bell':
            mainOscType = 'sine';
            subOscType = 'sine';
            mainFreq = frequency;
            subFreq = frequency * 2.5;
            filterFreq = 1200;
            break;
        case 'chime':
            mainOscType = 'triangle';
            subOscType = 'sine';
            mainFreq = frequency * 1.2;
            subFreq = frequency * 3;
            filterFreq = 1000;
            break;
        default: // clockwork
            mainOscType = 'square';
            subOscType = 'triangle';
            mainFreq = frequency;
            subFreq = frequency * 2;
            filterFreq = 600;
    }
    
    // メインのオシレーター（時計の歯車音）
    const mainOsc = audioContext.createOscillator();
    const mainGain = audioContext.createGain();
    const mainFilter = audioContext.createBiquadFilter();
    
    // 音色に応じた音色
    mainOsc.type = mainOscType;
    mainOsc.frequency.setValueAtTime(mainFreq, audioContext.currentTime + delay);
    mainOsc.frequency.exponentialRampToValueAtTime(mainFreq * 0.8, audioContext.currentTime + delay + duration);
    
    // 機械的なアタックとリリース
    mainGain.gain.setValueAtTime(0, audioContext.currentTime + delay);
    mainGain.gain.linearRampToValueAtTime(volume * 0.3 * chordVolume, audioContext.currentTime + delay + 0.01);
    mainGain.gain.linearRampToValueAtTime(volume * 0.2 * chordVolume, audioContext.currentTime + delay + 0.05);
    mainGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + delay + duration);
    
    // 時計らしいフィルター
    mainFilter.type = 'lowpass';
    mainFilter.frequency.setValueAtTime(filterFreq, audioContext.currentTime + delay);
    mainFilter.frequency.exponentialRampToValueAtTime(filterFreq * 0.5, audioContext.currentTime + delay + duration);
    
    mainOsc.connect(mainGain).connect(mainFilter).connect(audioContext.destination);
    mainOsc.start(audioContext.currentTime + delay);
    mainOsc.stop(audioContext.currentTime + delay + duration);
    
    // 補助オシレーター（時計の針音）
    const subOsc = audioContext.createOscillator();
    const subGain = audioContext.createGain();
    const subFilter = audioContext.createBiquadFilter();
    
    subOsc.type = subOscType;
    subOsc.frequency.setValueAtTime(subFreq, audioContext.currentTime + delay);
    subOsc.frequency.exponentialRampToValueAtTime(subFreq * 0.9, audioContext.currentTime + delay + duration);
    
    subGain.gain.setValueAtTime(0, audioContext.currentTime + delay);
    subGain.gain.linearRampToValueAtTime(volume * 0.15 * chordVolume, audioContext.currentTime + delay + 0.02);
    subGain.gain.linearRampToValueAtTime(volume * 0.1 * chordVolume, audioContext.currentTime + delay + 0.1);
    subGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + delay + duration);
    
    subFilter.type = 'highpass';
    subFilter.frequency.setValueAtTime(filterFreq * 1.5, audioContext.currentTime + delay);
    
    subOsc.connect(subGain).connect(subFilter).connect(audioContext.destination);
    subOsc.start(audioContext.currentTime + delay);
    subOsc.stop(audioContext.currentTime + delay + duration);
    
    // ノイズ成分（時計の機械音）
    const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * duration, audioContext.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseData.length; i++) {
        noiseData[i] = (Math.random() - 0.5) * 0.5;
    }
    
    const noiseSource = audioContext.createBufferSource();
    const noiseGain = audioContext.createGain();
    const noiseFilter = audioContext.createBiquadFilter();
    
    noiseSource.buffer = noiseBuffer;
    
    noiseGain.gain.setValueAtTime(0, audioContext.currentTime + delay);
    noiseGain.gain.linearRampToValueAtTime(volume * 0.05 * chordVolume, audioContext.currentTime + delay + 0.01);
    noiseGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + delay + duration);
    
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(frequency * 3, audioContext.currentTime + delay);
    noiseFilter.Q.value = 2;
    
    noiseSource.connect(noiseGain).connect(noiseFilter).connect(audioContext.destination);
    noiseSource.start(audioContext.currentTime + delay);
    noiseSource.stop(audioContext.currentTime + delay + duration);
}

// 時計らしいパッド音を再生
function playPadChord(chordName) {
    if (!audioContext) return;
    
    console.log('Playing pad chord:', chordName);
    const { root, quality } = parseChord(chordName);
    console.log('Parsed pad chord:', { root, quality });
    
    if (!root || !quality) {
        console.log('Invalid pad chord:', chordName);
        return;
    }
    
    const rootFreq = noteFrequencies[root];
    if (!rootFreq) {
        console.log('Invalid root frequency for pad:', root);
        return;
    }
    
    const intervals = chordIntervals[quality] || chordIntervals['maj'];
    const padVolume = getVolume('pad');
    const padTone = getTone('pad');
    console.log('Using pad intervals:', intervals, 'volume:', padVolume, 'tone:', padTone);
    
    // 既存のパッド音を停止
    stopPadSounds();
    
    // 音色に応じてオシレータータイプを変更
    let mainOscType = 'sawtooth';
    let subOscType = 'sine';
    let mainFreq = 1.0;
    let subFreq = 0.5;
    let filterFreq = 400;
    
    switch (padTone) {
        case 'atmospheric':
            mainOscType = 'triangle';
            subOscType = 'sine';
            mainFreq = 1.2;
            subFreq = 0.3;
            filterFreq = 600;
            break;
        case 'warm':
            mainOscType = 'sine';
            subOscType = 'triangle';
            mainFreq = 0.8;
            subFreq = 0.7;
            filterFreq = 300;
            break;
        case 'cold':
            mainOscType = 'square';
            subOscType = 'sawtooth';
            mainFreq = 1.5;
            subFreq = 0.2;
            filterFreq = 800;
            break;
        default: // ambient
            mainOscType = 'sawtooth';
            subOscType = 'sine';
            mainFreq = 1.0;
            subFreq = 0.5;
            filterFreq = 400;
    }
    
    // 時計仕掛けっぽいパッド音を開始
    intervals.forEach((interval, index) => {
        const frequency = rootFreq * Math.pow(2, interval / 12);
        
        // メインのパッド音（時計の歯車音）
        const mainPadOsc = audioContext.createOscillator();
        const mainPadGain = audioContext.createGain();
        const mainPadFilter = audioContext.createBiquadFilter();
        
        // 音色に応じた音色
        mainPadOsc.type = mainOscType;
        mainPadOsc.frequency.setValueAtTime(frequency * mainFreq, audioContext.currentTime);
        mainPadOsc.frequency.exponentialRampToValueAtTime(frequency * mainFreq * 0.9, audioContext.currentTime + 2.0);
        
        // ゆっくりとしたアタック（時計の針の動き）
        mainPadGain.gain.setValueAtTime(0, audioContext.currentTime);
        mainPadGain.gain.linearRampToValueAtTime(0.12 * padVolume, audioContext.currentTime + 0.3);
        mainPadGain.gain.linearRampToValueAtTime(0.08 * padVolume, audioContext.currentTime + 1.5);
        
        // 時計らしいフィルター
        mainPadFilter.type = 'lowpass';
        mainPadFilter.frequency.setValueAtTime(filterFreq, audioContext.currentTime);
        mainPadFilter.frequency.exponentialRampToValueAtTime(filterFreq * 0.5, audioContext.currentTime + 1.0);
        
        mainPadOsc.connect(mainPadGain).connect(mainPadFilter).connect(audioContext.destination);
        mainPadOsc.start();
        
        // 補助パッド音（時計の針音）
        const subPadOsc = audioContext.createOscillator();
        const subPadGain = audioContext.createGain();
        const subPadFilter = audioContext.createBiquadFilter();
        
        subPadOsc.type = subOscType;
        subPadOsc.frequency.setValueAtTime(frequency * subFreq, audioContext.currentTime);
        
        subPadGain.gain.setValueAtTime(0, audioContext.currentTime);
        subPadGain.gain.linearRampToValueAtTime(0.06 * padVolume, audioContext.currentTime + 0.5);
        subPadGain.gain.linearRampToValueAtTime(0.04 * padVolume, audioContext.currentTime + 2.0);
        
        subPadFilter.type = 'highpass';
        subPadFilter.frequency.setValueAtTime(filterFreq * 0.5, audioContext.currentTime);
        
        subPadOsc.connect(subPadGain).connect(subPadFilter).connect(audioContext.destination);
        subPadOsc.start();
        
        // ゲインノードを保存してリアルタイム音量調整に対応
        mainPadOsc.gainNode = mainPadGain;
        subPadOsc.gainNode = subPadGain;
        padOscillators.push(mainPadOsc, subPadOsc);
    });
}

// 時計らしいメロディ音を再生
function playSaxNote(frequency, volume, duration, delay = 0) {
    if (!audioContext) return;
    
    const melodyVolume = getVolume('melody');
    const melodyTone = getTone('melody');
    
    console.log('Playing melody note:', { frequency, volume, duration, delay, melodyVolume, melodyTone });
    
    // 音色に応じてオシレータータイプを変更
    let oscType = 'sine';
    let filterFreq = 800;
    let freqMultiplier = 1.0;
    
    switch (melodyTone) {
        case 'crystal':
            oscType = 'triangle';
            filterFreq = 1200;
            freqMultiplier = 1.2;
            break;
        case 'glass':
            oscType = 'sine';
            filterFreq = 1000;
            freqMultiplier = 1.5;
            break;
        case 'metal':
            oscType = 'square';
            filterFreq = 600;
            freqMultiplier = 0.8;
            break;
        default: // needle
            oscType = 'sine';
            filterFreq = 800;
            freqMultiplier = 1.0;
    }
    
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    // 音色に応じた音色
    osc.type = oscType;
    osc.frequency.setValueAtTime(frequency * freqMultiplier, audioContext.currentTime + delay);
    
    // 時計の針が動くようなアタック
    gain.gain.setValueAtTime(0, audioContext.currentTime + delay);
    gain.gain.linearRampToValueAtTime(volume * melodyVolume, audioContext.currentTime + delay + 0.1);
    gain.gain.linearRampToValueAtTime(volume * 0.6 * melodyVolume, audioContext.currentTime + delay + 0.3);
    gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + delay + duration);
    
    // 時計らしいフィルター
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(filterFreq, audioContext.currentTime + delay);
    filter.frequency.exponentialRampToValueAtTime(filterFreq * 0.5, audioContext.currentTime + delay + duration);
    
    osc.connect(gain).connect(filter).connect(audioContext.destination);
    osc.start(audioContext.currentTime + delay);
    osc.stop(audioContext.currentTime + delay + duration);
    
    melodyOscillators.push(osc);
}

// メロディ音を停止
function stopMelodySounds() {
    melodyOscillators.forEach((osc) => {
        if (osc && typeof osc.stop === 'function') {
            osc.stop();
        }
    });
    melodyOscillators = [];
}

// パッド音を停止
function stopPadSounds() {
    padOscillators.forEach((osc) => {
        if (osc && typeof osc.stop === 'function') {
            osc.stop();
        }
    });
    padOscillators = [];
}

// パッド音の音量をリアルタイムで更新
function updatePadVolume() {
    const padVolume = getVolume('pad');
    padOscillators.forEach((osc, index) => {
        if (osc && osc.gainNode) {
            // メイン音と補助音で異なるベース音量を設定
            const baseVolume = index % 2 === 0 ? 0.12 : 0.06; // メイン音と補助音を交互に
            osc.gainNode.gain.setValueAtTime(baseVolume * padVolume, audioContext.currentTime);
        }
    });
}

// コード名を解析
function parseChord(chordName) {
    // 基本的なコード名の解析
    const patterns = [
        /^([A-G][#b]?)(M7|maj7?|min|m|dim|aug|sus[24]|7|m7|m7b5)$/,
        /^([A-G][#b]?)(maj|min|m)$/,
        /^([A-G][#b]?)$/
    ];

    for (const pattern of patterns) {
        const match = chordName.match(pattern);
        if (match) {
            const root = match[1];
            const quality = match[2] || 'maj';
            
            // 品質の正規化
            const qualityMap = {
                'maj': 'maj',
                'M7': 'maj7',
                'maj7': 'maj7',
                'min': 'min',
                'm': 'min',
                'dim': 'dim',
                'aug': 'aug',
                'sus2': 'sus2',
                'sus4': 'sus4',
                '7': '7',
                'm7': 'm7',
                'm7b5': 'm7b5',
                'maj7': 'maj7'
            };

            return {
                root: root,
                quality: qualityMap[quality] || 'maj'
            };
        }
    }

    return { root: null, quality: null };
}

// コード進行の再生を停止
function stopChordProgression() {
    console.log('Stopping chord progression...');
    isPlaying = false;
    
    // 再生バーをデフォルト位置に戻す
    resetPlayBarToDefault();
    
    // ハイライトをクリア
    clearChordHighlights();
    
    // すべての音を停止
    stopMelodySounds();
    stopPadSounds();
    
    // 再生ボタンを更新
    updatePlayButton();
    
    // ハイハットのリズムを停止
    if (hihatGain) {
        hihatGain.gain.setValueAtTime(0, audioContext.currentTime);
    }
    
    console.log('Chord progression stopped, isPlaying:', isPlaying);
}

// 再生ボタンの表示を更新
function updatePlayButton() {
    const playButton = document.getElementById('playstatus');
    if (playButton) {
        console.log('Updating play button, isPlaying:', isPlaying);
        if (isPlaying) {
            playButton.innerHTML = "■";
        } else {
            playButton.innerHTML = "▶";
        }
    }
}

// ページがアンロードされる時に停止
window.addEventListener('beforeunload', () => {
    stopChordProgression();
}); 