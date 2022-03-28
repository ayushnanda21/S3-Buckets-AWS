const AWS = require('aws-sdk');
const s3 = new AWS.S3({ signatureVersion: 'v4', region: 'xyz' });


exports.handler = async(event)=>{

    const body  =JSON.parse(event.body);
    const fileName = body.fileName;
    try{
        const ttl = 20*60*1000 //20 min
        const expires = Date.now() + ttl

        const params = {
            Bucket  : process.env.bucketName,
            Key: fileName,
            Expires : expires
        }

        const multipartUpload = await s3.createMultipartUpload(params).promise();

        return {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify({ uploadId : multipartUpload.UploadId})
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
        };
    }



};