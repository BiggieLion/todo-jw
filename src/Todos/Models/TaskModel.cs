using System.ComponentModel.DataAnnotations;

namespace Todos.Models
{
    public class TaskModel 
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public bool IsCompleted { get; set; } = false;
        public string DueDate { get; set; } = "";
        public string Notes { get; set; } = "";
    }
}