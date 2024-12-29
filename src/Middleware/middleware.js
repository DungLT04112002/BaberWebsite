const decodeJWT = require("../utils/decodeJWT")
const jwt = require('jsonwebtoken');

const authenticateToken = (roleAccess) => {
    return (req, res, next) => {
        // const token = req.headers['authorization']?.split(' ')[1];
        const tokenData = req.headers['authorization'];
        // console.log("tokenData:", tokenData);
        console.log("roleAccess", roleAccess);
        console.log("token data: ", tokenData);
        token = JSON.parse(tokenData);
        console.log("token after parse: ", token);
        const accessToken = token.accessToken;
        console.log("access token: ", accessToken);
        const decodeAccessToken = decodeJWT(accessToken);
        const role = decodeAccessToken.payload.user.role;
        console.log("role", role)
        if (!token) {
            console.log("lỗi ở authenticateToken");
            return res.sendStatus(401);//
        }
        jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            console.log("roleAccess", roleAccess);
            const hasAccess = roleAccess.includes(role);
            console.log("hasAccess: ", hasAccess) // Kiểm tra role có hợp lệ không
            //  console.log("Xác thực thành công, thông tin đăng nhập: ", decodeAccessToken.payload);
            // req.user = user;
            if (hasAccess) {
                console.log("Role hợp lệ, chuyển tiếp...");
                next(); // Gọi next() chỉ khi role hợp lệ
            } else {
                console.log("Role không hợp lệ, từ chối truy cập.");
                return res.sendStatus(403);
            }
        }
        )
    }
}
module.exports = authenticateToken;