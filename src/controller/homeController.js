const connection = require('../config/database')


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


module.exports = {
    getListProduct, uploadedImg, uploadProduct, getImages, getProduct, getService, uploadService, updateProduct, deleteProduct, uploadAppointment
}