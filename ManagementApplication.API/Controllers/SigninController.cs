using ManagementApplication.APP.Features.Queries.LoginUser;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ManagementApplication.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SigninController : ControllerBase
    {
        readonly private IMediator _mediator;

        public SigninController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Signin([FromBody] LoginUserQueryRequest model)
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
