using ManagementApplication.APP.Repositories.Task.GetByIdCase;
using ManagementApplication.DOMAIN;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementApplication.APP.Features.Queries.FCase.GetCaseById
{
    public class GetCaseByIdQuerisHandler : IRequestHandler<GetCaseByIdQuerisRequest, GetCaseByIdQuerisResponse>
    {
        readonly private ICaseReadGetById _caseReadGetById;

        public GetCaseByIdQuerisHandler(ICaseReadGetById caseReadGetById)
        {
            _caseReadGetById = caseReadGetById;
        }

        public async Task<GetCaseByIdQuerisResponse> Handle(GetCaseByIdQuerisRequest request, CancellationToken cancellationToken)
        {
            Case res = await _caseReadGetById.GetSingleAsync(c => c.Id == request.Id);

            if (res != null)
            {
                return new GetCaseByIdQuerisResponse
                {
                    Success = true,
                    Message = "Başarılı",
                    Data = res
                };
            }
            else
                return new GetCaseByIdQuerisResponse
                {
                    Success = false,
                    Message = "Hata",
                    Data = ""
                }; 
        }
    }
}
