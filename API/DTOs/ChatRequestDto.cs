namespace API.DTOs
{
    public class ChatRequestDto
    {
        public List<ChatMessageDto> History { get; set; } = new();
    }
}