document.addEventListener('DOMContentLoaded', function() {
    // Font Awesomeを読み込む
    const fontAwesomeLink = document.createElement('link');
    fontAwesomeLink.rel = 'stylesheet';
    fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';
    document.head.appendChild(fontAwesomeLink);

    // ヘッダー要素を作成
    const header = document.createElement('header');
    header.className = 'site-header';

    // 現在のページ階層を判定して、トップページへの正しいパスを設定
    const isGamePage = window.location.pathname.includes('/contents/games/');
    const isNovelsPage = window.location.pathname.includes('/contents/novels/');
    const isMusicPage = window.location.pathname.includes('/contents/music/');
    const isSynthPage = window.location.pathname.includes('/contents/synth/');
    const isSynthSubPage = window.location.pathname.includes('/contents/synth/') && (window.location.pathname.includes('/chord_progression/') || window.location.pathname.includes('/clockChords/') || window.location.pathname.includes('/keysound/') || window.location.pathname.includes('/painter/') || window.location.pathname.includes('/pawpads/'));
    
    // パス設定（chord_progression.html用に調整）
    let homeLink, logoPath, gamePath, anotherXPath, musicPath, synthPath;
    
    if (isSynthSubPage) {
        // シンセサブページ用のパス
        homeLink = '../../../index.html';
        logoPath = '../../../source/ゆうえんちカラー.png';
        gamePath = '../../games/WCG.html';
        anotherXPath = '../../novels/AnotherX.html';
        musicPath = '../../music/Music.html';
        synthPath = '../synth.html';
    } else {
        // 他のページ用のパス
        homeLink = isGamePage || isNovelsPage || isMusicPage || isSynthPage ? '../../index.html' : './index.html';
        logoPath = isGamePage || isNovelsPage || isMusicPage || isSynthPage ? '../../source/ゆうえんちカラー.png' : 'source/ゆうえんちカラー.png';
        gamePath = isGamePage ? './WCG.html' : isNovelsPage || isMusicPage || isSynthPage ? '../games/WCG.html' : './contents/games/WCG.html';
        anotherXPath = isGamePage || isMusicPage || isSynthPage ? '../novels/AnotherX.html' : isNovelsPage ? './AnotherX.html' : './contents/novels/AnotherX.html';
        musicPath = isGamePage || isNovelsPage || isSynthPage ? '../music/Music.html' : isMusicPage ? './Music.html' : './contents/music/Music.html';
        synthPath = isGamePage || isNovelsPage || isMusicPage ? '../synth/synth.html' : isSynthPage ? './synth.html' : './contents/synth/synth.html';
    }
    header.innerHTML = `
        <a href="${homeLink}" class="site-logo"><i class="fa-solid fa-ferris-wheel"></i> <img src="${logoPath}" alt="ゆうえんち" class="logo-image"></a>
        <div class="header-search">
            <input type="text" id="header-search-box" placeholder="検索..." class="header-search-input">
        </div>
        <div class="header-menu">
            <a href="${gamePath}" class="menu-button">Game</a>
            <a href="${anotherXPath}" class="menu-button">Novel</a>
            <a href="${musicPath}" class="menu-button">Music</a>
            <a href="${synthPath}" class="menu-button">Synth</a>
        </div>
    `;

    // bodyの先頭にヘッダーを追加
    document.body.prepend(header);

    // ヘッダーの直後にある要素（メインコンテンツ）にのみ、ヘッダー分の高さを確保する
    const mainContent = header.nextElementSibling;
    if (mainContent) {
        const headerHeight = header.offsetHeight;
        mainContent.style.marginTop = `${headerHeight}px`;
    }

    // ページごとの検索機能を設定
    const searchBox = document.getElementById('header-search-box');
    if (searchBox) {
        // 現在のページに基づいて検索機能を設定
        const currentPath = window.location.pathname;
        
        if (currentPath.includes('/contents/novels/AnotherX.html') || currentPath.endsWith('/contents/novels/AnotherX.html')) {
            // AnotherXページの場合
            const episodeCards = document.querySelectorAll('.episode-card');
            if (episodeCards.length > 0) {
                searchBox.placeholder = 'エピソード番号やタイトルで検索...';
                searchBox.addEventListener('input', function() {
                    const searchTerm = this.value.toLowerCase();
                    episodeCards.forEach(card => {
                        const episode = card.getAttribute('data-episode');
                        const title = card.getAttribute('data-title').toLowerCase();
                        const episodeText = `episode ${episode}`.toLowerCase();
                        
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
                                    const episodeNum = parseInt(episode);
                                    isVisible = !isNaN(startNum) && !isNaN(endNum) && !isNaN(episodeNum) && 
                                              episodeNum >= startNum && episodeNum <= endNum;
                                } else if (start && !end) {
                                    // 5-のような開始番号以降の検索
                                    const startNum = parseInt(start);
                                    const episodeNum = parseInt(episode);
                                    isVisible = !isNaN(startNum) && !isNaN(episodeNum) && episodeNum >= startNum;
                                }
                            }
                        } else {
                            // 通常の検索
                            isVisible = title.includes(searchTerm) || episodeText.includes(searchTerm) || episode.includes(searchTerm);
                        }
                        
                        card.style.display = isVisible ? 'block' : 'none';
                    });
                });
            }
        } else if (currentPath.includes('/index.html') || currentPath.endsWith('/') || currentPath.endsWith('/index.html')) {
            // トップページの場合
            const gameCards = document.querySelectorAll('.game-card');
            if (gameCards.length > 0) {
                searchBox.placeholder = 'ゲームを検索...';
                // トップページの検索機能はscript.jsで処理されるため、ここでは何もしない
            }
        } else {
            // その他のページの場合
            searchBox.placeholder = '検索...';
        }
    }
});
