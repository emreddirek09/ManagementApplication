using ManagementApplication.APP.Repositories.Task.GetByIdCase;
using ManagementApplication.DAL.Contexts;
using ManagementApplication.DOMAIN;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementApplication.DAL.Repositories.Task.GetByIdCase
{
    public class CaseReadGetById : ReadRepository<Case>, ICaseReadGetById
    {
        public CaseReadGetById(ApplicationDbContext context) : base(context)
        {
        }
    }
}
