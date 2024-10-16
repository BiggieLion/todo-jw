using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Todos.Database;
using Todos.Dto;
using Todos.Models;
using Todos.Utils;

namespace Todos.Services
{
    public class TaskService
    {
        private readonly TodoDatabase _db;
        public TaskService(TodoDatabase todoDatabase) => _db = todoDatabase;

        public ResponseDto CreateTask(TaskDto taskDto)
        {
            TaskModel taskToSave = new TaskModel();
            taskToSave.Id = taskDto.Id;
            taskToSave.Title = TitleCase.ToTitleCase(taskDto.Title);
            taskToSave.IsDone = taskDto.IsDone;
            taskToSave.DueDate = taskDto.DueDate;
            taskToSave.Notes = taskDto.Notes;

            _db.Tasks.Add(taskToSave);
            _db.SaveChanges();

            return new ResponseDto
            {
                success = true,
                error = false,
                action = "CONTINUE",
                statusCode = 201,
                message = "Tarea creada correctamente",
                data = taskToSave
            };
        }

        public async Task<ResponseDto> GetTasks()
        {
            return new ResponseDto
            {
                success = true,
                error = false,
                action = "CONTINUE",
                statusCode = 200,
                message = "Tasks retrieved successfully",
                data = await _db.Tasks.ToListAsync()
            };
        }

        public async Task<ResponseDto> GetTaskById(int id)
        {
            var task = await _db.Tasks.FindAsync(id);

            if (task == null)
            {
                return new ResponseDto
                {
                    success = false,
                    error = true,
                    action = "STOP",
                    statusCode = 404,
                    message = "Tarea no encontrada",
                    data = new { }
                };
            }

            return new ResponseDto
            {
                success = true,
                error = false,
                action = "CONTINUE",
                statusCode = 200,
                message = "Tasks retrieved successfully",
                data = task
            };
        }

        public async Task<ResponseDto> UpdateTask(int id, [FromBody] TaskDto taskDto)
        {
            TaskModel taskToUpdate = await _db.Tasks.FindAsync(id);

            if (taskToUpdate == null)
            {
                return new ResponseDto
                {
                    success = false,
                    error = true,
                    action = "STOP",
                    statusCode = 404,
                    message = "Tarea no encontrada",
                    data = new { }
                };
            }

            taskToUpdate.Title = TitleCase.ToTitleCase(taskDto.Title);
            taskToUpdate.IsDone = taskDto.IsDone;
            taskToUpdate.DueDate = taskDto.DueDate;
            taskToUpdate.Notes = taskDto.Notes;

            _db.Tasks.Update(taskToUpdate);
            _db.SaveChanges();

            return new ResponseDto
            {
                success = true,
                error = false,
                action = "CONTINUE",
                statusCode = 200,
                message = "Tarea actualizada correctamente",
                data = taskToUpdate
            };
        }

        public async Task<ResponseDto> RemoveTask(int id)
        {
            TaskModel taskToDelete = await _db.Tasks.FindAsync(id);

            if (taskToDelete == null)
            {
                return new ResponseDto
                {
                    success = false,
                    error = true,
                    action = "STOP",
                    statusCode = 404,
                    message = "Tarea no encontrada",
                    data = new { }
                };
            }

            _db.Tasks.Remove(taskToDelete);
            _db.SaveChanges();

            return new ResponseDto
            {
                success = true,
                error = false,
                action = "CONTINUE",
                statusCode = 200,
                message = "Tarea eliminada correctamente",
                data = taskToDelete
            };
        }
    }
}
