import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./OrderManager.module.css";
import { format } from 'date-fns';
import MenuAdmin from "../MenuAdmin/MenuAdmin";

const OrderManager = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [updatedOrders, setUpdatedOrders] = useState([]);


    const fetchOrders = async () => {
        try {
            const response = await axios.get("http://localhost:8081/getOrders");
            setOrders(response.data);
        } catch (error) {
            setError("Có lỗi xảy ra khi tải dữ liệu");
        }
    };
    useEffect(() => {
        fetchOrders();

    }, [])
    const fetchStatusOrders = async () => {
        try {
            const statusPromises = orders.map(async (order) => {
                if (order.status === "pending" && order.type_pay === "online") {
                    console.log(order.type_pay);
                    const token = localStorage.getItem("token");
                    const response = await axios.post(`http://localhost:8081/status-order/${order.transaction_code}`);
                    const returnCode = response.data.return_code;
                    let status = order.status;
                    console.log("statust", status)

                    if (returnCode === 1) {
                        status = "completed";
                    } else if (returnCode === 2) {
                        status = "cancelled";
                    } else if (returnCode === 3) {
                        status = "pending";
                    }

                    if (status !== order.status) {
                        // Cập nhật trạng thái đơn hàng trong cơ sở dữ liệu
                        await axios.put(`http://localhost:8081/updateStatus/${order.id}`, { status }, {
                            headers: {
                                authorization: `${token}`
                            }
                        });

                        return {
                            ...order,
                            status
                        };
                    } else {
                        return order;
                    }
                }
                return order;


            });

            const updatedOrders = await Promise.all(statusPromises);
            setUpdatedOrders(updatedOrders);
        } catch (error) {
            setError("Có lỗi xảy ra khi tải dữ liệu");
        }
    };



    useEffect(() => {
        const interval = setInterval(() => {
            fetchStatusOrders();
            fetchOrders();

        }, 5000); // Update every 5 seconds

        return () => clearInterval(interval);
    }, [orders]);

    useEffect(() => {
        setOrders(updatedOrders);
    }, [updatedOrders]);

    const handleDeleteOrder = async (id) => {
        const confirmed = window.confirm("Bạn có chắc muốn xóa đơn hàng này không?");
        const token = localStorage.getItem("token");
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:8081/deleteOrder/${id}`, {
                    headers: {
                        authorization: `${token}`
                    }
                });
                setOrders(prevList => prevList.filter(order => order.id !== id));
            } catch (error) {
                setError("Có lỗi xảy ra khi xóa dữ liệu");
                console.error(error); // In lỗi ra console để kiểm tra
            }
        }
    };
    const handleChangeStatuszShip = async (id, status_ship) => {
        const token = localStorage.getItem("token");
        console.log("token: ", token);
        try {
            await axios.put(`http://localhost:8081/updateStatusShip/${id}`, {
                status_ship
            },
                {
                    headers: {
                        authorization: `${token}`
                    }
                });
        } catch (error) {
            setError("Có lỗi xảy ra khi cập nhật trạng thái đóng gói");
            console.error(error); // In lỗi ra console để kiểm tra
        }

        return {
            status_ship
        };
    };

    const formatDate = (dateString) => {
        return format(new Date(dateString), "dd/MM/yyyy");

    }
    return (
        <div className={styles.siteOrdersManager}>
            <MenuAdmin />
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
                            <th>Ngày đặt hàng</th>
                            <th>Trạng thái đóng gói</th>
                            <th>Trạng thái thanh toán</th>

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
                                <td>{
                                    order.date_order != null ?
                                        formatDate(order.date_order) : ''

                                }</td>
                                <td>

                                    <select onChange={(e) => handleChangeStatuszShip(order.id, e.target.value)}
                                        value={order.status_ship}
                                        style={{ backgroundColor: order.status_ship === "packed" ? 'lightgreen' : 'salmon', color: 'white' }}
                                    >
                                        <option style={{ backgroundColor: "black" }}
                                            value={"packed"} >
                                            packed
                                        </option>
                                        <option style={{ backgroundColor: "black" }}
                                            value={"unpacked"}>
                                            unpacked
                                        </option>

                                        {/* <option value={order.status_ship} slected>
                                            {order.status_ship}

                                        </option>
                                        <option value={order.status_ship === "unpacked" ? "packed" : "unpacked"}>
                                            {order.status_ship === "unpacked" ? "packed" : "unpacked"}
                                        </option> */}

                                    </select>
                                </td>
                                <td>{order.status}</td>
                                <td>
                                    <button onClick={() => handleDeleteOrder(order.id)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default OrderManager;