using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class ReviewCommentCreateDto
    {
        [MaxLength(2000)]
        public string Content { get; set; } = string.Empty;
    }

    public class ReviewCommentUpdateDto
    {
        [MaxLength(2000)]
        public string Content { get; set; } = string.Empty;
    }
}


