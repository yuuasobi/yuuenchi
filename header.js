document.addEventListener('DOMContentLoaded', function () {
    // Font Awesomeが既に読み込まれているかチェック
    const existingFontAwesome = document.querySelector('link[href*="font-awesome"]');
    if (!existingFontAwesome) {
        // Font Awesomeを読み込む
        const fontAwesomeLink = document.createElement('link');
        fontAwesomeLink.rel = 'stylesheet';
        fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';
        document.head.appendChild(fontAwesomeLink);
    }

    // ヘッダー要素を作成
    const header = document.createElement('header');
    header.className = 'site-header';

    // 現在のページ階層を判定して、トップページへの正しいパスを設定
    const isGamePage = window.location.pathname.includes('/contents/games/');
    const isNovelsPage = window.location.pathname.includes('/contents/novels/');
    const isMusicPage = window.location.pathname.includes('/contents/music/');
    const isSynthPage = window.location.pathname.includes('/contents/synth/');
    const isSynthSubPage = window.location.pathname.includes('/contents/synth/') && (window.location.pathname.includes('/chord_progression/') || window.location.pathname.includes('/clockChords/') || window.location.pathname.includes('/keysound/') || window.location.pathname.includes('/painter/') || window.location.pathname.includes('/pawpads/') || window.location.pathname.includes('/SynthRPG/'));
    const isTmpPage = window.location.pathname.includes('/contents/tmp/');
    const is3DPage = window.location.pathname.includes('/contents/3Dmodel/');
    const isNewPage = window.location.pathname.includes('/new/');
    const isPluginsPage = window.location.pathname.includes('/contents/plugins/');
    const isToolsPage = window.location.pathname.includes('/contents/tools/');
    const isWebPage = window.location.pathname.includes('/contents/Web/');

    // パス設定（3Dmodel.html用に分岐追加）
    let homeLink, logoPath, gamePath, anotherXPath, musicPath, synthPath, model3DPath, pluginsPath, toolsPath, webPath;

    if (isSynthSubPage) {
        // シンセサブページ用のパス
        homeLink = '../../../index.html';
        logoPath = '../../../source/ゆうえんちカラー.png';
        gamePath = '../../games/WCG.html';
        anotherXPath = '../../novels/AnotherX.html';
        musicPath = '../../music/Music.html';
        synthPath = '../synth.html';
        model3DPath = '../../3Dmodel/3Dmodel.html';
        pluginsPath = '../../plugins/plugins.html';
        toolsPath = '../../tools/tools.html';
        webPath = '../../Web/webpage.html';
    } else if (isTmpPage) {
        // tmpページ用のパス
        homeLink = '../../index.html';
        logoPath = '../../source/ゆうえんちカラー.png';
        gamePath = '../games/WCG.html';
        anotherXPath = '../novels/AnotherX.html';
        musicPath = '../music/Music.html';
        synthPath = '../synth/synth.html';
        model3DPath = '../3Dmodel/3Dmodel.html';
        pluginsPath = '../plugins/plugins.html';
        toolsPath = '../tools/tools.html';
        webPath = '../Web/webpage.html';
    } else if (is3DPage) {
        // 3Dページ用のパス
        homeLink = '../../index.html';
        logoPath = '../../source/ゆうえんちカラー.png';
        gamePath = '../games/WCG.html';
        anotherXPath = '../novels/AnotherX.html';
        musicPath = '../music/Music.html';
        synthPath = '../synth/synth.html';
        model3DPath = './3Dmodel.html';
        pluginsPath = '../plugins/plugins.html';
        toolsPath = '../tools/tools.html';
        webPath = '../Web/webpage.html';
    } else if (isNewPage) {
        // new/ディレクトリのページ用のパス
        homeLink = '../index.html';
        logoPath = '../source/ゆうえんちカラー.png';
        gamePath = '../contents/games/WCG.html';
        anotherXPath = '../contents/novels/AnotherX.html';
        musicPath = '../contents/music/Music.html';
        synthPath = '../contents/synth/synth.html';
        model3DPath = '../contents/3Dmodel/3Dmodel.html';
        pluginsPath = '../contents/plugins/plugins.html';
        toolsPath = '../contents/tools/tools.html';
        webPath = '../contents/Web/webpage.html';
    } else {
        // 他のページ用のパス
        homeLink = isGamePage || isNovelsPage || isMusicPage || isSynthPage || isPluginsPage || isToolsPage || isWebPage ? '../../index.html' : './index.html';
        logoPath = isGamePage || isNovelsPage || isMusicPage || isSynthPage || isPluginsPage || isToolsPage || isWebPage ? '../../source/ゆうえんちカラー.png' : 'source/ゆうえんちカラー.png';
        gamePath = isGamePage ? './WCG.html' : isNovelsPage || isMusicPage || isSynthPage || isPluginsPage || isToolsPage || isWebPage ? '../games/WCG.html' : './contents/games/WCG.html';
        anotherXPath = isGamePage || isMusicPage || isSynthPage || isPluginsPage || isToolsPage || isWebPage ? '../novels/AnotherX.html' : isNovelsPage ? './AnotherX.html' : './contents/novels/AnotherX.html';
        musicPath = isGamePage || isNovelsPage || isMusicPage || isSynthPage || isPluginsPage || isToolsPage || isWebPage ? '../music/Music.html' : isMusicPage ? './Music.html' : './contents/music/Music.html';
        synthPath = isGamePage || isNovelsPage || isMusicPage || isPluginsPage || isToolsPage || isWebPage ? '../synth/synth.html' : isSynthPage ? './synth.html' : './contents/synth/synth.html';
        model3DPath = isGamePage || isNovelsPage || isMusicPage || isSynthPage || isPluginsPage || isToolsPage || isWebPage ? '../3Dmodel/3Dmodel.html' : './contents/3Dmodel/3Dmodel.html';
        pluginsPath = isGamePage || isNovelsPage || isMusicPage || isSynthPage || isToolsPage || isWebPage ? '../plugins/plugins.html' : isPluginsPage ? './plugins.html' : './contents/plugins/plugins.html';
        toolsPath = isGamePage || isNovelsPage || isMusicPage || isSynthPage || isPluginsPage || isWebPage ? '../tools/tools.html' : isToolsPage ? './tools.html' : './contents/tools/tools.html';
        webPath = isGamePage || isNovelsPage || isMusicPage || isSynthPage || isPluginsPage || isToolsPage ? '../Web/webpage.html' : isWebPage ? './webpage.html' : './contents/Web/webpage.html';
    }
    // 翻訳データ
    const translations = {
        ja: {
            game: 'Game',
            novel: 'Novel',
            music: 'Music',
            synth: 'Synth',
            model: '3D',
            plugin: 'Plugin',
            tools: 'Tools',
            web: 'Web',
            search: '検索...',
            searchNovel: 'エピソード番号やタイトルで検索...',
            searchGame: 'ゲームを検索...'
        },
        en: {
            game: 'Games',
            novel: 'Novels',
            music: 'Music',
            synth: 'Synth',
            model: '3D',
            plugin: 'Plugins',
            tools: 'Tools',
            web: 'Web',
            search: 'Search...',
            searchNovel: 'Search by episode number or title...',
            searchGame: 'Search games...'
        }
    };

    // 言語設定を読み込み
    let currentLang = localStorage.getItem('selectedLanguage') || 'ja';

    // ヘッダー内容を生成する関数
    function updateHeaderContent() {
        const lang = translations[currentLang];
        header.innerHTML = `
            <a href="${homeLink}" class="site-logo"><i class="fa-solid fa-ferris-wheel"></i> <img src="${logoPath}" alt="ゆうえんち" class="logo-image"></a>
            <div class="header-search">
                <input type="text" id="header-search-box" placeholder="${lang.search}" class="header-search-input">
            </div>
            <div class="header-menu">
                <a href="${gamePath}" class="menu-button">${lang.game}</a>
                <a href="${anotherXPath}" class="menu-button">${lang.novel}</a>
                <a href="${musicPath}" class="menu-button">${lang.music}</a>
                <a href="${synthPath}" class="menu-button">${lang.synth}</a>
                <a href="${model3DPath}" class="menu-button">${lang.model}</a>
                <a href="${pluginsPath}" class="menu-button">${lang.plugin}</a>
                <a href="${toolsPath}" class="menu-button">${lang.tools}</a>
                <a href="${webPath}" class="menu-button">${lang.web}</a>
                <button id="lang-toggle" class="lang-toggle-button">
                    <i class="fa-solid fa-globe"></i> ${currentLang.toUpperCase()}
                </button>
            </div>
        `;

        // 言語切り替えボタンのイベント
        header.querySelector('#lang-toggle').addEventListener('click', function () {
            currentLang = currentLang === 'ja' ? 'en' : 'ja';
            localStorage.setItem('selectedLanguage', currentLang);

            // ページ全体をリロードして反映（または全文置換）
            // 今回はシンプルにリロードして全体に反映させる
            window.location.reload();
        });

        // ページごとの検索プレースホルダー設定
        const searchBox = header.querySelector('#header-search-box');
        if (searchBox) {
            const currentPath = window.location.pathname;
            if (currentPath.includes('/contents/novels/AnotherX.html') || currentPath.endsWith('/contents/novels/AnotherX.html')) {
                searchBox.placeholder = lang.searchNovel;
                setupNovelSearch(searchBox);
            } else if (currentPath.includes('/index.html') || currentPath.endsWith('/') || currentPath.endsWith('/index.html')) {
                searchBox.placeholder = lang.searchGame;
            }
        }
    }

    function setupNovelSearch(searchBox) {
        const episodeCards = document.querySelectorAll('.episode-card');
        if (episodeCards.length > 0) {
            searchBox.addEventListener('input', function () {
                const searchTerm = this.value.toLowerCase();
                episodeCards.forEach(card => {
                    const episode = card.getAttribute('data-episode');
                    const title = card.getAttribute('data-title').toLowerCase();
                    const episodeText = `episode ${episode}`.toLowerCase();

                    let isVisible = false;

                    if (searchTerm.includes('-')) {
                        const range = searchTerm.split('-');
                        if (range.length === 2) {
                            const start = range[0].trim();
                            const end = range[1].trim();

                            if (start && end) {
                                const startNum = parseInt(start);
                                const endNum = parseInt(end);
                                const episodeNum = parseInt(episode);
                                isVisible = !isNaN(startNum) && !isNaN(endNum) && !isNaN(episodeNum) &&
                                    episodeNum >= startNum && episodeNum <= endNum;
                            } else if (start && !end) {
                                const startNum = parseInt(start);
                                const episodeNum = parseInt(episode);
                                isVisible = !isNaN(startNum) && !isNaN(episodeNum) && episodeNum >= startNum;
                            }
                        }
                    } else {
                        isVisible = title.includes(searchTerm) || episodeText.includes(searchTerm) || episode.includes(searchTerm);
                    }

                    card.style.display = isVisible ? 'block' : 'none';
                });
            });
        }
    }

    updateHeaderContent();

    // bodyの先頭にヘッダーを追加
    document.body.prepend(header);

    // ヘッダーの直後にある要素（メインコンテンツ）にのみ、ヘッダー分の高さを確保する
    const mainContent = header.nextElementSibling;
    if (mainContent) {
        const headerHeight = header.offsetHeight;
        mainContent.style.marginTop = `${headerHeight}px`;
    }
});
