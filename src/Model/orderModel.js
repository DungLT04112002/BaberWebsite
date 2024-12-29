const connection = require('../config/database');
const getAllOrders = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM orders', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};
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

module.exports = {
    getAllOrders, getlistOrder, deleteOrder, uploadOrder
}