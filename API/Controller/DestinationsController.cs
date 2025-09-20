using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DestinationsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ICloudinaryService _cloudinaryService;

        public DestinationsController(DataContext context, ICloudinaryService cloudinaryService)
        {
            _context = context;
            _cloudinaryService = cloudinaryService;
        }

        private DateTime GetVietnamDateTime()
        {
            return TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime.UtcNow, "SE Asia Standard Time");
        }

        // ===== USER =====

        // Tạo địa điểm mới (status = Pending)
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<DestinationResponseDto>> CreateDestination([FromForm] DestinationCreateDto dto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            var destination = new Destination
            {
                Name = dto.Name,
                Location = dto.Location,
                Category = dto.Category,
                Description = dto.Description,
                Status = "Pending",
                CreatedById = int.Parse(userId),
                CreatedDate = GetVietnamDateTime(),
                Rating = 0,
                RatingCount = 0
            };

            // Upload ảnh
            foreach (var file in dto.Files)
            {
                if (file != null && file.Length > 0)
                {
                    var imageUrl = await _cloudinaryService.UploadImageAsync(file);
                    destination.Images.Add(new DestinationImage { Url = imageUrl });
                }
            }

            _context.Destinations.Add(destination);
            await _context.SaveChangesAsync();

            // Trả về DTO
            return Ok(new DestinationResponseDto
            {
                Id = destination.Id,
                Name = destination.Name,
                Location = destination.Location,
                Category = destination.Category,
                Description = destination.Description,
                Status = destination.Status,
                CreatedDate = destination.CreatedDate,
                ImageUrls = destination.Images.Select(i => i.Url).ToList()
            });
        }

        // Lấy tất cả địa điểm đã duyệt
        [HttpGet("approved")]
        public async Task<ActionResult<IEnumerable<DestinationResponseDto>>> GetApprovedDestinations()
        {
            var destinations = await _context.Destinations
                .Include(d => d.Images)
                .Where(d => d.Status == "Approved")
                .ToListAsync();

            return Ok(destinations.Select(d => new DestinationResponseDto
            {
                Id = d.Id,
                Name = d.Name,
                Location = d.Location,
                Category = d.Category,
                Description = d.Description,
                Status = d.Status,
                CreatedDate = d.CreatedDate,
                ImageUrls = d.Images.Select(i => i.Url).ToList()
            }));
        }

        // Lấy chi tiết địa điểm đã duyệt
        [HttpGet("approved/{id}")]
        public async Task<ActionResult<DestinationResponseDto>> GetApprovedDestination(int id)
        {
            var destination = await _context.Destinations
                .Include(d => d.Images)
                .FirstOrDefaultAsync(d => d.Id == id && d.Status == "Approved");

            if (destination == null) return NotFound("Không tìm thấy địa điểm đã duyệt");

            return Ok(new DestinationResponseDto
            {
                Id = destination.Id,
                Name = destination.Name,
                Location = destination.Location,
                Category = destination.Category,
                Description = destination.Description,
                Status = destination.Status,
                CreatedDate = destination.CreatedDate,
                ImageUrls = destination.Images.Select(i => i.Url).ToList()
            });
        }

        // Lấy tất cả địa điểm của user
        [Authorize]
        [HttpGet("my")]
        public async Task<ActionResult<IEnumerable<DestinationResponseDto>>> GetMyDestinations()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var destinations = await _context.Destinations
                .Include(d => d.Images)
                .Where(d => d.CreatedById == userId)
                .ToListAsync();

            return Ok(destinations.Select(d => new DestinationResponseDto
            {
                Id = d.Id,
                Name = d.Name,
                Location = d.Location,
                Category = d.Category,
                Description = d.Description,
                Status = d.Status,
                CreatedDate = d.CreatedDate,
                ImageUrls = d.Images.Select(i => i.Url).ToList()
            }));
        }

        // Lấy địa điểm đang duyệt
        [Authorize]
        [HttpGet("my/pending")]
        public async Task<ActionResult<IEnumerable<DestinationResponseDto>>> GetMyPendingDestinations()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var destinations = await _context.Destinations
                .Include(d => d.Images)
                .Where(d => d.CreatedById == userId && d.Status == "Pending")
                .ToListAsync();

            return Ok(destinations.Select(d => new DestinationResponseDto
            {
                Id = d.Id,
                Name = d.Name,
                Location = d.Location,
                Category = d.Category,
                Description = d.Description,
                Status = d.Status,
                CreatedDate = d.CreatedDate,
                ImageUrls = d.Images.Select(i => i.Url).ToList()
            }));
        }

        // Lấy địa điểm đã duyệt của user
        [Authorize]
        [HttpGet("my/approved")]
        public async Task<ActionResult<IEnumerable<DestinationResponseDto>>> GetMyApprovedDestinations()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var destinations = await _context.Destinations
                .Include(d => d.Images)
                .Where(d => d.CreatedById == userId && d.Status == "Approved")
                .ToListAsync();

            return Ok(destinations.Select(d => new DestinationResponseDto
            {
                Id = d.Id,
                Name = d.Name,
                Location = d.Location,
                Category = d.Category,
                Description = d.Description,
                Status = d.Status,
                CreatedDate = d.CreatedDate,
                ImageUrls = d.Images.Select(i => i.Url).ToList()
            }));
        }

        // Lấy địa điểm bị từ chối
        [Authorize]
        [HttpGet("my/rejected")]
        public async Task<ActionResult<IEnumerable<DestinationResponseDto>>> GetMyRejectedDestinations()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var destinations = await _context.Destinations
                .Include(d => d.Images)
                .Where(d => d.CreatedById == userId && d.Status == "Rejected")
                .ToListAsync();

            return Ok(destinations.Select(d => new DestinationResponseDto
            {
                Id = d.Id,
                Name = d.Name,
                Location = d.Location,
                Category = d.Category,
                Description = d.Description,
                Status = d.Status,
                CreatedDate = d.CreatedDate,
                ImageUrls = d.Images.Select(i => i.Url).ToList()
            }));
        }

        // Cập nhật địa điểm của user
        [Authorize]
        [HttpPut("my/{id}")]
        public async Task<ActionResult<DestinationResponseDto>> UpdateMyDestination(int id, [FromForm] DestinationCreateDto dto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var destination = await _context.Destinations
                .Include(d => d.Images)
                .FirstOrDefaultAsync(d => d.Id == id && d.CreatedById == userId);

            if (destination == null) return NotFound("Không tìm thấy địa điểm của bạn");
            if (destination.Status == "Approved") return BadRequest("Địa điểm đã được duyệt, không thể chỉnh sửa");

            destination.Name = dto.Name;
            destination.Location = dto.Location;
            destination.Category = dto.Category;
            destination.Description = dto.Description;

            foreach (var file in dto.Files)
            {
                if (file != null && file.Length > 0)
                {
                    var imageUrl = await _cloudinaryService.UploadImageAsync(file);
                    destination.Images.Add(new DestinationImage { Url = imageUrl });
                }
            }

            await _context.SaveChangesAsync();

            return Ok(new DestinationResponseDto
            {
                Id = destination.Id,
                Name = destination.Name,
                Location = destination.Location,
                Category = destination.Category,
                Description = destination.Description,
                Status = destination.Status,
                CreatedDate = destination.CreatedDate,
                ImageUrls = destination.Images.Select(i => i.Url).ToList()
            });
        }

        // Xóa địa điểm của user
        [Authorize]
        [HttpDelete("my/{id}")]
        public async Task<ActionResult> DeleteMyDestination(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var destination = await _context.Destinations
                .Include(d => d.Images)
                .FirstOrDefaultAsync(d => d.Id == id && d.CreatedById == userId);

            if (destination == null) return NotFound("Không tìm thấy địa điểm của bạn");
            if (destination.Status == "Approved") return BadRequest("Địa điểm đã được duyệt, không thể xóa");

            _context.Destinations.Remove(destination);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Lấy chi tiết địa điểm của user
        [Authorize]
        [HttpGet("my/{id}")]
        public async Task<ActionResult<DestinationResponseDto>> GetMyDestination(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var destination = await _context.Destinations
                .Include(d => d.Images)
                .FirstOrDefaultAsync(d => d.Id == id && d.CreatedById == userId);

            if (destination == null) return NotFound("Không tìm thấy địa điểm của bạn");

            return Ok(new DestinationResponseDto
            {
                Id = destination.Id,
                Name = destination.Name,
                Location = destination.Location,
                Category = destination.Category,
                Description = destination.Description,
                Status = destination.Status,
                CreatedDate = destination.CreatedDate,
                ImageUrls = destination.Images.Select(i => i.Url).ToList()
            });
        }

        // ===== ADMIN =====

        // Tìm kiếm địa điểm đã duyệt
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<DestinationResponseDto>>> SearchDestinations([FromQuery] string keyword)
        {
            if (string.IsNullOrWhiteSpace(keyword)) return BadRequest("Vui lòng nhập từ khóa tìm kiếm");

            keyword = keyword.ToLower();

            var results = await _context.Destinations
                .Include(d => d.Images)
                .Where(d => d.Status == "Approved" &&
                    (d.Name.ToLower().Contains(keyword) ||
                     d.Location.ToLower().Contains(keyword) ||
                     d.Category.ToLower().Contains(keyword) ||
                     d.Description.ToLower().Contains(keyword)))
                .ToListAsync();

            return Ok(results.Select(d => new DestinationResponseDto
            {
                Id = d.Id,
                Name = d.Name,
                Location = d.Location,
                Category = d.Category,
                Description = d.Description,
                Status = d.Status,
                CreatedDate = d.CreatedDate,
                ImageUrls = d.Images.Select(i => i.Url).ToList()
            }));
        }
    }
}
