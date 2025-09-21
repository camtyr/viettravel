using API.DTOs;

namespace API.Interfaces
{
    public interface IGeminiService
    {
        Task<string> GetChatResponse(List<ChatMessageDto> history, List<Destination> destinations);
    }
}