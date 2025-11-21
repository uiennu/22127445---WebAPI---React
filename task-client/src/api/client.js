import axios from "axios";

// Tạo instance axios với cấu hình sẵn
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Xử lý lỗi chung (nếu có)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("Lỗi API:", err.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default api;