namespace API.DTOs
{
    public class DestinationDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string UrlPicture { get; set; } = string.Empty; // ảnh đầu tiên
        public string Description { get; set; } = string.Empty;
         public string Status { get; set; } = "Pending";
        public double Rating { get; set; }
        public int RatingCount { get; set; }
        public DateTime CreatedDate { get; set; }
        public int CreatedById { get; set; }
        public List<string> ImageUrls { get; set; } = new List<string>(); // danh sách ảnh
    }
}
