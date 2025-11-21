using TaskApi.Models;

namespace TaskApi.Services;

public interface ITaskService
{
    // Lấy danh sách task (nhận vào chuỗi "Pending" hoặc "Completed")
    Task<List<TaskItem>> GetTasksAsync(string statusStr);
    
    // Tạo task mới
    Task CreateTaskAsync(TaskItem task);
    
    // Cập nhật task
    Task UpdateTaskAsync(int id, TaskItem task);
    
    // Xóa task
    Task DeleteTaskAsync(int id);
}