// 音楽理論データの定義
const MUSIC_THEORY_DATA = {
    // スケールデータ
    scales: {
        major: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
        minor: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        dorian: ['D', 'E', 'F', 'G', 'A', 'B', 'C'],
        phrygian: ['E', 'F', 'G', 'A', 'B', 'C', 'D'],
        lydian: ['F', 'G', 'A', 'B', 'C', 'D', 'E'],
        mixolydian: ['G', 'A', 'B', 'C', 'D', 'E', 'F'],
        aeolian: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        locrian: ['B', 'C', 'D', 'E', 'F', 'G', 'A']
    },

    // キーデータ（シャープ系）
    keysharp: [
        ["G", "A", "B", "C", "D", "E", "F#"],
        ["D", "E", "F#", "G", "A", "B", "C#"],
        ["A", "B", "C#", "D", "E", "F#", "G#"],
        ["E", "F#", "G#", "A", "B", "C#", "D#"],
        ["B", "C#", "D#", "E", "F#", "G#", "A#"],
        ["F#", "G#", "A#", "B", "C#", "D#", "E#"],
        ["C#", "D#", "E#", "F#", "G#", "A#", "B#"]
    ],

    // キーデータ（フラット系）
    keyflat: [
        ["F", "G", "A", "Bb", "C", "D", "E"],
        ["Bb", "C", "D", "Eb", "F", "G", "A"],
        ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
        ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
        ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"],
        ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"],
        ["Cb", "Db", "Eb", "Fb", "Gb", "Ab", "Bb"]
    ],

    // コードインターバル
    chordIntervals: {
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
    },

    // コード機能
    chordFunctions: {
        fnc: ["T", "SD", "T/D", "SD", "D", "T", "D/SD"],
        num: ["Ⅰ", "Ⅱm", "Ⅲm", "Ⅳ", "Ⅴ", "Ⅵm", "Ⅶm-5"],
        churchmode: ["ｱｲｵﾆｱﾝ", "ﾄﾞﾘｱﾝ", "ﾌﾘｼﾞｱﾝ", "ﾘﾃﾞｨｱﾝ", "ﾐｸｿﾘﾃﾞｨｱﾝ", "ｴｵﾘｱﾝ", "ﾛｸﾘｱﾝ"]
    },

    // 転調データ
    modulationData: {
        default: {
            scalechange: ["G / Em (#1)", "D / Bm (#2)", "A / F#m (#3)", "F / Dm (b1)", "Bb / Gm (b2)", "Eb / Cm (b3)", "E / C#m (#4)", "Ab / Fm (b4)"],
            scalechange0: ["GM7", "Am7", "Bm7", "CM7", "D7", "Em7", "F#m7-5"],
            scalechange1: ["DM7", "Em7", "F#m7", "GM7", "A7", "Bm7", "C#m7-5"],
            scalechange2: ["AM7", "Bm7", "C#m7", "DM7", "E7", "F#m7", "G#m7-5"],
            scalechange3: ["FM7", "Gm7", "Am7", "BbM7", "C7", "Dm7", "Em7-5"],
            scalechange4: ["BbM7", "Cm7", "Dm7", "EbM7", "F7", "Gm7", "Am7-5"],
            scalechange5: ["EbM7", "Fm7", "Gm7", "AbM7", "Bb7", "Cm7", "Dm7-5"],
            scalechange6: ["EM7", "F#m7", "G#m7", "AM7", "B7", "C#m7", "D#m7-5"],
            scalechange7: ["AbM7", "Bbm7", "Cm7", "DbM7", "Eb7", "Fm7", "Gm7-5"]
        },
        sharp0: {
            scalechange: ["D / Bm (#2)", "A / F#m (#3)", "E / C#m (#4)", "C / Am", "F / Dm (b1)", "Bb / Gm (b2)", "B / G#m (#5)", "Eb / Cm (b3)"],
            scalechange0: ["DM7", "Em7", "F#m7", "GM7", "A7", "Bm7", "C#m7-5"],
            scalechange1: ["AM7", "Bm7", "C#m7", "DM7", "E7", "F#m7", "G#m7-5"],
            scalechange2: ["EM7", "F#m7", "G#m7", "AM7", "B7", "C#m7", "D#m7-5"],
            scalechange3: ["CM7", "Dm7", "Em7", "FM7", "G7", "Am7", "Bm7-5"],
            scalechange4: ["FM7", "Gm7", "Am7", "BbM7", "C7", "Dm7", "Em7-5"],
            scalechange5: ["BbM7", "Cm7", "Dm7", "EbM7", "F7", "Gm7", "Am7-5"],
            scalechange6: ["BM7", "C#m7", "D#m7 (Ebm7)", "EM7", "F#7", "G#m7", "A#m7-5"],
            scalechange7: ["EbM7", "Fm7", "Gm7", "AbM7", "Bb7", "Cm7", "Dm7-5"]
        }
    },

    // テンション
    tension: [
        "9th" + " / " + "+13th", "+11th", "+11th" + " / " + "+13th",
        "9th" + " / " + "11th" + " / " + "13th", "9th", "+11th" + " / " + "+13th", "+13th"
    ],

    // オルタードテンション
    alteredTension: ["+#11th", "+b13", "", "", "", "", ""],

    // ジャンル
    genres: ['Pop', 'Rock', 'Jazz', 'Blues', 'Classical', 'Electronic', 'Folk', 'R&B'],

    // リズムパターン
    rhythms: ['4/4', '3/4', '6/8', '2/4', '5/4', '7/8'],

    // テンポ範囲
    tempoRange: {
        min: 60,
        max: 200,
        default: 120
    },

    // 音階の順序（シャープ・フラット対応）
    noteOrder: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    
    // 音階のエイリアス
    noteAliases: {
        'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#',
        'Cb': 'B', 'Fb': 'E'
    },

    // 周波数マッピング
    noteFrequencies: {
        'C': 261.63, 'C#': 277.18, 'Db': 277.18,
        'D': 293.66, 'D#': 311.13, 'Eb': 311.13,
        'E': 329.63,
        'F': 349.23, 'F#': 369.99, 'Gb': 369.99,
        'G': 392.00, 'G#': 415.30, 'Ab': 415.30,
        'A': 440.00, 'A#': 466.16, 'Bb': 466.16,
        'B': 493.88
    }
};

