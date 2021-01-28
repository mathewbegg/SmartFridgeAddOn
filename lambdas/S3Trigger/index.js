const aws = require('aws-sdk');
const rekognition = new aws.Rekognition();
const docClient = new aws.DynamoDB.DocumentClient();

const BUCKET_NAME = 'smart-fridge-pictures';
const PICTURE_NAME = 'test-picture.png';
const TABLE_NAME = 'SmartFridgeData';

exports.handler = async (event) => {
    const irs_params = {
        Image: {
            S3Object: {
                Bucket: BUCKET_NAME,
                Name: PICTURE_NAME
            }
        }
    }
    
    const results_detectLabels = await rekognition.detectLabels(irs_params).promise();
    const results_detectText = await rekognition.detectText(irs_params).promise();
    const labels = results_detectLabels.Labels;
    const textDetections = results_detectText.TextDetections;
    
    //LABELS
    const params_writeLabels = {
        TableName: TABLE_NAME,
        Item: {
            DataType: 'labels',
            Data: labels
        }
    };
    await docClient.put(params_writeLabels, (err, data) => {
        if (err) {
            console.error('Unable to write to DB. Error JSON: ', JSON.stringify(err, null, 2));
        }
        else {
            console.info('Successfully wrote to DB')
        }
    }).promise();
    
    //TEXT DETECTION
    const params_writeText = {
        TableName: TABLE_NAME,
        Item: {
            DataType: 'textDetections',
            Data: textDetections
        }
    };
    await docClient.put(params_writeText, (err, data) => {
        if (err) {
            console.error('Unable to write to DB. Error JSON: ', JSON.stringify(err, null, 2));
        }
        else {
            console.info('Successfully wrote to DB:')
        }
    }).promise();
    
    //META DATA
    //TODO meta data handling
    
    return {
        statusCode: 200,
        body: JSON.stringify('success'),
    };
};
