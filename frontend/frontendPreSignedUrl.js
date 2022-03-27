document.getElementById('presignedUrlBtn').addEventListener('click', ()=>{
    const presignedUrl_fileInput = document.getElementById('presignedUrl')
    const file = presignedUrl_fileInput.files[0]
    const fileName = file.name;
    console.log(file,fileName);
    
    const url="";

    axios.post(url, {fileName: fileName}).then((res)=>{
        console.log(res);
        const preSignedUrl = res.data.preSignedUrl;
        axios.put(preSignedUrl, file)
    }).catch((err)=>{
        console.log(err);
    });

   
});