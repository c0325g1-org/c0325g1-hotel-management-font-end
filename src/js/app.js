import {initSlider} from './modules/slider.js';
import {initHeader} from './modules/header.js';
import { initOnScrollAnimation } from './modules/animations.js';
import { initLazyLoad } from './modules/lazyload.js';
import { initBookingForm } from './modules/booking-form';

$(function () {
    initHeader();
    initSlider('.your-slider', {slidesToShow: 1});
    initOnScrollAnimation('.animation');
    initLazyLoad();
    initSlider('.banner-slider', {
        autoplay: true,
        infinite: true,
        autoplaySpeed: 2000,
        slidesToScroll: 1,
        slidesToShow: 1,
        arrows: false,
        dots: false,
        speed: 1000,
        initialSlide: 1,
        draggable: false,
        fade: true
    });
    initBookingForm();
    // nếu có thêm module khác, chỉ việc import & gọi ở đây
});