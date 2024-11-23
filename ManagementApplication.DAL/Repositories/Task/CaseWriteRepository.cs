using ManagementApplication.APP.Repositories.Task;
using ManagementApplication.DAL.Contexts;
using ManagementApplication.DOMAIN;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementApplication.DAL.Repositories.Task
{
    public class CaseWriteRepository : WriteRepository<Case>, ICaseWriteRepository
    {
        public CaseWriteRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
