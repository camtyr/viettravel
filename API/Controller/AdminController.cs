using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
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
        [HttpGet("destinations/all")]
        public async Task<IActionResult> GetAllDestinations()
        {
            var destinations = await _adminService.GetAllDestinations();
            return Ok(destinations);
        }


        [HttpGet("destinations/pending")]
        public async Task<IActionResult> GetPendingDestinations()
        {
            var destinations = await _adminService.GetPendingDestinations();
            return Ok(destinations);
        }

        [HttpGet("destinations/approved")]
        public async Task<IActionResult> GetApprovedDestinations()
        {
            var destinations = await _adminService.GetApprovedDestinations();
            return Ok(destinations);
        }

        [HttpGet("destinations/rejected")]
        public async Task<IActionResult> GetRejectedDestinations()
        {
            var destinations = await _adminService.GetRejectedDestinations();
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
