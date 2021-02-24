using System;
using Amazon.S3;
using Amazon;
using Amazon.S3.Transfer;
using System.Threading.Tasks;

namespace ImageCaptureSystem
{
    public static class AWSUpload
    {
        private const string bucketName = "smart-fridge-pictures";                              // The name of the S3 Bucket
        private const string FilePath = @"..\..\..\..\images\FridgePicture.jpg";                        // Path of image

        public static readonly RegionEndpoint BucketRegion = RegionEndpoint.USEast1;            // Server region declaration
        private static readonly IAmazonS3 S3Client = new AmazonS3Client(BucketRegion);          // Instantiating S3 Client

        public static async Task<int> UploadingFileAsync()                                       // Method to upload files to S3 bucket
        {
            try
            {
                var fileTransferUtility = new TransferUtility(S3Client);
                await fileTransferUtility.UploadAsync(FilePath, bucketName);
                return 0;
            }

            catch (AmazonS3Exception exception)
            {
                Console.Error.WriteLine("Error encountered on server. Message:'{0}' when writing an object", exception.Message);
                return -1;
            }

            catch (Exception exception)
            {
                Console.Error.WriteLine("Unknown error encountered on server. Message:'{0}' when writing an object", exception.Message);
                return -1;
            }

        }
    }

}