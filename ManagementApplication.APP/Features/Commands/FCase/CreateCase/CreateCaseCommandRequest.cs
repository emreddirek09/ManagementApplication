
using ManagementApplication.DOMAIN;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementApplication.APP.Features.Commands.FCase.CreateCase
{
    public class CreateCaseCommandRequest : IRequest<CreateCaseCommandResponse>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsCompleted { get; set; } = false;
        public int UserId { get; set; }
    }
}
