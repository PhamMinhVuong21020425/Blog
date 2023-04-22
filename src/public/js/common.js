function confirmDelete(event) {
    // Hiển thị hộp thoại xác nhận
    var confirmation = confirm("Bạn có chắc chắn muốn xóa thông tin này?");

    // Nếu người dùng chọn "Có"
    if (confirmation) {
        // Thực hiện thao tác xóa dữ liệu
        alert("Dữ liệu đã được xóa!");
    }
    // Ngược lại, nếu người dùng chọn "Không"
    else {
        // Hủy thao tác xóa
        event.preventDefault(); // Ngăn chặn hành động mặc định của form
    }
}