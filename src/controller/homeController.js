const connection = require('../config/database')
const axios = require('axios').default; // npm install axios
const CryptoJS = require('crypto-js'); // npm install crypto-js
const bodyParser = require('body-parser'); // npm install body-parser
const moment = require('moment'); // npm install moment
const qs = require('qs');
const jwt = require('jsonwebtoken');
require('dotenv').config()


const users = [
    { id: 1, username: 'admin', password: '123456', role: 'admin' },
    { id: 2, username: 'user', password: '123456', role: 'user' }
];
const listUsers = [
    { id: 1, email: "luutiendung04112002@gmail.com", role: 'admin' },
    { id: 2, email: "luutiendung0411@gmail.com", role: 'user' },
];

const emails = [
    "luutiendung04112002@gmail.com",
    // Bạn có thể thêm nhiều email khác vào đây
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


// Route đăng nhập
const login = (req, res) => {
    const { username, password } = req.body;

    // Kiểm tra user có tồn tại không
    const user = users.find((u) => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Username hoặc password không đúng' });
    }

    // Tạo Access Token (thời gian tồn tại 1h)
    const accessToken = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        'SECRET_KEY', // Thay thế bằng khóa bí mật an toàn
        { expiresIn: '1h' }
    );

    res.json({ accessToken });
};


const getListProduct = (req, res) => {
    connection.query('SELECT * FROM products', (err, result) => {
        if (err) {
            console.error('Error fetching products:', err); // In lỗi ra console
            return res.status(500).json({ message: "Upload failed" }); // Trả về thông báo lỗi
        }

        // Trả về kết quả dưới dạng JSON
        res.json(result);
    });
};


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
    const { name, phone, productCode, quantityOfProduct, place, note, typePay, transaction_code, date } = req.body;
    const value = [name, phone, productCode, quantityOfProduct, place, note, typePay, transaction_code, date];
    console.log(value);

    const sql = "INSERT INTO orders (name, phone, product_code, quantity_of_product, place, note, type_pay, transaction_code,date_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

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
    connection.query("select * from appointment", (err, result) => {
        res.send(result)
    })
}
const deleteAppointment = (req, res) => {
    const id = req.params.id;
    connection.query('delete from appointment where id=?', [id], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json({ message: 'Appointment deleted successfully' });

        }
    })
}
const getlistOrder = (req, res) => {
    connection.query("select * from orders", (err, result) => {
        if (err) {
            console.error('Error fe tching products:', err); // In lỗi ra console
            return res.status(500).json({ message: "Upload failed" }); // Trả về thông báo lỗi
        }
        // console.log(result);
        res.send(result)

    })
}
const deleteOrder = (req, res) => {
    const id = req.params.id;
    console.log(id)
    connection.query('delete from orders where id=?', [id], (err, result) => {
        if (err) {
            console.log(err);
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
const updateStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        connection.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]); // Sử dụng kết nối cơ s�� dữ liệu của bạn
        res.status(200).json({ message: 'Order status updated successfully' });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ error: 'Error updating order status' });
    }
}
const updateStatusShip = async (req, res) => {
    const { id } = req.params;
    const { status_ship } = req.body;

    try {
        connection.query('UPDATE orders SET status_ship = ? WHERE id = ?', [status_ship, id]); // Sử dụng kết nối cơ sở dữ liệu của bạn
        res.status(200).json({ message: 'Order status updated successfully' });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ error: 'Error updating order status' });
    }
}

const queryDatabase = (query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};
const orders = queryDatabase("SELECT * FROM orders");
const appointments = queryDatabase("SELECT * FROM appointment")
const services = queryDatabase("SELECT * FROM services")
const products = queryDatabase("SELECT * FROM products")

const totalRevenue = async (req, res) => {
    try {
        // Lấy danh sách đơn hàng từ database
        console.log("begin");

        const findCostById = (listX, id, syntaxID) => {
            // Tìm phần tử dựa trên id và syntaxID
            const item = listX.find(x => x[syntaxID] === id);
            if (!item) {
                console.log("Không tìm thấy phần tử phù hợp.");
                return null;
            }
            return item.cost; // Trả về giá trị `cost` nếu tìm thấy
        };
        // findCostById(products, "M002", "product_code");
        let revenuePerMonth = [];
        orders.forEach(order => {
            const date = new Date(order.date_order); // Giả sử cột ngày là `date`
            const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, cần +1
            const year = date.getFullYear();
            const key = `${year}-${month}`; // Tạo khóa dạng "2024-12"
            //console.log("key:", month);

            const cost = findCostById(products, order.product_code, "product_code");
            const existingEntry = revenuePerMonth.find(subRPM => subRPM.month === key);

            if (existingEntry) {
                existingEntry.revenue += cost * order.quantity_of_product;
            }
            else {
                const subRevenuePerMonth = {
                    month: key,
                    revenue: (cost * order.quantity_of_product)
                }
                revenuePerMonth.push(subRevenuePerMonth);
            }
        });
        appointments.forEach(appointment => {
            const date = new Date(appointment.date_appointment); // Giả sử cột ngày là `date`
            const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, cần +1
            const year = date.getFullYear();
            const key = `${year}-${month}`; // Tạo khóa dạng "2024-12"
            //console.log("key:", month);

            const cost = findCostById(services, appointment.service, "name");
            const existingEntry = revenuePerMonth.find(subRPM => subRPM.month === key);
            if (existingEntry) {
                existingEntry.revenue += cost;
            }
            else {
                const subRevenuePerMonth = {
                    month: key,
                    revenue: cost
                }
                revenuePerMonth.push(subRevenuePerMonth);
            }
        });
        res.send(revenuePerMonth);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Failed to fetch data" });
    }
};



module.exports = {
    getListProduct, uploadedImg, uploadProduct, getImages, getProduct,
    getService, uploadService, updateProduct, uploadOrder, deleteProduct,
    getlistOrder, deleteOrder, uploadAppointment, getlistAppointment,
    deleteAppointment, createPayment, getStatusOrder, updateStatus,
    updateStatusShip, login, LoginGoogle, totalRevenue
}