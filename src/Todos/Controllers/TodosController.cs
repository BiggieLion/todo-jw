using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;
using System.Text;

namespace Todos.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class TodosController : ControllerBase
{
    [HttpGet]
    public IActionResult GetList()
    {
        var sb = new StringBuilder();

        sb.AppendLine("[");

        var lines = System.IO.File.ReadAllLines("Todos.txt");

        for (var i = 0; i < lines.Length; i++)
        {
            var data = lines[i].Split(",");

            sb.Append($"{{ \"i\": { data[0] }, \"text\": \"{ ToTitleCase(data[1]) }\", \"isDone\": { data[2] } }}");
            
            if (i < lines.Length - 1)
            {
                sb.AppendLine(",");
            }
            else
            {
                sb.AppendLine();
            }
        }

        sb.AppendLine("]");

        return Content(sb.ToString(), MediaTypeNames.Application.Json, Encoding.UTF8);
    }

    public static string ToTitleCase(string todo)
    {
        var fs = todo.IndexOf(' ', 1);

        if (todo[0] == ' ')
        {
            if (todo.Length > 1)
            {
                if (fs != -1)
                {
                    return todo[0].ToString() + Char.ToUpper(todo[1]) + todo.Substring(2, fs - 2) + ToTitleCase(todo.Substring(fs));
                }
                else
                {
                    return todo[0].ToString() + Char.ToUpper(todo[1]) + todo.Substring(2);
                }
            }
            else
            {
                return todo.ToUpper();
            }
        }
        else
        {
            if (fs == -1)
            {
                return Char.ToUpper(todo[0]) + todo.Substring(1);
            }
            else
            {
                return Char.ToUpper(todo[0]) + todo.Substring(1, fs - 1) + ToTitleCase(todo.Substring(fs));
            }
        }
    }
}
