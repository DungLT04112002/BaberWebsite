const connection = require('../config/database');
const getAllAppointments = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM appointment', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};
const getlistAppointment = (req, res) => {
    connection.query("select * from appointment", (err, result) => {
        res.send(result)
    })
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
module.exports = {
    getAllAppointments, getlistAppointment, uploadAppointment, deleteAppointment
};