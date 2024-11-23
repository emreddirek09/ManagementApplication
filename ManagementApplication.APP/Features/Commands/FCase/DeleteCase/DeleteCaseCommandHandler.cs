using ManagementApplication.APP.Features.Queries.FCase.GetCaseById;
using ManagementApplication.APP.Repositories.Task.DeleteCase;
using ManagementApplication.APP.Repositories.Task.GetByIdCase;
using ManagementApplication.DOMAIN;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementApplication.APP.Features.Commands.FCase.DeleteCase
{
    public class DeleteCaseCommandHandler : IRequestHandler<DeleteCaseCommandRequest, DeleteCaseCommandResponse>
    {
        private readonly IDeleteCaseWriteRepository _deleteCaseWriteRepository;
        readonly private ICaseReadGetById _caseReadGetById;


        public DeleteCaseCommandHandler(IDeleteCaseWriteRepository deleteCaseWriteRepository, ICaseReadGetById caseReadGetById)
        {
            _deleteCaseWriteRepository = deleteCaseWriteRepository;
            _caseReadGetById = caseReadGetById;
        }

        public async Task<DeleteCaseCommandResponse> Handle(DeleteCaseCommandRequest request, CancellationToken cancellationToken)
        {
            Case _case = await _caseReadGetById.GetSingleAsync(x => x.Id == request.Id);
            if (_case != null)
            {
                _deleteCaseWriteRepository.Delete(_case);
                await _deleteCaseWriteRepository.SaveAsync();

                return new DeleteCaseCommandResponse { Success = true, Message = "Kayıt silme başarılı.", Data = "" };
            }
            return new DeleteCaseCommandResponse { Success = false, Message = "Kayıt bulunamadı.", Data = "" };
        }


    }
}
