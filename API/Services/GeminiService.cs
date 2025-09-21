using System.Text;
using System.Text.Json;
using API.DTOs;
using API.Interfaces;
using Microsoft.Extensions.Configuration;

namespace API.Services
{
    public class GeminiService : IGeminiService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        public GeminiService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _apiKey = config["GeminiApiKey"] ?? "DefaultGem";
        }

        public async Task<string> GetChatResponse(List<ChatMessageDto> history, List<Destination> destinations)
        {
            var dbContextText = string.Join("\n", destinations.Select(d =>
                $"Tên: {d.Name}, Vị trí: {d.Location}, Loại: {d.Category}, " +
                $"Mô tả: {d.Description}, Đánh giá: {d.Rating}/5 ({d.RatingCount} lượt)"
            ));

            var systemPrompt =
                "Bạn là trợ lý du lịch. Chỉ sử dụng thông tin trong cơ sở dữ liệu dưới đây để xử lý và trả lời. " +
                "Nếu câu hỏi không có trong dữ liệu, hãy trả lời rằng bạn không tìm thấy thông tin.\n\n" +
                $"Dữ liệu địa điểm:\n{dbContextText}";

            var contents = new List<object>();

            contents.Add(new
            {
                role = "user",
                parts = new[] { new { text = systemPrompt } }
            });

            foreach (var msg in history)
            {
                contents.Add(new
                {
                    role = msg.Role,
                    parts = new[] { new { text = msg.Text } }
                });
            }

            var requestBody = new { contents };

            var request = new HttpRequestMessage(
                HttpMethod.Post,
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
            );

            request.Headers.Add("X-goog-api-key", _apiKey);
            request.Content = new StringContent(
                JsonSerializer.Serialize(requestBody),
                Encoding.UTF8,
                "application/json"
            );

            var response = await _httpClient.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                using var responseContent = await response.Content.ReadAsStreamAsync();
                using var document = JsonDocument.Parse(responseContent);

                var text = document.RootElement
                    .GetProperty("candidates")[0]
                    .GetProperty("content")
                    .GetProperty("parts")[0]
                    .GetProperty("text")
                    .GetString();

                return text ?? "No response from Gemini";
            }
            else
            {
                throw new HttpRequestException($"Request failed with status code: {response.StatusCode}, {await response.Content.ReadAsStringAsync()}");
            }
        }
    }
}