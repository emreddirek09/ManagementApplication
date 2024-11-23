using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementApplication.APP.Repositories
{
    public interface IRepository<T> where T : class
    {
        DbSet<T> table { get; }
    }
}
