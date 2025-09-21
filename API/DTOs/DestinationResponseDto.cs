public class DestinationResponseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Status { get; set; } = "Pending";
    public List<string> ImageUrls { get; set; } = new List<string>();
    public DateTime CreatedDate { get; set; }
    public double Rating { get; set; } = 0;
    public int RatingCount { get; set; } = 0;

}
