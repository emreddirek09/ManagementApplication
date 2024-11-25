using ManagementApplication.APP.Features.Commands.FCase.CreateCase;
using ManagementApplication.APP.Features.Commands.FCase.DeleteCase;
using ManagementApplication.APP.Features.Commands.FCase.IsTheCaseCompleted;
using ManagementApplication.APP.Features.Commands.FCase.UpdateCase;
using ManagementApplication.APP.Features.Commands.FRole.AssignRole;
using ManagementApplication.APP.Features.Queries.FCase.GetAllCase;
using ManagementApplication.APP.Features.Queries.FCase.GetCaseById;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ManagementApplication.Ui.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        readonly IMediator _mediator;

        public TasksController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("AddTask")]
        public async Task<IActionResult> AddTask([FromBody] CreateCaseCommandRequest model)
        {
            if (ModelState.IsValid)
            {

                CreateCaseCommandResponse res = await _mediator.Send(model);

                return Ok(res);
            }

            return BadRequest(ModelState);
        }

        [HttpGet("GetCaseById")]
        public async Task<IActionResult> GetCaseById([FromQuery] GetCaseByIdQuerisRequest model)
        {
            if (ModelState.IsValid)
            {

                GetCaseByIdQuerisResponse res = await _mediator.Send(model);

                return Ok(res);
            }

            return BadRequest(ModelState);
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll([FromQuery] GetAllCaseQueriesRequest model)
        {
            if (ModelState.IsValid)
            {   

                GetAllCaseQueriesResponse res = await _mediator.Send(model);

                return Ok(res);
            }

            return BadRequest(ModelState);
        }

        [HttpPut("UpdateCase")]
        public async Task<IActionResult> UpdateCase([FromBody] UpdateCaseCommandRequest model)
        {
            if (ModelState.IsValid)
            {

                UpdateCaseCommandResponse res = await _mediator.Send(model);

                return Ok(res);
            }

            return BadRequest(ModelState);
        }
        [HttpPut("UpdateCaseIsComplated")]
        public async Task<IActionResult> UpdateCaseIsComplated([FromBody] CaseCompletedCommandRequest model)
        {
            if (ModelState.IsValid)
            {
                CaseCompletedCommandResponse res = await _mediator.Send(model);

                return Ok(res);
            }

            return BadRequest(ModelState);
        }

        [HttpDelete("DeleteCase")]
        public async Task<IActionResult> DeleteCase([FromBody] DeleteCaseCommandRequest model)
        {
            if (ModelState.IsValid)
            {

                DeleteCaseCommandResponse res = await _mediator.Send(model);

                return Ok(res);
            }

            return BadRequest(ModelState);
        }

    }
}
