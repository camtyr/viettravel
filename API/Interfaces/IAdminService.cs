using API.Entities;

namespace API.Interfaces
{
    public interface IAdminService
    {
        Task<object> GetDashboardStats();
        Task<IEnumerable<Destination>> GetPendingDestinations();
        Task ApproveDestination(int id);
        Task RejectDestination(int id);
        Task DeleteDestination(int id);
    }
}
