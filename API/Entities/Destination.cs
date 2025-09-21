using API.Entities;

public class Destination
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string UrlPicture { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Status { get; set; } = "Pending";
    public double Rating { get; set; } = 0;
    public int RatingCount { get; set; } = 0;
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    public int? CreatedById { get; set; }
    

    public ICollection<DestinationImage> Images { get; set; } = new List<DestinationImage>();
}