// データアクセサークラス
class MusicTheoryDataAccessor {
    static getScale(scaleType) {
        return MUSIC_THEORY_DATA.scales[scaleType] || MUSIC_THEORY_DATA.scales.major;
    }

    static getKeySharp(index = 0) {
        return MUSIC_THEORY_DATA.keysharp[index] || MUSIC_THEORY_DATA.keysharp[0];
    }

    static getKeyFlat(index = 0) {
        return MUSIC_THEORY_DATA.keyflat[index] || MUSIC_THEORY_DATA.keyflat[0];
    }

    static getChordIntervals(chordType) {
        return MUSIC_THEORY_DATA.chordIntervals[chordType] || [];
    }

    static getChordFunctions() {
        return MUSIC_THEORY_DATA.chordFunctions;
    }

    static getModulationData(scale) {
        return MUSIC_THEORY_DATA.modulationData[scale] || MUSIC_THEORY_DATA.modulationData.default;
    }

    static getTension(index) {
        return MUSIC_THEORY_DATA.tension[index] || '';
    }

    static getAlteredTension(index) {
        return MUSIC_THEORY_DATA.alteredTension[index] || '';
    }

    static getRandomGenre() {
        const genres = MUSIC_THEORY_DATA.genres;
        return genres[Math.floor(Math.random() * genres.length)];
    }

    static getRandomRhythm() {
        const rhythms = MUSIC_THEORY_DATA.rhythms;
        return rhythms[Math.floor(Math.random() * rhythms.length)];
    }

    static getRandomTempo() {
        const { min, max } = MUSIC_THEORY_DATA.tempoRange;
        return Math.floor(Math.random() * (max - min) + min);
    }

    static getNoteFrequency(note) {
        return MUSIC_THEORY_DATA.noteFrequencies[note] || 0;
    }

    static getNoteAlias(note) {
        return MUSIC_THEORY_DATA.noteAliases[note] || note;
    }
};

// グローバルに公開
if (typeof window !== 'undefined') {
    window.MUSIC_THEORY_DATA = MUSIC_THEORY_DATA;
    window.MusicTheoryDataAccessor = MusicTheoryDataAccessor;
} 