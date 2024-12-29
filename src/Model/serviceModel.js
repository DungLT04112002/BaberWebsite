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

module.exports = {
    getAllServices, uploadService, getService
};