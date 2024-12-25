import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet, Link } from "react-router-dom";
import styles from './MainShop.module.css';
import DisplayProductImages from './DisplayProductImg';

const MainShop = () => {
    const [data, setData] = useState([]);
    const [childProductList, setChildProductList] = useState({
        mechandise: [],
        holdup: [],
        pomade: []
    });
    const [childProductListBackUp, setchildProductListBackUp] = useState({
        mechandise: [],
        holdup: [],
        pomade: []
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token1 = localStorage.getItem("token");
                console.log("token: ", token1); // Retrieve the token from localStorage
                const response = await axios.get('http://localhost:8081/getListProduct', {
                    // headers: {
                    //     authorization: `${token1}`
                    // }
                });

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
        const groupProduct = {
            mechandise: [],
            holdup: [],
            pomade: []
        };

        data.forEach(product => {
            const productItem = {
                name: product.name,
                price: product.cost,
                productCode: product.product_code,
                category: product.category,
                quantity: product.quantity,
                Inform: product.Inform,
                glossiness: product.glossiness


            };
            if (product.category === "mechandise") {
                groupProduct.mechandise.push(productItem);
            } else if (product.category === "holdup") {
                groupProduct.holdup.push(productItem);
            } else if (product.category === "pomade") {
                groupProduct.pomade.push(productItem);
            }
        });

        const tempChildProductList = { mechandise: [], holdup: [], pomade: [] };

        Object.keys(groupProduct).forEach(category => {
            for (let i = 0; i < groupProduct[category].length; i += 4) {
                const group = [];
                for (let j = i; j < i + 4 && j < groupProduct[category].length; j++) {
                    group.push(groupProduct[category][j]);
                }
                tempChildProductList[category].push(group);
            }
        });

        setChildProductList(tempChildProductList);
        setchildProductListBackUp(tempChildProductList);
    };

    const displayCost = (cost) => {
        return cost.toLocaleString('vi-VN');
    }

    return (
        <div className={styles.MainShop}>
            <div className={styles.filter}>
                <h3>FILTER</h3>
                <hr />
                <div className={styles.filterElement}>
                    <p className={styles.title}>Danh mục</p>
                    <ul>
                        <li>
                            <label>
                                <input type="checkbox" />
                                <span>HOLUP</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox" />
                                <span>4RAU MERCHANDISE</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox" />
                                <span>BROSH POMADE</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox" />
                                <span>COMB</span>
                            </label>
                        </li>
                    </ul>
                    <p className={styles.title}>Pomade</p>
                    <ul>
                        <li>
                            <label>
                                <input type="checkbox" />
                                <span>Pomade gốc dầu</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox" />
                                <span>Pomade gốc nước</span>
                            </label>
                        </li>
                    </ul>
                    <p className={styles.title}>Độ bóng</p>
                    <ul>
                        <li>
                            <label>
                                <input type="checkbox" />
                                <span>Trung bình</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox" />
                                <span>Thấp</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox" />
                                <span>Cao</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox" />
                                <span>không bóng</span>
                            </label>
                        </li>
                    </ul>
                    <p className={styles.title}>Độ giữ nếp</p>
                    <ul>
                        <li>
                            <label>
                                <input type="checkbox" />
                                <span>Trung bình</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox" />
                                <span>Mềm tự nhiên</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox" />
                                <span>Cao</span>
                            </label>
                        </li>
                    </ul>
                    <p className={styles.title}>Size</p>
                    <ul>
                        <li>
                            <label>
                                <input type="checkbox" />
                                <span>XL</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox" />
                                <span>L</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox" />
                                <span>M</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox" />
                                <span>S</span>
                            </label>
                        </li>
                    </ul>
                    <p className={styles.title}>Giá</p>
                    <ul>
                        <li>
                            <label>
                                <input type="checkbox" />
                                <span>300 000 VND - 600 000 VND</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox" />
                                <span>0 VND - 300 000 VND</span>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={styles.productSite}>
                <div className={styles.nameListProduct}>
                    <a><p>HOLUP</p></a>
                    <hr />
                </div>

                {childProductList.holdup.map((childgroup, groupIndex) => (
                    <div key={groupIndex} className={styles.listProduct}>
                        {childgroup.map((listChildProduct, index) => (
                            <div key={listChildProduct.productCode} className={styles.items}>
                                <Link to={`/shop/product/${listChildProduct.productCode}`} key={listChildProduct.productCode}>
                                    <DisplayProductImages imageId={listChildProduct.productCode} />
                                    <p className={styles.itemName}>{listChildProduct.name}</p>
                                    <p className={styles.itemPrice}>{displayCost(listChildProduct.price)} VNĐ</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                ))}

                <div className={styles.nameListProduct}>
                    <a><p>MERCHANDISE</p></a>
                    <hr />
                </div>

                {childProductList.mechandise.map((childgroup, groupIndex) => (
                    <div key={groupIndex} className={styles.listProduct}>
                        {childgroup.map((listChildProduct, index) => (
                            <div key={listChildProduct.productCode} className={styles.items}>
                                <Link to={`/shop/product/${listChildProduct.productCode}`} key={listChildProduct.productCode}>
                                    <DisplayProductImages imageId={listChildProduct.productCode} />
                                    <p className={styles.itemName}>{listChildProduct.name}</p>
                                    <p className={styles.itemPrice}>{displayCost(listChildProduct.price)} VNĐ</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                ))}

                <div className={styles.nameListProduct}>
                    <a><p>POMADE</p></a>
                    <hr />
                </div>

                {childProductList.pomade.map((childgroup, groupIndex) => (
                    <div key={groupIndex} className={styles.listProduct}>
                        {childgroup.map((listChildProduct, index) => (
                            <div key={listChildProduct.productCode} className={styles.items}>
                                <Link to={`/shop/product/${listChildProduct.productCode}`} key={listChildProduct.productCode}>
                                    <DisplayProductImages imageId={listChildProduct.productCode} />
                                    <p className={styles.itemName}>{listChildProduct.name}</p>
                                    <p className={styles.itemPrice}>{displayCost(listChildProduct.price)} VNĐ</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div >
    );
};

export default MainShop;
