const connection = require('../config/database');

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

module.exports = {
    updateStatus, updateStatusShip
};
