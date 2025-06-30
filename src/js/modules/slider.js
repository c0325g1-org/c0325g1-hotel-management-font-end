export function initSlider(selector, opts = {}) {
    const sliders = document.querySelectorAll(selector);
    if (!sliders.length) return;
    sliders.forEach(el => {
        const $el = $(el);
        if (!$el.hasClass('slick-initialized')) {
            $el.slick(Object.assign({
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
            }, opts));
        }
    });
}