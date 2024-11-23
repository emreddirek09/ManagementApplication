using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementApplication.APP.Features.Queries.FUser.LoginUser
{
    public class LoginUserQueryResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public string? Role { get; set; }
        public object? Token { get; set; }
    }
}
