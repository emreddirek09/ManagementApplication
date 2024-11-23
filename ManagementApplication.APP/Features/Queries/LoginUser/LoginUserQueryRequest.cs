using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementApplication.APP.Features.Queries.LoginUser
{
    public class LoginUserQueryRequest : IRequest<LoginUserQueryResponse>
    {
        public string UserNameOrMail { get; set; }
        public string UserPassword { get; set; }
    }
}
