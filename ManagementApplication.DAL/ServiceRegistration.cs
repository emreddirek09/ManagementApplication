using ManagementApplication.APP.Repositories.Users;
using ManagementApplication.APP.Token;
using ManagementApplication.DAL.Contexts;
using ManagementApplication.DAL.Repositories.Users;
using ManagementApplication.DOMAIN;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace ManagementApplication.DAL
{
    public static class ServiceRegistration
    {
        public static void AddPersistenceServices(this IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(Configuration.ConnectionString));
            services.AddScoped<IUserReadRepository, UserReadRepository>();
            services.AddScoped<IUserWriteRepository, UserWriteRepository>();
            services.AddScoped<ITokenHandler, APP.Token.TokenHandler>();

            //services.AddIdentity<AppUser, IdentityRole>()
            //                .AddEntityFrameworkStores<ApplicationDbContext>()
            //                .AddDefaultTokenProviders();


        }
    }
}
