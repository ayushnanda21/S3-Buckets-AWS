const AWS = require("aws-sdk");
const s3 = new AWS.S3({signatureVersion: 'v4', region: "xyz"});



exports.handler = async(event)=>{

    const body = JSON.parse(event.body);
    const fileName = body.fileName;
    const uploadId = body.uploadId;
    try{
        let params = {
            Bucket: process.env.bucketName,
            Key: fileName,
            UploadId : uploadId
        }

        const abortUpload = s3.abortMultipartUpload(params).promise();
        return {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify({ abortUpload: abortUpload})
		};

    } catch(err){
        console.log(err);
		return {
			statusCode: 500,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify({ error: err })
    }
    }
}