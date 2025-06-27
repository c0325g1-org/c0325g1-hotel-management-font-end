export function initHeader() {
    // ví dụ: bật dropdown, sticky header, v.v.
    console.log('Header initialized');
    // $('#main-nav').addClass('sticky');
    $(document).on('scroll', () => {
        if ($(window).scrollTop() > 0) {
            $('#header').addClass('scroll');
        } else {
            $('#header').removeClass('scroll');
        }
    })
}