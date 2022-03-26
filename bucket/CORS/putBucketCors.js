const AWS = require("aws-sdk");
const s3 = new AWS.S3();

//will enable put,post,delete requests from domain http://www.example.com and get requests from any domain

var params = {
    Bucket: "", 
    CORSConfiguration: {
     CORSRules: [
        {
       AllowedHeaders: [
          "*"
       ], 
       AllowedMethods: [
          "PUT", 
          "POST", 
          "DELETE"
       ], 
       AllowedOrigins: [
          "http://www.example.com"
       ], 
       ExposeHeaders: [
          "x-amz-server-side-encryption"
       ], 
       MaxAgeSeconds: 3000
      }, 
        {
       AllowedHeaders: [
          "Authorization"
       ], 
       AllowedMethods: [
          "GET"
       ], 
       AllowedOrigins: [
          "*"
       ], 
       MaxAgeSeconds: 3000
      }
     ]
    }, 
    ContentMD5: ""
   };


   s3.putBucketCors(params, function(err, data) {
     if (err) console.log(err, err.stack); // error 
     else     console.log(data);           // successful 
   });