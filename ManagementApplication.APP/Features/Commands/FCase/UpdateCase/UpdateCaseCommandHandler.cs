﻿using ManagementApplication.APP.Repositories.Task.GetByIdCase;
using ManagementApplication.APP.Repositories.Task.UpdateCase;
using ManagementApplication.DOMAIN;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementApplication.APP.Features.Commands.FCase.UpdateCase
{
    public class UpdateCaseCommandHandler : IRequestHandler<UpdateCaseCommandRequest, UpdateCaseCommandResponse>
    {
        readonly private IUpdateCaseWriteRepository _updateCaseWriteRepository;
        readonly private ICaseReadGetById _caseReadGetById;

        public UpdateCaseCommandHandler(IUpdateCaseWriteRepository updateCaseWriteRepository, ICaseReadGetById caseReadGetById)
        {
            _updateCaseWriteRepository = updateCaseWriteRepository;
            _caseReadGetById = caseReadGetById;
        }

        public async Task<UpdateCaseCommandResponse> Handle(UpdateCaseCommandRequest request, CancellationToken cancellationToken)
        {
            Case _case = await _caseReadGetById.GetSingleAsync(x => x.Id == request.Id);
            if (_case != null)
            {

                _case.IsCompleted = request.IsCompleted;
                _case.Title = request.Title;
                _case.Description = request.Description;
                _case.UserId = request.UserId;
                _updateCaseWriteRepository.Update(_case);
                await _updateCaseWriteRepository.SaveAsync();

                return new UpdateCaseCommandResponse
                {
                    Success = true,
                    Data = "",
                    Message = "Guncelleme Başarılı"
                };
            }
            else
                return new UpdateCaseCommandResponse
                {
                    Success = false,
                    Data = "",
                    Message = "Hata"
                };
        }
    }
}
