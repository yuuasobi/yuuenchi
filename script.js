
document.addEventListener('DOMContentLoaded', () => {
    const gameCards = document.querySelectorAll('.game-card');
    
    // 検索ボックスが確実に存在するまで少し待機
    setTimeout(() => {
        const searchBox = document.getElementById('header-search-box');

    // ゲームデータ（テーマとクリエイター情報）
    const gameData = {
        '01': { theme: '神経衰弱', creator: 'チリル' },
        '02': { theme: '収穫', creator: 'KTK' },
        '03': { theme: '素潜り漁', creator: 'よねぼー' },
        '04': { theme: '料理', creator: '栗原工房' },
        '05': { theme: '宇宙探査', creator: 'トムセン少佐' },
        '06': { theme: '温泉', creator: 'へなちょこなすび' },
        '07': { theme: '動物園', creator: 'おとと' },
        '08': { theme: '展覧会', creator: 'illustB' },
        '09': { theme: '城攻めパズル', creator: '城攻め' },
        '10': { theme: '猫救助', creator: 'ネコ集め' },
        '11': { theme: '組み合わせクイズ', creator: 'クイズ' },
        '12': { theme: 'ガチャ', creator: 'ゲームカード' },
        '13': { theme: '綱渡り', creator: '茶茶六' },
        '14': { theme: '視力検査', creator: '崖の上' },
        '15': { theme: 'ストップウォッチ', creator: 'くろろ' },
        '16': { theme: '絶対音感', creator: 'ritomaru' },
        '17': { theme: 'ライブステージ', creator: 'yosei' },
        '18': { theme: '魚釣り', creator: 'エルフ' },
        '19': { theme: '砂漠オアシス', creator: '砂漠' },
        '20': { theme: '混雑道路', creator: 'crowded' },
        '21': { theme: '迷路探索', creator: '迷路' },
        '22': { theme: 'カードバトル', creator: 'カード' },
        '23': { theme: 'スターランド', creator: 'shimao' },
        '24': { theme: '音楽室', creator: 'AnotherX' },
        '25': { theme: 'ゴミ処理', creator: 'えのたそ' },
        '26': { theme: '神社参拝', creator: 'SRstar' },
        '27': { theme: '挨拶運動', creator: 'Pablo Stanley' },
        '28': { theme: 'サイコロレース', creator: 'がんも' },
        '29': { theme: '積みクラフト', creator: 'mochi0830' },
        '30': { theme: '雪だるま', creator: '雪だるま' },
        '31': { theme: '多言語サービス', creator: 'multilingual' },
        '32': { theme: '良いところ共有', creator: 'とーふねこ' },
        '33': { theme: 'ファンタジーデパート', creator: 'ファンタジー' },
        '34': { theme: '早撃ちウォーターガン', creator: 'はりうー' },
        '35': { theme: 'インベーダー', creator: 'kizuka' },
        '36': { theme: '日本地図', creator: '日本地図' },
        '37': { theme: 'ロボットバトル', creator: 'Max Parata' },
        '38': { theme: 'ギフト', creator: 'ギフト' },
        '39': { theme: '箱入り姫', creator: 'Moon&Sun' },
        '40': { theme: 'ワインソムリエ', creator: 'ZUMIKI' },
        '41': { theme: '動物風船', creator: 'kumi' },
        '42': { theme: '救助ボート', creator: 'Alstra Infinite' },
        '43': { theme: '雪合戦', creator: 'MoLa' },
        '44': { theme: 'ウサギジャンプ', creator: 'mory' },
        '45': { theme: '開拓の村', creator: '開拓' },
        '46': { theme: 'ひな祭り', creator: 'matsuno' },
        '47': { theme: 'クリエイター育成所', creator: 'クリエイター' },
        '48': { theme: 'ドラゴン討伐', creator: 'ドラゴン' },
        '49': { theme: '卒業証書授与式', creator: '卒業' },
        '50': { theme: 'ホワイトデー', creator: 'anko143' },
        '51': { theme: '金鉱の迷宮', creator: '金鉱' },
        '52': { theme: '栄養失調科', creator: 'napitomo' },
        '53': { theme: 'ニッキーシマエナガ', creator: 'はばたけ' },
        '54': { theme: 'ボールリフティング', creator: 'ようすけ' },
        '55': { theme: 'ワールドマップメモリー', creator: 'ワールドマップ' },
        '56': { theme: '雪原大衆かくれんぼ', creator: '雪原' },
        '57': { theme: 'シマエナガーデン', creator: 'シマエナガ' },
        '58': { theme: 'アリゲーターパニック', creator: 'David' },
        '59': { theme: '3Dx2Dバトル', creator: '3Dx2D' },
        '60': { theme: '春呼屋茶道', creator: '春呼屋' },
        '61': { theme: 'ワープロード', creator: 'macoco' },
        '62': { theme: 'サイン会', creator: 'サイン会' },
        '63': { theme: '猫の樽', creator: 'The-Wild-Dodo' },
        '64': { theme: '干支あみダンジョン', creator: '干支' },
        '65': { theme: '図書館', creator: 'AnotherX' },
        '66': { theme: '薬膳平性', creator: 'うぶか' },
        '67': { theme: 'ピザデリバリー', creator: 'imacvery' },
        '68': { theme: 'ピッチアニマルズ', creator: 'ナナサン' },
        '69': { theme: '対称部屋の間違い', creator: 'Kay Lousberg' },
        '70': { theme: 'ゴーレムクラッシュ', creator: 'ゴーレム' },
        '71': { theme: '箱渡の術', creator: '箱渡' },
        '72': { theme: '焚火ギリギリ', creator: '焚火' },
        '73': { theme: '相撲', creator: 'ポンズハリテ' },
        '74': { theme: '牛の世話', creator: 'David' },
        '75': { theme: 'アリーナバトル', creator: 'Arena' },
        '76': { theme: 'ダウジング装備工場', creator: 'Dowsing' },
        '77': { theme: 'ホーム育成', creator: 'Growing Home' },
        '78': { theme: 'フリフリダンスマッチング', creator: 'mory' },
        '79': { theme: '人気パン屋さん', creator: 'T.H' },
        '80': { theme: 'パズルダンジョン', creator: 'Puzzle' },
        '81': { theme: 'ゲームカードハイ&ロー', creator: 'Game Card' },
        '82': { theme: 'アイコンタクトフレンズ', creator: 'アイコンタクト' },
        '83': { theme: 'キャッチボール', creator: 'キャッチボール' },
        '84': { theme: 'ロッククライミング', creator: 'ロッククライミング' },
        '85': { theme: '炎雷双竜', creator: '炎雷' },
        '86': { theme: 'ラブとライ', creator: 'ラブとライ' },
        '87': { theme: '誕生石クリスタル', creator: '誕生石' },
        '88': { theme: 'シートーク', creator: 'とりれんこ' },
        '89': { theme: '犬の推し活', creator: 'ひかわ' },
        '90': { theme: 'フィギュアVSカード', creator: 'Figure' },
        '91': { theme: 'ロングライド', creator: 'ぼんぢり' },
        '92': { theme: 'ドアロック', creator: 'Lock' },
        '93': { theme: 'デザートビュッフェ', creator: 'Ghostpixxells' },
        '94': { theme: 'おしりあい', creator: 'ちかちか' },
        '95': { theme: 'アイアンパンチバトル', creator: 'Iron Punch' },
        '96': { theme: '難破船墓場サルベージ', creator: '難破船' },
        '97': { theme: '星雪に願いを', creator: '星雪' },
        '98': { theme: 'チーズ探し', creator: 'Seeking' },
        '99': { theme: 'ラーメン', creator: 'よろづや' },
        '100': { theme: 'Switch Link Battle', creator: 'Switch' }
    };

    // 遅延読み込みとスクロールアニメーション
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const img = card.querySelector('img');
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                card.classList.add('visible');
                observer.unobserve(card);
            }
        });
    }, { rootMargin: '0px 0px -50px 0px' });

    gameCards.forEach(card => {
        observer.observe(card);
    });

    // 拡張検索機能
    if (searchBox) {
        searchBox.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            gameCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const gameNumber = card.querySelector('.game-number').textContent.replace('#', '');
                const gameInfo = gameData[gameNumber];
                
                let isVisible = false;
                
                // 範囲検索の処理
                if (searchTerm.includes('-')) {
                    const range = searchTerm.split('-');
                    if (range.length === 2) {
                        const start = range[0].trim();
                        const end = range[1].trim();
                        
                        if (start && end) {
                            // 5-10のような範囲検索
                            const startNum = parseInt(start);
                            const endNum = parseInt(end);
                            const cardNum = parseInt(gameNumber);
                            isVisible = !isNaN(startNum) && !isNaN(endNum) && !isNaN(cardNum) && 
                                      cardNum >= startNum && cardNum <= endNum;
                        } else if (start && !end) {
                            // 5-のような開始番号以降の検索
                            const startNum = parseInt(start);
                            const cardNum = parseInt(gameNumber);
                            isVisible = !isNaN(startNum) && !isNaN(cardNum) && cardNum >= startNum;
                        }
                    }
                } else {
                    // 通常の検索
                    isVisible = title.includes(searchTerm) || gameNumber.includes(searchTerm);
                    
                    if (gameInfo) {
                        const theme = gameInfo.theme.toLowerCase();
                        const creator = gameInfo.creator.toLowerCase();
                        isVisible = isVisible || theme.includes(searchTerm) || creator.includes(searchTerm);
                    }
                }
                
                card.style.display = isVisible ? 'block' : 'none';
            });
        });
    }
    }, 100); // 100ms待機
});
