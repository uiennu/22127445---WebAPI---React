using Microsoft.AspNetCore.Mvc;
using TaskApi.Models;
using TaskApi.Services;

namespace TaskApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly ITaskService _service;

    // Tiêm Service vào Controller
    public TasksController(ITaskService service)
    {
        _service = service;
    }

    // GET: api/tasks?status=Pending
    // Lấy danh sách task, có thể lọc theo trạng thái "Pending" hoặc "Completed"
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string status = "All")
    {
        var data = await _service.GetTasksAsync(status);
        return Ok(data);
    }

    // POST: api/tasks
    // Tạo task mới
    [HttpPost]
    public async Task<IActionResult> Create(TaskItem task)
    {
        await _service.CreateTaskAsync(task);
        // Trả về object task vừa tạo
        return Ok(task);
    }

    // PUT: api/tasks/5
    // Cập nhật task theo ID
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, TaskItem task)
    {
        if (id != task.Id)
        {
            return BadRequest("ID trong URL không khớp với ID trong dữ liệu gửi lên");
        }

        await _service.UpdateTaskAsync(id, task);
        return Ok();
    }

    // DELETE: api/tasks/5
    // Xóa task theo ID
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteTaskAsync(id);
        return Ok();
    }
}