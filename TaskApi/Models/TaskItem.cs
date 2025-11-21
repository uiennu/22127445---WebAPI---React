using System.ComponentModel.DataAnnotations;

namespace TaskApi.Models;

public class TaskItem
{
    public int Id { get; set; }
    
    [Required]
    public string Title { get; set; } = string.Empty;
    
    // 0: Đang làm (Pending), 1: Hoàn thành (Completed)
    public int Status { get; set; } = 0; 
    
    public DateTime DueDate { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}