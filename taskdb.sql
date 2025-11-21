CREATE DATABASE IF NOT EXISTS taskdb;

-- 2. Chọn sử dụng database này
USE taskdb;

-- 3. Tạo bảng Tasks để lưu công việc
CREATE TABLE IF NOT EXISTS Tasks (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(200) CHARACTER SET utf8mb4 NOT NULL,
    Status INT NOT NULL DEFAULT 0, -- 0: Đang làm, 1: Hoàn thành
    DueDate DATETIME(6) NOT NULL,
    CreatedAt DATETIME(6) NOT NULL
);
INSERT INTO Tasks (Title, Status, DueDate, CreatedAt)
VALUES
('Hoàn thiện giao diện trang chủ', 0, '2025-11-25 18:00:00.000000', NOW(6)),
('Sửa lỗi đăng nhập trên backend', 1, '2025-11-26 12:00:00.000000', NOW(6)),
('Tối ưu hóa API lấy dữ liệu', 0, '2025-11-30 09:00:00.000000', NOW(6)),
('Viết tài liệu hướng dẫn người dùng', 0, '2025-12-05 23:59:59.000000', NOW(6)),
('Kiểm thử lại chức năng upload file', 1, '2025-11-27 17:00:00.000000', NOW(6));
