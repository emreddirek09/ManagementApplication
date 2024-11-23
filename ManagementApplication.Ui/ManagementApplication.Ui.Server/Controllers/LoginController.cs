using ManagementApplication.APP.Features.Queries.LoginUser;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ManagementApplication.Ui.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        readonly private IMediator _mediator;

        public LoginController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginUserQueryRequest model)
        {
            if (ModelState.IsValid)
            {

                LoginUserQueryResponse res = await _mediator.Send(model);

                return Ok(res);
            }

            return NotFound();
        }
    }
}
