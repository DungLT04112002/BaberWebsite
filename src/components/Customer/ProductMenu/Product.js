import React, { useState, useEffect } from 'react';
import styles from "./Product.module.css"
import DisplayProductImages from '../MainShop/DisplayProductImg';
import { Link } from 'react-router-dom';
import axios from 'axios';

import icon_seemore from "./../../../assets/icon_seemore.png"
const ProductMenu = () => {
    const [data, setData] = useState([]);
    const [productItem, setProductItem] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8081/getListProduct');
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        if (data.length > 0) {
            setProduct();
        }
    }, [data]);

    const setProduct = () => {

        console.log(data);

    };

    const displayCost = (cost) => {
        return cost.toLocaleString('vi-VN');
    }
    return (
        <div className={styles.indexProduct}      >
            <div className={styles.containerProducts}>
                <div className={styles.containerTile}>
                    <p >SẢN PHẨM  </p >
                    <hr className={styles.line}></hr>
                </div>
                <div className={styles.mainContainerProducts}>

                    {/* <div className={styles.elementProduct}>
                    </div> */}
                    {
                        data.slice(0, 8).map((product, index) => {
                            console.log(product.product_code);
                            return (
                                <div className={styles.elementProduct}>
                                    <Link to={`/shop/product/${product.product_code}`} key={product.product_code}>
                                        <DisplayProductImages imageId={product.product_code} />
                                        <p className={styles.itemName}>{product.name}</p>
                                        <p className={styles.itemPrice}>{displayCost(product.cost)} VNĐ</p></Link>
                                </div>
                            )

                        })
                    }


                </div>
                <div className={styles.seeMore}>
                    <Link to={`/shop`}><p>Xem thêm</p></Link>
                </div>
            </div>

        </div >
    )


}

export default ProductMenu;