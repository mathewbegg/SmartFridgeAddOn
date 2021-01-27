using System;
using System.Threading.Tasks;
using Amazon.Sender.S3;
using ImageCaptureSystem;

namespace FridgeImageCapture
{
    class Program
    {
        static async Task Main(string[] args)
        {

            var cam = new ImageCapture();
            
            try
            {
                cam.Initialize();
                cam.CaptureImage();
                
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

            await AWSUpload.UploadingFileAsync();

        }

    }

}
