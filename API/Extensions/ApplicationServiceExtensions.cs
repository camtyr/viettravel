using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
//using API.Helpers;

namespace API.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddDbContext<DataContext>(options =>
        {
            var connectionString = config.GetConnectionString("DefaultConnection");
            options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
        });

        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<ICloudinaryService, CloudinaryService>();
        services.AddScoped<IDestinationRepository, DestinationRepository>();
        services.AddHttpClient<IGeminiService, GeminiService>();

        services.AddCors(opt =>
        {
            opt.AddPolicy("AllowReact", policy =>
            {
                policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
            });
        });

        return services;
    }
}