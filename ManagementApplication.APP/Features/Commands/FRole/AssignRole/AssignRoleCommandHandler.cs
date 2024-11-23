using ManagementApplication.DOMAIN;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace ManagementApplication.APP.Features.Commands.FRole.AssignRole
{
    public class AssignRoleCommandHandler : IRequestHandler<AssignRoleCommandRequest, AssignRoleCommandResponse>
    {
        private readonly UserManager<AppUser> _userManager;

        public AssignRoleCommandHandler(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<AssignRoleCommandResponse> Handle(AssignRoleCommandRequest request, CancellationToken cancellationToken)
        {
            try
            {
                AppUser user = await _userManager.FindByNameAsync(request.UserName);
                if (user == null)
                    return new AssignRoleCommandResponse()
                    {
                        Success = false,
                        Message = "Kullanıcı Bulunamadı"
                    };

                var result = await _userManager.AddToRoleAsync(user, request.RoleName);
                if (result.Succeeded)
                    return new AssignRoleCommandResponse()
                    {
                        Success = true,
                        Message = "Atama İşlemi Başarılı"
                    };
            }
            catch (Exception ex)
            {
                return new AssignRoleCommandResponse()
                {
                    Success = false,
                    Message = ex.InnerException.Message
                };
            }

            return new AssignRoleCommandResponse()
            {
                Success = false,
                Message = "Hata"
            };

        }
    }

}