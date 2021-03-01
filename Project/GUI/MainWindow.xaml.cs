using System;
using System.Drawing;
using System.IO;
using System.Windows;
using System.Windows.Interop;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using ImageCaptureSystem;
using Microsoft.Win32;
using OpenCvSharp;
using OpenCvSharp.Extensions;

namespace GUI
{

    public partial class MainWindow
    {

        private const string FilePath = @"..\..\..\..\images\FridgePicture.jpg";
        public MainWindow()
        {
            InitializeComponent();
        }

        private async void CaptureImageButton_Click(object sender, RoutedEventArgs e)
        {
            Success.Visibility = Visibility.Hidden;                                                     // Changing supplementary text visibility
            Failure.Visibility = Visibility.Hidden;                                                     // Changing supplementary text visibility
           
            var image = await ImageSender.CaptureImage();                                           // Capturing image, return image matrix

            if (DisplayImage(image) == 0)                                                              // Displaying image to main window of application
                Success.Visibility = Visibility.Visible;                                               // Changing supplementary text visibility

            else 
                Failure.Visibility = Visibility.Visible;                                               // Changing supplementary text visibility

        }

        private async void UploadImageButton_Click(object sender, RoutedEventArgs e)
        {
            Success.Visibility = Visibility.Hidden;                                                    // Changing supplementary text visibility
            Failure.Visibility = Visibility.Hidden;                                                    // Changing supplementary text visibility

            OpenFileDialog openFile = new OpenFileDialog { Filter = "Image files (*.jpg) | *.jpg" };   // Windows 10 Open File functionality

            if (openFile.ShowDialog() == true)                // If user chooses a file
                File.Copy(openFile.FileName, FilePath, true);             // Copy file contents from location to project destination

            if (await ImageSender.UploadImage() == 0)         
                Success.Visibility = Visibility.Visible;                                               // Changing supplementary text visibility
            else
                Failure.Visibility = Visibility.Visible;                                               // Changing supplementary text visibility

            DisplayImage(openFile);                                                                    // Displaying image to main window of application

        }

        private int DisplayImage(Mat image)

        {

            try
            {
                Bitmap img = image.ToBitmap();                                                         // Converting image Matrix to Bitmap
                ImageViewer1.Source = ImageSourceFromBitmap(img);                                      // Saving Bitmap image to image holder in window application
                
                ImageViewer2.Visibility = Visibility.Collapsed;                                        // Swapping image currently in view on application screen
                ImageViewer1.Visibility = Visibility.Visible;                                          // Swapping image currently in view on application screen
                return 0;
            }

            catch (Exception exception)

            {
                Console.Error.WriteLine(exception);                                                    // Catching errors
                return -1;
            }
           

        } 
        private void DisplayImage(OpenFileDialog openFile)

        {
            try
            {
                string selectedFileName = openFile.FileName;                                          // Getting file path from selected image chosen by user
                BitmapImage bitmap = new BitmapImage();                                               // Creating Bitmap image

                bitmap.BeginInit();                                                                   // Initialization
                bitmap.UriSource = new Uri(selectedFileName);                                         // Setting source of Bitmap image to URI of the absolute path of the chosen image
                bitmap.EndInit();                                                                     // Initialization complete

                ImageViewer1.Visibility = Visibility.Collapsed;                                       // Swapping image currently in view on application screen
                ImageViewer2.Visibility = Visibility.Visible;                                         // Swapping image currently in view on application screen

                ImageViewer2.Source = bitmap;                                                         // Inserting image into image container
            }

            catch (UriFormatException exception)                                                      // Catching UriFormatException error. This occurs when user closes Open File window without selecting image

            {
                Console.Error.WriteLine(exception);                                                   // Display error to Error List
                Success.Visibility = Visibility.Hidden;                                               // Changing supplementary text visibility
                Failure.Visibility = Visibility.Visible;                                              // Changing supplementary text visibility
            }
            
            

        }

        public ImageSource ImageSourceFromBitmap(Bitmap img)                                          // Method to convert image type from Mat to Bitmap
        {
            var handle = img.GetHbitmap();
            try

            {
                return Imaging.CreateBitmapSourceFromHBitmap(handle, IntPtr.Zero,
                    Int32Rect.Empty, BitmapSizeOptions.FromEmptyOptions());
            }

            catch (Exception exception)

            {
                Console.Error.WriteLine(exception);
                return null;

            }

        }
    }
}
