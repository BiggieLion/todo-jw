using System.Globalization;

namespace Todos.Utils
{
    public static class TitleCase
    {
        public static string ToTitleCase(string task)
        {
            var textInfo = new CultureInfo("en-US").TextInfo;

            return textInfo.ToTitleCase(task);
        }
    }
}