import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplayProductImages from "../MainShop/DisplayProductImg";
import styles from "./MyCart.module.css";
import Menu from "../Menu/Menu";
import iconpayment from "../../../assets/zalopay.png";

const MyCart = () => {
    const [productInCart, setProductInCart] = useState(
        JSON.parse(localStorage.getItem("cart")) || []
    );

    const [detailProductInCart, setDetailProductInCart] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [order, setOrder] = useState({
        name: '',
        phone: '',
        place: '',
        note: '',
        typePay: 'online',
        status: 'pending',
        transaction_code: ''
    });
    const [linkPayment, setLinkPayment] = useState('');

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                let detailedProducts = [];
                for (const product of productInCart) {
                    const response = await axios.get(`http://localhost:8081/getProduct/${product.Product_code}`);
                    detailedProducts.push({
                        ...response.data[0],
                        number: product.numberOfProduct
                    });
                }
                setDetailProductInCart(detailedProducts);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProductDetails();
    }, [productInCart]);



    const handleDeleteProduct = (code) => {
        const updatedCart = productInCart.filter((product) => product.Product_code !== code);
        setProductInCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setDetailProductInCart(prevDetails => prevDetails.filter(product => product.product_code !== code));
    };

    useEffect(() => {
        const calcCost = () => {
            let tempTotalCost = 0;
            detailProductInCart.forEach((product) => {
                tempTotalCost += product.number * product.cost;
            });
            setTotalCost(tempTotalCost);
        }
        calcCost();
    }, [detailProductInCart]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder({
            ...order,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            let transaction_code = '';
            if (order.typePay === "online") {
                const response = await axios.post(`http://localhost:8081/payment/${totalCost}`);
                setLinkPayment(response.data.order_url);
                transaction_code = response.data.app_trans_id;
                window.location.href = response.data.order_url;
            }
            await Promise.all(
                detailProductInCart.map(async (product) => {
                    const thisOrder = {
                        productCode: product.product_code,
                        quantityOfProduct: product.number,
                        name: order.name,
                        phone: order.phone,
                        place: order.place,
                        note: order.note,
                        typePay: order.typePay,
                        transaction_code: transaction_code
                    };
                    await axios.post(
                        "http://localhost:8081/uploadOrder",
                        thisOrder
                    );
                })
            );

            setProductInCart([]);
            localStorage.removeItem("cart");
            setDetailProductInCart([]);
            setOrder({
                name: "",
                phone: "",
                place: "",
                note: "",
                typePay: "online",
            });
            alert("Đơn hàng của quý khách đã được gửi")

        } catch (error) {
            console.error("Error submitting order:", error);
        }
    };

    const displayCost = (cost) => {
        return cost.toLocaleString('vi-VN');
    };

    return (
        <>
            <Menu />
            <div className={styles.siteCart}>
                <div className={styles.listCart}>
                    <h1>My Cart</h1>
                    {detailProductInCart.length === 0 ? (
                        <h2>Không còn sản phẩm nào trong giỏ hàng</h2>
                    ) : (
                        <ul>
                            {detailProductInCart.map((product, index) => (
                                <li key={index}>
                                    <div className={styles.elementProduct}>
                                        <div>
                                            <DisplayProductImages imageId={product.product_code} />
                                        </div>
                                        <div>
                                            <h2>{product.name}</h2>
                                            <p>Cost: {displayCost(product.cost)} VNĐ</p>
                                            <p>Information: {product.inform}</p>
                                            <p>Size: {product.size}</p>
                                            <p>Number in Cart: {product.number}</p>
                                            <p>Total cost: {displayCost(product.cost * product.number)} VNĐ</p>
                                            <button className={styles.deleteButton} onClick={() => handleDeleteProduct(product.product_code)}>Xóa</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    <h2>Tổng tiền: {displayCost(totalCost)} VNĐ</h2>
                </div>
                <div className={styles.formOrder}>
                    <div className={styles.formGroup}>
                        <label>Họ tên</label>
                        <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Phone</label>
                        <input
                            type="number"
                            name="phone"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Địa chỉ</label>
                        <input
                            type="text"
                            name="place"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Ghi chú</label>
                        <input
                            type="text"
                            name="note"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Phương thức thanh toán</label>
                        <div className={styles.paymentMethod}>
                            <label>
                                <input
                                    type="radio"
                                    name="typePay"
                                    value="online"
                                    checked={order.typePay === "online"}
                                    onChange={handleChange}
                                />
                                <img src={iconpayment} alt="ZaloPay" className={styles.paymentIcon} />
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="typePay"
                                    value="offline"
                                    checked={order.typePay === "offline"}
                                    onChange={handleChange}
                                />
                                Thanh toán khi nhận hàng
                            </label>
                        </div>
                    </div>
                    <button onClick={handleSubmit} className={styles.buttonSubmit}>
                        Đặt hàng
                    </button>
                </div>
            </div>
        </>
    );
};

export default MyCart;
