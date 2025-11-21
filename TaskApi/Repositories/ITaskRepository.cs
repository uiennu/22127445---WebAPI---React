using TaskApi.Models;

namespace TaskApi.Repositories;

public interface ITaskRepository
{
    Task<List<TaskItem>> GetAllAsync(int? status);
    Task<TaskItem?> GetByIdAsync(int id);
    Task AddAsync(TaskItem task);
    Task UpdateAsync(TaskItem task);
    Task DeleteAsync(int id);
}