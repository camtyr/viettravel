using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
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


