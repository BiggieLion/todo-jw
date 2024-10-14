using Todos.Database;
using Todos.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors((options) =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
        policy.AllowAnyOrigin();
    });
});

builder.Services.AddScoped<TaskService>();

builder.Services.AddControllers();

// Add In-memoery database
builder.Services.AddDbContext<TodoDatabase>();

var app = builder.Build();

app.UseCors();
app.MapControllers();

// In order to versioning the API, I'm ussing 
app.UsePathBase(new PathString("/api/v1/"));
app.UseRouting();

app.Run();
