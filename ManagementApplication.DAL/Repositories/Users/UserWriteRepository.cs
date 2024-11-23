using ManagementApplication.APP.Repositories.Users;
using ManagementApplication.DAL.Contexts;
using ManagementApplication.DOMAIN;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementApplication.DAL.Repositories.Users
{
    public class UserWriteRepository : WriteRepository<AppUser>, IUserWriteRepository
    {
        public UserWriteRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
