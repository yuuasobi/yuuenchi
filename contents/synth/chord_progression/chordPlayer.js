// Web Audio API の初期化
let audioContext;
let isPlaying = false;
let currentChordIndex = 0;
let chordProgression = [];
let padOscillators = []; // パッド音のオシレーターを管理
let hihatGain = null; // ハイハット用のゲインノード
let melodyOscillators = []; // メロディ音のオシレーターを管理
let rhythmLoopTimeout = null; // リズムループ用のタイムアウト

// ミキサー設定
let mixerSettings = {
    rhythm: { sound: 'click', volume: 80 },
    chord: { sound: 'triangle', volume: 70 },
    melody: { sound: 'sawtooth', volume: 60 }
};

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
    'm-5': [0, 3, 6],      // マイナーフラットファイブ: ルート, 短3度, 減5度
    'dim': [0, 3, 6],      // ディミニッシュコード: ルート, 短3度, 減5度
    'aug': [0, 4, 8],      // オーグメントコード: ルート, 長3度, 増5度
    '7': [0, 4, 7, 10],    // セブンスコード: ルート, 長3度, 完全5度, 短7度
    'm7': [0, 3, 7, 10],   // マイナーセブンスコード: ルート, 短3度, 完全5度, 短7度
    'm7b5': [0, 3, 6, 10], // マイナーセブンスフラットファイブ: ルート, 短3度, 減5度, 短7度
    'm7-5': [0, 3, 6, 10], // マイナーセブンスフラットファイブ（別表記）: ルート, 短3度, 減5度, 短7度
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

// ミキサー設定を更新する関数
function updateMixerSettings() {
    try {
        const rhythmSound = document.getElementById('rhythmSound');
        const chordSound = document.getElementById('chordSound');
        const melodySound = document.getElementById('melodySound');
        const rhythmVolume = document.getElementById('rhythmVolume');
        const chordVolume = document.getElementById('chordVolume');
        const melodyVolume = document.getElementById('melodyVolume');
        
        if (rhythmSound) mixerSettings.rhythm.sound = rhythmSound.value;
        if (chordSound) mixerSettings.chord.sound = chordSound.value;
        if (melodySound) mixerSettings.melody.sound = melodySound.value;
        if (rhythmVolume) mixerSettings.rhythm.volume = parseInt(rhythmVolume.value);
        if (chordVolume) mixerSettings.chord.volume = parseInt(chordVolume.value);
        if (melodyVolume) mixerSettings.melody.volume = parseInt(melodyVolume.value);
        
        console.log('ミキサー設定更新:', mixerSettings);
    } catch (error) {
        console.error('ミキサー設定更新エラー:', error);
    }
}

