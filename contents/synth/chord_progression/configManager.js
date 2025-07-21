// ConfigurationManager クラス - 設定の管理
class ConfigurationManager {
    constructor() {
        this.defaults = {
            bpm: 120,
            volume: {
                rhythm: 80,
                chord: 70,
                melody: 60
            },
            sounds: {
                rhythm: 'click',
                chord: 'triangle',
                melody: 'sawtooth'
            },
            scale: 'default',
            options: {
                threeChord: false,
                sevenChord: false
            },
            ui: {
                theme: 'default',
                animations: true,
                autoPlay: false
            }
        };
        this.current = this.loadSettings();
        this.initializeUI();
    }

    // 設定の読み込み
    loadSettings() {
        try {
            const saved = localStorage.getItem('chordProgressionSettings');
            if (saved) {
                const parsed = JSON.parse(saved);
                return this.mergeSettings(this.defaults, parsed);
            }
        } catch (error) {
            console.error('設定読み込みエラー:', error);
        }
        return this.defaults;
    }

    // 設定の保存
    saveSettings() {
        try {
            localStorage.setItem('chordProgressionSettings', JSON.stringify(this.current));
            console.log('設定を保存しました:', this.current);
        } catch (error) {
            console.error('設定保存エラー:', error);
        }
    }

    // 設定のマージ
    mergeSettings(defaults, saved) {
        const merged = { ...defaults };
        
        // 深いマージを実行
        Object.keys(saved).forEach(key => {
            if (typeof saved[key] === 'object' && saved[key] !== null && !Array.isArray(saved[key])) {
                merged[key] = this.mergeSettings(merged[key] || {}, saved[key]);
            } else {
                merged[key] = saved[key];
            }
        });
        
        return merged;
    }

    // UIの初期化
    initializeUI() {
        this.updateVolumeSliders();
        this.updateSoundSelects();
        this.updateScaleSelect();
        this.updateCheckboxes();
        this.setupEventListeners();
    }

    // ボリュームスライダーの更新
    updateVolumeSliders() {
        const volumeElements = {
            'rhythmVolume': this.current.volume.rhythm,
            'chordVolume': this.current.volume.chord,
            'melodyVolume': this.current.volume.melody
        };

        Object.keys(volumeElements).forEach(elementId => {
            const element = document.getElementById(elementId);
            if (element) {
                element.value = volumeElements[elementId];
                const valueDisplay = element.parentElement.querySelector('.volume-value');
                if (valueDisplay) {
                    valueDisplay.textContent = volumeElements[elementId];
                }
            }
        });
    }

    // サウンドセレクトの更新
    updateSoundSelects() {
        const soundElements = {
            'rhythmSound': this.current.sounds.rhythm,
            'chordSound': this.current.sounds.chord,
            'melodySound': this.current.sounds.melody
        };

        Object.keys(soundElements).forEach(elementId => {
            const element = document.getElementById(elementId);
            if (element) {
                element.value = soundElements[elementId];
            }
        });
    }

    // スケールセレクトの更新
    updateScaleSelect() {
        const scaleElement = document.getElementById('scale');
        if (scaleElement) {
            scaleElement.value = this.current.scale;
        }
    }

    // チェックボックスの更新
    updateCheckboxes() {
        const checkboxElements = {
            'threeChordCheck': this.current.options.threeChord,
            'sevenbasechord': this.current.options.sevenChord
        };

        Object.keys(checkboxElements).forEach(elementId => {
            const element = document.getElementById(elementId);
            if (element) {
                element.checked = checkboxElements[elementId];
            }
        });
    }

