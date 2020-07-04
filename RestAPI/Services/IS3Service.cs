using System.Collections.Generic;
using System.Threading.Tasks;
using Amazon.S3;

namespace RestAPI.Services
{
    public interface IS3Service
    {
        Task<IEnumerable<string>> GetImages();
    }
}