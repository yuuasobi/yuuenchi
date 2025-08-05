# Batch Image Resizer (img_resize.py)

English follows. 日本語は後半にあります。

---

## Overview
This tool resizes all image files in a selected folder (including subfolders) by a specified percentage, preserving the directory structure. The resized images are saved in a new folder in the current working directory.

## Features
- Supports batch resizing of images in subfolders
- Supports common image formats: jpg, jpeg, png, bmp, gif, tiff, webp
- Specify resize percentage (10% to 200%)
- Progress bar for visual feedback
- Remembers the last selected folder
- Simple and intuitive GUI

## Usage
1. Run `img_resize.py` with Python (or use the exe if available).
2. Click "Browse" to select the folder containing images.
   - The last used folder is automatically set.
3. Set the resize percentage using the slider or input box.
4. Click "Start resizing" to begin.
5. Progress is shown in the progress bar. When finished, the output folder path is displayed.

---

# バッチ画像リサイズツール (img_resize.py)

## 概要
このツールは、選択したフォルダ（サブフォルダも含む）内のすべての画像ファイルを指定したパーセンテージで一括リサイズし、元のディレクトリ構造を保ったまま新しいフォルダに保存します。

## 主な機能
- サブフォルダも含めた画像の一括リサイズ
- 対応画像形式：jpg, jpeg, png, bmp, gif, tiff, webp
- リサイズ率（10%～200%）を指定可能
- プログレスバーで進捗表示
- 前回選択したフォルダを記憶
- シンプルで直感的なGUI

## 使い方
1. Pythonで`img_resize.py`を実行（またはexe版を利用）。
2. 「Browse」ボタンで画像フォルダを選択。
   - 前回使用したフォルダが自動でセットされます。
3. スライダーや入力欄でリサイズ率を設定。
4. 「Start resizing」ボタンで処理開始。
5. 進捗はプログレスバーで確認。完了後、出力先フォルダのパスが表示されます。 