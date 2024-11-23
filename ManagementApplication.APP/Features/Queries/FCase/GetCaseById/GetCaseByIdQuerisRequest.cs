using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementApplication.APP.Features.Queries.FCase.GetCaseById
{
    public class GetCaseByIdQuerisRequest : IRequest<GetCaseByIdQuerisResponse>
    {
        public int Id { get; set; }
    }
}
