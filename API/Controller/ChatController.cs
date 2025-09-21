using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private static readonly HashSet<string> StopWords = new()
        {
            "tôi", "muốn", "tìm", "ở", "có", "những", "địa", "điểm", "du", "lịch", "chỗ", "nào", "về", "các", "một"
        };

        private readonly IGeminiService _geminiService;
        private readonly IDestinationRepository _destinationRepository;

        public ChatController(IGeminiService geminiService, IDestinationRepository destinationRepository)
        {
            _geminiService = geminiService;
            _destinationRepository = destinationRepository;
        }

        [HttpPost("chat")]
        public async Task<IActionResult> Chat([FromBody] ChatRequestDto request)
        {
            try
            {
                var prompt = request.History.LastOrDefault(h => h.Role == "user")?.Text ?? "";

                var keywords = ExtractKeywords(prompt);

                var destinations = await _destinationRepository.SearchDestinationsAsync(keywords);

                var response = await _geminiService.GetChatResponse(request.History, destinations);
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

        private List<string> ExtractKeywords(string prompt)
        {
            return prompt
                .ToLower()
                .Split(new[] { ' ', ',', '.', '?', '!' }, StringSplitOptions.RemoveEmptyEntries)
                .Where(word => !StopWords.Contains(word))
                .Distinct()
                .ToList();
        }
    }
}