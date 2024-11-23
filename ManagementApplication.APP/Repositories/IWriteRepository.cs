using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementApplication.APP.Repositories
{
    public interface IWriteRepository<T> : IRepository<T> where T : class
    {
        Task<bool> AddAsync(T values);
        Task<bool> AddRangeAsync(List<T> values);
        bool DeleteRange(List<T> values);
        bool Update(T values);
        Task<int> SaveAsync();
    }
}
