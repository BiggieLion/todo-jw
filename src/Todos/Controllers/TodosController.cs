using Microsoft.AspNetCore.Mvc;
using Todos.Dto;
using Todos.Services;

namespace Todos.Controllers
{
    [ApiController]
    [Route("tasks")]

    /// <summary>
    /// Controller for handling task operations
    /// </summary>

    public class TasksController : ControllerBase
    {
        // Creating a new task service object to use in the controller
        private readonly TaskService _taskService;
        /// <summary>
        /// Constructor for the TasksController
        /// </summary>
        /// <param name="taskService">Object that its parameters contains the data store and retrieve logic</param>
        public TasksController(TaskService taskService)
        {
            this._taskService = taskService;
        }

        /// <summary>
        /// Get a task by its id
        /// </summary>
        /// <param name="Id">ID of the task</param>
        /// <param name="Title">Title of the task</param>
        /// <param name="IsDone">Flag to indicate if the task is done or not</param>
        /// <param name="DueDate">Deadline of the task</param>
        /// <param name="Notes">Notes of the task</param>
        /// <returns>
        /// Ok HTTP response following the next DTO structure:
        /// {
        ///    "success": boolean, <- Indicates if the operation was successful
        ///    "error": boolean, <- Indicates if an error occurred
        ///    "action": string, <- Indicates if the operation should CONTINUE or STOP
        ///    "statusCode": number, <- HTTP status code
        ///    "message": string, <- Message to be displayed
        ///    "data": list <- Task || empty object
        /// }
        /// </returns>
        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] TaskDto task)
        {
            ResponseDto result = this._taskService.CreateTask(task);

            return CreatedAtAction("CreateTask", result);
        }

        /// <summary>
        /// Get all tasks
        /// </summary>
        /// <returns>
        /// Ok HTTP response following the next DTO structure:
        /// {
        ///    "success": boolean, <- Indicates if the operation was successful
        ///    "error": boolean, <- Indicates if an error occurred
        ///    "action": string, <- Indicates if the operation should CONTINUE or STOP
        ///    "statusCode": number, <- HTTP status code
        ///    "message": string, <- Message to be displayed
        ///    "data": list <- List of tasks || empty object 
        /// }
        /// </returns>
        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            return Ok(await this._taskService.GetTasks());
        }

        /// <summary>
        /// Get a task by its id
        /// </summary>
        /// <param name="id">ID of the task</param>
        /// <returns>
        /// Ok HTTP response following the next DTO structure:
        /// {
        ///    "success": boolean, <- Indicates if the operation was successful
        ///    "error": boolean, <- Indicates if an error occurred
        ///    "action": string, <- Indicates if the operation should CONTINUE or STOP
        ///    "statusCode": number, <- HTTP status code
        ///    "message": string, <- Message to be displayed
        ///    "data": list <- Task || empty object
        /// }
        /// </returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTaskById(int id)
        {
            ResponseDto result = await this._taskService.GetTaskById(id);

            if (result.action == "STOP")
            {
                return NotFound(result);
            }

            return Ok(result);
        }

        /// <summary>
        /// Delete a task by  id
        /// </summary>
        /// <param name="id">ID of the task</param>
        /// <returns>
        /// Ok HTTP response following the next DTO structure:
        /// {
        ///    "success": boolean, <- Indicates if the operation was successful
        ///    "error": boolean, <- Indicates if an error occurred
        ///    "action": string, <- Indicates if the operation should CONTINUE or STOP
        ///    "statusCode": number, <- HTTP status code
        ///    "message": string, <- Message to be displayed
        ///    "data": list <- Task || empty object
        /// }
        /// </returns>
        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] TaskDto task)
        {
            ResponseDto result = await this._taskService.UpdateTask(id, task);

            if (result.action == "STOP")
            {
                return NotFound(result);
            }

            return Ok(result);
        }

        /// <summary>
        /// Delete a task by  id
        /// </summary>
        /// <param name="id">ID of the task</param>
        /// <returns>
        /// Ok HTTP response following the next DTO structure:
        /// {
        ///    "success": boolean, <- Indicates if the operation was successful
        ///    "error": boolean, <- Indicates if an error occurred
        ///    "action": string, <- Indicates if the operation should CONTINUE or STOP
        ///    "statusCode": number, <- HTTP status code
        ///    "message": string, <- Message to be displayed
        ///    "data": list <- Task || empty object
        /// }
        /// </returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            ResponseDto result = await this._taskService.RemoveTask(id);

            if (result.action == "STOP")
            {
                return NotFound(result);
            }

            return Ok(result);
        }
    }
}