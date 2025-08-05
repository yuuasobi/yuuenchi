# File Extractor by Extension (extract_by_ext.py)

English follows. 日本語は後半にあります。

---

## Overview
This tool extracts only files with specified extensions from a selected folder (including subfolders), preserving the original directory structure. The extracted files are saved in a new folder in the current working directory.

## Features
- Specify multiple extensions (e.g., txt, png) separated by commas
- Filter by filename substring (optional)
- Recursively searches subfolders
- Preserves original directory structure when copying
- Progress bar for visual feedback
- Remembers the last selected folder, extension(s), and filename filter
- All input settings are saved/restored together in one file
- If you extract multiple times to the same output folder, previous files are kept and new files are added (existing files with the same name are overwritten)
- Simple and intuitive GUI

## Usage
1. Run `extract_by_ext.py` with Python (or use the exe if available).
2. Click "Browse" to select the source folder.
   - The last used folder and extension(s) are automatically set.
3. Enter the extension(s) you want to extract, separated by commas (e.g., txt,png).
4. Click "Extract" to start. Only files with the specified extensions will be copied, preserving the folder structure.
5. Progress is shown in the progress bar. When finished, the output folder path is displayed.

---

# 拡張子別ファイル抽出ツール (extract_by_ext.py)

## 概要
このツールは、選択したフォルダ（サブフォルダも含む）から指定した拡張子のファイルのみを元のディレクトリ構造を保ったまま抽出・コピーします。抽出先は本ツールを実行したカレントディレクトリ直下に作成されます。

## 主な機能
- 複数拡張子（例: txt, png など）をカンマ区切りで指定可能
- ファイル名に含まれる文字列でフィルタ（任意）
- サブフォルダも含めて再帰的にファイルを抽出
- 元のディレクトリ構造を維持してコピー
- プログレスバーで進捗表示
- 前回選択した参照フォルダ・拡張子・ファイル名フィルタをまとめて記憶・復元
- 入力情報は1つの設定ファイルで一括管理
- 同じ出力先に複数回抽出しても、前回のファイルは消えず新しいファイルが追加保存されます（同名ファイルは上書き）
- シンプルで直感的なGUI

## 使い方
1. Python（またはexe化したファイル）で `extract_by_ext.py` を実行します。
2. 「Browse」ボタンで参照元フォルダを選択します。
   - 前回選択したフォルダ・拡張子・ファイル名フィルタが自動でセットされます。
3. 抽出したい拡張子をカンマ区切りで入力します（例: txt,png）。
4. ファイル名に含まれる文字列（任意）を入力できます。空欄の場合は全ファイルが対象です。
5. 「Extract」ボタンを押すと、指定拡張子・ファイル名条件に合致したファイルだけが元の構造でコピーされます。
6. 進捗はプログレスバーで確認できます。完了後、保存先のパスが表示されます。 