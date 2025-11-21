import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api/task";
import "./index.css";

export default function App() {
  // --- 1. STATE QUẢN LÝ DỮ LIỆU ---
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("All");

  // State cho form thêm mới (ở trên cùng)
  const [newTitle, setNewTitle] = useState("");
  const [newDueDate, setNewDueDate] = useState(new Date().toISOString().split('T')[0]);

  // --- 2. STATE QUẢN LÝ VIỆC SỬA (EDIT) ---
  const [editingId, setEditingId] = useState(null); // Đang sửa task nào? (Lưu ID)
  
  // Lưu tạm thông tin đang sửa để người dùng nhập liệu
  const [editForm, setEditForm] = useState({
    title: "",
    dueDate: "",
    status: 0,
    createdAt: "" // Lưu lại cái này để gửi trả Backend cho đủ bộ
  });

  // --- 3. HÀM TẢI DỮ LIỆU ---
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks(filter);
      setTasks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  // --- 4. HÀM THÊM MỚI ---
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return alert("Vui lòng nhập tên!");
    
    try {
      await createTask({ title: newTitle, dueDate: newDueDate });
      setNewTitle(""); // Reset ô nhập
      fetchTasks();    // Tải lại danh sách
    } catch (error) {
      alert("Thêm thất bại!");
    }
  };

  // --- 5. HÀM XÓA ---
  const handleDelete = async (id) => {
    if (confirm("Bạn chắc chắn muốn xóa?")) {
      try {
        await deleteTask(id);
        fetchTasks();
      } catch (error) {
        alert("Xóa thất bại!");
      }
    }
  };

  // --- 6. CÁC HÀM SỬA (QUAN TRỌNG) ---

  // Bấm nút "Sửa": Đổ dữ liệu cũ vào ô nhập
  const startEdit = (task) => {
    setEditingId(task.id); // Đánh dấu dòng này đang sửa
    setEditForm({
      title: task.title,
      // Cắt chuỗi ngày để vừa với input type="date" (YYYY-MM-DD)
      dueDate: task.dueDate.split('T')[0], 
      status: task.status,
      createdAt: task.createdAt
    });
  };

  // Bấm nút "Hủy": Thoát chế độ sửa
  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  // Bấm nút "Lưu": Gửi dữ liệu cập nhật lên Server
  const saveEdit = async () => {
    if (!editForm.title.trim()) return alert("Tên không được để trống!");

    try {
      // Chuẩn bị gói hàng gửi đi
      const payload = {
        id: editingId,         // <-- ID lấy từ state đang sửa
        title: editForm.title,
        dueDate: editForm.dueDate,
        status: parseInt(editForm.status), // Đảm bảo là số nguyên (0 hoặc 1)
        createdAt: editForm.createdAt
      };

      await updateTask(editingId, payload);
      
      setEditingId(null); // Tắt chế độ sửa
      fetchTasks();       // Tải lại danh sách
    } catch (error) {
      console.error(error);
      alert("Cập nhật thất bại! Kiểm tra Console (F12).");
    }
  };

  // --- 7. GIAO DIỆN ---
  return (
    <div className="container">
      <h1>Quản lý công việc</h1>

      {/* Form Thêm Mới */}
      <form onSubmit={handleAdd} className="card form-card">
        <h3>Thêm công việc mới</h3>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Tên công việc (ví dụ: Học React)" 
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
          />
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
             <span style={{fontSize: '0.8em', marginBottom: '2px', fontWeight: 'bold', color: '#555',}}>Ngày hết hạn:</span>
             <input 
              type="date" 
              value={newDueDate}
              onChange={e => setNewDueDate(e.target.value)}
            />
          </div>
          <button type="submit">Thêm</button>
        </div>
      </form>

      {/* Bộ lọc */}
      <div className="filter-section">
        <label>Hiển thị: </label>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="All">Tất cả</option>
          <option value="Pending">Đang làm</option>
          <option value="Completed">Hoàn thành</option>
        </select>
      </div>

      {/* Danh sách Task */}
      {loading ? <p>Đang tải...</p> : (
        <ul className="task-list">
          {tasks.length === 0 && <p className="empty-msg">Không có công việc nào.</p>}
          
          {tasks.map(task => (
            <li key={task.id} className={`task-item ${task.status === 1 ? 'completed' : ''}`}>
              
              {/* KIỂM TRA: Nếu ID này đang được sửa -> Hiện ô nhập */}
              {editingId === task.id ? (
                <div className="edit-mode">
                  <input 
                    type="text" 
                    className="edit-input"
                    value={editForm.title}
                    onChange={e => setEditForm({...editForm, title: e.target.value})}
                  />
                  
                  <input 
                    type="date"
                    className="edit-date"
                    value={editForm.dueDate}
                    onChange={e => setEditForm({...editForm, dueDate: e.target.value})}
                  />
                  
                  <select 
                    value={editForm.status}
                    onChange={e => setEditForm({...editForm, status: e.target.value})}
                    className="edit-select"
                  >
                    <option value={0}>Đang làm</option>
                    <option value={1}>Hoàn thành</option>
                  </select>

                  <div className="action-buttons">
                    <button onClick={saveEdit} className="btn-save">Lưu</button>
                    <button onClick={cancelEdit} className="btn-cancel">Hủy</button>
                  </div>
                </div>
              ) : (
                // Nếu KHÔNG phải đang sửa -> Hiện thông tin bình thường
                <>
                    <div className="task-info">
                      <span className="task-title">{task.title}</span>
                      <div className="task-meta">
                        <small>Hết hạn: {new Date(task.dueDate).toLocaleDateString('vi-VN')}</small>
                        <span className={`badge ${task.status === 1 ? 'badge-done' : 'badge-pending'}`}>
                          {task.status === 1 ? "Đã xong" : "Đang làm"}
                        </span>
                      </div>
                    </div>
                  <div className="action-buttons">
                    <button onClick={() => startEdit(task)} className="btn-edit">Sửa</button>
                    <button onClick={() => handleDelete(task.id)} className="btn-delete">Xóa</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}