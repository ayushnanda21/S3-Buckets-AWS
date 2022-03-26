const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const fs = require("fs");
const ab2b64  = require("ab2b64");

 var params = {
    Bucket: "bucket-name", 
    Key: "object-name.extension"
   };
   s3.getObjectTorrent(params, function(err, data) {
     if (err){
        console.log(err, err.stack); // error 
     } 
    const buffer = data.Body.buffer;
    const base64String = ab2b64.ab2b64(buffer);

    fs.writeFile('s3-data.torrent' , base64String, {encoding: 'base64'}); 
     
   });