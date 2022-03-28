document.getElementById('abortUploadBtn').addEventListener('click', ()=>{
    const multipartInput_fileInput = document.getElementById("multipartInput");
    const file = multipartInput_fileInput.files[0];
    const fileName = file.name;
    
    //here we will use uploadId stored in sessions
    const uploadId  = sessionStorage.getItem('uploadId');
    
    const url =" ";

    console.log({fileName: fileName, uploadId: uploadId});
    axios.post(`${url}/abortUpload`, {fileName: fileName, uploadId: uploadId})
    .then((res)=>{
        console.log(res);
    }).catch( (err)=>{
        console.error(err);
    })
});