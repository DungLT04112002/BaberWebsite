const connection = require('../config/database');

const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM products', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
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

const getProduct = (req, res) => {
    const productCode = req.params.productCode;
    connection.query('select name, product_code, size, cost, quantity, inform, glossiness, category FROM products WHERE product_code= ? ', [productCode], (err, result) => {
        res.send(result);
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
module.exports = {
    getAllProducts, getListProduct, getProduct, deleteProduct, uploadProduct, updateProduct
};
