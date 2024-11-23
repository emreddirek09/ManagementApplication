using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementApplication.APP.Features.Commands.FCase.UpdateCase
{
    public class UpdateCaseCommandRequest:IRequest<UpdateCaseCommandResponse>
    {
        public int Id { get; set; } 
    }
}
