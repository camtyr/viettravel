using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class ReviewDto
    {
        public int Id { get; set; }
        public int Rating { get; set; }
        public string? Comment { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; } = null!;
    }

    public class ReviewCreateDto
    {
        [Range(1, 5)]
        public int Rating { get; set; }
        [MaxLength(2000)]
        public string? Comment { get; set; }
    }

    public class ReviewUpdateDto
    {
        [Range(1, 5)]
        public int Rating { get; set; }
        [MaxLength(2000)]
        public string? Comment { get; set; }
    }
}