// コード進行を再生する関数
function playChordProgression() {
    if (isPlaying) {
        stopChordProgression();
        return;
    }

    try {
        // ミキサー設定を更新
        updateMixerSettings();
    } catch (error) {
        console.error('ミキサー設定更新エラー:', error);
        // エラーが発生しても再生を続行
    }

    // コード進行を取得
    chordProgression = [];
    for (let i = 1; i <= 8; i++) {
        const chordElement = document.getElementById(`m${i}`);
        if (chordElement && chordElement.textContent.trim()) {
            chordProgression.push(chordElement.textContent.trim());
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
        hihatGain.connect(audioContext.destination);
    }
    // リズム音量を設定（安全な範囲で）
    const rhythmVolume = Math.max(0, Math.min(1, mixerSettings.rhythm.volume / 100));
    hihatGain.gain.setValueAtTime(rhythmVolume, audioContext.currentTime);

    // 再生状態を更新
    isPlaying = true;
    currentChordIndex = 0;
    updatePlayButton();
    highlightCurrentChord();

    // 最初のコードを再生
    playNextChord();
}

// 次のコードを再生（自然な繋がり）
function playNextChord() {
    if (!isPlaying) {
        return;
    }
    
    // 最後のコードが終わったら最初に戻る（ループ再生）
    if (currentChordIndex >= chordProgression.length) {
        currentChordIndex = 0;
    }

    // 各コード再生時にミキサー設定を更新
    try {
        updateMixerSettings();
    } catch (error) {
        console.error('ミキサー設定更新エラー:', error);
        // エラーが発生しても再生を続行
    }

    const chord = chordProgression[currentChordIndex];
    
    // テンポに基づいて次のコードを再生
    const bpmElement = document.getElementById('bpm');
    const bpm = bpmElement ? parseInt(bpmElement.textContent) || 120 : 120;
    const beatDuration = (60 / bpm) * 1000; // ミリ秒
    const chordDuration = beatDuration * 4; // 4拍分（1小節）

    // 現在のコードをハイライト
    highlightCurrentChord();

    // ピアノ音でコードを再生（アタック音）
    playChord(chord);

    // メロディフレーズを再生
    playMelodyPhrase(chord);

    // ハイハットのリズムを開始
    startHihatRhythm(bpm);

    // パッド音の処理（自然な繋がり）
    if (currentChordIndex === 0) {
        // 最初のコードの場合、新しいパッド音を開始
        playPadChord(chord);
    } else {
        // 2番目以降のコードの場合、前のパッド音をフェードアウトしながら新しいパッド音を開始
        fadePadTransition(chord);
    }

    setTimeout(() => {
        currentChordIndex++;
        playNextChord();
    }, chordDuration);
}

// パッド音の自然な繋がり（フェード効果）
function fadePadTransition(newChordName) {
    if (!audioContext) return;

    // 前のパッド音をフェードアウト（0.5秒かけて）
    padOscillators.forEach(({ leftOscillator, rightOscillator, leftGain, rightGain, vibratoInterval }) => {
        clearInterval(vibratoInterval);
        leftGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
        rightGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
        setTimeout(() => {
            leftOscillator.stop();
            rightOscillator.stop();
        }, 500);
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
    
    // 現在のコード列をハイライト
    const chordIndex = currentChordIndex + 1; // 1から始まるインデックス
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
    for (let i = 1; i <= 8; i++) {
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

    // メロディ音量を取得
    const melodyVolume = mixerSettings.melody.volume / 100;

    // 音量が0に近い場合は再生しない
    if (melodyVolume < 0.001) {
        return;
    }

    // メロディを再生
    melodyNotes.forEach((freq, index) => {
        const delay = index * 0.3; // 各音の間隔
        const adjustedVolume = 0.25 * melodyVolume;
        playSaxNote(freq, adjustedVolume, 1.2, delay);
    });
}

// メロディ音色で音を再生
function playSaxNote(frequency, volume, duration, delay = 0) {
    // 音量が0に近い場合は再生しない
    if (volume < 0.001) {
        return;
    }
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    const panner = audioContext.createStereoPanner();
    
    // 選択された音源に応じて波形を設定
    const melodySound = mixerSettings.melody.sound;
    switch (melodySound) {
        case 'sawtooth':
            oscillator.type = 'sawtooth';
            break;
        case 'square':
            oscillator.type = 'square';
            break;
        case 'triangle':
            oscillator.type = 'triangle';
            break;
        case 'sine':
            oscillator.type = 'sine';
            break;
        default:
            oscillator.type = 'sawtooth';
    }

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(panner);
    panner.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime + delay);

    // フィルターでサックスらしい音色を作成
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1500, audioContext.currentTime + delay);
    filter.Q.setValueAtTime(2, audioContext.currentTime + delay);

    // パン位置を中央から少し左に
    panner.pan.setValueAtTime(-0.1, audioContext.currentTime + delay);

    // サックスらしいエンベロープ（アタックが少し遅い）
    gainNode.gain.setValueAtTime(0, audioContext.currentTime + delay);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + delay + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(volume * 0.6, audioContext.currentTime + delay + 0.3);
    gainNode.gain.linearRampToValueAtTime(0.001, audioContext.currentTime + delay + duration);

    // ビブラート効果を追加
    const vibratoDepth = 1.5;
    const vibratoRate = 5;
    let vibratoTime = 0;
    const vibratoInterval = setInterval(() => {
        if (!isPlaying) {
            clearInterval(vibratoInterval);
            return;
        }
        const vibratoFreq = frequency + Math.sin(vibratoTime * vibratoRate) * vibratoDepth;
        oscillator.frequency.setValueAtTime(vibratoFreq, audioContext.currentTime);
        vibratoTime += 0.1;
    }, 100);

    oscillator.start(audioContext.currentTime + delay);
    oscillator.stop(audioContext.currentTime + delay + duration);

    // メロディ音のオシレーターを保存
    melodyOscillators.push({ oscillator, gainNode, vibratoInterval });
}

// メロディ音を停止
function stopMelodySounds() {
    melodyOscillators.forEach(({ oscillator, gainNode, vibratoInterval }) => {
        clearInterval(vibratoInterval);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);
        setTimeout(() => {
            oscillator.stop();
        }, 100);
    });
    melodyOscillators = [];
}

// パッド音でコードを再生（ヴァイオリン音色、ステレオ）
function playPadChord(chordName) {
    if (!audioContext) return;

    // コード名を解析
    const { root, quality } = parseChord(chordName);
    if (!root || !quality) {
        console.log(`コード解析エラー: ${chordName}`);
        return;
    }

    // ルート音を正規化（フラットをシャープに変換）
    const normalizedRoot = noteAliases[root] || root;
    
    // コードの構成音を取得
    const intervals = chordIntervals[quality] || chordIntervals['maj'];
    const frequencies = intervals.map(interval => {
        const noteIndex = noteOrder.indexOf(normalizedRoot);
        const targetNoteIndex = (noteIndex + interval) % 12;
        const targetNote = noteOrder[targetNoteIndex];
        const freq = noteFrequencies[targetNote];
        if (!freq) {
            console.log(`周波数が見つかりません: ${targetNote}`);
            return 0;
        }
        return freq;
    }).filter(freq => freq > 0);

    // パッド音として各音を再生（ヴァイオリン音色、ステレオ）
    frequencies.forEach((freq, index) => {
        // 左右のステレオチャンネルを作成
        const leftOscillator = audioContext.createOscillator();
        const rightOscillator = audioContext.createOscillator();
        const leftGain = audioContext.createGain();
        const rightGain = audioContext.createGain();
        const leftFilter = audioContext.createBiquadFilter();
        const rightFilter = audioContext.createBiquadFilter();
        const leftPanner = audioContext.createStereoPanner();
        const rightPanner = audioContext.createStereoPanner();

        // 左チャンネル
        leftOscillator.connect(leftFilter);
        leftFilter.connect(leftGain);
        leftGain.connect(leftPanner);
        leftPanner.connect(audioContext.destination);

        // 右チャンネル
        rightOscillator.connect(rightFilter);
        rightFilter.connect(rightGain);
        rightGain.connect(rightPanner);
        rightPanner.connect(audioContext.destination);

        // ヴァイオリンらしい音色を作成
        leftOscillator.type = 'sawtooth';
        rightOscillator.type = 'sawtooth';
        leftOscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        rightOscillator.frequency.setValueAtTime(freq, audioContext.currentTime);

        // フィルターでヴァイオリンらしい音色を作成
        leftFilter.type = 'lowpass';
        rightFilter.type = 'lowpass';
        leftFilter.frequency.setValueAtTime(1200, audioContext.currentTime);
        rightFilter.frequency.setValueAtTime(1200, audioContext.currentTime);
        leftFilter.Q.setValueAtTime(1.5, audioContext.currentTime);
        rightFilter.Q.setValueAtTime(1.5, audioContext.currentTime);

        // ステレオパン設定（左右に少しずらす）
        leftPanner.pan.setValueAtTime(-0.3, audioContext.currentTime);
        rightPanner.pan.setValueAtTime(0.3, audioContext.currentTime);

        // パッド音量を取得（コード音量と同じ）
        const padVolume = mixerSettings.chord.volume / 100;
        
        // 音量が0に近い場合は再生しない
        if (padVolume < 0.001) {
            return;
        }
        
        // ヴァイオリンらしいエンベロープ（ゆっくりとフェードイン、ビブラート効果）
        const baseVolume = (index === 0 ? 0.12 : 0.08) * 0.4; // パッド音は小さめ
        const volume = baseVolume * padVolume;
        leftGain.gain.setValueAtTime(0, audioContext.currentTime);
        rightGain.gain.setValueAtTime(0, audioContext.currentTime);
        leftGain.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.8);
        rightGain.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.8);
        leftGain.gain.linearRampToValueAtTime(volume * 0.9, audioContext.currentTime + 2.5);
        rightGain.gain.linearRampToValueAtTime(volume * 0.9, audioContext.currentTime + 2.5);

        // ビブラート効果を追加
        const vibratoDepth = 2;
        const vibratoRate = 6;
        let vibratoTime = 0;
        const vibratoInterval = setInterval(() => {
            if (!isPlaying) {
                clearInterval(vibratoInterval);
                return;
            }
            const vibratoFreq = freq + Math.sin(vibratoTime * vibratoRate) * vibratoDepth;
            leftOscillator.frequency.setValueAtTime(vibratoFreq, audioContext.currentTime);
            rightOscillator.frequency.setValueAtTime(vibratoFreq, audioContext.currentTime);
            vibratoTime += 0.1;
        }, 100);

        leftOscillator.start(audioContext.currentTime);
        rightOscillator.start(audioContext.currentTime);
        
        // パッド音のオシレーターを保存
        padOscillators.push({ 
            leftOscillator, 
            rightOscillator, 
            leftGain, 
            rightGain, 
            vibratoInterval 
        });
    });
}

