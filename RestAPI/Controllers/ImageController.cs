using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RestAPI.Services;

namespace RestAPI.Controllers
{
    [ApiController]
    [Route("api/images")]
    public class ImageController : ControllerBase
    {
        private IS3Service s3Service;
        public ImageController(IS3Service s3Service)
        {
            this.s3Service = s3Service;
        }

        [HttpGet]
        public async Task<IEnumerable<string>> GetImages()
        {
            return await s3Service.GetImages();
        }
    }
}
