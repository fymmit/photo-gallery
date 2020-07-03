using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace RestAPI.Controllers
{
    [ApiController]
    [Route("api/images")]
    public class ImageController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetImages()
        {
            var content = "GET /images";
            return new JsonResult(content);
        }
    }
}
