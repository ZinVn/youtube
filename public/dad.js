function uploadVideo() {
    const fileInput = document.getElementById('videoUpload');
    if (fileInput.files.length === 0) {
        alert('Vui lòng chọn một video!');
        return;
    }

    const formData = new FormData();
    formData.append('video', fileInput.files[0]);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById('videoURL').value = window.location.origin + data.videoUrl;
    })
    .catch(error => console.error('Lỗi:', error));
}

function playVideo() {
    const videoUrl = document.getElementById('videoURL').value;
    if (!videoUrl) {
        alert('Vui lòng nhập link video!');
        return;
    }

    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.src = videoUrl;
    videoPlayer.play();
}