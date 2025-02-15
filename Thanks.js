const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (users.length === 0) return res.status(400).json({ error: "Email không tồn tại" });

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) return res.status(400).json({ error: "Mật khẩu không đúng" });

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "7d" });
    res.json({ message: "Đăng nhập thành công", token });
});
