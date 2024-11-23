using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementApplication.DAL
{
    public class Configuration
    {
        static public string ConnectionString
        {
            get
            {
                ConfigurationManager configurationManager = new ConfigurationManager(); 
                configurationManager.SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../ManagementApplication.Ui.Server")); 
                configurationManager.AddJsonFile("appsettings.json");
                return configurationManager.GetConnectionString("DefaultConnection");
            }

        }
    }
}
