using System.Collections.Generic;
using System.Threading.Tasks;
using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using RestAPI.Settings;

namespace RestAPI.Services
{
    public class S3Service : IS3Service
    {
        private AmazonS3Client client { get; set; }
        private string bucket;
        public S3Service(AwsSettings settings)
        {
            client = new AmazonS3Client(settings.AccessKey, settings.AccessSecret, RegionEndpoint.EUNorth1);
            bucket = settings.BucketName;
        }

        public async Task<IEnumerable<string>> GetImages()
        {
            var imageList = new List<string>();
            var request = new ListObjectsRequest
            {
                BucketName = bucket
            };
            
            var response = await client.ListObjectsAsync(request);
            foreach (var entry in response.S3Objects)
            {
                imageList.Add(entry.Key);
            }

            return imageList;
        }
    }
}