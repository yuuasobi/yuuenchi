# ModulationWaveMix

LFO（低周波オシレーター）の波形を視覚的にコントロールし、4つの基本波形（サイン波・三角波・ノコギリ波・矩形波）を組み合わせて合成波形を作成できるオーディオエフェクトプラグインです。

---

## 概要

- **名称**: ModulationWaveMix
- **対応フォーマット**: CLAP / VST3
- **開発基盤**: Rust + [nih-plug](https://github.com/robbert-vdh/nih-plug) + [egui](https://github.com/emilk/egui)
- **用途**: LFOによる各種パラメータのモジュレーション制御、合成波形デザイン

---

## 主な機能

### 1. リアルタイム波形表示
- X軸: 時間（0〜1）
- Y軸: 出力振幅（-1〜1）
- グリッド表示による視覚的な波形確認
- 周波数と深さパラメータに応じた動的な波形変化

### 2. 合成波形エディタ（Wave Mix）
- **Sine（サイン波）**: 滑らかな正弦波
- **Triangle（三角波）**: 直線的な三角波
- **Saw（ノコギリ波）**: 急激な変化を持つノコギリ波
- **Square（矩形波）**: デジタル的な矩形波
- 各波形の重みを0.0〜1.0の範囲で調整可能
- 合成波形は自動的に正規化（-1.0〜1.0の範囲に収める）

### 3. パラメータコントロール
- **Frequency（周波数）**: 0.1Hz〜10Hzの範囲でLFOの周期を制御
- **Depth（深さ）**: 0.0〜1.0の範囲でモジュレーションの強度を制御

### 4. デフォルト設定
- **初期波形**: サイン波（Sine: 1.0, その他: 0.0）
- **初期周波数**: 5.0Hz
- **初期深さ**: 0.5

---

## 使い方

1. **DAWに読み込み**: CLAP/VST3プラグインとしてDAWに読み込み
2. **波形調整**: Wave Mixセクションで各波形の重みを調整
3. **パラメータ設定**: FrequencyとDepthでモジュレーションの特性を設定
4. **リアルタイム確認**: 上部の波形表示で現在の合成波形を確認
5. **音声処理**: プラグインがLFOモジュレーションを音声に適用

---

## ビルド方法

### 前提条件
- Rust 1.70以上
- Cargo

### ビルド手順

1. **通常ビルド**:
```bash
cargo build --release --package ModulationWaveMix
```

2. **バンドルビルド**（推奨）:
```bash
cargo xtask bundle ModulationWaveMix --release
```

### 出力ファイル
- `target/bundled/ModulationWaveMix.clap` (CLAP形式)
- `target/bundled/ModulationWaveMix.vst3` (VST3形式)

---

## 技術仕様

### 波形生成アルゴリズム
- **サイン波**: `sin(phase * 2π)`
- **三角波**: 線形補間による三角波形
- **ノコギリ波**: 線形増加（0→1）→急激な下降（1→-1）
- **矩形波**: デューティ比50%の矩形波形

### 合成波形の正規化
```
合成値 = (sine値 + triangle値 + saw値 + square値) / 総重み
```

### 音声処理
- ステレオ/モノラル対応
- サンプル精度のオートメーション対応
- リアルタイムLFO位相更新

---

## ライセンス・クレジット

### 本プラグイン
- **ライセンス**: ISC License
- **作者**: yuuenchi

### 使用ライブラリ
- **nih_plug**: Audio plugin framework - ISC License (Robbert van der Helm)
- **egui**: GUI framework - MIT OR Apache-2.0 License (Emil Ernerfeldt)
- **egui_glow**: OpenGL rendering backend - MIT OR Apache-2.0 License (Emil Ernerfeldt)
- **egui_baseview**: GUI integration - MIT License (Billy D. Spelchan)
- **parking_lot**: Thread-safe locks - MIT OR Apache-2.0 License (Amanieu d'Antras)
- **serde**: Serialization framework - MIT OR Apache-2.0 License (The Serde Developers)

---

## 開発・連絡先

- **Author**: yuuenchi
- **GitHub**: https://github.com/robbert-vdh/nih-plug

ご要望・バグ報告・機能追加リクエスト等はお気軽にどうぞ！