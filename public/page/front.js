
const button = document.getElementById('enviar');
const inputFile = document.getElementById('file');
const responseDiv = document.getElementById('response');

button.addEventListener('click', async () => {

    const files = inputFile.files;

    if (files.length === 0) {
        responseDiv.textContent = 'Nenhum arquivo selecionado.';
        return;
    }

    
    Array.from(files).forEach(async (file) => {
        console.log(`Enviando arquivo: ${file.name}`);

        try {
            
            const formData = new FormData();
            formData.append('file', file);

            await axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            responseDiv.textContent += `Arquivo ${file.name} enviado com sucesso!\n`;
        } catch (error) {
            responseDiv.textContent += `Erro ao enviar o arquivo ${file.name}: ${error.message}\n`;
        }
    });
});
