import flatpickr from "flatpickr";

export function initPageBooking() {
    let $mod = $('.mod-booking');

    // Search
    $mod.on('click', '#search-btn', function() {
        let q = {
            checkin: $mod.find('#checkin').val(),
            checkout: $mod.find('#checkout').val(),
            quantity: $mod.find('#quantity').val(),
            adults: $mod.find('#adults').val(),
            children: $mod.find('#children').val()
        };
        $.get('/api/rooms/search', q, function(data) {
            renderRooms(data);
        });
    });

    function renderRooms(data) {
        let $list = $mod.find('#rooms-list').empty();
        data.forEach(function(r) {
            // Build HTML from template
            let tpl = $('#tpl-room-card').html();
            let html = tpl
                .replace(/{{id}}/g, r.id)
                .replace(/{{name}}/g, r.name)
                .replace(/{{price}}/g, r.price.toLocaleString())
                .replace(/{{available}}/g, r.available)
                .replace(/{{maxAdults}}/g, r.maxAdults)
                .replace(/{{maxChildren}}/g, r.maxChildren)
                .replace(/{{#each images}}[\s\S]*?{{\/each}}/, function(match) {
                    return r.images.map(function(img,i) {
                        return '<div class="carousel-item'+(i===0?' active':'')+'">'
                            +'<img src="'+img+'" class="d-block w-100" alt="">'
                            +'</div>';
                    }).join('');
                });
            $list.append(html);
        });
    }

    // Select room
    $mod.on('click', '.select-room-btn', function() {
        let $c = $(this).closest('.room-card');
        let room = {
            name: $c.data('name'),
            price: $c.data('price'),
            available: $c.data('available'),
            maxAdults: $c.data('max-adults'),
            maxChildren: $c.data('max-children')
        };
        let qty = +$mod.find('#quantity').val();
        let total = room.price * qty;
        let html = '<p><strong>'+room.name+'</strong></p>'
            +'<p>Nhận: '+$mod.find('#checkin').val()+'</p>'
            +'<p>Trả: '+$mod.find('#checkout').val()+'</p>'
            +'<p>Số phòng: '+qty+'</p>'
            +'<p>Tổng: '+total.toLocaleString()+'₫</p>'
            +'<button id="book-btn" class="btn btn-secondary w-100 mb-2">Thanh toán</button>'
            +'<button id="cancel-btn" class="btn btn-outline-secondary w-100">Hủy</button>';
        $mod.find('#selected-summary').html(html);
    });

    // Cancel
    $mod.on('click', '#cancel-btn', function() {
        $mod.find('#selected-summary').html('<p>Chưa chọn phòng</p>');
    });

    // Book stub
    $mod.on('click', '#book-btn', function() {
        alert('Thanh toán...');
    });
}