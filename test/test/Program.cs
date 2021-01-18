using System;
using System.Threading.Tasks;
using Amazon.Sender.S3;

namespace FridgeImageCapture
{
    class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("Sending image to server ...");
            await AWSUpload.UploadingFileAsync();
        }
    }
}
