using ManagementApplication.APP.Features.Queries.FUser.GetAllUsers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ManagementApplication.Ui.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Admin")]

    public class UsersController : ControllerBase
    {
        private readonly IMediator _mediator;
        public UsersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("GetAllUser")]
        public async Task<IActionResult> GetAllUser([FromQuery] GetAllUsersQueryRequest model)
        {
            if (ModelState.IsValid)
            {
                GetAllUsersQueryResponse res = await _mediator.Send(model);

                return Ok(res);
            }

            return NoContent();
        }
         
    }
}
