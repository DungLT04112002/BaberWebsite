import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplayProductImages from "../MainShop/DisplayProductImg";
import styles from "./MyCart.module.css";
import Menu from "../Menu/Menu";

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
        typePay: 'online'
    });
    const [linkPayment, setLinkPayment] = useState('')
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
    // useEffect(() => {

    //     const fectPaymentAPI = async () => {
    //         const respone = await axios.post('http://localhost:8081/payment');
    //         // respone.data;
    //         setLinkPayment(respone.data.order_url)
    //         console.log(linkPayment);
    //     }
    //     fectPaymentAPI();
    // }, [])

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
                    };
                    await axios.post(
                        "http://localhost:8081/uploadOrder",
                        thisOrder
                    );
                })
            );
            if (order.typePay === "online") {
                // const response = await axios.post(`http://localhost:8081/payment`);
                const response = await axios.post(`http://localhost:8081/payment/${totalCost}`);
                setLinkPayment(response.data.order_url);
                console.log(response.data.order_url)
                window.location.href = response.data.order_url;
            }
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

        } catch (error) {
            console.error("Error submitting order:", error);
        }

    };

    const displayCost = (cost) => {
        return cost.toLocaleString('vi-VN');
    }

    return (
        <>
            <Menu />
            <div className={styles.siteCart}>
                <div className={styles.listCart}>
                    <h1>My Cart</h1>
                    {detailProductInCart.length === 0 ? (
                        <p>No products in cart.</p>
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
                                            <p>Cost: {product.cost}</p>
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
                        <select
                            name="typePay"
                            onChange={handleChange}
                        >
                            <option>online </option>
                            <option>offline</option>
                        </select>
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
