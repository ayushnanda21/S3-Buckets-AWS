const AWS = require("aws-sdk");
const s3 = new AWS.S3();

var params = {
    Bucket: "bucket-name", 
    Delete: {
     Objects: [
        {
       Key: "object-1-name"
      }, 
        {
       Key: "object-2-name"
      }
     ], 
     Quiet: false
    }
   };

   s3.deleteObjects(params, function(err, data) {
     if (err){
        console.log(err, err.stack);   //error
      }  
     else{
        console.log(data);           // successful
     }     
    
   });