// パッド音を停止
function stopPadSounds() {
    padOscillators.forEach(({ leftOscillator, rightOscillator, leftGain, rightGain, vibratoInterval }) => {
        clearInterval(vibratoInterval);
        leftGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.2);
        rightGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.2);
        setTimeout(() => {
            leftOscillator.stop();
            rightOscillator.stop();
        }, 200);
    });
    padOscillators = [];
}

// ハイハットのリズムを開始
function startHihatRhythm(bpm) {
    const beatDuration = 60 / bpm; // 秒
    const beatsPerBar = 4; // 4/4拍子に固定
    
    // リズムをループ再生
    function playRhythmLoop() {
        for (let beatIndex = 0; beatIndex < beatsPerBar; beatIndex++) {
            setTimeout(() => {
                if (isPlaying) {
                    // 4拍すべてでリズム音を再生
                    playHihat();
                }
            }, beatIndex * beatDuration * 1000);
        }
        
        // 次のループを設定
        if (isPlaying) {
            rhythmLoopTimeout = setTimeout(playRhythmLoop, beatsPerBar * beatDuration * 1000);
        }
    }
    
    // 最初のループを開始
    playRhythmLoop();
}

// リズム音を再生（パン位置調整）
function playHihat() {
    if (!audioContext || !hihatGain) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    const panner = audioContext.createStereoPanner();

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(panner);
    panner.connect(hihatGain);

    // 選択された音源に応じて波形と周波数を設定
    const rhythmSound = mixerSettings.rhythm.sound;
    switch (rhythmSound) {
        case 'click':
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            // Click用のエンベロープ設定
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            break;
        case 'kick':
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(60, audioContext.currentTime);
            // Kick用のエンベロープ設定（低く、短い）
            gainNode.gain.setValueAtTime(0.6, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
            break;
        case 'noise':
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            // Noise用のエンベロープ設定
            gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.12);
            break;
        case 'bell':
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
            // Bell用のエンベロープ設定
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            break;
        default:
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    }

    // 音源に応じてフィルター設定を変更
    if (rhythmSound === 'kick') {
        // Kick用は低周波数を通過させるローパスフィルター
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, audioContext.currentTime);
        filter.Q.setValueAtTime(1, audioContext.currentTime);
    } else {
        // その他の音源はハイパスフィルター
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(2000, audioContext.currentTime);
        filter.Q.setValueAtTime(2, audioContext.currentTime);
    }

    // パン位置を中央から少しずらす（右側に）
    panner.pan.setValueAtTime(0.2, audioContext.currentTime);

    // 音源に応じて持続時間を調整
    let duration = 0.1;
    if (rhythmSound === 'kick') {
        duration = 0.15; // Kickは少し長め
    } else if (rhythmSound === 'bell') {
        duration = 0.3; // Bellは長め
    }

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

