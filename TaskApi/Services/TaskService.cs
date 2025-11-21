using TaskApi.Models;
using TaskApi.Repositories;

namespace TaskApi.Services;

public class TaskService : ITaskService
{
    private readonly ITaskRepository _repo;

    // Kỹ thuật Dependency Injection: Tiêm Repository vào đây để sử dụng
    public TaskService(ITaskRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<TaskItem>> GetTasksAsync(string statusStr)
    {
        // Logic xử lý: Chuyển từ chữ sang số để DB hiểu
        // Frontend gửi lên "Pending" -> Service đổi thành số 0
        // Frontend gửi lên "Completed" -> Service đổi thành số 1
        int? status = null;
        
        if (statusStr == "Pending") status = 0;
        if (statusStr == "Completed") status = 1;

        // Gọi xuống Repository để lấy dữ liệu thật
        return await _repo.GetAllAsync(status);
    }

    public async Task CreateTaskAsync(TaskItem task)
    {
        // Logic nghiệp vụ: Luôn gán ngày tạo là thời điểm hiện tại
        task.CreatedAt = DateTime.UtcNow;
        
        // Gọi Repository để lưu vào DB
        await _repo.AddAsync(task);
    }

    public async Task UpdateTaskAsync(int id, TaskItem input)
    {
        // Bước 1: Kiểm tra xem task có tồn tại không đã
        var existing = await _repo.GetByIdAsync(id);
        if (existing == null) return; // Nếu không tìm thấy thì thôi, thoát luôn

        // Bước 2: Nếu tìm thấy, cập nhật thông tin mới vào
        existing.Title = input.Title;
        existing.DueDate = input.DueDate;
        existing.Status = input.Status;

        // Bước 3: Gọi Repository để lưu thay đổi
        await _repo.UpdateAsync(existing);
    }

    public async Task DeleteTaskAsync(int id)
    {
        // Gọi Repository để xóa
        await _repo.DeleteAsync(id);
    }
}