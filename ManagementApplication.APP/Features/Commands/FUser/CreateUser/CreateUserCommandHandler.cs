using ManagementApplication.APP.Repositories.Users;
using ManagementApplication.DOMAIN;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementApplication.APP.Features.Commands.FUser.CreateUser
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommandRequest, CreateUserCommandResponse>
    {
        readonly IUserWriteRepository _userWriteRepository;
        readonly UserManager<AppUser> _userManager;
        readonly private IMediator _mediator;

        public CreateUserCommandHandler(IUserWriteRepository userWriteRepository, UserManager<AppUser> userManager, IMediator mediator)
        {
            _userWriteRepository = userWriteRepository;
            _userManager = userManager;
            _mediator = mediator;
        }

        public async Task<CreateUserCommandResponse> Handle(CreateUserCommandRequest request, CancellationToken cancellationToken)
        { 
            try
            {
                IdentityResult result = await _userManager.CreateAsync(new()
                { 
                    Name = request.Name,
                    Surname=request.SurName,
                    KimlikNo=request.KimlikNo,
                    UserName = request.UserName,
                    Email = request.UserEmail,
                    PhoneNumber = request.PhoneNumber

                }, request.UserPassword);

                if (result.Succeeded)
                    return new CreateUserCommandResponse
                    {
                        Success = true,
                        Message = "Kullanıcı başarıyla oluşturuldu!"
                    };
            }
            catch (Exception ex)
            {

                throw;
            } 


            return new CreateUserCommandResponse
            {
                Success = false,
                Message = "Hata"
            };
        }
    }
}
