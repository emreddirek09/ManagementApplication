using ManagementApplication.DOMAIN;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementApplication.APP.Features.Queries.FCase.GetAllCase
{
    public class GetAllCaseQueriesRequest:IRequest<GetAllCaseQueriesResponse>
    {
        public int Id { get; set; }
    }
}
