import { initLazyLoad } from './lazyload.js';

export function initSlider(selector, opts = {}, rootMargin = '0px 0px -200px 0px') {
    const sliders = document.querySelectorAll(selector);
    if (!sliders.length || !window.IntersectionObserver) return;

    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            const $el = $(el);
            initLazyLoad();

            if (!$el.hasClass('slick-initialized')) {
                $el.slick(Object.assign({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                }, opts));
            }

            obs.unobserve(el);
        });
    }, { rootMargin });

    sliders.forEach(slider => io.observe(slider));
}