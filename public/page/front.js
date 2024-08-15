
const button = document.getElementById('enviar');
const inputFile = document.getElementById('file');
const responseDiv = document.getElementById('response');
const failedResponse = document.getElementById('failedResponse');

button.addEventListener('click', async () => {

    const files = inputFile.files;

    if (files.length === 0) {
        responseDiv.textContent = 'Nenhum arquivo selecionado.';
        return;
    }

    let successfulResponses = 0;
    let failedResponses = 0;

    const uploadPromises = Array.from(files).map(async (file) => {
        console.log(`Enviando arquivo: ${file.name}`);

        try {
            const formData = new FormData();
            formData.append('file', file);

            await axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            successfulResponses += 1;
        } catch (error) {
            failedResponses += 1;
        }
    });

    await Promise.all(uploadPromises);

    responseDiv.textContent = `Uploads bem-sucedidos: ${successfulResponses}`;
    failedResponse.textContent = `Uploads falhos: ${failedResponses}`;

    
    setTimeout(() => {
        inputFile.value = '';
        responseDiv.textContent = '';
        failedResponse.textContent = '';
    }, 3000);
    
});

