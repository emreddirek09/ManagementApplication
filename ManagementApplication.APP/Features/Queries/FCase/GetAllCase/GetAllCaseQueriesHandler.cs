using ManagementApplication.APP.Repositories.Task.GetAllCase;
using ManagementApplication.DOMAIN;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementApplication.APP.Features.Queries.FCase.GetAllCase
{
    public class GetAllCaseQueriesHandler : IRequestHandler<GetAllCaseQueriesRequest, GetAllCaseQueriesResponse>
    {
        readonly private IGetAllCaseReadRepository _getAllCaseReadRepository;

        public GetAllCaseQueriesHandler(IGetAllCaseReadRepository getAllCaseReadRepository)
        {
            _getAllCaseReadRepository = getAllCaseReadRepository;
        }

        public async Task<GetAllCaseQueriesResponse> Handle(GetAllCaseQueriesRequest request, CancellationToken cancellationToken)
        {


            var query = _getAllCaseReadRepository
                .GetAll()
                .AsQueryable(); // IQueryable olarak başlangıç

            query = query.Include(c => c.User);

            if (request.Id != 0)
            {
                query = query.Where(w => w.UserId == request.Id);
            }

            var res = await query
                .Select(c => new
                {
                    c.Title,
                    c.Description,
                    c.IsCompleted,
                    c.UserId,
                    UserName = c.User.Name
                })
                .ToListAsync();


            if (res != null && res.Count() != 0)
            {
                return new GetAllCaseQueriesResponse
                {
                    Message = "Listelendi",
                    Data = res,
                    Success = true,
                };
            }
            else
                return new GetAllCaseQueriesResponse
                {
                    Message = "Hata",
                    Data = "",
                    Success = false,
                };




        }
    }
}
