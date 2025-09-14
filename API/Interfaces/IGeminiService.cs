namespace API.Interfaces
{
    public interface IGeminiService
    {
        Task<string> GetChatResponse(string prompt);
    }
}