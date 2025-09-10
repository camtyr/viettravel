using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class AdminService : IAdminService
    {
        private readonly DataContext _context;

        public AdminService(DataContext context)
        {
            _context = context;
        }

        public async Task<object> GetDashboardStats()
        {
            var totalDestinations = await _context.Destinations.CountAsync();
            var approved = await _context.Destinations.CountAsync(d => d.Status == "Approved");
            var pending = await _context.Destinations.CountAsync(d => d.Status == "Pending");
            var users = await _context.Users.CountAsync();

            return new
            {
                TotalDestinations = totalDestinations,
                ApprovedDestinations = approved,
                PendingDestinations = pending,
                TotalUsers = users
            };
        }

        public async Task<IEnumerable<Destination>> GetPendingDestinations()
        {
            return await _context.Destinations
                .Where(d => d.Status == "Pending")
                .ToListAsync();
        }

        public async Task ApproveDestination(int id)
        {
            var destination = await _context.Destinations.FindAsync(id);
            if (destination == null) throw new Exception("Destination not found");

            destination.Status = "Approved";
            await _context.SaveChangesAsync();
        }

        public async Task RejectDestination(int id)
        {
            var destination = await _context.Destinations.FindAsync(id);
            if (destination == null) throw new Exception("Destination not found");

            destination.Status = "Rejected";
            await _context.SaveChangesAsync();
        }

        public async Task DeleteDestination(int id)
        {
            var destination = await _context.Destinations.FindAsync(id);
            if (destination == null) throw new Exception("Destination not found");

            _context.Destinations.Remove(destination);
            await _context.SaveChangesAsync();
        }
    }
}
