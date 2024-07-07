import React, { useState, useEffect } from 'react';
import DisplayProductImages from '../MainShop/DisplayProductImg';
import styles from './ProductShop.module.css';
import axios from 'axios';

const ProductShop = ({ Pcode }) => {
    const [product, setProduct] = useState({
        name: '',
        cost: '',
        inform: '',
        size: '',
        quantity: 0,
    });
    const [productCode, setProductCode] = useState(Pcode);
    const [loading, setLoading] = useState(true);
    const [number, setNumber] = useState(0);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/getProduct/${productCode}`);
                const tempres = response.data;
                const tempProduct = {
                    name: tempres[0].name,
                    cost: tempres[0].cost,
                    inform: tempres[0].inform,
                    size: tempres[0].size,
                    quantity: tempres[0].quantity,
                };
                setProduct(tempProduct);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product data:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productCode]);
    useEffect(() => {
        const saveNumberofProduct = (number) => {
            localStorage.setItem('numberofProduct', number)
            setNumber(number);
        }
        saveNumberofProduct();
        console.log(number);
    }, [product]);

    const displayCost = (cost) => {
        return cost.toLocaleString('vi-VN');
    };

    const saveNumberofProduct = (event) => {
        if (event.target.value <= 0) {
            setNumber(0);

        }
        else {
            const newNumber = parseInt(event.target.value, 10);
            setNumber(newNumber);
            console.log(newNumber);
            localStorage.setItem('numberofProduct', newNumber)
        }


    }
    const saveCart = () => {
        const productInCart = {
            Product_code: productCode,
            numberOfProduct: number
        };

        const updatedCart = [...cart, productInCart];
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        alert("Đã thêm thành công sản phẩm vào giỏ hàng !");

    }
    // localStorage.clear();
    console.log(cart);


    return (
        <div className={styles.siteProduct}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className={styles.imgProduct}>
                        <DisplayProductImages imageId={productCode}></DisplayProductImages>
                    </div>
                    <div className={styles.inforProduct}>
                        <ul>
                            <li>
                                <p className={styles.nameProduct}>{product.name}</p>
                            </li>
                            <li>
                                <p className={styles.costProduct}>Giá: {displayCost(product.cost)} VNĐ</p>
                            </li>
                            <li>
                                <p className={styles.informProduct}>{product.inform}</p>

                            </li>
                            <li>
                                <p className={styles.informProduct}>Size: {product.size}</p>

                            </li>
                            <li>
                                <p className={styles.informProduct}>Trong kho: {product.quantity}</p>

                            </li>
                            <li className={styles.informNumber}>
                                <label className={styles.informProduct}> Số lượng: </label> <input type='number' value={number} onChange={saveNumberofProduct} ></input>

                            </li>
                            <li>
                                <button className={styles.buttonCart} onClick={saveCart}>Add To Cart</button>
                            </li>



                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductShop;
