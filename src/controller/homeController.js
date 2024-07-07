const connection = require('../config/database')
const axios = require('axios').default; // npm install axios
const CryptoJS = require('crypto-js'); // npm install crypto-js
const bodyParser = require('body-parser'); // npm install body-parser
const moment = require('moment'); // npm install moment
const qs = require('qs');

const getListProduct = (rep, res) => {
    // res.send("hello i'. from controller");
    let users = [];
    connection.query('select * from products', function (err, results, fields) {
        users = results;

        // res.json(results);
        // res.send(results);
        res.send(JSON.stringify(users));

    })
}

const uploadProduct = (req, res) => {
    const { name, productCode, size, cost, quantity, inform, glossiness, category } = req.body;
    const sql = `INSERT INTO products (name, product_code, size, cost, quantity, inform, glossiness, category) VALUES (?,?,?,?,?,?,?,?)`;
    const values = [name, productCode, size, cost, quantity, inform, glossiness, category];
    console.log(values);
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Upload failed");
        }
        res.status(200).send("Upload successfully");
    });
};

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

const uploadedImg = (req, res) => {
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
    }

    // Extract file type from buffer
    const buffer = req.file.buffer;
    console.log(req.file);
    const fileInfo = req.file.mimetype;
    console.log(fileInfo);

    // Prepare data for insertion into database
    const image = {
        image_data: buffer,
        image_type: fileInfo,
        product_code: req.body.product_code, // Assuming product_code is sent in the request body
    };

    // Insert into database
    connection.query('INSERT INTO images SET ?', image, (error, results, fields) => {
        if (error) {
            console.error('Failed to insert image into database: ', error);
            return res.status(500).send('Failed to upload image.');
        }
        res.status(200).send('Image uploaded successfully.');
    });
};
const getProduct = (req, res) => {
    const productCode = req.params.productCode;
    connection.query('select name, product_code, size, cost, quantity, inform, glossiness, category FROM products WHERE product_code= ? ', [productCode], (err, result) => {
        res.send(result);
    })
}
const deleteProduct = (req, res) => {
    const productCode = req.params.productCode;
    connection.query('delete from products where product_code=?', [productCode], (err, result) => {
        res.json({ message: 'Product deleted successfully' });
    })
}
const updateProduct = (req, res) => {
    const productCode = req.params.productCode;
    const { name, size, cost, quantity, inform, glossiness, category } = req.body;

    const query = `
        UPDATE products 
        SET 
            name = ?, 
            size = ?, 
            cost = ?, 
            quantity = ?, 
            inform = ?, 
            glossiness = ?, 
            category = ? 
        WHERE product_code = ?`;

    connection.query(query, [name, size, cost, quantity, inform, glossiness, category, productCode], (err, result) => {
        if (err) {
            console.error('Error updating product:', err);
            return res.status(500).json({ message: 'Error updating product' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully' });
    });
};
const getService = (req, res) => {
    connection.query('select * FROM services  ', (err, result) => {
        res.send(result);
    })
}
const getImages = (req, res) => {
    const productCode = req.params.productCode;

    connection.query('SELECT image_data, image_type FROM images WHERE product_code = ?', [productCode], (error, results) => {
        if (error) {
            console.error('Failed to fetch image from database:', error);
            return res.status(500).send('Failed to fetch image.');
        }
        // console.log(results[0].image_type);
        if (results.length === 0) {
            return res.status(404).send('Image not found.');
        }

        const image = results[0];
        const imageData = Buffer.from(image.image_data);
        const imageType = image.image_type;
        res.setHeader('Content-Type', imageType);
        res.send(imageData);
    });
}
const uploadAppointment = (req, res) => {
    console.log(req.body);
    const { name, phone, service, timeAppointment, dateAppointment } = req.body;
    const values = [name, phone, service, timeAppointment, dateAppointment];

    const sql = 'INSERT INTO appointment (name, phone, service, time_appointment, date_appointment) VALUES (?, ?, ?, ?, ?)';

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Tải lên thất bại do lỗi máy chủ.");
        }
        console.log(result);
        res.status(200).send("Đặt lịch thành công");
    });
}


const uploadOrder = (req, res) => {
    const { name, phone, productCode, quantityOfProduct, place, note, typePay } = req.body;
    const value = [name, phone, productCode, quantityOfProduct, place, note, typePay];
    console.log(value);

    const sql = "INSERT INTO orders (name, phone, product_code, quantity_of_product, place, note, type_pay) VALUES (?, ?, ?, ?, ?, ?, ?)";

    connection.query(sql, value, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Tải lên thất bại do lỗi máy chủ.");
        }
        console.log(result);
        res.status(200).send("Đặt hàng thành công");
    });
};

const getlistAppointment = (req, res) => {
    const listApp = [];
    connection.query("select * from appointment", (err, result) => {
        res.send(result)
    })
}
const deleteAppointment = (req, res) => {
    const id = req.params.id;
    connection.query('delete from appointment where id=?', [id], (err, result) => {
        if (err) {
            console.log(error);
        }
        else {
            res.json({ message: 'Appointment deleted successfully' });

        }
    })
}
const getlistOrder = (req, res) => {
    const listApp = [];
    connection.query("select * from orders", (err, result) => {
        res.send(result)
    })
}
const deleteOrder = (req, res) => {
    const id = req.params.id;
    console.log(id)
    connection.query('delete from orders where id=?', [id], (err, result) => {
        if (err) {
            console.log(error);
        }
        else {
            res.json({ message: 'Appointment deleted successfully' });

        }
    })
}
//API zalo
const config = {
    app_id: '2553',
    key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
    key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
    endpoint: 'https://sb-openapi.zalopay.vn/v2/create',

};

// const createPayment = async (req, res) => {
//     const embed_data = {
//         //sau khi hoàn tất thanh toán sẽ đi vào link này (thường là link web thanh toán thành công của mình)
//         redirecturl: 'https://phongthuytaman.com',
//     };

//     const items = [];
//     const transID = Math.floor(Math.random() * 1000000);

//     const order = {
//         app_id: config.app_id,
//         app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
//         app_user: 'user123',
//         app_time: Date.now(), // miliseconds
//         item: JSON.stringify(items),
//         embed_data: JSON.stringify(embed_data),
//         amount: 50000,
//         //khi thanh toán xong, zalopay server sẽ POST đến url này để thông báo cho server của mình
//         //Chú ý: cần dùng ngrok để public url thì Zalopay Server mới call đến được
//         callback_url: 'https://b074-1-53-37-194.ngrok-free.app/callback',
//         description: `Lazada - Payment for the order #${transID}`,
//         bank_code: '',
//     };

//     // appid|app_trans_id|appuser|amount|apptime|embeddata|item
//     const data =
//         config.app_id +
//         '|' +
//         order.app_trans_id +
//         '|' +
//         order.app_user +
//         '|' +
//         order.amount +
//         '|' +
//         order.app_time +
//         '|' +
//         order.embed_data +
//         '|' +
//         order.item;
//     order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

//     try {
//         const result = await axios.post(config.endpoint, null, { params: order });

//         return res.status(200).json(result.data);
//     } catch (error) {
//         console.log(error);
//     }
// };
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
        return res.status(200).json(result.data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};
module.exports = {
    getListProduct, uploadedImg, uploadProduct, getImages, getProduct, getService, uploadService, updateProduct, uploadOrder, deleteProduct, getlistOrder, deleteOrder, uploadAppointment, getlistAppointment, deleteAppointment, createPayment
}