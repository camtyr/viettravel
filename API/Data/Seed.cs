using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using System.Text;

public static class Seed
{
    public static async Task SeedAdmin(DataContext context)
    {
        if (!await context.Users.AnyAsync(x => x.Roles == "Admin"))
        {
            using var hmac = new System.Security.Cryptography.HMACSHA512();
            var admin = new AppUser
            {
                UserName = "admin",
                Email = "admin@test.com",
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd")),
                PasswordSalt = hmac.Key,
                Roles = "Admin"
            };
            context.Users.Add(admin);
            await context.SaveChangesAsync();
        }
    }
}
