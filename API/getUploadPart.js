//req : requesting to get preSigned urls for all chunks
//resp : preSignedUrl for each chunk

const AWS = require('aws-sdk');
const s3 = new AWS.S3({ signatureVersion: 'v4', region: 'xyz' });


exports.handler = async(event)=>{

    const body = JSON.parse(event.body);
    const fileName = body.fileName;
    const uploadId  = body.uploadId;
    const partNumber = bpdy.partNumber;

    try{
        let params ={
            Bucket : req.params.bucketName,
            Key: fileName,
            UploadId: uploadId,
            PartNumber : partNumber
        }

        const preSignedUrl = await s3.getSignedUrl('uploadPart', params)

        return {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify({ preSignedUrl : preSignedUrl})
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