using API.Entities;

namespace API.Interfaces
{
    public interface IAdminService
    {
        Task<object> GetDashboardStats();
        Task<IEnumerable<Destination>> GetAllDestinations();
        Task<IEnumerable<Destination>> GetPendingDestinations();
        Task<IEnumerable<Destination>> GetApprovedDestinations();
        Task<IEnumerable<Destination>> GetRejectedDestinations();
        Task ApproveDestination(int id);
        Task RejectDestination(int id);
        Task DeleteDestination(int id);
    }
}
