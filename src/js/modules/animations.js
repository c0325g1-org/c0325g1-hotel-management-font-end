/**
 * Thêm class animation vào từng phần tử khi nó xuất hiện trong viewport
 * @param {string} selector CSS selector, ví dụ '.animate-on-scroll'
 * @param {string} animationClass Ví dụ 'animate-fade-in-up'
 * @param {string} rootMargin offset trigger
 */

export function initOnScrollAnimation(selector, rootMargin = '0px 0px -10% 0px') {
    const wrapper = document.getElementById('wrapper');
    if (!wrapper || !wrapper.classList.contains('has-animation')) return;

    const els = document.querySelectorAll(selector);
    if (!els.length || !window.IntersectionObserver) return;

    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                obs.unobserve(entry.target);
            }
        });
    }, { rootMargin });

    els.forEach(el => io.observe(el));
}
