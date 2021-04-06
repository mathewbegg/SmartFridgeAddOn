using System;
using System.Threading.Tasks;
using OpenCvSharp;

namespace ImageCaptureSystem
{
    public class ActionsFacade
    {

        public static async Task<Mat> CaptureImage()
        {

            var cam = new ImageCapture();

            try
            {
                cam.Initialize();
                var image = cam.CaptureImage();
                var i = await AWSUpload.UploadingFileAsync();
                return image;

            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                return null;

            }

        }
        public static async Task<int> UploadImage()
        {
            var i = await AWSUpload.UploadingFileAsync();
           return i;

        }

    }

}