// 個別のコードを再生
function playChord(chordName) {
    if (!audioContext) return;

    // コード名を解析
    const { root, quality } = parseChord(chordName);
    if (!root || !quality) {
        console.log(`コード解析エラー: ${chordName}`);
        return;
    }

    // ルート音を正規化（フラットをシャープに変換）
    const normalizedRoot = noteAliases[root] || root;
    
    // コードの構成音を取得
    const intervals = chordIntervals[quality] || chordIntervals['maj'];
    const frequencies = intervals.map(interval => {
        const noteIndex = noteOrder.indexOf(normalizedRoot);
        const targetNoteIndex = (noteIndex + interval) % 12;
        const targetNote = noteOrder[targetNoteIndex];
        const freq = noteFrequencies[targetNote];
        if (!freq) {
            console.log(`周波数が見つかりません: ${targetNote}`);
            return 0;
        }
        return freq;
    }).filter(freq => freq > 0);

    // コード音量を取得
    const chordVolume = mixerSettings.chord.volume / 100;

    // 音量が0に近い場合は再生しない
    if (chordVolume < 0.001) {
        return;
    }

    // 各音を再生（ピアノらしい音量バランス）
    frequencies.forEach((freq, index) => {
        // ルート音を少し大きく、他の音を少し小さく
        const baseVolume = index === 0 ? 0.4 : 0.25;
        const adjustedVolume = baseVolume * chordVolume;
        playNote(freq, adjustedVolume, 1.8, index * 0.05);
    });
}

