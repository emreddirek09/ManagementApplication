using ManagementApplication.DOMAIN;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementApplication.APP.Features.Commands.FRole.CreateRole
{
    public class CreateRoleCommandHandler : IRequestHandler<CreateRoleCommandRequest, CreateRoleCommandResponse>
    {
        private readonly RoleManager<AppUser> _roleManager;

        public CreateRoleCommandHandler(RoleManager<AppUser> roleManager)
        {
            _roleManager = roleManager;
        }

        public async Task<CreateRoleCommandResponse> Handle(CreateRoleCommandRequest request, CancellationToken cancellationToken)
        {
            try
            {
                if (!await _roleManager.RoleExistsAsync(request.RoleName))
                {
                    var result = await _roleManager.CreateAsync(new()
                    { 
                        Name = request.RoleName
                    });
                    if (result.Succeeded)
                        return new CreateRoleCommandResponse
                        {
                            Success = true,
                            Message = "Role tanımlaması oluşturuldu!"
                        };
                }

            }
            catch (Exception ex)
            {

                throw;
            }

            return new CreateRoleCommandResponse
            {
                Success = false,
                Message = "Hata"
            };
        }
    }
}
