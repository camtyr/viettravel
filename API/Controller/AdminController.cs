using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDashboard()
        {
            var result = await _adminService.GetDashboardStats();
            return Ok(result);
        }

        [HttpGet("destinations/all")]
        public async Task<IActionResult> GetAllDestinations()
        {
            var result = await _adminService.GetAllDestinations();
            return Ok(result);
        }

        [HttpGet("destinations/pending")]
        public async Task<IActionResult> GetPendingDestinations()
        {
            var result = await _adminService.GetPendingDestinations();
            return Ok(result);
        }

        [HttpGet("destinations/approved")]
        public async Task<IActionResult> GetApprovedDestinations()
        {
            var result = await _adminService.GetApprovedDestinations();
            return Ok(result);
        }

        [HttpGet("destinations/rejected")]
        public async Task<IActionResult> GetRejectedDestinations()
        {
            var result = await _adminService.GetRejectedDestinations();
            return Ok(result);
        }

        [HttpGet("destinations/{id}")]
        public async Task<IActionResult> GetDestinationById(int id)
        {
            var result = await _adminService.GetDestinationById(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPost("destinations/{id}/approve")]
        public async Task<IActionResult> ApproveDestination(int id, [FromQuery] int adminId)
        {
            await _adminService.ApproveDestination(id, adminId);
            return Ok(new { message = "Destination approved successfully" });
        }

        [HttpPost("destinations/{id}/reject")]
        public async Task<IActionResult> RejectDestination(int id, [FromQuery] int adminId)
        {
            await _adminService.RejectDestination(id, adminId);
            return Ok(new { message = "Destination rejected successfully" });
        }

        [HttpDelete("destinations/{id}")]
        public async Task<IActionResult> DeleteDestination(int id, [FromQuery] int adminId)
        {
            await _adminService.DeleteDestination(id, adminId);
            return Ok(new { message = "Destination deleted successfully" });
        }
    }
}
