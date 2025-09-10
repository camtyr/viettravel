using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface INotificationService
    {
        Task SendNotificationAsync(string toUserEmail, string message);
    }
}
