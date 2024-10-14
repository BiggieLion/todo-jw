using Microsoft.EntityFrameworkCore;
using Todos.Models;

namespace Todos.Database
{
    public class TodoDatabase : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase(databaseName: "Todos");
        }

        public DbSet<TaskModel> Tasks { get; set; }
    }
}