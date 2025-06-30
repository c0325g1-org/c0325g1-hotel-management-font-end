import {initSlider} from './modules/slider.js';
import {initHeader} from './modules/header.js';
import { initOnScrollAnimation } from './modules/animations.js';
import { initLazyLoad } from './modules/lazyload.js';
import { initBookingForm } from './modules/booking-form';

window.addEventListener("load", (event) => {
    initHeader();
    initSlider('.your-slider', {slidesToShow: 1});
    initOnScrollAnimation('.animation');
    initLazyLoad();
    initSlider('.banner-slider', {
        autoplay: true,
        infinite: false,
        autoplaySpeed: 2500,
        slidesToScroll: 1,
        slidesToShow: 1,
        arrows: false,
        dots: false,
        draggable: false,
        cssEase: 'ease',
        speed: 1500,
        initialSlide: 0
    });
    initSlider('.mod-content-w-slider .slider', {
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 3,
        arrows: false,
        dots: true,
        appendDots: $('.mod-content-w-slider .list-dots'),
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    initSlider('.mod-content-image-slider .content-slider', {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        fade: true,
        draggable: false,
        infinite: false,
        asNavFor: '.mod-content-image-slider .image-slider'
    });
    initSlider('.mod-content-image-slider .image-slider', {
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.mod-content-image-slider .content-slider',
        arrows: true,
        dots: false,
        focusOnSelect: true,
        centerPadding: '0',
        cssEase: 'ease',
        speed: 1500,
        draggable: false,
        infinite: false,
        prevArrow: '<button type="button" class="slick-prev"><i class="bi bi-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="bi bi-chevron-right"></i></button>',
    });
    initSlider('.mod-booking .room-slider', {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="bi bi-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="bi bi-chevron-right"></i></button>',
    });
    initBookingForm();
    // nếu có thêm module khác, chỉ việc import & gọi ở đây
});