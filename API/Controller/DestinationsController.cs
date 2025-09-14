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

        public DestinationsController(DataContext context)
        {
            _context = context;
        }

        // Hàm lấy ngày hiện tại theo múi giờ Việt Nam
        private DateTime GetVietnamDate()
        {
            var vietNamTime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime.UtcNow, "SE Asia Standard Time");
            return vietNamTime.Date;
        }

        // ===== USER =====

        // User tạo địa điểm mới (status = pending)
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Destination>> CreateDestination(DestinationCreateDto dto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            var destination = new Destination
            {
                Name = dto.Name,
                Location = dto.Location,
                Category = dto.Category,
                UrlPicture = dto.UrlPicture,
                Description = dto.Description,
                Status = "pending",                 // mặc định chờ duyệt
                CreatedById = int.Parse(userId),
                CreatedDate = GetVietnamDate(),
                Rating = 0,
                RatingCount = 0
            };

            _context.Destinations.Add(destination);
            await _context.SaveChangesAsync();

            return Ok(destination);
        }

        // Lấy tất cả địa điểm đã được duyệt (public)
        [HttpGet("approved")]
        public async Task<ActionResult<IEnumerable<Destination>>> GetApprovedDestinations()
        {
            return await _context.Destinations
                .Where(d => d.Status == "approved")
                .ToListAsync();
        }
        // Xem chi tiết 1 địa điểm đã được duyệt (public)
        [HttpGet("approved/{id}")]
        public async Task<ActionResult<Destination>> GetApprovedDestination(int id)
        {
            var destination = await _context.Destinations
                .FirstOrDefaultAsync(d => d.Id == id && d.Status == "approved");

            if (destination == null) return NotFound("Không tìm thấy địa điểm đã duyệt");

            return Ok(destination);
        }

        // User lấy tất cả địa điểm mình đã đăng
        [Authorize]
        [HttpGet("my")]
        public async Task<ActionResult<IEnumerable<Destination>>> GetMyDestinations()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            return await _context.Destinations
                .Where(d => d.CreatedById == userId)
                .ToListAsync();
        }

        // User lấy địa điểm đã được duyệt
        [Authorize]
        [HttpGet("my/approved")]
        public async Task<ActionResult<IEnumerable<Destination>>> GetMyApprovedDestinations()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            return await _context.Destinations
                .Where(d => d.CreatedById == userId && d.Status == "approved")
                .ToListAsync();
        }

        // User lấy địa điểm đang chờ duyệt
        [Authorize]
        [HttpGet("my/pending")]
        public async Task<ActionResult<IEnumerable<Destination>>> GetMyPendingDestinations()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            return await _context.Destinations
                .Where(d => d.CreatedById == userId && d.Status == "pending")
                .ToListAsync();
        }
        

        // User lấy địa điểm bị từ chối
        [Authorize]
        [HttpGet("my/rejected")]
        public async Task<ActionResult<IEnumerable<Destination>>> GetMyRejectedDestinations()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            return await _context.Destinations
                .Where(d => d.CreatedById == userId && d.Status == "rejected")
                .ToListAsync();
        }
        // User cập nhật địa điểm mình đã đăng (chỉ khi chưa duyệt hoặc bị từ chối)
        [Authorize]
        [HttpPut("my/{id}")]
        public async Task<ActionResult> UpdateMyDestination(int id, DestinationCreateDto dto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var destination = await _context.Destinations.FirstOrDefaultAsync(d => d.Id == id && d.CreatedById == userId);
            if (destination == null) return NotFound("Không tìm thấy địa điểm của bạn");

            // Không cho sửa khi đã approved
            if (destination.Status == "approved")
                return BadRequest("Địa điểm đã được duyệt, không thể chỉnh sửa");

            destination.Name = dto.Name;
            destination.Location = dto.Location;
            destination.Category = dto.Category;
            destination.UrlPicture = dto.UrlPicture;
            destination.Description = dto.Description;

            await _context.SaveChangesAsync();

            return Ok(destination);
        }

        // User xóa địa điểm mình đã đăng (chỉ khi chưa duyệt hoặc bị từ chối)
        [Authorize]
        [HttpDelete("my/{id}")]
        public async Task<ActionResult> DeleteMyDestination(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var destination = await _context.Destinations.FirstOrDefaultAsync(d => d.Id == id && d.CreatedById == userId);
            if (destination == null) return NotFound("Không tìm thấy địa điểm của bạn");

            if (destination.Status == "approved")
                return BadRequest("Địa điểm đã được duyệt, không thể xóa");

            _context.Destinations.Remove(destination);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // User xem chi tiết 1 địa điểm mình đã đăng
        [Authorize]
        [HttpGet("my/{id}")]
        public async Task<ActionResult<Destination>> GetMyDestination(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var destination = await _context.Destinations.FirstOrDefaultAsync(d => d.Id == id && d.CreatedById == userId);
            if (destination == null) return NotFound("Không tìm thấy địa điểm của bạn");

            return Ok(destination);
        }

        // ===== ADMIN =====

        
        // Tìm kiếm địa điểm đã duyệt theo từ khóa
        [HttpGet("search")]
public async Task<ActionResult<IEnumerable<Destination>>> SearchDestinations([FromQuery] string keyword)
{
    if (string.IsNullOrWhiteSpace(keyword))
        return BadRequest("Vui lòng nhập từ khóa tìm kiếm");

    keyword = keyword.ToLower();

    var results = await _context.Destinations
        .Where(d => d.Status == "approved" &&
            (d.Name.ToLower().Contains(keyword) ||
             d.Location.ToLower().Contains(keyword) ||
             d.Category.ToLower().Contains(keyword) ||
             d.Description.ToLower().Contains(keyword)))
        .ToListAsync();

    return Ok(results);
}





    }
}