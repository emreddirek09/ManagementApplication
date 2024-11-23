using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementApplication.APP.Features.Commands.FCase.IsTheCaseCompleted
{
    public class CaseCompletedCommandRequest:IRequest<CaseCompletedCommandResponse>
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public bool IsCompleted { get; set; }
    }
}
