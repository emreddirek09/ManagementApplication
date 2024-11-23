using ManagementApplication.APP.Repositories.Task.CreateCase;
using ManagementApplication.DAL.Contexts;
using ManagementApplication.DOMAIN;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementApplication.DAL.Repositories.Task.CreateCase
{
    public class CreateCaseReadRepository : ReadRepository<Case>, ICreateCaseReadRepository
    {
        public CreateCaseReadRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
