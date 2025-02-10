const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 3000;

// Cấu hình lưu video vào thư mục "uploads"
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

// API tải video lên server
app.post('/upload', upload.single('video'), (req, res) => {
    res.send({ message: 'Tải lên thành công!', videoUrl: `/video/${req.file.filename}` });
});

// API phát video từ server
app.get('/video/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    
    if (!fs.existsSync(filePath)) {
        return res.status(404).send('Video không tồn tại!');
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunkSize = end - start + 1;
        const file = fs.createReadStream(filePath, { start, end });

        res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4',
        });

        file.pipe(res);
    } else {
        res.writeHead(200, { 'Content-Type': 'video/mp4' });
        fs.createReadStream(filePath).pipe(res);
    }
});

// Phục vụ file tĩnh (giao diện)
app.use(express.static('public'));

// Khởi động server
app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));
