import api from "./client";

export const getTasks = async (status) => {
  const params = {};
  if (status === 'Pending' || status === 'Completed') {
    params.status = status;
  }
  const res = await api.get("/tasks", { params });
  return res.data;
};

export const createTask = async (payload) => {
  const res = await api.post("/tasks", payload);
  return res.data;
};

export const updateTask = async (id, payload) => {
  await api.put(`/tasks/${id}`, payload);
};

// --- ĐÂY LÀ CHỖ QUAN TRỌNG NHẤT ---
// Tên hàm phải là deleteThisTask (có chữ This) để khớp với App.jsx
export const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`);
};