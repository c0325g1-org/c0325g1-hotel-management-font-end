window.addEventListener("load", (event) => {
    $('#name').on('input', function() {
        let slug = $(this).val().toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-');
        $('#slug').val(slug);
    });

    // Thêm/Xóa dynamic amenities & features
    function addField(listSelector, inputName, placeholder) {
        const $div = $(
            `<div class="input-group mb-2">` +
            `<input type="text" class="form-control" name="${inputName}[]" placeholder="${placeholder}">` +
            `<span class="input-group-text remove-btn">&times;</span>` +
            `</div>`
        );
        $div.find('.remove-btn').on('click', function() { $div.remove(); });
        $(listSelector).append($div);
    }

    $('#addAmenity').on('click', function() {
        addField('#amenities-list', 'amenities', 'Tiện nghi');
    });
    $('#addFeature').on('click', function() {
        addField('#features-list', 'features', 'Đặc điểm');
    });
    // Xóa field khi click remove-btn có sẵn
    $('.remove-btn').on('click', function() { $(this).closest('.input-group').remove(); });

    // Submit form với upload file qua AJAX
    $('#roomtypeForm').on('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        $.ajax({
            url: '/api/roomtype',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function() { alert('Lưu thành công!'); },
            error: function(err) { console.error(err); }
        });
    });
});