    // イベントリスナーの設定
    setupEventListeners() {
        // ボリュームスライダーのイベント
        const volumeSliders = document.querySelectorAll('.volume-slider');
        volumeSliders.forEach(slider => {
            slider.addEventListener('input', (e) => {
                this.handleVolumeChange(e);
            });
        });

        // サウンドセレクトのイベント
        const soundSelects = document.querySelectorAll('.sound-select');
        soundSelects.forEach(select => {
            select.addEventListener('change', (e) => {
                this.handleSoundChange(e);
            });
        });

        // スケールセレクトのイベント
        const scaleSelect = document.getElementById('scale');
        if (scaleSelect) {
            scaleSelect.addEventListener('change', (e) => {
                this.handleScaleChange(e);
            });
        }

        // チェックボックスのイベント
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.handleCheckboxChange(e);
            });
        });

        // BPM変更のイベント
        const bpmButton = document.querySelector('input[value="Tempo"]');
        if (bpmButton) {
            bpmButton.addEventListener('click', () => {
                this.handleBPMChange();
            });
        }
    }

    // ボリューム変更の処理
    handleVolumeChange(event) {
        const slider = event.target;
        const value = parseInt(slider.value);
        const valueDisplay = slider.parentElement.querySelector('.volume-value');
        
        if (valueDisplay) {
            valueDisplay.textContent = value;
        }

        // 設定を更新
        const sliderId = slider.id;
        if (sliderId === 'rhythmVolume') {
            this.current.volume.rhythm = value;
        } else if (sliderId === 'chordVolume') {
            this.current.volume.chord = value;
        } else if (sliderId === 'melodyVolume') {
            this.current.volume.melody = value;
        }

        this.saveSettings();
    }

    // サウンド変更の処理
    handleSoundChange(event) {
        const select = event.target;
        const value = select.value;
        const selectId = select.id;

        // 設定を更新
        if (selectId === 'rhythmSound') {
            this.current.sounds.rhythm = value;
        } else if (selectId === 'chordSound') {
            this.current.sounds.chord = value;
        } else if (selectId === 'melodySound') {
            this.current.sounds.melody = value;
        }

        this.saveSettings();
    }

    // スケール変更の処理
    handleScaleChange(event) {
        const select = event.target;
        this.current.scale = select.value;
        this.saveSettings();
    }

    // チェックボックス変更の処理
    handleCheckboxChange(event) {
        const checkbox = event.target;
        const isChecked = checkbox.checked;
        const checkboxId = checkbox.id;

        // 設定を更新
        if (checkboxId === 'threeChordCheck') {
            this.current.options.threeChord = isChecked;
        } else if (checkboxId === 'sevenbasechord') {
            this.current.options.sevenChord = isChecked;
        }

        this.saveSettings();
    }

    // BPM変更の処理
    handleBPMChange() {
        const newBPM = MusicTheoryDataAccessor.getRandomTempo();
        this.current.bpm = newBPM;
        
        // UIを更新
        const bpmElement = document.getElementById('bpm');
        const bpmDisplayElement = document.getElementById('bpm-value');
        
        if (bpmElement) bpmElement.textContent = newBPM;
        if (bpmDisplayElement) bpmDisplayElement.textContent = newBPM;
        
        this.saveSettings();
    }

    // 設定のリセット
    resetSettings() {
        this.current = { ...this.defaults };
        this.initializeUI();
        this.saveSettings();
        console.log('設定をリセットしました');
    }

    // 設定のエクスポート
    exportSettings() {
        try {
            const dataStr = JSON.stringify(this.current, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = 'chord_progression_settings.json';
            link.click();
            
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('設定エクスポートエラー:', error);
        }
    }

    // 設定のインポート
    importSettings(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const imported = JSON.parse(e.target.result);
                    this.current = this.mergeSettings(this.defaults, imported);
                    this.initializeUI();
                    this.saveSettings();
                    console.log('設定をインポートしました');
                    resolve();
                } catch (error) {
                    console.error('設定インポートエラー:', error);
                    reject(error);
                }
            };
            reader.readAsText(file);
        });
    }

    // 設定の取得
    getSetting(path) {
        const keys = path.split('.');
        let value = this.current;
        
        for (const key of keys) {
            if (value && typeof value === 'object' && key in value) {
                value = value[key];
            } else {
                return undefined;
            }
        }
        
        return value;
    }

    // 設定の設定
    setSetting(path, value) {
        const keys = path.split('.');
        let current = this.current;
        
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!(key in current) || typeof current[key] !== 'object') {
                current[key] = {};
            }
            current = current[key];
        }
        
        current[keys[keys.length - 1]] = value;
        this.saveSettings();
    }
}

// グローバルインスタンスの作成
const configManager = new ConfigurationManager();

// グローバル関数として公開
window.configManager = configManager;
window.resetSettings = () => configManager.resetSettings();
window.exportSettings = () => configManager.exportSettings();
window.importSettings = (file) => configManager.importSettings(file); 