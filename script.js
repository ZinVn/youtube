function uploadVideo() {
    const fileInput = document.getElementById('videoUpload');
    const videoContainer = document.getElementById('videoContainer');

    if (fileInput.files.length === 0) {
        alert('Vui lòng chọn một video!');
        return;
    }

    const file = fileInput.files[0];
    const videoURL = URL.createObjectURL(file);  // Tạo URL tạm thời cho video

    const videoElement = document.createElement('video');
    videoElement.src = videoURL;
    videoElement.controls = true;
    videoElement.muted = false;
    videoContainer.appendChild(videoElement);
}
