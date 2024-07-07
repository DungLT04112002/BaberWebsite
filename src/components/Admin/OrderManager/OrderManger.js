import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./OrderManager.module.css";
import MenuAdmin from "../MenuAdmin/MenuAdmin"
const OrderManager = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("http://localhost:8081/getOrders");
                setOrders(response.data);
            } catch (error) {
                setError("Có lỗi xảy ra khi tải dữ liệu");
            }
        };
        fetchOrders();
    }, []);

    const handleDeleteOrder = async (id) => {
        const confirmed = window.confirm("Bạn có chắc muốn xóa đơn hàng này không?");
        if (confirmed) {
            try {
                const response = await axios.delete(`http://localhost:8081/deleteOrder/${id}`);
                console.log(response.data); // Kiểm tra phản hồi từ API
                // Cập nhật danh sách đơn hàng sau khi xóa
                setOrders(prevList => prevList.filter(order => order.id !== id));
            } catch (error) {
                setError("Có lỗi xảy ra khi xóa dữ liệu");
                console.error(error); // In lỗi ra console để kiểm tra
            }
        }
    };

    return (
        <div className={styles.siteOrdersManager}>
            <MenuAdmin></MenuAdmin>
            <div className={styles.siteTable}>
                <h1>Danh sách đơn hàng</h1>

                <table className={styles.tableList}>
                    <thead>
                        <tr>
                            <th>Mã sản phẩm</th>
                            <th>Tên khách hàng</th>
                            <th>Số điện thoại</th>
                            <th>Số lượng</th>
                            <th>Địa chỉ</th>
                            <th>Ghi chú</th>
                            <th>Hình thức thanh toán</th>
                            <th>Tùy chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.product_code}</td>
                                <td>{order.name}</td>
                                <td>{order.phone}</td>
                                <td>{order.quantity_of_product}</td>
                                <td>{order.place}</td>
                                <td>{order.note}</td>
                                <td>{order.type_pay}</td>
                                <td>
                                    <button onClick={() => handleDeleteOrder(order.id)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default OrderManager;
