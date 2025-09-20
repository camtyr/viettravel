using Microsoft.AspNetCore.Http;

public class DestinationCreateDto
{
    public string Name { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public List<IFormFile> Files { get; set; } = new List<IFormFile>();
    public string Description { get; set; } = string.Empty;
}
