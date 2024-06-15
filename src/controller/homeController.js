const connection = require('../config/database')


const getHomepage = (rep, res) => {
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


module.exports = {
    getHomepage, uploadedImg, uploadProduct, getImages
}