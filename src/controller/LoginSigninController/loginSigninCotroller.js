const jwt = require('jsonwebtoken');
require('dotenv').config()
const listUsers = [
    { id: 1, email: "luutiendung04112002@gmail.com", role: 'admin' },
    { id: 2, email: "luutiendung0411@gmail.com", role: 'employee' },
];

const LoginGoogle = (req, res) => {
    console.log("hello from LoginGoogle");
    const email = req.body.email; // Lấy email từ req.body

    // Kiểm tra xem email có được cung cấp không
    if (!email) {
        return res.status(400).json({ message: 'Email không được cung cấp' });
    }
    // Kiểm tra xem email có trong mảng không
    const user = listUsers.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({ message: 'Email không tồn tại' });
    }
    const accessToken = jwt.sign(
        { user },
        process.env.SECRET_KEY, // Thay thế bằng khóa bí mật an toàn
        { expiresIn: '1h' }
    );
    res.json({ accessToken });

}
module.exports = {
    LoginGoogle
}