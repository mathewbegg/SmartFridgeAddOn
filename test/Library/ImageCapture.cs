using System;
using OpenCvSharp;

namespace ImageCaptureSystem
{
    public class ImageCapture
    {
        private FrameSource _source;
        private const string FilePath = @"..\..\..\..\images\FridgePicture.jpg";

        public void Initialize()
        {

            _source = Cv2.CreateFrameSource_Camera(0);      //Initialize image frame source

        }

        public void CaptureImage()
        {

            using var image = new Mat();            //Create a Mat object

            try
            {
                Console.WriteLine("Capturing image ...");
                _source.NextFrame(image);           //Grab screenshot from webcam
                image.SaveImage(FilePath);     //Save screenshot to file destination
                image.Dispose();                      //Release the Matrix resources
                Console.WriteLine("Image captured!");

            }
            catch (Exception e)
            {

                Console.WriteLine(e);
                throw;

            }

        }
    }
}

