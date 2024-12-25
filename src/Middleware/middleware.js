const decodeJWT = require("../utils/decodeJWT")
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // const token = req.headers['authorization']?.split(' ')[1];
    const tokenData = req.headers['authorization'];
    console.log("tokenData:", tokenData);
    token = JSON.parse(tokenData);
    const accessToken = token.accessToken;
    const decodeAccessToken = decodeJWT(accessToken);
    if (!token) {
        console.log("lỗi ở authenticateToken");
        return res.sendStatus(401);//
    }
    jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        console.log("Xác thực thành công");
        // req.user = user;
        next();
    });
};
module.exports = authenticateToken;