 using ManagementApplication.DOMAIN; 

using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection; 

namespace ManagementApplication.APP
{
    public static class ServiceRegistration
    {
        public static void AddApplicationServices(this IServiceCollection serviceCollection, Microsoft.Extensions.Configuration.ConfigurationManager configuration)
        {  
            // MediatR yapılandırması
            serviceCollection.AddMediatR(cfg =>
            {
                cfg.RegisterServicesFromAssembly(typeof(ServiceRegistration).Assembly);
            });
        }
    }
}
