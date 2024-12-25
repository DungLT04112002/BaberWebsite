const CryptoJS = require('crypto-js'); // npm install crypto-js
const bodyParser = require('body-parser'); // npm install body-parser
const moment = require('moment'); // npm install moment
const qs = require('qs');
require('dotenv').config();
//API zalo
const config = {
    app_id: '2553',
    key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
    key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
    endpoint: 'https://sb-openapi.zalopay.vn/v2/create',

};


const createPayment = async (req, res) => {
    const embed_data = {
        redirecturl: 'http://localhost:8082/shop',
    };
    const amountOfCart = req.params.totalCost;
    const items = [];
    const transID = Math.floor(Math.random() * 1000000);

    const order = {
        app_id: config.app_id,
        app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
        app_user: 'user123',
        app_time: Date.now(),
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount: amountOfCart,
        callback_url: 'https://b074-1-53-37-194.ngrok-free.app/callback',
        description: `Lazada - Payment for the order #${transID}`,
        bank_code: '',
    };
    const data = `${config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    try {
        const result = await axios.post(config.endpoint, null, { params: order });
        return res.status(200).json({ ...result.data, app_trans_id: order.app_trans_id });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
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
    createPayment, getStatusOrder
};
