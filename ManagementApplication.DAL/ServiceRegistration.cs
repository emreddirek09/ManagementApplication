using ManagementApplication.APP.Repositories.Task.GetByIdCase;
using ManagementApplication.DAL.Repositories.Task.GetByIdCase;
using ManagementApplication.APP.Repositories.Task.CreateCase;
using ManagementApplication.APP.Repositories.Task.DeleteCase;
using ManagementApplication.APP.Repositories.Task.GetAllCase;
using ManagementApplication.APP.Repositories.Task.UpdateCase;
using ManagementApplication.DAL.Repositories.Task.CreateCase;
using ManagementApplication.DAL.Repositories.Task.DeleteCase;
using ManagementApplication.DAL.Repositories.Task.GetAllCase;
using ManagementApplication.DAL.Repositories.Task.UpdateCase;
using ManagementApplication.DAL.Repositories.Users;
using ManagementApplication.APP.Repositories.Users;
using Microsoft.Extensions.DependencyInjection;
using ManagementApplication.DAL.Contexts;
using ManagementApplication.APP.Token;
using Microsoft.EntityFrameworkCore;

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
            services.AddScoped<ICreateCaseReadRepository, CreateCaseReadRepository>();
            services.AddScoped<ICreateCaseWriteRepository, CreateCaseWriteRepository>();
            services.AddScoped<ICaseReadGetById, CaseReadGetById>();
            services.AddScoped<IGetAllCaseReadRepository, GetAllCaseReadRepository>();
            services.AddScoped<IUpdateCaseWriteRepository, UpdateCaseWriteRepository>();
            services.AddScoped<IDeleteCaseWriteRepository, DeleteCaseWriteRepository>();
        }
    }
}
