using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http; 
using System.Security.Claims;

namespace API.Middleware
{
    public class AdminActionLoggingMiddleware
    {
        private readonly RequestDelegate _next;

        public AdminActionLoggingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, DataContext db)
        {
            if (context.User.Identity?.IsAuthenticated == true &&
                context.User.IsInRole("Admin") &&
                context.Request.Path.StartsWithSegments("/api/admin"))
            {
                var adminId = int.Parse(context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

                var log = new AuditLog
                {
                    AdminId = adminId,
                    Action = $"{context.Request.Method} {context.Request.Path}",
                    CreatedAt = DateTime.UtcNow
                };

                db.AuditLogs.Add(log);
                await db.SaveChangesAsync();
            }

            await _next(context);
        }
    }
}
