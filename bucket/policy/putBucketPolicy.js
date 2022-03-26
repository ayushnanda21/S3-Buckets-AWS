const AWS = require("aws-sdk");
const s3 = new AWS.S3();

var params ={
    Bucket: "bucket-name",
    Policy: `{
        "Version": "2012-10-17",
    "Id": "S3PolicyId1",
    "Statement": [
        {
            "Sid": "IPAllow",
            "Effect": "Deny",
            "Principal": "*",
            "Action": "s3:*",
            "Resource": [
                "arn:aws:s3:::bucket-name",
                "arn:aws:s3:::bucket-name/*"
            ],
            "Condition": {
                "NotIpAddress": {
                    "aws:SourceIp": "54.240.143.0/24"
                }
            }
        }
    ]
}
}`
}

s3.putBucketPolicy(params, function(err,data){

    if(err){
        console.log(err,err.stack) //error
    } else{
        console.log(data);   //success
    }
});