using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Amazon.Lambda.Core;
using Amazon.Lambda.S3Events;
using Amazon.S3;
using Amazon.S3.Model;
using Clarifai.Api;
using Clarifai.Channels;
using Google.Protobuf;
using Grpc.Core;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace ImageRecognitionClient
{
    public class Function
    {
        IAmazonS3 S3Client { get; set; }


        /// <summary>
        /// Default constructor. This constructor is used by Lambda to construct the instance. When invoked in a Lambda environment
        /// the AWS credentials will come from the IAM role associated with the function and the AWS region will be set to the
        /// region the Lambda function is executed in.
        /// </summary>
        public Function()
        {
            S3Client = new AmazonS3Client();
        }

        /// <summary>
        /// Constructs an instance with a preconfigured S3 client. This can be used for testing the outside of the Lambda environment.
        /// </summary>
        /// <param name="s3Client"></param>
        public Function(IAmazonS3 s3Client)
        {
            this.S3Client = s3Client;
        }

        /// <summary>
        /// This method is called for every Lambda invocation. This method takes in an S3 event object and can be used 
        /// to respond to S3 notifications.
        /// </summary>
        /// <param name="evnt"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public async Task<string> FunctionHandler(S3Event evnt, ILambdaContext context)
        {
            context.Logger.LogLine("Start of task");
            var s3Event = evnt.Records?[0].S3;
            if (s3Event == null)
            {
                context.Logger.LogLine("s3Event null");
                return null;
            }

            byte[] imageBytes = null;
            var contentType = "";

            try
            {
                using var objectResponse = await S3Client.GetObjectAsync(s3Event.Bucket.Name, s3Event.Object.Key);
                await using var ms = new MemoryStream();
                contentType = objectResponse.Headers.ContentType;
                await objectResponse.ResponseStream.CopyToAsync(ms);
                imageBytes = ms.ToArray();
            }
            catch (Exception e)
            {
                context.Logger.LogLine(
                    $"Error getting object {s3Event.Object.Key} from bucket {s3Event.Bucket.Name}. Make sure they exist and your bucket is in the same region as this function.");
                context.Logger.LogLine(e.Message);
                context.Logger.LogLine(e.StackTrace);
                throw;
            }

            context.Logger.LogLine("Initializing clarifai client");

            //get image analysis
            var client = new V2.V2Client(ClarifaiChannel.Grpc());

            context.Logger.LogLine("Initializing clarifai metadata");
            context.Logger.LogLine(Environment.GetEnvironmentVariable("Clarifai_Key"));
            var metadata = new Metadata()
            {
                {"Authorization", "Key " + Environment.GetEnvironmentVariable("Clarifai_Key")}
            };

            context.Logger.LogLine("Clarifai post");
            var irsResponse = client.PostModelOutputs(
                new PostModelOutputsRequest()
                {
                    ModelId = Environment.GetEnvironmentVariable("Clarifai_Model_Id"),
                    Inputs =
                    {
                        new List<Input>()
                        {
                            new Input()
                            {
                                Data = new Data()
                                {
                                    Image = new Image()
                                    {
                                        Base64 = ByteString.CopyFrom(imageBytes)
                                    }
                                }
                            }
                        }
                    }
                },
                metadata
            );
            if (irsResponse.Status.Code != Clarifai.Api.Status.StatusCode.Success)
            {
                context.Logger.LogLine("Request failed, response: " + irsResponse);
                throw new Exception("Request failed, response: " + irsResponse);
            }

            //store image analysis
            var labels = irsResponse.Outputs[0].Data.Concepts
                .Select(label
                    => new Label {Name = label.Name, Confidence = label.Value}).ToList();

            var str = JsonSerializer.Serialize(labels);

            var fileStream = new MemoryStream(Encoding.UTF8.GetBytes(str));

            var status = await S3Client.PutObjectAsync(new PutObjectRequest()
            {
                BucketName = "fridgedata-s3",
                Key = "FridgeContents.json",
                InputStream = fileStream,
            });
            if (status.HttpStatusCode != HttpStatusCode.OK)
            {
                context.Logger.LogLine("Request failed, response: " + status);
                throw new Exception("Request failed, response: " + status);
            }

            context.Logger.LogLine(str);
            return str;
        }
    }

    public class Label
    {
        public string Name { get; set; }
        public float Confidence { get; set; }
    }
}