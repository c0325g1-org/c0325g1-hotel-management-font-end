export function initLazyLoad() {
    const imgs = [...document.querySelectorAll('img.lazy-img[data-lazy]:not([src])')];
    const bgs  = [...document.querySelectorAll('.lazy-img-bg:not(.loaded)')];

    imgs.forEach(img => {
        img.onload = () => img.classList.add('loaded');
    });

    bgs.forEach(div => {
        const bg = div.dataset.bg;
        if (bg) {
            div.style.backgroundImage = bg;
            div.classList.add('loaded');
        }
    });
}