// 個別の音を再生（コード音色）
function playNote(frequency, volume, duration, delay = 0) {
    // 音量が0に近い場合は再生しない
    if (volume < 0.001) {
        return;
    }
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    // 選択された音源に応じて波形を設定
    const chordSound = mixerSettings.chord.sound;
    switch (chordSound) {
        case 'triangle':
            oscillator.type = 'triangle';
            break;
        case 'square':
            oscillator.type = 'square';
            break;
        case 'sawtooth':
            oscillator.type = 'sawtooth';
            break;
        case 'sine':
            oscillator.type = 'sine';
            break;
        default:
            oscillator.type = 'triangle';
    }

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime + delay);

    // フィルターでピアノらしい音色を作成
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, audioContext.currentTime + delay);
    filter.Q.setValueAtTime(1, audioContext.currentTime + delay);

    // ピアノらしいエンベロープ
    gainNode.gain.setValueAtTime(0, audioContext.currentTime + delay);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + delay + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(volume * 0.3, audioContext.currentTime + delay + 0.1);
    gainNode.gain.linearRampToValueAtTime(0.001, audioContext.currentTime + delay + duration);

    oscillator.start(audioContext.currentTime + delay);
    oscillator.stop(audioContext.currentTime + delay + duration);
}

// コード名を解析
function parseChord(chordName) {
    // より柔軟なコード名の解析
    const patterns = [
        /^([A-G][#b]?)(M7|maj7?|min|m|dim|aug|sus[24]|7|m7|m7b5|m-5|m7-5)$/,
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
                'm-5': 'm-5',
                'dim': 'dim',
                'aug': 'aug',
                'sus2': 'sus2',
                'sus4': 'sus4',
                '7': '7',
                'm7': 'm7',
                'm7b5': 'm7b5',
                'm7-5': 'm7-5',
                'maj7': 'maj7'
            };

            return {
                root: root,
                quality: qualityMap[quality] || 'maj'
            };
        }
    }

    // 特殊なケース: m-5の別表記に対応
    const m5Pattern = /^([A-G][#b]?)m-5$/;
    const m5Match = chordName.match(m5Pattern);
    if (m5Match) {
        return {
            root: m5Match[1],
            quality: 'm-5'
        };
    }

    return { root: null, quality: null };
}

// コード進行の再生を停止
function stopChordProgression() {
    isPlaying = false;
    currentChordIndex = 0;
    
    // リズムループを停止
    if (rhythmLoopTimeout) {
        clearTimeout(rhythmLoopTimeout);
        rhythmLoopTimeout = null;
    }
    
    stopPadSounds();
    stopMelodySounds();
    clearChordHighlights();
    updatePlayButton();
}

// 再生ボタンの表示を更新
function updatePlayButton() {
    const playButton = document.getElementById('playButton');
    if (playButton) {
        if (isPlaying) {
            playButton.value = '⏸ 停止';
            playButton.style.background = '#f44336';
        } else {
            playButton.value = '▶ 再生';
            playButton.style.background = '#4CAF50';
        }
    }
}

// ページがアンロードされる時に停止
window.addEventListener('beforeunload', () => {
    stopChordProgression();
}); 