 using ManagementApplication.APP.Repositories.Task.UpdateCase;
using ManagementApplication.DAL.Contexts;
using ManagementApplication.DOMAIN; 

namespace ManagementApplication.DAL.Repositories.Task.UpdateCase
{
    public class UpdateCaseWriteRepository : WriteRepository<Case>, IUpdateCaseWriteRepository
    {
        public UpdateCaseWriteRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
