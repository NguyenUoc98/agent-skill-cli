# Template Testcase

Đây là template sử dụng khi lập kế hoạch kiểm thử dạng bảng.
Cấu trúc bảng được lấy từ file `Template_Testcase.xlsx`.

## Cấu trúc bảng Test Case

| STT | Precondition | Mục đích kiểm thử ||||||||| Kết quả mong muốn | Priority | AI review | Dev env |||| Staging env ||| PRO env ||
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| | | **Category 1** | **Category 2** | **Category 3** | **Category 4** | **Category 5** | **Category 6** | **Category 7** | **Các bước thực hiện** | | | | **IOS** | **Android** | **DESKTOP** | **Bug ID** | **Tester** | **Kết quả** | **Bug ID** | **Tester** | **Kết quả** | **Bug ID** | **Tester** | **Kết quả** |
| 1 | [Điều kiện tiền đề] | [Nhóm tính năng 1] | [Nhóm tính năng 2] | [Nhóm tính năng 3] | [Hợp lệ / Không hợp lệ] | [Trường hợp cụ thể] | [Chi tiết 1] | [Chi tiết 2] | 1. [Bước 1]<br>2. [Bước 2] | [Kết quả mong muốn] | High/Medium/Low | | [version] | [version] | [version] | | | Pass/Fail/Pending | | | Pass/Fail/Pending | | | Pass/Fail/Pending |

---

## Ví dụ điền mẫu (Màn hình Đăng nhập)

| STT | Precondition | Mục đích kiểm thử ||||||||| Kết quả mong muốn | Priority | AI review | Dev env |||| Staging env ||| PRO env ||
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| | | **Category 1** | **Category 2** | **Category 3** | **Category 4** | **Category 5** | **Category 6** | **Category 7** | **Các bước thực hiện** | | | | **IOS** | **Android** | **DESKTOP** | **Bug ID** | **Tester** | **Kết quả** | **Bug ID** | **Tester** | **Kết quả** | **Bug ID** | **Tester** | **Kết quả** |
| 1 | Người dùng ở màn hình Đăng nhập | Giao diện | | | | | | | 1. Hiển thị: Username, Mật khẩu, Button Đăng nhập, Checkbox Remember me | Tất cả các thành phần hiển thị đúng | Medium | | | | | | | Pass | | | Pass | | | Pass |
| 2 | | Check validate | Username | Nhập chữ | | | | | 1. Nhập ký tự chữ vào trường Username | Cho phép nhập | Medium | | | | | | | Pass | | | Pass | | | Pass |
| 3 | | | | Nhập số | | | | | 1. Nhập số vào trường Username | Cho phép nhập | Medium | | | | | | | Pass | | | Pass | | | Pass |
| 4 | | | | Nhập ký tự đặc biệt | | | | | 1. Nhập ký tự đặc biệt vào Username | Cho phép nhập | Medium | | | | | | | Pass | | | Pass | | | Pass |
| 5 | | | | Nhập dấu cách ở giữa | | | | | 1. Nhập chuỗi có dấu cách ở giữa | Hệ thống báo lỗi | Medium | | | | | | | Pass | | | Pass | | | Pass |
| 6 | | | | Bỏ trống | | | | | 1. Để trống trường Username | Hệ thống báo lỗi | Medium | | | | | | | Pass | | | Pass | | | Pass |
| 7 | | | Mật khẩu | Nhập chữ | | | | | 1. Nhập ký tự chữ vào Mật khẩu | Cho phép nhập | Medium | | | | | | | Pass | | | Pass | | | Pass |
| 8 | | | | Nhập số | | | | | 1. Nhập số vào Mật khẩu | Cho phép nhập | Medium | | | | | | | Pass | | | Pass | | | Pass |
| 9 | | | | Nhập ký tự đặc biệt | | | | | 1. Nhập ký tự đặc biệt vào Mật khẩu | Cho phép nhập | Medium | | | | | | | Pass | | | Pass | | | Pass |
| 10 | | | | Nhập dấu cách ở giữa | | | | | 1. Nhập chuỗi có dấu cách ở giữa | Hệ thống báo lỗi | Medium | | | | | | | Pass | | | Pass | | | Pass |
| 11 | | | | Bỏ trống | | | | | 1. Để trống trường Mật khẩu | Hệ thống báo lỗi | Medium | | | | | | | Pass | | | Pass | | | Pass |
| 12 | | Checkbox | | | | | | Tích checkbox | 1. Tích vào "Remember me" | Nhớ mật khẩu, password | Medium | | | | | | | Pending | | | Pending | | | Pending |
| 13 | | Check data | Đúng username, password | | | | | | 1. Nhập đúng username và password, bấm Đăng nhập | Đăng nhập thành công | High | | | | | | | Pass | | | Pass | | | Pass |
| 14 | | | Sai username, đúng password | | | | | | 1. Nhập sai username, đúng password, bấm Đăng nhập | Hệ thống báo lỗi: Thông tin đăng nhập không chính xác | Medium | | | | | | | Pass | | | Pass | | | Pass |
| 15 | | | Sai username, password | | | | | | 1. Nhập sai cả username và password, bấm Đăng nhập | Hệ thống báo lỗi: Thông tin đăng nhập không chính xác | Medium | | | | | | | Pass | | | Pass | | | Pass |

---

## Hướng dẫn sử dụng chuẩn 2-2-1 Rule

Khi lập plan test cho mỗi Feature/Acceptance Criteria, vui lòng tối thiểu đáp ứng:
- **2 Positive Scenarios**: Luồng chuẩn, thành công (VD: HTTP 200 OK, đăng nhập hợp lệ).
- **2 Negative Scenarios**: Lỗi đầu vào, lỗi hệ thống (VD: HTTP 401, bỏ trống trường bắt buộc).
- **1 Edge Case**: Điền chuỗi quá dài, timeout, thử XSS/SQL Injection.

## Mô tả các cột

| Cột | Mô tả |
|---|---|
| **STT** | Số thứ tự test case |
| **Precondition** | Điều kiện tiền đề cần có trước khi thực hiện test |
| **Category 1–7** | Phân cấp mục đích kiểm thử (tính năng → luồng → chi tiết) |
| **Các bước thực hiện** | Mô tả từng bước thực hiện test case |
| **Kết quả mong muốn** | Kết quả kỳ vọng sau khi thực hiện |
| **Priority** | Mức độ ưu tiên: High / Medium / Low |
| **AI review** | Ô để AI hoặc reviewer ghi chú đánh giá |
| **Dev IOS / Android / DESKTOP** | Phiên bản ứng dụng trên từng nền tảng ở môi trường Dev |
| **Dev Bug ID** | Mã bug phát sinh trên môi trường Dev |
| **Dev Tester** | Người thực hiện test trên Dev |
| **Dev Kết quả** | Kết quả test trên Dev: Pass / Fail / Pending |
| **Staging Bug ID / Tester / Kết quả** | Thông tin tương tự cho môi trường Staging |
| **PRO Bug ID / Tester / Kết quả** | Thông tin tương tự cho môi trường Production |

## Ghi chú về Môi trường (Environment)

- **Dev**: Kiểm thử trên môi trường DEV. Ghi rõ phiên bản ứng dụng trên IOS, Android, DESKTOP; Bug ID nếu có, người test và kết quả Pass/Fail/Pending.
- **Staging**: Ghi Bug ID, người test và kết quả trên môi trường Staging.
- **PRO**: Ghi Bug ID, người test và kết quả trên môi trường Production.
