using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")] //  chỉ admin mới truy cập
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet("homeadmin")]
        public async Task<IActionResult> GetDashboard()
        {
            var stats = await _adminService.GetDashboardStats();
            return Ok(stats);
        }

        [HttpGet("destinations/pending")]
        public async Task<IActionResult> GetPendingDestinations()
        {
            var destinations = await _adminService.GetPendingDestinations();
            return Ok(destinations);
        }

        [HttpPost("destinations/{id}/approve")]
        public async Task<IActionResult> ApproveDestination(int id)
        {
            await _adminService.ApproveDestination(id);
            return Ok(new { message = "Destination approved" });
        }

        [HttpPost("destinations/{id}/reject")]
        public async Task<IActionResult> RejectDestination(int id)
        {
            await _adminService.RejectDestination(id);
            return Ok(new { message = "Destination rejected" });
        }

        [HttpDelete("destinations/{id}")]
        public async Task<IActionResult> DeleteDestination(int id)
        {
            await _adminService.DeleteDestination(id);
            return Ok(new { message = "Destination deleted" });
        }
    }
}
