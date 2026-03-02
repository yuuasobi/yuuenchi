
document.addEventListener('DOMContentLoaded', () => {
    const gameCards = document.querySelectorAll('.game-card');

    // 検索ボックスが確実に存在するまで少し待機
    setTimeout(() => {
        const searchBox = document.getElementById('header-search-box');

        // ゲームデータ（テーマとクリエイター情報）
        const gameData = {
            '01': { theme: '神経衰弱', theme_en: 'Concentration', creator: 'チリル', creator_en: 'Chiriru' },
            '02': { theme: '収穫', theme_en: 'Harvest', creator: 'KTK', creator_en: 'KTK' },
            '03': { theme: '素潜り漁', theme_en: 'Free Diving', creator: 'よねぼー', creator_en: 'Yonebo' },
            '04': { theme: '料理', theme_en: 'Cooking', creator: '栗原工房', creator_en: 'Kurihara Kobo' },
            '05': { theme: '宇宙探査', theme_en: 'Space Exploration', creator: 'トムセン少佐', creator_en: 'Major Thomsen' },
            '06': { theme: '温泉', theme_en: 'Hot Spring', creator: 'へなちょこなすび', creator_en: 'Henachoko' },
            '07': { theme: '動物園', theme_en: 'Zoo', creator: 'おとと', creator_en: 'Ototo' },
            '08': { theme: '展覧会', theme_en: 'Exhibition', creator: 'illustB', creator_en: 'illustB' },
            '09': { theme: '城攻めパズル', theme_en: 'Castle Siege Puzzle', creator: '城攻め', creator_en: 'Shirozeme' },
            '10': { theme: '猫救助', theme_en: 'Cat Rescue', creator: 'ネコ集め', creator_en: 'Nekoatsume' },
            '11': { theme: '組み合わせクイズ', theme_en: 'Matching Quiz', creator: 'クイズ', creator_en: 'Quiz' },
            '12': { theme: 'ガチャ', theme_en: 'Gacha', creator: 'ゲームカード', creator_en: 'Game Card' },
            '13': { theme: '綱渡り', theme_en: 'Tightrope Walking', creator: '茶茶六', creator_en: 'Chachamaru' },
            '14': { theme: '視力検査', theme_en: 'Eye Exam', creator: '崖の上', creator_en: 'Gakenoue' },
            '15': { theme: 'ストップウォッチ', theme_en: 'Stopwatch', creator: 'くろろ', creator_en: 'Kuroro' },
            '16': { theme: '絶対音感', theme_en: 'Perfect Pitch', creator: 'ritomaru', creator_en: 'ritomaru' },
            '17': { theme: 'ライブステージ', theme_en: 'Live Stage', creator: 'yosei', creator_en: 'yosei' },
            '18': { theme: '魚釣り', theme_en: 'Fishing', creator: 'エルフ', creator_en: 'Elf' },
            '19': { theme: '砂漠オアシス', theme_en: 'Desert Oasis', creator: '砂漠', creator_en: 'Sabaku' },
            '20': { theme: '混雑道路', theme_en: 'Crowded Road', creator: 'crowded', creator_en: 'crowded' },
            '21': { theme: '迷路探索', theme_en: 'Maze Exploration', creator: '迷路', creator_en: 'Maze' },
            '22': { theme: 'カードバトル', theme_en: 'Card Battle', creator: 'カード', creator_en: 'Card' },
            '23': { theme: 'スターランド', theme_en: 'Star Land', creator: 'shimao', creator_en: 'shimao' },
            '24': { theme: '音楽室', theme_en: 'Music Room', creator: 'AnotherX', creator_en: 'AnotherX' },
            '25': { theme: 'ゴミ処理', theme_en: 'Waste Disposal', creator: 'えのたそ', creator_en: 'Enotaso' },
            '26': { theme: '神社参拝', theme_en: 'Shrine Visit', creator: 'SRstar', creator_en: 'SRstar' },
            '27': { theme: '挨拶運動', theme_en: 'Greeting Exercise', creator: 'Pablo Stanley', creator_en: 'Pablo Stanley' },
            '28': { theme: 'サイコロレース', theme_en: 'Dice Race', creator: 'がんも', creator_en: 'Ganmo' },
            '29': { theme: '積みクラフト', theme_en: 'Stack Craft', creator: 'mochi0830', creator_en: 'mochi0830' },
            '30': { theme: '雪だるま', theme_en: 'Snowman', creator: '雪だるま', creator_en: 'Snowman' },
            '31': { theme: '多言語サービス', theme_en: 'Multilingual Service', creator: 'multilingual', creator_en: 'multilingual' },
            '32': { theme: '良いところ共有', theme_en: 'Focusing on the Good', creator: 'とーふねこ', creator_en: 'Tofuneko' },
            '33': { theme: 'ファンタジーデパート', theme_en: 'Fantasy Dept', creator: 'ファンタジー', creator_en: 'Fantasy' },
            '34': { theme: '早撃ちウォーターガン', theme_en: 'Quick Draw Water Gun', creator: 'はりうー', creator_en: 'Hariu' },
            '35': { theme: 'インベーダー', theme_en: 'Invaders', creator: 'kizuka', creator_en: 'kizuka' },
            '36': { theme: '日本地図', theme_en: 'Japan Map', creator: '日本地図', creator_en: 'Japan Map' },
            '37': { theme: 'ロボットバトル', theme_en: 'Robot Battle', creator: 'Max Parata', creator_en: 'Max Parata' },
            '38': { theme: 'ギフト', theme_en: 'Gift', creator: 'ギフト', creator_en: 'Gift' },
            '39': { theme: '箱入り姫', theme_en: 'Princess in the Box', creator: 'Moon&Sun', creator_en: 'Moon&Sun' },
            '40': { theme: 'ワインソムリエ', theme_en: 'Wine Sommelier', creator: 'ZUMIKI', creator_en: 'ZUMIKI' },
            '41': { theme: '動物風船', theme_en: 'Balloon Animals', creator: 'kumi', creator_en: 'kumi' },
            '42': { theme: '救助ボート', theme_en: 'Rescue Boat', creator: 'Alstra Infinite', creator_en: 'Alstra Infinite' },
            '43': { theme: '雪合戦', theme_en: 'Snowball Fight', creator: 'MoLa', creator_en: 'MoLa' },
            '44': { theme: 'ウサギジャンプ', theme_en: 'Rabbit Jump', creator: 'mory', creator_en: 'mory' },
            '45': { theme: '開拓の村', theme_en: 'Pioneer Village', creator: '開拓', creator_en: 'Kaitaku' },
            '46': { theme: 'ひな祭り', theme_en: 'Hina Festival', creator: 'matsuno', creator_en: 'matsuno' },
            '47': { theme: 'クリエイター育成所', theme_en: 'Creator Institute', creator: 'クリエイター', creator_en: 'Creator' },
            '48': { theme: 'ドラゴン討伐', theme_en: 'Dragon Slayer', creator: 'ドラゴン', creator_en: 'Dragon' },
            '49': { theme: '卒業証書授与式', theme_en: 'Graduation Ceremony', creator: '卒業', creator_en: 'Graduation' },
            '50': { theme: 'ホワイトデー', theme_en: 'White Day', creator: 'anko143', creator_en: 'anko143' },
            '51': { theme: '金鉱の迷宮', theme_en: 'Gold Mine Maze', creator: '金鉱', creator_en: 'Gold Mine' },
            '52': { theme: '栄養失調科', theme_en: 'Malnutrition Dept', creator: 'napitomo', creator_en: 'napitomo' },
            '53': { theme: 'ニッキーシマエナガ', theme_en: 'Fly High Shimaenaga', creator: 'はばたけ', creator_en: 'Habatake' },
            '54': { theme: 'ボールリフティング', theme_en: 'Ball Juggling', creator: 'ようすけ', creator_en: 'Yosuke' },
            '55': { theme: 'ワールドマップメモリー', theme_en: 'World Map Memory', creator: 'ワールドマップ', creator_en: 'World Map' },
            '56': { theme: '雪原大衆かくれんぼ', theme_en: 'Snowfield Hide & Seek', creator: '雪原', creator_en: 'Snowfield' },
            '57': { theme: 'シマエナガーデン', theme_en: 'Shimaenaga Garden', creator: 'シマエナガ', creator_en: 'Shimaenaga' },
            '58': { theme: 'アリゲーターパニック', theme_en: 'Alligator Panic', creator: 'David', creator_en: 'David' },
            '59': { theme: '3Dx2Dバトル', theme_en: '3D x 2D Battle', creator: '3Dx2D', creator_en: '3Dx2D' },
            '60': { theme: '春呼屋茶道', theme_en: 'Sado (Tea Ceremony)', creator: '春呼屋', creator_en: 'Harukoya' },
            '61': { theme: 'ワープロード', theme_en: 'Warp Road', creator: 'macoco', creator_en: 'macoco' },
            '62': { theme: 'サイン会', theme_en: 'Signing Session', creator: 'サイン会', creator_en: 'Signing' },
            '63': { theme: '猫の樽', theme_en: 'Cat in the Barrel', creator: 'The-Wild-Dodo', creator_en: 'The-Wild-Dodo' },
            '64': { theme: '干支あみダンジョン', theme_en: 'Zodiac Dungeon', creator: '干支', creator_en: 'Eto' },
            '65': { theme: '図書館', theme_en: 'Library', creator: 'AnotherX', creator_en: 'AnotherX' },
            '66': { theme: '薬膳平性', theme_en: 'Medicinal Food', creator: 'うぶか', creator_en: 'Ubuka' },
            '67': { theme: 'ピザデリバリー', theme_en: 'Pizza Delivery', creator: 'imacvery', creator_en: 'imacvery' },
            '68': { theme: 'ピッチアニマルズ', theme_en: 'Pitch Animals', creator: 'ナナサン', creator_en: 'Nanasan' },
            '69': { theme: '対称部屋の間違い', theme_en: 'Symmetrical Room Differences', creator: 'Kay Lousberg', creator_en: 'Kay Lousberg' },
            '70': { theme: 'ゴーレムクラッシュ', theme_en: 'Golem Crush', creator: 'ゴーレム', creator_en: 'Golem' },
            '71': { theme: '箱渡の術', theme_en: 'Box Puzzle', creator: '箱渡', creator_en: 'Hakovata' },
            '72': { theme: '焚火ギリギリ', theme_en: 'Bonfire Control', creator: '焚火', creator_en: 'Takibi' },
            '73': { theme: '相撲', theme_en: 'Sumo', creator: 'ポンズハリテ', creator_en: 'Ponsu' },
            '74': { theme: '牛の世話', theme_en: 'Cattle Care', creator: 'David', creator_en: 'David' },
            '75': { theme: 'アリーナバトル', theme_en: 'Arena Battle', creator: 'Arena', creator_en: 'Arena' },
            '76': { theme: 'ダウジング装備工場', theme_en: 'Dowsing Factory', creator: 'Dowsing', creator_en: 'Dowsing' },
            '77': { theme: 'ホーム育成', theme_en: 'Growing Home', creator: 'Growing Home', creator_en: 'Growing Home' },
            '78': { theme: 'フリフリダンスマッチング', theme_en: 'Dance Matching', creator: 'mory', creator_en: 'mory' },
            '79': { theme: '人気パン屋さん', theme_en: 'Popular Bakery', creator: 'T.H', creator_en: 'T.H' },
            '80': { theme: 'パズルダンジョン', theme_en: 'Puzzle Dungeon', creator: 'Puzzle', creator_en: 'Puzzle' },
            '81': { theme: 'ゲームカードハイ&ロー', theme_en: 'Card High & Low', creator: 'Game Card', creator_en: 'Game Card' },
            '82': { theme: 'アイコンタクトフレンズ', theme_en: 'Eye Contact Friends', creator: 'アイコンタクト', creator_en: 'Eye Contact' },
            '83': { theme: 'キャッチボール', theme_en: 'Catch Ball', creator: 'キャッチボール', creator_en: 'Catch Ball' },
            '84': { theme: 'ロッククライミング', theme_en: 'Rock Climbing', creator: 'ロッククライミング', creator_en: 'Rock Climbing' },
            '85': { theme: '炎雷双竜', theme_en: 'Flame & Thunder Dragon', creator: '炎雷', creator_en: 'Enrai' },
            '86': { theme: 'ラブとライ', theme_en: 'Love & Rai', creator: 'ラブとライ', creator_en: 'Love & Rai' },
            '87': { theme: '誕生石クリスタル', theme_en: 'Birthstone Crystal', creator: '誕生石', creator_en: 'Tanjoseki' },
            '88': { theme: 'シートーク', theme_en: 'Sea Talk', creator: 'とりれんこ', creator_en: 'Torirenko' },
            '89': { theme: '犬の推し活', theme_en: 'Dog Oshi Life', creator: 'ひかわ', creator_en: 'Hikawa' },
            '90': { theme: 'フィギュアVSカード', theme_en: 'Figure VS Card', creator: 'Figure', creator_en: 'Figure' },
            '91': { theme: 'ロングライド', theme_en: 'LonGlide', creator: 'ぼんぢり', creator_en: 'Bondjiri' },
            '92': { theme: 'ドアロック', theme_en: 'Lock the Door', creator: 'Lock', creator_en: 'Lock' },
            '93': { theme: 'デザートビュッフェ', theme_en: 'Dessert Buffet', creator: 'Ghostpixxells', creator_en: 'Ghostpixxells' },
            '94': { theme: 'おしりあい', theme_en: "Dog's Hip Mirror", creator: 'ちかちか', creator_en: 'Chikachika' },
            '95': { theme: 'アイアンパンチバトル', theme_en: 'Iron Punch Battle', creator: 'Iron Punch', creator_en: 'Iron Punch' },
            '96': { theme: '難破船墓場サルベージ', theme_en: 'Shipwreck Salvage', creator: '難破船', creator_en: 'Nanpasen' },
            '97': { theme: '星雪に願いを', theme_en: 'Wish Upon Star Snow', creator: '星雪', creator_en: 'Hoshisetsu' },
            '98': { theme: 'チーズ探し', theme_en: 'Seeking Cheese', creator: 'Seeking', creator_en: 'Seeking' },
            '99': { theme: 'ラーメン', theme_en: 'Ramen', creator: 'よろづや', creator_en: 'Yorozuya' },
            '100': { theme: 'Switch Link Battle', theme_en: 'Switch Link Battle', creator: 'Switch', creator_en: 'Switch' }
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
                            const themeEn = (gameInfo.theme_en || '').toLowerCase();
                            const creator = gameInfo.creator.toLowerCase();
                            const creatorEn = (gameInfo.creator_en || '').toLowerCase();
                            isVisible = isVisible ||
                                theme.includes(searchTerm) ||
                                themeEn.includes(searchTerm) ||
                                creator.includes(searchTerm) ||
                                creatorEn.includes(searchTerm);
                        }
                    }

                    card.style.display = isVisible ? 'block' : 'none';
                });
            });
        }
    }, 100); // 100ms待機
});
