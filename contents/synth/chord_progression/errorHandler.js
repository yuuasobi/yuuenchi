// ErrorHandler クラス - エラーハンドリングの管理
class ErrorHandler {
    constructor() {
        this.errorCount = 0;
        this.maxErrors = 5;
        this.errorTypes = {
            AUDIO: 'audio',
            NETWORK: 'network',
            VALIDATION: 'validation',
            RUNTIME: 'runtime',
            USER: 'user'
        };
    }

    // 音声エラーの処理
    static handleAudioError(error) {
        console.error('音声エラー:', error);
        
        let message = '音声の再生に失敗しました';
        let details = '';
        
        if (error.name === 'NotAllowedError') {
            message = 'ブラウザが音声の再生を許可していません';
            details = 'ページをクリックしてから再度お試しください';
        } else if (error.name === 'NotSupportedError') {
            message = 'お使いのブラウザは音声機能をサポートしていません';
            details = 'Chrome、Firefox、Safariの最新版をご利用ください';
        } else if (error.name === 'QuotaExceededError') {
            message = '音声リソースが不足しています';
            details = 'ページを再読み込みしてください';
        }
        
        this.showNotification(message, 'error', details);
        this.logError('AUDIO', error);
    }

    // ネットワークエラーの処理
    static handleNetworkError(error) {
        console.error('ネットワークエラー:', error);
        
        let message = 'ネットワークエラーが発生しました';
        let details = '';
        
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            message = '外部リソースの読み込みに失敗しました';
            details = 'インターネット接続を確認してください';
        }
        
        this.showNotification(message, 'error', details);
        this.logError('NETWORK', error);
    }

    // バリデーションエラーの処理
    static handleValidationError(error, field = '') {
        console.error('バリデーションエラー:', error);
        
        let message = '入力値が正しくありません';
        let details = '';
        
        if (field) {
            message = `${field}の入力値が正しくありません`;
        }
        
        this.showNotification(message, 'warning', details);
        this.logError('VALIDATION', error);
    }

    // ランタイムエラーの処理
    static handleRuntimeError(error) {
        console.error('ランタイムエラー:', error);
        
        let message = '予期しないエラーが発生しました';
        let details = 'ページを再読み込みしてください';
        
        this.showNotification(message, 'error', details);
        this.logError('RUNTIME', error);
    }

    // ユーザーエラーの処理
    static handleUserError(message, details = '') {
        console.warn('ユーザーエラー:', message);
        this.showNotification(message, 'info', details);
        this.logError('USER', new Error(message));
    }

    // コード生成エラーの処理
    static handleChordGenerationError(error) {
        console.error('コード生成エラー:', error);
        
        let message = 'コード進行の生成に失敗しました';
        let details = '設定を確認してから再度お試しください';
        
        this.showNotification(message, 'error', details);
        this.logError('RUNTIME', error);
        
        // フォールバック処理
        return this.generateFallbackChord();
    }

    // フォールバックコードの生成
    static generateFallbackChord() {
        const fallbackChords = ['C', 'Am', 'F', 'G'];
        return fallbackChords[Math.floor(Math.random() * fallbackChords.length)];
    }

    // 通知の表示
    static showNotification(message, type = 'info', details = '') {
        // 既存の通知を削除
        this.removeExistingNotifications();
        
        // 通知要素の作成
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-message">${message}</div>
                ${details ? `<div class="notification-details">${details}</div>` : ''}
                <button class="notification-close" onclick="ErrorHandler.closeNotification(this)">×</button>
            </div>
        `;
        
        // スタイルの適用
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 10000;
            max-width: 400px;
            font-family: 'Poppins', sans-serif;
            animation: slideIn 0.3s ease-out;
        `;
        
        // アニメーション用のCSS
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .notification-content {
                    display: flex;
                    align-items: flex-start;
                    gap: 10px;
                }
                .notification-message {
                    flex: 1;
                    font-weight: 500;
                }
                .notification-details {
                    font-size: 0.9em;
                    opacity: 0.9;
                    margin-top: 5px;
                }
                .notification-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                    padding: 0;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .notification-close:hover {
                    opacity: 0.7;
                }
            `;
            document.head.appendChild(style);
        }
        
        // 通知を表示
        document.body.appendChild(notification);
        
        // 自動で削除（5秒後）
        setTimeout(() => {
            this.closeNotification(notification.querySelector('.notification-close'));
        }, 5000);
    }

    // 通知の色を取得
    static getNotificationColor(type) {
        const colors = {
            'info': '#2196F3',
            'success': '#4CAF50',
            'warning': '#FF9800',
            'error': '#F44336'
        };
        return colors[type] || colors.info;
    }

    // 既存の通知を削除
    static removeExistingNotifications() {
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });
    }

    // 通知を閉じる
    static closeNotification(button) {
        const notification = button.closest('.notification');
        if (notification) {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }

    // エラーのログ記録
    static logError(type, error) {
        const errorLog = {
            type: type,
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        console.log('エラーログ:', errorLog);
        
        // ローカルストレージに保存（最大10件）
        this.saveErrorLog(errorLog);
    }

    // エラーログの保存
    static saveErrorLog(errorLog) {
        try {
            const existingLogs = JSON.parse(localStorage.getItem('errorLogs') || '[]');
            existingLogs.push(errorLog);
            
            // 最大10件まで保持
            if (existingLogs.length > 10) {
                existingLogs.splice(0, existingLogs.length - 10);
            }
            
            localStorage.setItem('errorLogs', JSON.stringify(existingLogs));
        } catch (error) {
            console.error('エラーログ保存エラー:', error);
        }
    }

    // エラーログの取得
    static getErrorLogs() {
        try {
            return JSON.parse(localStorage.getItem('errorLogs') || '[]');
        } catch (error) {
            console.error('エラーログ取得エラー:', error);
            return [];
        }
    }

    // エラーログのクリア
    static clearErrorLogs() {
        try {
            localStorage.removeItem('errorLogs');
            console.log('エラーログをクリアしました');
        } catch (error) {
            console.error('エラーログクリアエラー:', error);
        }
    }

    // グローバルエラーハンドラーの設定
    static setupGlobalErrorHandlers() {
        // 未処理のエラーをキャッチ
        window.addEventListener('error', (event) => {
            this.handleRuntimeError(event.error);
        });

        // 未処理のPromise拒否をキャッチ
        window.addEventListener('unhandledrejection', (event) => {
            this.handleRuntimeError(new Error(event.reason));
        });

        // ネットワークエラーをキャッチ
        window.addEventListener('offline', () => {
            this.handleNetworkError(new Error('ネットワーク接続が切断されました'));
        });

        console.log('グローバルエラーハンドラーを設定しました');
    }

    // デバッグ情報の表示
    static showDebugInfo() {
        const debugInfo = {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            cookieEnabled: navigator.cookieEnabled,
            onLine: navigator.onLine,
            screenSize: `${screen.width}x${screen.height}`,
            windowSize: `${window.innerWidth}x${window.innerHeight}`,
            localStorage: typeof(Storage) !== "undefined",
            audioContext: typeof(AudioContext) !== "undefined" || typeof(webkitAudioContext) !== "undefined"
        };
        
        console.log('デバッグ情報:', debugInfo);
        return debugInfo;
    }
}

// グローバルエラーハンドラーの設定
ErrorHandler.setupGlobalErrorHandlers();

// グローバル関数として公開
window.ErrorHandler = ErrorHandler;
window.showDebugInfo = () => ErrorHandler.showDebugInfo();
window.clearErrorLogs = () => ErrorHandler.clearErrorLogs(); 