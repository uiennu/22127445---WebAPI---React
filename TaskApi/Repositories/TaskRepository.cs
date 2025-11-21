using Microsoft.EntityFrameworkCore;
using TaskApi.Data;
using TaskApi.Models;

namespace TaskApi.Repositories;

public class TaskRepository : ITaskRepository
{
    private readonly AppDbContext _context;

    // Tiêm DbContext vào Repository để thao tác với Database
    public TaskRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<TaskItem>> GetAllAsync(int? status)
    {
        var query = _context.Tasks.AsQueryable();
        
        // Nếu có truyền status (0 hoặc 1) thì lọc, nếu không thì lấy hết
        if (status.HasValue)
        {
            query = query.Where(t => t.Status == status.Value);
        }

        // Sắp xếp theo ngày hết hạn tăng dần
        return await query.OrderBy(t => t.DueDate).ToListAsync();
    }

    public async Task<TaskItem?> GetByIdAsync(int id)
    {
        return await _context.Tasks.FindAsync(id);
    }

    public async Task AddAsync(TaskItem task)
    {
        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(TaskItem task)
    {
        _context.Tasks.Update(task);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task != null)
        {
            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
        }
    }
}