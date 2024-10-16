namespace Todos.Dto
{
    public class TaskDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public bool IsDone { get; set; } = false;
        public string DueDate { get; set; } = "";
        public string Notes { get; set; } = "";
    }
}
