using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Logging;
using model_manager;

namespace web_manager.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FileController : ControllerBase
    {
        private IWebHostEnvironment _hostingEnvironment;
        private readonly ILogger<FileController> _logger;
        private string _uploads;

        public FileController(ILogger<FileController> logger, IWebHostEnvironment environment)
        {
            _logger = logger;
            _hostingEnvironment = environment;
            _uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploads");
        }

        [HttpGet]
        public IEnumerable<Media> Get()
        {
            var medias = new List<Media>();
            using (var db = new MediaContext())
            {
                medias = db.Medias.ToList();
            }

            return medias;
        }

        [HttpPost]
        public async Task<IActionResult> Upload()
        {
            var files = Request.Form.Files;
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    var extension = Path.GetExtension(file.FileName);
                    var fileName = string.Format(@"{0}{1}", Guid.NewGuid().ToString("N"), extension);
                    var filePath = Path.Combine(_uploads, fileName);
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }

                    using (var db = new MediaContext())
                    {
                        var media = new Media
                        {
                            CreatedTimeStamp = DateTime.UtcNow,
                            FileName = fileName,
                            Id = Guid.NewGuid().ToString("N"),
                            Name = file.FileName,
                            Type = file.ContentType
                        };
                        db.Medias.Add(media);
                        db.SaveChanges();
                    }
                }
            }

            OkResult okResult = Ok();
            return okResult;
        }
    }
}
