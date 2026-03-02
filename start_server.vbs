Set objShell = WScript.CreateObject("WScript.Shell")

' サーバーを起動するコマンド（新しいウィンドウで実行）
' python -m http.server 8000
' cmd /k を使用して、サーバーが起動し続けるようにする
objShell.Run "cmd /k python -m http.server 8000", 1, False

' サーバーが起動するまで少し待つ（必要に応じて秒数を調整）
WScript.Sleep 1000

' ブラウザで localhost:8000 を開く
objShell.Run "http://localhost:8000"
