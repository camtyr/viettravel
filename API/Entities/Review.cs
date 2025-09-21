using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Review
    {
        public int Id { get; set; }
        public int DestinationId { get; set; }
        public int UserId { get; set; }
        [Range(1, 5)]
        public int Rating { get; set; }
        [MaxLength(2000)]
        public string? Comment { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}