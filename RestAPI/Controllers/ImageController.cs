using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RestAPI.Services;
using Domain.Entities;
using Persistence;

namespace RestAPI.Controllers
{
    [ApiController]
    [Route("api/images")]
    public class ImageController : ControllerBase
    {
        private IS3Service s3Service;
        private FympixContext context;
        public ImageController(IS3Service s3Service, FympixContext context)
        {
            this.s3Service = s3Service;
            this.context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Image>> GetImages()
        {
            return context.Images;
            // return await s3Service.GetImages();
        }

        [HttpPost]
        public async Task<Image> PostImage(string name)
        {
            var image = new Image
            {
                FileName = name
            };

            context.Images.Add(image);
            context.SaveChanges();

            return image;
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteImage([FromQuery] string key)
        {
            await s3Service.DeleteImage(key);
            return NoContent();
        }
    }
}
