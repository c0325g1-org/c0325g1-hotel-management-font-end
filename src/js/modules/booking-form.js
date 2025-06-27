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
}