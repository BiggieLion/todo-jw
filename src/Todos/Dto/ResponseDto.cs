namespace Todos.Dto
{
    public class ResponseDto
    {
        public bool success { get; set; } = true;
        public bool error { get; set; } = false;
        public string action { get; set; } = "CONTINUE";
        public int statusCode { get; set; } = 200;
        public string message { get; set; } = "";
        public dynamic data { get; set; } = new {};
    }
}