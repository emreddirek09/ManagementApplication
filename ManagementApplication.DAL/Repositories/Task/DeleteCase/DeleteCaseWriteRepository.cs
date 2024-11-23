 using ManagementApplication.APP.Repositories.Task.DeleteCase;
using ManagementApplication.DAL.Contexts;
using ManagementApplication.DOMAIN; 

namespace ManagementApplication.DAL.Repositories.Task.DeleteCase
{
    public class DeleteCaseWriteRepository : WriteRepository<Case>, IDeleteCaseWriteRepository
    {
        public DeleteCaseWriteRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
