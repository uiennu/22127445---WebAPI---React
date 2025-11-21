📌 ỨNG DỤNG QUẢN LÝ TASK CÁ NHÂN (Personal Task Manager)

- Sinh viên thực hiện: Nguyễn Lâm Nhã Uyên
- Mã số sinh viên: 22127445

- Ứng dụng quản lý công việc cá nhân, cho phép thêm, sửa, xóa và lọc công việc theo trạng thái.

# Công nghệ sử dụng
1. Backend: ASP.NET Core Web API (.NET 8).
2. Database: MySQL (Entity Framework Core).
3. Frontend: ReactJS (Vite).
4. IDE: Visual Studio Code.

# Yêu cầu cài đặt
Trước khi chạy, đảm bảo máy tính đã cài đặt:
1. .NET SDK 8.0 trở lên.
2. Node.js (phiên bản LTS mới nhất).
3. MySQL Server và MySQL Workbench.
4. Visual Studio Code.
5. C# Dev Kit (Cài trong Visual Studio Code).

# Hướng dẫn cài đặt & Chạy
## BƯỚC 1: Cấu hình Database (MySQL)
1. Mở MySQL Workbench.
2. Đăng nhập vào Local instance.
3. Mở một tab Query mới và chạy đoạn lệnh SQL sau để tạo Database và Bảng:<br>
CREATE DATABASE IF NOT EXISTS taskdb;<br>
USE taskdb;<br>
CREATE TABLE IF NOT EXISTS Tasks<br>
(<br>
&nbsp;&nbsp;Id INT AUTO_INCREMENT PRIMARY KEY,<br>
&nbsp;&nbsp;Title VARCHAR(200) CHARACTER SET utf8mb4 NOT NULL,<br>
&nbsp;&nbsp;Status INT NOT NULL DEFAULT 0, -- 0: Đang làm, 1: Hoàn thành<br>
&nbsp;&nbsp;DueDate DATETIME(6) NOT NULL,<br>
&nbsp;&nbsp;CreatedAt DATETIME(6) NOT NULL<br>
);

4. Tạo dữ liệu mẫu.<br>
INSERT INTO Tasks (Title, Status, DueDate, CreatedAt)<br>
VALUES<br>
('Hoàn thiện giao diện trang chủ', 0, '2025-11-25 18:00:00.000000', NOW(6)),<br>
('Sửa lỗi đăng nhập trên backend', 1, '2025-11-26 12:00:00.000000', NOW(6)),<br>
('Tối ưu hóa API lấy dữ liệu', 0, '2025-11-30 09:00:00.000000', NOW(6)),<br>
('Viết tài liệu hướng dẫn người dùng', 0, '2025-12-05 23:59:59.000000', NOW(6)),<br>
('Kiểm thử lại chức năng upload file', 1, '2025-11-27 17:00:00.000000', NOW(6));<br>

## BƯỚC 2: Chạy Backend (.NET API)
1. Mở Terminal hoặc Command Prompt và di chuyển vào thư mục TaskApi:
2. Cấu hình kết nối Database:
    1. Mở file appsettings.json.
    2. Kiểm tra dòng ConnectionStrings. Đảm bảo mật khẩu (password) khớp với mật khẩu MySQL.<br>
    &nbsp;"ConnectionStrings": {<br>
    &nbsp;"Default": "server=localhost;port=3306;database=taskdb;user=root;password=MAT_KHAU_CUA_BAN"} <br>
    ***Thay MAT_KHAU_CUA_BAN thành mật khẩu MySQL***
3. Chạy lệnh khởi động Server: dotnet run
4. Kết quả thành công:
    1. Sau khi chạy thàng công, sẽ tìm thấy có dòng này xuất hiện trên Terminal hoặc Command Prompts: http://localhost:xxxx.<br>
    ***(xxxx là số cổng (port number) mà ứng dụng .NET dùng để lắng nghe request)***

## BƯỚC 3: Cấu hình biến môi trường:
1. Mở file .env.local. trong thư mục task-client.
2. Paste dòng này vào file:
    VITE_API_BASE_URL=http://localhost:xxxx/api<br>
    ***(Dòng http://localhost:xxxx chính là dòng được hiển thị trên Terminal hoặc Command Prompt ở bước 2)***

## BƯỚC 4: Chạy Frontend (React App)
1. Mở một Terminal hoặc Command Prompt mới, di chuyển vào thư mục task-client: cd task-client.
2. Chạy câu lệnh: npm run dev.
3. Nếu chạy thành công thì trên Terminal hoặc Command Prompt sẽ hiển thị:<br>
&nbsp;➜  Local:   http://localhost:5173/<br>
&nbsp;➜  Network: use --host to expose<br>
&nbsp;➜  press h + enter to show help<br>
4. Truy cập đường dẫn http://localhost:5173/<br>
***(Nếu hệ thống yêu cầu cài đặt thêm thư viện, chạy câu lệnh npm install để cài đặt)***
         
# Cấu trúc thư mục dự án
    Project-Root/
    ├── task-client/              # FRONTEND (ReactJS)
    │   ├── src/
    │   │   ├── api/              # Cấu hình Axios & gọi API
    |   |   |   ├── client.js     # Cấu hình Axios
    |   |   |   └── task.js       # Các hàm CRUD (getTasks, createTask...)
    │   │   ├── App.css           # (Tùy chọn) CSS riêng cho component App
    │   │   ├── App.jsx           # Giao diện chính
    |   |   ├── index.css         # CSS toàn cục & Style giao diện (Responsive)
    |   |   └── main.jsx          # Điểm khởi chạy React (Mount vào thẻ root)
    │   ├── .env.local            # Cấu hình URL API
    │   └── package.json          # Quản lý thư viện (React, Axios, Vite...)
    │
    ├── TaskApi/                  # BACKEND (.NET Core)
    │   ├── Controllers/          # API Endpoints (TasksController.cs)
    │   ├── Data/                 # DbContext (AppDbContext.cs)
    │   ├── Models/               # Entity Models (TaskItem.cs)
    │   ├── Repositories/         # Xử lý truy xuất DB
    │   ├── Services/             # Xử lý nghiệp vụ
    │   ├── appsettings.json      # Cấu hình DB
    │   └── Program.cs            # Cấu hình DI, CORS, MySQL
    └── README.md                 # Hướng dẫn sử dụng

# Lưu ý
- Trong task-client/.env.local, nội dung đang là: **VITE_API_BASE_URL=http://localhost:5062/api**.
- Cần thay đổi 5062 thành port trên máy bạn.
- File README.md trong task-client là file README do hệ thống tự tạo.
- File README.md nằm cùng cấp với 2 thư mục task-client và TaskApi mới là file README hướng dẫn cách chạy.


