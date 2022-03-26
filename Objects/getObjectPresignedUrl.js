const AWS = require("aws-sdk");
const s3 = new AWS.S3({signatureVersion: 'v4', region: "xyz"});

var params = {Bucket: 'bucket-name', Key: 'object-name', Expires: 60};     //customm url expires in 60 sec
s3.getSignedUrl('putObject', params, function (err, url) {
  console.log('The URL is', url);
});