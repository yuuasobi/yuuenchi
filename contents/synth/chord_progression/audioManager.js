// AudioManager クラス - Web Audio APIの管理
class AudioManager {
    constructor() {
        this.audioContext = null;
        this.oscillators = new Map();
        this.gainNodes = new Map();
        this.isPlaying = false;
        this.currentChordIndex = 0;
        this.chordProgression = [];
        this.padOscillators = [];
        this.hihatGain = null;
        this.melodyOscillators = [];
        this.rhythmLoopTimeout = null;
        
        // ミキサー設定
        this.mixerSettings = {
            rhythm: { sound: 'click', volume: 80 },
            chord: { sound: 'triangle', volume: 70 },
            melody: { sound: 'sawtooth', volume: 60 }
        };
        
        // 音階の周波数マッピング
        this.noteFrequencies = {
            'C': 261.63, 'C#': 277.18, 'Db': 277.18,
            'D': 293.66, 'D#': 311.13, 'Eb': 311.13,
            'E': 329.63,
            'F': 349.23, 'F#': 369.99, 'Gb': 369.99,
            'G': 392.00, 'G#': 415.30, 'Ab': 415.30,
            'A': 440.00, 'A#': 466.16, 'Bb': 466.16,
            'B': 493.88
        };
        
        // コードの構成音マッピング
        this.chordIntervals = {
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
    }

    // AudioContextの初期化
    async initialize() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            await this.audioContext.resume();
            console.log('AudioContext初期化成功');
        } catch (error) {
            console.error('AudioContext初期化エラー:', error);
            throw error;
        }
    }

    // ミキサー設定の更新
    updateMixerSettings() {
        try {
            const rhythmSound = document.getElementById('rhythmSound');
            const chordSound = document.getElementById('chordSound');
            const melodySound = document.getElementById('melodySound');
            const rhythmVolume = document.getElementById('rhythmVolume');
            const chordVolume = document.getElementById('chordVolume');
            const melodyVolume = document.getElementById('melodyVolume');
            
            if (rhythmSound) this.mixerSettings.rhythm.sound = rhythmSound.value;
            if (chordSound) this.mixerSettings.chord.sound = chordSound.value;
            if (melodySound) this.mixerSettings.melody.sound = melodySound.value;
            if (rhythmVolume) this.mixerSettings.rhythm.volume = parseInt(rhythmVolume.value);
            if (chordVolume) this.mixerSettings.chord.volume = parseInt(chordVolume.value);
            if (melodyVolume) this.mixerSettings.melody.volume = parseInt(melodyVolume.value);
            
            console.log('ミキサー設定更新:', this.mixerSettings);
        } catch (error) {
            console.error('ミキサー設定更新エラー:', error);
        }
    }

    // コード進行の再生
    async playChordProgression() {
        if (this.isPlaying) {
            this.stopChordProgression();
            return;
        }

        try {
            // AudioContextが初期化されていない場合は初期化
            if (!this.audioContext || this.audioContext.state === 'suspended') {
                await this.initialize();
            }

            // ミキサー設定を更新
            this.updateMixerSettings();

            // コード進行を取得
            this.chordProgression = this.getCurrentChordProgression();
            
            if (this.chordProgression.length === 0) {
                console.warn('コード進行が空です');
                return;
            }

            this.isPlaying = true;
            this.currentChordIndex = 0;
            this.updatePlayButton();
            
            // 最初のコードを再生
            this.playNextChord();
            
        } catch (error) {
            console.error('コード進行再生エラー:', error);
            this.handleAudioError(error);
        }
    }

    // 現在のコード進行を取得
    getCurrentChordProgression() {
        const progression = [];
        for (let i = 1; i <= 8; i++) {
            const chordElement = document.getElementById(`m${i}`);
            if (chordElement && chordElement.textContent.trim()) {
                progression.push(chordElement.textContent.trim());
            }
        }
        return progression;
    }

    // 次のコードを再生
    playNextChord() {
        if (!this.isPlaying || this.currentChordIndex >= this.chordProgression.length) {
            this.stopChordProgression();
            return;
        }

        const chordName = this.chordProgression[this.currentChordIndex];
        console.log(`再生中: ${chordName} (${this.currentChordIndex + 1}/${this.chordProgression.length})`);

        // 現在のコードをハイライト
        this.highlightCurrentChord();

        // コードを再生
        this.playChord(chordName);

        // 次のコードの再生をスケジュール
        const bpm = this.getCurrentBPM();
        const beatDuration = (60 / bpm) * 1000; // ミリ秒
        
        setTimeout(() => {
            this.currentChordIndex++;
            this.playNextChord();
        }, beatDuration);
    }

    // 現在のBPMを取得
    getCurrentBPM() {
        const bpmElement = document.getElementById('bpm-value');
        return bpmElement ? parseInt(bpmElement.textContent) : 120;
    }

    // コードを再生
    playChord(chordName) {
        try {
            const chord = this.parseChord(chordName);
            const frequencies = this.getChordFrequencies(chord);
            
            frequencies.forEach((freq, index) => {
                this.playNote(freq, this.mixerSettings.chord.volume, 1000, index * 50);
            });
        } catch (error) {
            console.error('コード再生エラー:', error);
        }
    }

    // コードを解析
    parseChord(chordName) {
        // 基本的なコード解析（C, Cm, C7, Cm7, Cmaj7など）
        const match = chordName.match(/^([A-G][#b]?)(.*)$/);
        if (!match) {
            console.warn(`コード解析失敗: ${chordName}`);
            return { root: 'C', type: 'maj' };
        }

        const root = match[1];
        const type = match[2] || 'maj';

        return { root, type };
    }

    // コードの周波数を取得
    getChordFrequencies(chord) {
        const intervals = this.chordIntervals[chord.type] || this.chordIntervals['maj'];
        const rootFreq = this.noteFrequencies[chord.root] || 261.63;
        
        return intervals.map(interval => {
            return rootFreq * Math.pow(2, interval / 12);
        });
    }

    // 単音を再生
    playNote(frequency, volume, duration, delay = 0) {
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            // 波形を設定
            oscillator.type = this.mixerSettings.chord.sound;
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            
            // 音量を設定
            const normalizedVolume = volume / 100;
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(normalizedVolume, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration / 1000);
            
            // 再生開始
            oscillator.start(this.audioContext.currentTime + delay / 1000);
            oscillator.stop(this.audioContext.currentTime + delay / 1000 + duration / 1000);
            
            // オシレーターを管理
            this.oscillators.set(oscillator, true);
            oscillator.onended = () => {
                this.oscillators.delete(oscillator);
            };
            
        } catch (error) {
            console.error('単音再生エラー:', error);
        }
    }

    // 現在のコードをハイライト
    highlightCurrentChord() {
        this.clearChordHighlights();
        
        const chordElements = document.querySelectorAll('.chordprog-table td');
        chordElements.forEach((element, index) => {
            if (index === this.currentChordIndex) {
                element.style.backgroundColor = '#ffeb3b';
                element.style.color = '#000';
            }
        });
    }

    // コードハイライトをクリア
    clearChordHighlights() {
        const chordElements = document.querySelectorAll('.chordprog-table td');
        chordElements.forEach(element => {
            element.style.backgroundColor = '';
            element.style.color = '';
        });
    }

    // コード進行の停止
    stopChordProgression() {
        this.isPlaying = false;
        this.currentChordIndex = 0;
        this.cleanup();
        this.clearChordHighlights();
        this.updatePlayButton();
        console.log('コード進行停止');
    }

    // リソースのクリーンアップ
    cleanup() {
        // オシレーターを停止
        this.oscillators.forEach((value, oscillator) => {
            try {
                oscillator.stop();
            } catch (error) {
                console.warn('オシレーター停止エラー:', error);
            }
        });
        this.oscillators.clear();
        
        // ゲインノードをクリア
        this.gainNodes.clear();
        
        // タイムアウトをクリア
        if (this.rhythmLoopTimeout) {
            clearTimeout(this.rhythmLoopTimeout);
            this.rhythmLoopTimeout = null;
        }
    }

    // プレイボタンの更新
    updatePlayButton() {
        const playButton = document.getElementById('playButton');
        if (playButton) {
            if (this.isPlaying) {
                playButton.value = '⏹ Stop';
                playButton.style.background = '#f44336';
            } else {
                playButton.value = '▶ Play';
                playButton.style.background = '#4CAF50';
            }
        }
    }

    // エラーハンドリング
    handleAudioError(error) {
        ErrorHandler.handleAudioError(error);
    }

    // 通知の表示
    showNotification(message, type = 'info') {
        ErrorHandler.showNotification(message, type);
    }
}

// グローバルインスタンスの作成
const audioManager = new AudioManager();

// グローバル関数として公開
window.playChordProgression = function() {
    audioManager.playChordProgression();
};

window.stopChordProgression = function() {
    audioManager.stopChordProgression();
}; 