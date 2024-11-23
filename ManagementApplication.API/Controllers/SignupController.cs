using Azure;
using ManagementApplication.APP.Features.Commands.FUser.CreateUser;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ManagementApplication.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignupController : ControllerBase
    {
        readonly private IMediator _mediator;

        public SignupController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("Regiter")]
        public async Task<IActionResult> Regiter([FromBody] CreateUserCommandRequest model)
        {
            if (ModelState.IsValid)
            {
                CreateUserCommandResponse res = await _mediator.Send(model);
                return Ok(res);
            }

            return NotFound();
        }
    }
}
