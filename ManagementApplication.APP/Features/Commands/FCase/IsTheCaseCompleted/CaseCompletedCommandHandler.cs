using ManagementApplication.APP.Features.Commands.FCase.UpdateCase;
using ManagementApplication.APP.Repositories.Task.GetByIdCase;
using ManagementApplication.APP.Repositories.Task.UpdateCase;
using ManagementApplication.DOMAIN;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementApplication.APP.Features.Commands.FCase.IsTheCaseCompleted
{
    public class CaseCompletedCommandHandler : IRequestHandler<CaseCompletedCommandRequest, CaseCompletedCommandResponse>
    {
        readonly private ICaseReadGetById _caseReadGetById;
        private readonly IUpdateCaseWriteRepository _updateCaseWriteRepository;

        public CaseCompletedCommandHandler(ICaseReadGetById caseReadGetById, IUpdateCaseWriteRepository updateCaseWriteRepository)
        {
            _caseReadGetById = caseReadGetById;
            _updateCaseWriteRepository = updateCaseWriteRepository;
        }

        public async Task<CaseCompletedCommandResponse> Handle(CaseCompletedCommandRequest request, CancellationToken cancellationToken)
        {
            Case _case = await _caseReadGetById.GetSingleAsync(x => x.Id == request.Id);
            if (_case != null)
            {

                _case.IsCompleted = request.IsCompleted;   
                _updateCaseWriteRepository.Update(_case);
                await _updateCaseWriteRepository.SaveAsync();

                return new CaseCompletedCommandResponse
                {
                    Success = true,
                    Data = "",
                    Message = "Guncelleme Başarılı"
                };
            }
            else
                return new CaseCompletedCommandResponse
                {
                    Success = false,
                    Data = "",
                    Message = "Hata"
                };
        }
    }
}
