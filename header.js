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
const isGamePage = window.location.pathname.includes('/games/');
    const homeLink = isGamePage ? '../index.html' : './index.html';

    // ヘッダーの内部HTMLを設定
    const logoPath = isGamePage ? '../source/ゆうえんちカラー.png' : 'source/ゆうえんちカラー.png';
    const anotherXPath = isGamePage ? '../AnotherX.html' : './AnotherX.html';
    header.innerHTML = `
        <a href="${homeLink}" class="site-logo"><i class="fa-solid fa-ferris-wheel"></i> <img src="${logoPath}" alt="ゆうえんち" class="logo-image"></a>
        <div class="header-menu">
            <a href="${homeLink}" class="menu-button">Game</a>
            <a href="${anotherXPath}" class="menu-button">Novel</a>
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
});
