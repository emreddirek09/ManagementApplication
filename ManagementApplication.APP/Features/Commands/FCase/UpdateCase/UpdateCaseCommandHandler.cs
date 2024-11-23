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
        public Task<UpdateCaseCommandResponse> Handle(UpdateCaseCommandRequest request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
