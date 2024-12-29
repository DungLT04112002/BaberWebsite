const { getAllAppointments } = require('../../Model/appointmentModel')
const { getAllServices } = require('../../Model/serviceModel')
const { getAllOrders } = require('../../Model/orderModel')
const { getAllProducts } = require('../../Model/productModel')


const totalRevenue = async (req, res) => {
    const orders = await getAllOrders();
    const appointments = await getAllAppointments()
    const services = await getAllServices()
    const products = await getAllProducts()
    console.log("orders:", orders)
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
    totalRevenue
}
