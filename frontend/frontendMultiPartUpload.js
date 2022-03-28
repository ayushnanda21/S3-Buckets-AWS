document.getElementById('multipartInputBtn').addEventListener('click', async()=>{
    const multipartInput_fileInput = document.getElementById('multipartInput')
    const file = multipartInput_fileInput.files[0]
    const fileName = file.name;
    const fileSize = file.size;
    console.log(file,fileName);
    
    const url=" ";

    // axios.post(url, {fileName: fileName}).then((res)=>{
    //     console.log(res);
    // }).catch((err)=>{
    //     console.log(err);
    // });

    try{
        const uploadIdRes  = await axios.post(`${url}/getUniqueId`, {fileName: fileName});
        const uploadId = uploadIdRes.data.uploadId
        console.log(uploadId);


        //storing this uploadId in session storage
        sessionStorage.setItem('uploadId' , uploadId);


        //define chucnk size and dividing file
        const chunkSize = 10*1024*1024   //10Mib
        const chunkCount  = Math.floor(fileSize/chunkSize) + 1;
        console.log(`chunkCount : ${chunkCount}`);

        //loop for uploading
        let multiUploadArray = [];

        for( let uploadCount = 1; uploadCount < chunkCount +1 ; uploadCount++){
            let start = (uploadCount-1)*chunkSize;
            let end  = uploadCount* chunkSize;
            let fileBlob = uploadCount < chunkCount ? file.slice(start,end) : file.slice(start)
            
            let getSignedUrlRes = await axios.post(`${url}/getUploadPart`, {
                fileName: fileName,
                partNumber : uploadCount,
                uploadId : uploadId
            });

            let preSignedUrl = getSignedUrlRes.data.preSignedUrl;
            //console.log(`${uploadCount} : ${getSignedUrlRes.data.preSignedUrl}`);
        
            let uploadChunk = await fetch(preSignedUrl,{
                method : 'PUT',
                body: fileBlob,

            });

            console.log(uploadChunk)

            //Etag header (NEW HEADER whenever new chunk is uploaded )
            let EtagHeader = uploadChunk.headers.get('ETag')
            console.log(EtagHeader);

            let uploadPartDetails ={
                Etag: EtagHeader,
                PartNumber: uploadCount
            }
            multiUploadArray.push(uploadPartDetails);
        }
          
        console.log(multiUploadArray)
        const completeUpload = await axios.post(`${url}/completeUpload`,{
            fileName : fileName,
            parts : multiUploadArray,
            uploadId: uploadId
        });
        console.log(completeUpload);
    } catch(err){
        console.log(err);
    }
   
});