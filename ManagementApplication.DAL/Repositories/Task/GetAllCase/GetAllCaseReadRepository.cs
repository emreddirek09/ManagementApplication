using ManagementApplication.APP.Repositories.Task.GetAllCase;
using ManagementApplication.DAL.Contexts;
using ManagementApplication.DOMAIN; 

namespace ManagementApplication.DAL.Repositories.Task.GetAllCase
{
    public class GetAllCaseReadRepository : ReadRepository<Case>, IGetAllCaseReadRepository
    {
        public GetAllCaseReadRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
