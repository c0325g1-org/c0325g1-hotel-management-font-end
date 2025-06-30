import flatpickr from "flatpickr";

export function initBookingForm() {
    const checkin = flatpickr("#checkin", {
        dateFormat: "Y-m-d",
        minDate: "today",
        onChange: function(selectedDates) {
            const minCo = selectedDates[0] ? selectedDates[0].fp_incr(1) : null;
            checkout.set("minDate", minCo);
        }
    });

    const checkout = flatpickr("#checkout", {
        dateFormat: "Y-m-d",
        minDate: new Date().fp_incr(1)
    });

    $("#btn-booking-form").on("click", () => {
        const inDate  = checkin.selectedDates[0];
        const outDate = checkout.selectedDates[0];
        if (!inDate) {
            return alert("Chọn ngày nhận phòng trước đã.");
        }
        if (!outDate || outDate <= inDate) {
            return alert("Ngày trả phải sau ngày nhận.");
        }
        alert(`Đặt phòng từ ${checkin.input.value} đến ${checkout.input.value}`);
    });

    toggleBookingBtn();

    // Điều khiển số lượng trên card
    $('.mod-booking .decrement').click(function() {
        const $input = $(this).siblings('.qty-input');
        const min = parseInt($input.attr('min'));
        let val = parseInt($input.val());
        if (val > min) $input.val(val - 1);
    });
    $('.mod-booking .increment').click(function() {
        const $input = $(this).siblings('.qty-input');
        const max = parseInt($input.attr('max'));
        let val = parseInt($input.val());
        if (val < max) $input.val(val + 1);
    });

    // Thêm phòng vào danh sách
    $('.mod-booking .add-btn').click(function() {
        const $card = $(this).closest('.room-card');
        const id = $card.data('id');
        const name = $card.data('name');
        const max = parseInt($card.data('max'));
        const qty = parseInt($card.find('.qty-input').val());
        const key = 'room-' + id;

        let $item = $('#' + key);
        if ($item.length) {
            $item.find('.qty-input-selected').val(qty);
        } else {
            $('#selected-list').append(
                `<li class="list-group-item" id="${key}">
              <div class="d-flex flex-wrap justify-content-between align-items-center">
                <span class="col-4 col-md-12 col-xl-6">${name}</span>
                <div class="col-8 col-md-12 col-xl-6 d-flex justify-content-end justify-content-md-start justify-content-xl-end">
                  <button class="btn btn-sm btn-secondary decrement-selected">-</button>
                  <input type="number" class="qty-input-selected mx-1" value="${qty}" min="1" max="${max}">
                  <button class="btn btn-sm btn-secondary increment-selected">+</button>
                  <button class="btn btn-sm btn-danger ms-2 remove-btn">Xóa</button>
                </div>
              </div>
            </li>`
            );
        }
        toggleBookingBtn();
    });

    // Sự kiện cho danh sách đã chọn
    $('.mod-booking #selected-list')
        .on('click', '.decrement-selected', function() {
            const $input = $(this).siblings('.qty-input-selected');
            const min = parseInt($input.attr('min'));
            let val = parseInt($input.val());
            if (val > min) $input.val(val - 1);
        })
        .on('click', '.increment-selected', function() {
            const $input = $(this).siblings('.qty-input-selected');
            const max = parseInt($input.attr('max'));
            let val = parseInt($input.val());
            if (val < max) $input.val(val + 1);
        })
        .on('change', '.qty-input-selected', function() {
            const min = parseInt($(this).attr('min'));
            const max = parseInt($(this).attr('max'));
            let val = parseInt($(this).val()) || min;
            if (val < min) val = min;
            if (val > max) val = max;
            $(this).val(val);
        })
        .on('click', '.remove-btn', function() {
            $(this).closest('li').remove();
            toggleBookingBtn();
        });

    // Xử lý nút Đặt phòng
    $('.mod-booking #booking-btn').click(function() {
        const rooms = [];
        $('#selected-list li').each(function() {
            const id = $(this).attr('id').replace('room-','');
            const name = $(this).find('> div span').text();
            const qty = $(this).find('.qty-input-selected').val();
            rooms.push({ id, name, qty });
        });
        // Gửi lên server hoặc xử lý tiếp
        console.log('Dữ liệu đặt phòng:', rooms);
        alert('Đặt phòng thành công!');
    });

    // Hàm bật/tắt hiển thị nút Đặt phòng
    function toggleBookingBtn() {
        if ($('.mod-booking #selected-list li').length > 0) {
            $('.mod-booking #booking-btn').removeClass('d-none');
        } else {
            $('.mod-booking #booking-btn').addClass('d-none');
        }
    }
}