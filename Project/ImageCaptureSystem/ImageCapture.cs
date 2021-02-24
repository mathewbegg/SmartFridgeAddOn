using System;
using OpenCvSharp;

namespace ImageCaptureSystem
{
    public class ImageCapture
    {
        private FrameSource _source;
        private const string FilePath = @"..\..\..\..\images\FridgePicture.jpg";
        public Mat _image = new Mat();

        public void Initialize()
        {

            _source = Cv2.CreateFrameSource_Camera(0);      //Initialize image frame source

        }

        public Mat CaptureImage()
        {

            try
            {
                _source.NextFrame(_image); //Grab screenshot from webcam
                _image.SaveImage(FilePath); //Save screenshot to file destination
                //image.Dispose();                      //Release the Matrix resources
                return _image;

            }
            catch (Exception e)
            {

                Console.WriteLine(e);
                throw;

            }

        }
    }
}