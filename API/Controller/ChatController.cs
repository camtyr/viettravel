using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly IGeminiService _geminiService;

        public ChatController(IGeminiService geminiService)
        {
            _geminiService = geminiService;
        }

        [HttpPost("chat")]
        public async Task<IActionResult> Chat([FromBody] string prompt)
        {
            if (string.IsNullOrWhiteSpace(prompt))
            {
                return BadRequest("Prompt cannot be empty.");
            }

            try
            {
                var response = await _geminiService.GetChatResponse(prompt);
                var chatResponse = new DTOs.ChatResponseDto
                {
                    Response = response
                };
                return Ok(chatResponse);
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(500, $"Error communicating with Gemini API: {ex.Message}");
            }
        }
    }
}