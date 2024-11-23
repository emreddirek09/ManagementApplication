using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementApplication.APP
{
    public static class ServiceRegistration
    {
        public static void AddApplicationServices(this IServiceCollection serviceCollection, Microsoft.Extensions.Configuration.ConfigurationManager configuration)
        {

            serviceCollection.AddMediatR(cfg =>
            {
                cfg.RegisterServicesFromAssembly(typeof(ServiceRegistration).Assembly);
            });

        }
    }
}
