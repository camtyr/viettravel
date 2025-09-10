using API.Interfaces;
using System.Threading.Tasks;

namespace API.Services
{
    public class NotificationService : INotificationService
    {
        public Task SendNotificationAsync(string toUserEmail, string message)
        {
            // TODO: gửi email thực tế (SMTP hoặc 3rd-party như SendGrid)
            Console.WriteLine($"Notification sent to {toUserEmail}: {message}");
            return Task.CompletedTask;
        }
    }
}
