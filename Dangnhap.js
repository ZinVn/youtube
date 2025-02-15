const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");

const db = mysql.createPool({ host: "localhost", user: "root", password: "", database: "video_db" });

app.post("/register", async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await db.query("INSERT INTO users (email, password_hash) VALUES (?, ?)", [email, hashedPassword]);
        res.json({ message: "Đăng ký thành công" });
    } catch (err) {
        res.status(400).json({ error: "Email đã tồn tại" });
    }
});
