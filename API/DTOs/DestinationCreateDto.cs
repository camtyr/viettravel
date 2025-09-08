namespace API.DTOs;

    public class DestinationCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string UrlPicture { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }