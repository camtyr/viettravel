using API.Data;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class DestinationRepository : IDestinationRepository
    {
        private readonly DataContext _context;

        public DestinationRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Destination>> SearchDestinationsAsync(List<string> keywords)
        {
            if (keywords == null || !keywords.Any())
                return new List<Destination>();

            return await _context.Destinations
                .Where(d => keywords.Any(k =>
                    d.Name.Contains(k) ||
                    d.Location.Contains(k)))
                .Include(d => d.Images)
                .ToListAsync();
        }
    }
}