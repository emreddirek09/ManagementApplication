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
    public class CreateCaseWriteRepository : WriteRepository<Case>, ICreateCaseWriteRepository
    {
        public CreateCaseWriteRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
