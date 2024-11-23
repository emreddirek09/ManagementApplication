using ManagementApplication.APP.Features.Commands.FUser.CreateUser;
using ManagementApplication.APP.Repositories;
using ManagementApplication.APP.Repositories.Task.CreateCase;
using ManagementApplication.DOMAIN;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementApplication.APP.Features.Commands.FCase.CreateCase
{
    public class CreateCaseCommandHandler : IRequestHandler<CreateCaseCommandRequest, CreateCaseCommandResponse>
    {
        private readonly ICreateCaseWriteRepository _caseWriteRepository;

        public CreateCaseCommandHandler(ICreateCaseWriteRepository caseWriteRepository)
        {
            _caseWriteRepository = caseWriteRepository;
        }

        public async Task<CreateCaseCommandResponse> Handle(CreateCaseCommandRequest request, CancellationToken cancellationToken)
        {
            bool res = await _caseWriteRepository.AddAsync(new DOMAIN.Case
            {
                Title = request.Title,
                Description = request.Description,
                IsCompleted = request.IsCompleted,
                UserId = request.UserId
            });

            if (res == true)
            {
                await _caseWriteRepository.SaveAsync();
                return new CreateCaseCommandResponse
                {
                    Success = true,
                    Message = "Kayıt başarıyla oluşturuldu!"
                };
            }

            else return new CreateCaseCommandResponse
            {
                Success = false,
                Message = "Hata!"
            };

        }
    }
}
