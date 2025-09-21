using API.Data;
using API.DTOs;
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
            var rejected = await _context.Destinations.CountAsync(d => d.Status == "Rejected");
            var users = await _context.Users.CountAsync();

            return new
            {
                TotalDestinations = totalDestinations,
                ApprovedDestinations = approved,
                PendingDestinations = pending,
                RejectedDestinations = rejected,
                TotalUsers = users
            };
        }

        private DestinationDto MapToDto(Destination destination)
        {
            var imageUrls = destination.Images?.Select(i => i.Url).ToList() ?? new List<string>();
            return new DestinationDto
            {
                Id = destination.Id,
                Name = destination.Name,
                Location = destination.Location,
                Category = destination.Category,
                UrlPicture = imageUrls.FirstOrDefault() ?? string.Empty,
                Description = destination.Description,
                Status = destination.Status,
                Rating = destination.Rating,
                RatingCount = destination.RatingCount,
                CreatedDate = destination.CreatedDate,
                CreatedById = destination.CreatedById ?? 0,
                ImageUrls = imageUrls
            };
        }

        private DestinationDto MapToDetailDto(Destination destination)
        {
            var imageUrls = destination.Images?.Select(i => i.Url).ToList() ?? new List<string>();
            return new DestinationDto
            {
                Id = destination.Id,
                Name = destination.Name,
                Location = destination.Location,
                Category = destination.Category,
                UrlPicture = imageUrls.FirstOrDefault() ?? string.Empty,
                Description = destination.Description,
                Status = destination.Status,
                Rating = destination.Rating,
                RatingCount = destination.RatingCount,
                CreatedDate = destination.CreatedDate,
                CreatedById = destination.CreatedById ?? 0,
                ImageUrls = imageUrls
            };
        }

        public async Task<IEnumerable<DestinationDto>> GetAllDestinations()
        {
            var destinations = await _context.Destinations
                .Include(d => d.Images)
                .ToListAsync();
            return destinations.Select(MapToDto);
        }

        public async Task<IEnumerable<DestinationDto>> GetPendingDestinations()
        {
            var destinations = await _context.Destinations
                .Include(d => d.Images)
                .Where(d => d.Status == "Pending")
                .ToListAsync();
            return destinations.Select(MapToDto);
        }

        public async Task<IEnumerable<DestinationDto>> GetApprovedDestinations()
        {
            var destinations = await _context.Destinations
                .Include(d => d.Images)
                .Where(d => d.Status == "Approved")
                .ToListAsync();
            return destinations.Select(MapToDto);
        }

        public async Task<IEnumerable<DestinationDto>> GetRejectedDestinations()
        {
            var destinations = await _context.Destinations
                .Include(d => d.Images)
                .Where(d => d.Status == "Rejected")
                .ToListAsync();
            return destinations.Select(MapToDto);
        }

        public async Task<DestinationDto?> GetDestinationById(int id)
        {
            var destination = await _context.Destinations
                .Include(d => d.Images)
                .FirstOrDefaultAsync(d => d.Id == id);

            return destination == null ? null : MapToDetailDto(destination);
        }

        public async Task ApproveDestination(int id, int adminId)
        {
            var destination = await _context.Destinations.FindAsync(id);
            if (destination == null) throw new Exception("Destination not found");

            destination.Status = "Approved";
            _context.AuditLogs.Add(new AuditLog
            {
                AdminId = adminId,
                Action = $"Approved destination {id}"
            });
            await _context.SaveChangesAsync();
        }

        public async Task RejectDestination(int id, int adminId)
        {
            var destination = await _context.Destinations.FindAsync(id);
            if (destination == null) throw new Exception("Destination not found");

            destination.Status = "Rejected";
            _context.AuditLogs.Add(new AuditLog
            {
                AdminId = adminId,
                Action = $"Rejected destination {id}"
            });
            await _context.SaveChangesAsync();
        }

        public async Task DeleteDestination(int id, int adminId)
        {
            var destination = await _context.Destinations
                .Include(d => d.Images)
                .FirstOrDefaultAsync(d => d.Id == id);
            if (destination == null) throw new Exception("Destination not found");

            _context.Destinations.Remove(destination);
            _context.AuditLogs.Add(new AuditLog
            {
                AdminId = adminId,
                Action = $"Deleted destination {id}"
            });
            await _context.SaveChangesAsync();
        }
    }
}
