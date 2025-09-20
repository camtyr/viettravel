using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewsController : ControllerBase
    {
        private readonly DataContext _context;

        public ReviewsController(DataContext context)
        {
            _context = context;
        }

        private int GetUserId() => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

        // Create or update review for a destination (one review per user per destination)
        [Authorize]
        [HttpPost("destination/{destinationId}")]
        public async Task<ActionResult> UpsertReview(int destinationId, ReviewCreateDto dto)
        {
            var userId = GetUserId();

            var destination = await _context.Destinations.FirstOrDefaultAsync(d => d.Id == destinationId && d.Status == "Approved");
            if (destination == null) return NotFound("Địa điểm không tồn tại hoặc chưa được duyệt");

            var existing = await _context.Reviews.FirstOrDefaultAsync(r => r.DestinationId == destinationId && r.UserId == userId);
            if (existing == null)
            {
                var review = new Review
                {
                    DestinationId = destinationId,
                    UserId = userId,
                    Rating = dto.Rating,
                    Comment = dto.Comment,
                    CreatedAt = DateTime.UtcNow
                };
                _context.Reviews.Add(review);
            }
            else
            {
                existing.Rating = dto.Rating;
                existing.Comment = dto.Comment;
                existing.UpdatedAt = DateTime.UtcNow;
            }

            await _context.SaveChangesAsync();

            await RecalculateDestinationRating(destinationId);

            return NoContent();
        }

        // Delete own review
        [Authorize]
        [HttpDelete("destination/{destinationId}")]
        public async Task<ActionResult> DeleteMyReview(int destinationId)
        {
            var userId = GetUserId();
            var review = await _context.Reviews.FirstOrDefaultAsync(r => r.DestinationId == destinationId && r.UserId == userId);
            if (review == null) return NotFound();

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();
            await RecalculateDestinationRating(destinationId);
            return NoContent();
        }

        // List reviews for a destination (public)
        [HttpGet("destination/{destinationId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetDestinationReviews(int destinationId)
        {
            var exists = await _context.Destinations.AnyAsync(d => d.Id == destinationId && d.Status == "Approved");
            if (!exists) return NotFound();

            var reviews = await _context.Reviews
                .Where(r => r.DestinationId == destinationId)
                .OrderByDescending(r => r.CreatedAt)
                .Select(r => new
                {
                    r.Id,
                    r.Rating,
                    r.Comment,
                    r.CreatedAt,
                    r.UpdatedAt,
                    r.UserId
                })
                .ToListAsync();

            return Ok(reviews);
        }

        // Get my reviews list
        [Authorize]
        [HttpGet("my")] 
        public async Task<ActionResult<IEnumerable<object>>> GetMyReviews()
        {
            var userId = GetUserId();
            var reviews = await _context.Reviews
                .Where(r => r.UserId == userId)
                .OrderByDescending(r => r.CreatedAt)
                .Select(r => new
                {
                    r.Id,
                    r.DestinationId,
                    r.Rating,
                    r.Comment,
                    r.CreatedAt,
                    r.UpdatedAt
                })
                .ToListAsync();
            return Ok(reviews);
        }

        // Comments on a review
        [Authorize]
        [HttpPost("{reviewId}/comments")] 
        public async Task<ActionResult> AddComment(int reviewId, ReviewCommentCreateDto dto)
        {
            var userId = GetUserId();
            var reviewExists = await _context.Reviews.AnyAsync(r => r.Id == reviewId);
            if (!reviewExists) return NotFound();

            var comment = new ReviewComment
            {
                ReviewId = reviewId,
                UserId = userId,
                Content = dto.Content,
                CreatedAt = DateTime.UtcNow
            };
            _context.ReviewComments.Add(comment);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("{reviewId}/comments")]
        public async Task<ActionResult<IEnumerable<object>>> GetComments(int reviewId)
        {
            var reviewExists = await _context.Reviews.AnyAsync(r => r.Id == reviewId);
            if (!reviewExists) return NotFound();

            var comments = await _context.ReviewComments
                .Where(c => c.ReviewId == reviewId)
                .OrderByDescending(c => c.CreatedAt)
                .Select(c => new { c.Id, c.Content, c.UserId, c.CreatedAt, c.UpdatedAt })
                .ToListAsync();
            return Ok(comments);
        }

        [Authorize]
        [HttpPut("comments/{commentId}")]
        public async Task<ActionResult> UpdateComment(int commentId, ReviewCommentUpdateDto dto)
        {
            var userId = GetUserId();
            var comment = await _context.ReviewComments.FirstOrDefaultAsync(c => c.Id == commentId && c.UserId == userId);
            if (comment == null) return NotFound();
            comment.Content = dto.Content;
            comment.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [Authorize]
        [HttpDelete("comments/{commentId}")]
        public async Task<ActionResult> DeleteComment(int commentId)
        {
            var userId = GetUserId();
            var comment = await _context.ReviewComments.FirstOrDefaultAsync(c => c.Id == commentId && c.UserId == userId);
            if (comment == null) return NotFound();
            _context.ReviewComments.Remove(comment);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private async Task RecalculateDestinationRating(int destinationId)
        {
            var stats = await _context.Reviews
                .Where(r => r.DestinationId == destinationId)
                .GroupBy(r => r.DestinationId)
                .Select(g => new { Count = g.Count(), Avg = g.Average(x => x.Rating) })
                .FirstOrDefaultAsync();

            var destination = await _context.Destinations.FindAsync(destinationId);
            if (destination == null) return;

            if (stats == null)
            {
                destination.Rating = 0;
                destination.RatingCount = 0;
            }
            else
            {
                destination.Rating = Math.Round(stats.Avg, 2);
                destination.RatingCount = stats.Count;
            }
            await _context.SaveChangesAsync();
        }
    }
}


