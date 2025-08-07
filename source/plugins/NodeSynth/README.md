# NodeSynth

動画
https://youtu.be/nsne6Kp9Rs4

[English](#english) | [日本語](#japanese)

---

## English

A node-based software synthesizer VST3/CLAP plugin built with Rust. Create rich sounds by combining up to 12 waveform nodes with individual parameter controls in a 4×3 grid layout.

### Features

- **Node-based synthesis**: Combine up to 12 waveform nodes
- **4×3 Grid Layout**: Organized display with 4 columns and 3 rows
- **Multiple waveforms**: Sine, Square, Triangle, and Saw waves with color-coded names
- **Individual node parameters**: Gain, Detune, Phase, and Pulse Width for each node
- **MIDI input**: Full polyphonic support with note-on/off events
- **Real-time control**: Instant parameter adjustment during playback
- **Master Gain**: Overall output level control
- **Visual feedback**: Color-coded waveform names for easy identification

### Waveform Types

- **Sine Wave** (Red): Pure, smooth sinusoidal tone
- **Square Wave** (Green): Rich harmonics with adjustable pulse width
- **Triangle Wave** (Blue): Mellow, softer harmonic content
- **Saw Wave** (Yellow): Bright, buzzy sawtooth character

### Parameters

#### Master Controls
- **Master Gain**: Overall output level (0.0 - 1.0)

#### Per-Node Parameters
- **Gain**: Individual node volume (0.0 - 1.0)
- **Detune**: Pitch offset in cents (-50 to +50 cents)
- **Phase**: Waveform phase offset (0 to 360 degrees)
- **Pulse Width**: Duty cycle for square waves (0 to 100%)

### Building

#### Prerequisites
- Rust (latest stable version)
- Cargo

#### Build Commands

```bash
# Navigate to the nih-plug directory
cd Audioplugins/plugins/nih-plug

# Bundle build for VST3 and CLAP
cargo xtask bundle nodesynth --release
```

#### Output
The build creates both VST3 and CLAP plugin formats:
- `target/bundled/nodesynth.vst3` (VST3 format)
- `target/bundled/nodesynth.clap` (CLAP format)

### Installation

#### Windows
1. Copy `nodesynth.vst3` to your VST3 plugins folder:
   - `C:\Program Files\Common Files\VST3`
2. Copy `nodesynth.clap` to your CLAP plugins folder (if supported by your DAW)

#### macOS
1. Copy `nodesynth.vst3` to your VST3 plugins folder:
   - `/Library/Audio/Plug-Ins/VST3`
   - `~/Library/Audio/Plug-Ins/VST3`
2. Copy `nodesynth.clap` to your CLAP plugins folder (if supported by your DAW)

### Usage

1. **Load the plugin** in your DAW as a VST3 or CLAP instrument
2. **Add nodes** using the waveform buttons (Sine, Square, Triangle, Saw)
3. **Maximum 12 nodes** - buttons disable when limit is reached
4. **Adjust parameters** for each node individually
5. **Play MIDI notes** to hear the layered synthesis
6. **Remove nodes** using the × button on each node

### Project Structure

```
NodeSynth/
├── src/
│   ├── lib.rs          # Main plugin entry point and GUI
│   ├── nodes.rs        # Node system and waveform generation
│   └── synth.rs        # Synthesis engine and MIDI handling
├── Cargo.toml          # Dependencies and build configuration
└── README.md           # This file
```

### Dependencies and Licenses

#### Core Framework
- **nih-plug** (ISC License) - Audio plugin framework by Robbert van der Helm
- **egui** (MIT/Apache-2.0) - Immediate mode GUI library

#### Additional Dependencies
- **serde** (MIT/Apache-2.0) - Serialization framework

### License

This project is licensed under the MIT License.

### Author

yuuenchi

### Version

0.1.0

---

## Japanese

Rustで構築されたノードベースのソフトウェアシンセサイザーVST3/CLAPプラグインです。最大12個の波形ノードを4×3グリッドレイアウトで組み合わせ、個別パラメータコントロールで豊かなサウンドを作成できます。

### 機能

- **ノードベース合成**: 最大12個の波形ノードを組み合わせ
- **4×3グリッドレイアウト**: 4列3行の整理された表示
- **複数の波形**: サイン、矩形、三角、のこぎり波（色分け表示）
- **個別ノードパラメータ**: 各ノードのゲイン、デチューン、位相、パルス幅
- **MIDI入力**: ノートオン/オフイベントによる完全なポリフォニック対応
- **リアルタイム制御**: 再生中の瞬時パラメータ調整
- **マスターゲイン**: 全体出力レベル制御
- **視覚的フィードバック**: 波形名の色分けで簡単識別

### 波形タイプ

- **サイン波**（赤色）: 純粋で滑らかな正弦波音色
- **矩形波**（緑色）: パルス幅調整可能な豊富な倍音
- **三角波**（青色）: まろやかで柔らかい倍音成分
- **のこぎり波**（黄色）: 明るくバズ感のあるのこぎり波特性

### パラメータ

#### マスターコントロール
- **マスターゲイン**: 全体出力レベル（0.0 - 1.0）

#### ノード別パラメータ
- **ゲイン**: 個別ノード音量（0.0 - 1.0）
- **デチューン**: セント単位のピッチオフセット（-50 〜 +50セント）
- **位相**: 波形位相オフセット（0 〜 360度）
- **パルス幅**: 矩形波のデューティサイクル（0 〜 100%）

### ビルド

#### 前提条件
- Rust（最新安定版）
- Cargo

#### ビルドコマンド

```bash
# nih-plugディレクトリに移動
cd Audioplugins/plugins/nih-plug

# VST3とCLAP用バンドルビルド
cargo xtask bundle nodesynth --release
```

#### 出力
ビルドによりVST3とCLAPの両プラグイン形式が作成されます：
- `target/bundled/nodesynth.vst3`（VST3形式）
- `target/bundled/nodesynth.clap`（CLAP形式）

### インストール

#### Windows
1. `nodesynth.vst3`をVST3プラグインフォルダにコピー：
   - `C:\Program Files\Common Files\VST3`
2. `nodesynth.clap`をCLAPプラグインフォルダにコピー（DAWが対応している場合）

#### macOS
1. `nodesynth.vst3`をVST3プラグインフォルダにコピー：
   - `/Library/Audio/Plug-Ins/VST3`
   - `~/Library/Audio/Plug-Ins/VST3`
2. `nodesynth.clap`をCLAPプラグインフォルダにコピー（DAWが対応している場合）

### 使い方

1. **プラグインをロード** - DAWでVST3またはCLAPインストゥルメントとして読み込み
2. **ノードを追加** - 波形ボタン（Sine、Square、Triangle、Saw）を使用
3. **最大12個まで** - 制限に達するとボタンが無効化
4. **パラメータ調整** - 各ノードを個別に調整
5. **MIDIノート演奏** - レイヤー合成サウンドを再生
6. **ノード削除** - 各ノードの×ボタンで削除

### プロジェクト構造

```
NodeSynth/
├── src/
│   ├── lib.rs          # メインプラグインエントリポイントとGUI
│   ├── nodes.rs        # ノードシステムと波形生成
│   └── synth.rs        # 合成エンジンとMIDI処理
├── Cargo.toml          # 依存関係とビルド設定
└── README.md           # このファイル
```

### 依存関係とライセンス

#### コアフレームワーク
- **nih-plug**（ISCライセンス）- Robbert van der Helmによるオーディオプラグインフレームワーク
- **egui**（MIT/Apache-2.0）- イミディエートモードGUIライブラリ

#### 追加依存関係
- **serde**（MIT/Apache-2.0）- シリアライゼーションフレームワーク

### ライセンス

このプロジェクトはMITライセンスの下でライセンスされています。

### 作者

yuuenchi

### バージョン

0.1.0