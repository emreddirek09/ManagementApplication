using ManagementApplication.APP.Token;
using ManagementApplication.DOMAIN;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ManagementApplication.APP.Features.Queries.LoginUser
{
    public class LoginUserQueryHandler : IRequestHandler<LoginUserQueryRequest, LoginUserQueryResponse>
    {
        readonly UserManager<AppUser> _userManager;
        readonly SignInManager<AppUser> _signInMAnager;
        readonly ITokenHandler _tokenHandler;
        public LoginUserQueryHandler(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInMAnager,
            ITokenHandler tokenHandler)
        {
            _userManager = userManager;
            _signInMAnager = signInMAnager;
            _tokenHandler = tokenHandler;
        }

        public async Task<LoginUserQueryResponse> Handle(LoginUserQueryRequest request, CancellationToken cancellationToken)
        {
            AppUser _user = await _userManager.FindByNameAsync(request.UserNameOrMail);
            if (_user == null)
                _user = await _userManager.FindByEmailAsync(request.UserNameOrMail);

            if (_user == null)
                return new LoginUserQueryResponse()
                {
                    Message = "Kayıt Bulunamadı",
                    Success = false
                };
            SignInResult result = await _signInMAnager.CheckPasswordSignInAsync(_user, request.UserPassword, false);


            if (result.Succeeded)
            {
                var userRoles = await _userManager.GetRolesAsync(_user);
                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Role,_user.PhoneNumber)
                };

                await _userManager.AddClaimAsync(_user, new Claim("_UserName", _user.UserName));

                await _signInMAnager.SignInAsync(_user, false);


                authClaims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));

                DTOS.Token token = _tokenHandler.CreateAccessToken(5, authClaims);

                return new LoginUserQueryResponse()
                {
                    Message = "Giriş Başarılı",
                    Success = true,
                    Token = token,
                    Role = userRoles[0] ?? ""
                };
            }
            return new LoginUserQueryResponse()
            {
                Message = "Kimlik Doğrulama Hatası",
                Success = false
            };
        }
    }
}
