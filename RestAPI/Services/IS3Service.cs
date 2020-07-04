using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;

namespace RestAPI.Services
{
    public interface IS3Service
    {
        Task<IEnumerable<Image>> GetImages();
        Task DeleteImage(string key);
    }
}