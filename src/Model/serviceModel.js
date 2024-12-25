const connection = require('../config/database');

const getAllServices = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM services', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const getService = (req, res) => {
    connection.query('select * FROM services  ', (err, result) => {
        res.send(result);
    })
}
const uploadService = (req, res) => {
    const { name, cost } = req.body;
    const sql = `INSERT INTO services (name, cost) VALUES (?,?)`;
    const values = [name, cost];
    console.log(values);
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Upload failed");
        }
        res.status(200).send("Upload successfully");
    });
};

const getStatusOrder = async (req, res) => {
    const app_trans_id = req.params.app_trans_id;
    console.log("app_trans_id", app_trans_id)
    let postData = {
        app_id: config.app_id,
        app_trans_id: app_trans_id, // Input your app_trans_id
    };

    let data = postData.app_id + '|' + postData.app_trans_id + '|' + config.key1; // appid|app_trans_id|key1
    postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    let postConfig = {
        method: 'post',
        url: 'https://sb-openapi.zalopay.vn/v2/query',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify(postData),
    };

    try {
        const result = await axios(postConfig);
        console.log(result.data);
        return res.status(200).json(result.data);

    } catch (error) {
        console.log('lỗi');
        console.log(error);
    }
};

module.exports = {
    getAllServices, uploadService, getService, getStatusOrder
};