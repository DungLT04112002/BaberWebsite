import React, { useState, useEffect } from "react";
import DisplayProductImages from "../MainShop/DisplayProductImg";
import styles from "./MyCart.module.css";
import axios from "axios";

const MyCart = () => {
    const [productInCart, setProductInCart] = useState(
        JSON.parse(localStorage.getItem("cart")) || []
    );
    const [detailProductInCart, setDetailProductInCart] = useState([]);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                let detailedProducts = [];
                // Gửi yêu cầu lấy dữ liệu cho từng sản phẩm một
                for (const product of productInCart) {
                    const response = await axios.get(`http://localhost:8081/getProduct/${product.Product_code}`);
                    detailedProducts.push({
                        ...response.data[0], // Lấy thông tin chi tiết sản phẩm từ API
                        number: product.numberOfProduct // Thêm trường number từ productInCart
                    });
                }
                // Cập nhật state với dữ liệu chi tiết sản phẩm
                setDetailProductInCart(detailedProducts);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        // Gọi hàm fetchProductDetails khi productInCart thay đổi
        fetchProductDetails();
    }, [productInCart]);
    const handleDeleteProduct = (code) => {
        // const newProductInCart = productInCart.filter((product) => {
        //     return (
        //         product.product_code != code
        //     )

        // })
        // setProductInCart(newProductInCart);

        const updatedCart = productInCart.filter((product) => product.Product_code !== code);
        setProductInCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setDetailProductInCart(prevDetails => prevDetails.filter(product => product.product_code !== code));
    }
    useEffect(() => {
        const calcCost = () => {
            let tempTotalCost = 0;
            detailProductInCart.map((product, index) => {
                tempTotalCost += product.number * product.cost;
            })
            setTotalCost(tempTotalCost);
        }
        calcCost();
    }, [detailProductInCart])

    return (
        <div>
            <h1>My Cart</h1>
            {detailProductInCart.length === 0 ? (
                <p>No products in cart.</p>
            ) : (

                < ul >
                    {
                        detailProductInCart.map((product, index) => (
                            <li key={index}>
                                <div className={styles.elementProduct}>
                                    <div>
                                        <DisplayProductImages imageId={product.product_code}></DisplayProductImages>
                                    </div>
                                    <div>
                                        <h2>{product.name}</h2>
                                        <p>Cost: {product.cost}</p>
                                        <p>Information: {product.inform}</p>
                                        <p>Size: {product.size}</p>
                                        <p>Number in Cart: {product.number}</p> {/* Hiển thị số lượng từ productInCart */}
                                        <p>Total cost: {product.cost * product.number}</p>
                                        <button onClick={() => handleDeleteProduct(product.product_code)}>Xóa</button>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            )
            }
            <p>Tổng tiền: {totalCost}</p>
        </div >
    );
};

export default MyCart;
