using API.DTOs;

namespace API.Interfaces
{
    public interface IAdminService
    {
        Task<object> GetDashboardStats();
        Task<IEnumerable<DestinationDto>> GetAllDestinations();
        Task<IEnumerable<DestinationDto>> GetPendingDestinations();
        Task<IEnumerable<DestinationDto>> GetApprovedDestinations();
        Task<IEnumerable<DestinationDto>> GetRejectedDestinations();
        Task<DestinationDto?> GetDestinationById(int id);
        Task ApproveDestination(int id, int adminId);
        Task RejectDestination(int id, int adminId);
        Task DeleteDestination(int id, int adminId);
    }
}
