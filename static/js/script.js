
document.addEventListener('DOMContentLoaded', () => {
    const youtubeUrlInput = document.getElementById('youtube-url');
    const downloadBtn = document.getElementById('download-btn');
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const message = document.getElementById('message');
    const downloadLink = document.getElementById('download-link');

    downloadBtn.addEventListener('click', () => {
        const youtubeUrl = youtubeUrlInput.value.trim();
        if (!youtubeUrl) {
            showMessage('Please enter a valid YouTube URL', 'error');
            return;
        }

        downloadBtn.disabled = true;
        showMessage('Processing...', 'info');
        progressContainer.classList.remove('hidden');
        progressBar.style.width = '0%';
        progressText.textContent = '0%';

        fetch('/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: youtubeUrl }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                showMessage('Download complete!', 'success');
                downloadLink.href = `/download/${data.filename}`;
                downloadLink.textContent = `Download ${data.filename}`;
                downloadLink.classList.remove('hidden');
            } else {
                showMessage(`Error: ${data.message}`, 'error');
            }
        })
        .catch(error => {
            showMessage(`Error: ${error.message}`, 'error');
        })
        .finally(() => {
            downloadBtn.disabled = false;
            progressContainer.classList.add('hidden');
        });
    });

    function showMessage(text, type) {
        message.textContent = text;
        message.className = type;
    }

    // Simulating progress updates (since we can't get real-time progress from the server)
    function simulateProgress() {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress > 100) {
                progress = 100;
                clearInterval(interval);
            }
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${Math.round(progress)}%`;
        }, 500);
    }

    downloadBtn.addEventListener('click', simulateProgress);
});
