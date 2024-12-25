
const decodeJWT = (token) => {
    try {
        // Tách header, payload, signature
        const [header, payload, signature] = token.split('.');
        console.log("From decodeJWT, token:", token);
        // Giải mã Base64URL của header và payload
        const decodeBase64URL = (base64URL) => Buffer.from(base64URL, 'base64').toString('utf-8');

        const decodedHeader = JSON.parse(decodeBase64URL(header));
        const decodedPayload = JSON.parse(decodeBase64URL(payload));

        // console.log('Header:', decodedHeader);
        // console.log('Payload:', decodedPayload);
        console.log("decodedPayload: ", decodedPayload);
        return { header: decodedHeader, payload: decodedPayload };
    } catch (error) {
        console.error('Giải mã JWT thất bại:', error.message);
        return null;
    }
};

module.exports = decodeJWT;
