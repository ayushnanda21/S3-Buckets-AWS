document.getElementById('putObjectBtn').addEventListener('click', ()=>{
    const putObject_fileInput = document.getElementById('putObject')
    const file = putObject_fileInput.files[0]

    const fileName = file.name;
    console.log(file,fileName)   
    const url = ""
    const reader = new FileReader();

    reader.onloadend =() =>{
        const base64String = reader.result.split('base64,')[1]
        console.log(base64String);
        const dataInfo = {
            base64String: base64String,
            fileName: fileName
        }
        axios.post(url, dataInfo, config).then((r) => {
				console.log(r);
			})
			.catch((err) => {
				console.error(err);
			});
    }
    reader.readAsDataURL(file)
});