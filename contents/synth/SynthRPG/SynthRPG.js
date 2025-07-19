// ゲーム状態管理
class SynthRPG {
    constructor() {
        this.player = {
            hp: 100,
            maxHp: 100,
            level: 1,
            exp: 0,
            expToNext: 100,
            attack: 10,
            defense: 5,
            learnedNotes: ['C'],
            currentHp: 100
        };
        
        this.enemy = {
            hp: 100,
            maxHp: 100,
            attack: 8,
            defense: 3,
            name: 'ノートモンスター',
            sprite: '🎼',
            currentNote: 'C'
        };
        
        this.audioContext = null;
        this.isPlayerTurn = true;
        this.gameLog = [];
        this.selectedNote = null;
        
        this.init();
    }
    
    init() {
        this.setupAudio();
        this.setupEventListeners();
        this.updateUI();
    }
    
    setupAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }
    
    setupEventListeners() {
        // アクションボタン
        document.getElementById('attack-btn').addEventListener('click', () => this.executeAttack());
        document.getElementById('heal-btn').addEventListener('click', () => this.executeHeal());
        
        // 音程選択ボタン
        document.querySelectorAll('.note-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectNote(e.target));
        });
        
        // キーボードショートカット
        document.addEventListener('keydown', (e) => {
            if (this.isPlayerTurn) {
                switch(e.key.toLowerCase()) {
                    case 'a': this.executeAttack(); break;
                    case 'h': this.executeHeal(); break;
                }
            }
        });
    }
    
    // 音程を選択
    selectNote(btnElement) {
        if (!this.isPlayerTurn) return;
        
        const note = btnElement.dataset.note;
        const frequency = parseFloat(btnElement.dataset.frequency);
        
        // 音を再生
        this.playTone(frequency);
        
        // 選択状態を更新
        document.querySelectorAll('.note-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        btnElement.classList.add('selected');
        
        this.selectedNote = note;
        
        // 新しい音程を習得
        if (!this.player.learnedNotes.includes(note)) {
            this.player.learnedNotes.push(note);
        }
        
        // UIを更新してアクションボタンを有効化
        this.updateUI();
    }
    
    // 攻撃を実行
    executeAttack() {
        if (!this.isPlayerTurn || !this.selectedNote) return;
        
        this.enemy.currentNote = this.getRandomNote();
        
        // 音程比較を表示
        this.showNoteComparison(this.selectedNote, this.enemy.currentNote);
        
        // 1秒後に結果を表示
        setTimeout(() => {
            if (this.selectedNote === this.enemy.currentNote) {
                // 同じ音程の場合、プレイヤーがダメージを受ける
                const damage = Math.max(1, this.enemy.attack - this.player.defense);
                this.player.currentHp = Math.max(0, this.player.currentHp - damage);
                this.showDamage('player', `-${damage}`, 'damage');
            } else {
                // 異なる音程の場合、ダメージを与える
                const damage = Math.max(1, this.player.attack - this.enemy.defense);
                this.enemy.hp = Math.max(0, this.enemy.hp - damage);
                this.showDamage('enemy', `-${damage}`, 'damage');
            }
        }, 1000);
        
        this.resetSelection();
        
        if (this.player.currentHp <= 0) {
            setTimeout(() => this.gameOver(), 3000);
        } else if (this.enemy.hp <= 0) {
            setTimeout(() => this.defeatEnemy(), 3000);
        } else {
            this.updateUI();
        }
    }
    
    // 回復を実行
    executeHeal() {
        if (!this.isPlayerTurn || !this.selectedNote) return;
        
        this.enemy.currentNote = this.getRandomNote();
        
        // 音程比較を表示
        this.showNoteComparison(this.selectedNote, this.enemy.currentNote);
        
        // 1秒後に結果を表示
        setTimeout(() => {
            if (this.selectedNote === this.enemy.currentNote) {
                // 同じ音程の場合、回復しない
                this.showDamage('player', 'FAIL', 'miss');
            } else {
                // 異なる音程の場合、回復する
                const healAmount = Math.floor(this.player.maxHp * 0.3);
                this.player.currentHp = Math.min(this.player.maxHp, this.player.currentHp + healAmount);
                this.showDamage('player', `+${healAmount}`, 'heal');
            }
        }, 1000);
        
        this.resetSelection();
        this.updateUI();
    }
    
    // 音程比較表示
    showNoteComparison(playerNote, enemyNote) {
        // プレイヤーの音程を表示
        const playerDamageElement = document.getElementById('player-damage');
        playerDamageElement.textContent = playerNote;
        playerDamageElement.className = 'damage-display note-display';
        
        // 敵の音程を表示
        const enemyDamageElement = document.getElementById('enemy-damage');
        enemyDamageElement.textContent = enemyNote;
        enemyDamageElement.className = 'damage-display note-display';
    }
    
    // ダメージ表示
    showDamage(target, value, type) {
        const damageElement = document.getElementById(`${target}-damage`);
        damageElement.textContent = value;
        damageElement.className = `damage-display ${type}`;
        
        // 3秒後に表示をリセット
        setTimeout(() => {
            damageElement.textContent = '-';
            damageElement.className = 'damage-display';
        }, 3000);
    }
    
    // 選択をリセット
    resetSelection() {
        this.selectedNote = null;
        document.querySelectorAll('.note-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
    }
    
    // ランダムな音程を取得
    getRandomNote() {
        const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
        return notes[Math.floor(Math.random() * notes.length)];
    }
    

    

    
    // 敵を倒した
    defeatEnemy() {
        const expGained = 50;
        this.player.exp += expGained;
        
        // レベルアップチェック
        if (this.player.exp >= this.player.expToNext) {
            this.levelUp();
        }
        
        // 新しい敵を生成
        setTimeout(() => this.generateNewEnemy(), 2000);
    }
    
    // レベルアップ
    levelUp() {
        this.player.level++;
        this.player.exp -= this.player.expToNext;
        this.player.expToNext = Math.floor(this.player.expToNext * 1.2);
        this.player.attack += 2;
        this.player.defense += 1;
        this.player.maxHp += 10;
        this.player.currentHp = this.player.maxHp;
        
        // 新しい音程を習得
        const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
        const availableNotes = notes.filter(note => !this.player.learnedNotes.includes(note));
        
        if (availableNotes.length > 0) {
            const newNote = availableNotes[Math.floor(Math.random() * availableNotes.length)];
            this.player.learnedNotes.push(newNote);
        }
        
        this.updateUI();
    }
    
    // 新しい敵を生成
    generateNewEnemy() {
        const enemies = [
            { name: 'ノートモンスター', sprite: '🎼', hp: 100, attack: 8, defense: 3 },
            { name: 'コードドラゴン', sprite: '🐉', hp: 120, attack: 10, defense: 4 },
            { name: 'メロディーゴーレム', sprite: '🤖', hp: 80, attack: 12, defense: 2 },
            { name: 'ハーモニーフェアリー', sprite: '🧚', hp: 90, attack: 9, defense: 5 }
        ];
        
        const enemy = enemies[Math.floor(Math.random() * enemies.length)];
        this.enemy = {
            ...enemy,
            maxHp: enemy.hp,
            currentHp: enemy.hp,
            currentNote: this.getRandomNote()
        };
        
        this.isPlayerTurn = true;
        this.updateUI();
    }
    
    // ゲームオーバー
    gameOver() {
        this.isPlayerTurn = false;
        this.showDamage('player', 'GAME OVER', 'damage');
    }
    

    
    // 和音を再生
    playChord(notes) {
        const frequencies = {
            'C': 261.63, 'D': 293.66, 'E': 329.63, 'F': 349.23,
            'G': 392.00, 'A': 440.00, 'B': 493.88
        };
        
        notes.forEach(note => {
            if (frequencies[note]) {
                setTimeout(() => this.playTone(frequencies[note]), Math.random() * 500);
            }
        });
    }
    
    // 音を再生
    playTone(frequency) {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.5);
    }
    

    
    // UIを更新
    updateUI() {
        // プレイヤー情報
        document.getElementById('player-hp-fill').style.width = `${(this.player.currentHp / this.player.maxHp) * 100}%`;
        document.getElementById('player-hp-text').textContent = `${this.player.currentHp}/${this.player.maxHp}`;
        document.getElementById('player-level').textContent = this.player.level;
        
        // 敵情報
        document.getElementById('enemy-hp-fill').style.width = `${(this.enemy.hp / this.enemy.maxHp) * 100}%`;
        document.getElementById('enemy-hp-text').textContent = `${this.enemy.hp}/${this.enemy.maxHp}`;
        document.getElementById('enemy-name').textContent = this.enemy.name;
        document.querySelector('.enemy-sprite').textContent = this.enemy.sprite;
        
        // キャラクター情報
        document.getElementById('char-level').textContent = this.player.level;
        document.getElementById('char-exp').textContent = `${this.player.exp}/${this.player.expToNext}`;
        document.getElementById('char-attack').textContent = this.player.attack;
        document.getElementById('char-defense').textContent = this.player.defense;
        document.getElementById('char-notes').textContent = this.player.learnedNotes.join(', ');
        
        // 音程選択ボタンの有効/無効
        const noteButtons = document.querySelectorAll('.note-btn');
        noteButtons.forEach(btn => {
            const shouldEnable = this.isPlayerTurn && this.player.currentHp > 0;
            btn.disabled = !shouldEnable;
            btn.style.opacity = shouldEnable ? '1' : '0.5';
        });
        
        // アクションボタンの有効/無効
        const actionButtons = document.querySelectorAll('.action-btn');
        actionButtons.forEach(btn => {
            const shouldEnable = this.isPlayerTurn && this.player.currentHp > 0 && this.selectedNote;
            btn.disabled = !shouldEnable;
            btn.style.opacity = shouldEnable ? '1' : '0.5';
        });
    }
    

}

// ゲーム開始
document.addEventListener('DOMContentLoaded', () => {
    new SynthRPG();
}); 