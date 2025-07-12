
document.addEventListener('DOMContentLoaded', () => {
    const gameCards = document.querySelectorAll('.game-card');
    const searchBox = document.getElementById('search-box');

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

    // 検索機能
    searchBox.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        gameCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
