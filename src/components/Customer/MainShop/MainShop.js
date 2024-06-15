import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./MainShop.module.css"
// import productsloganteee from "./../../../assets/product_merchandise11.jpg"
import DisplayProductImages from './DisplayProductImg';
const MainShop = () => {

    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8081/getListMechandise');
                // console.log(response.data);
                setData(response.data)


            } catch (error) {
                console.log(error);
            }
        };

        fetchData();

    }, []);

    const products = data.map(product => ({
        name: product.name,
        price: product.cost,
        productCode: product.product_code,
        category: product.category
    }));

    return (
        <div className={styles.MainShop}>
            <div className={styles.filter}>
                <h3>FILTER</h3>
                <hr></hr>
                <div className={styles.filterElement}>
                    <p className={styles.title}> Danh mục</p>
                    <ul>
                        <li>
                            <label>
                                <input type="checkbox"></input>
                                <span>HOLUP</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox"></input>
                                <span>4RAU MERCHANDISE</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox"></input>
                                <span>BROSH POMADE</span>
                            </label>
                        </li>
                        <li>
                            {/* <label>
                                    <input type="checkbox"></input>
                                    <span>THE MAVERICK</span>
                                </label> */}
                            <label>
                                <input type="checkbox"></input>
                                <span>COMB</span>
                            </label>
                        </li>
                        {/* <li>
                                <label>
                                    <input type="checkbox"></input>
                                    <span>KING BROWN</span>
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input type="checkbox"></input>
                                    <span>SUAVECITO</span>
                                </label>
                            </li> */}
                    </ul>
                    <p className={styles.title}> Pomade</p>
                    <ul>
                        {/* <li>
                                <label>
                                    <input type="checkbox"></input>
                                    <span>Tonic dưỡng tóc</span>
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input type="checkbox"></input>
                                    <span>Clay-Matte-Fiber</span>
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input type="checkbox"></input>
                                    <span>Dụng Cụ Tóc</span>
                                </label>
                            </li> */}
                        <li>
                            <label>
                                <input type="checkbox"></input>
                                <span>Pomade gốc dầu</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox"></input>
                                <span>Pomade gốc nước</span>
                            </label>
                        </li>

                    </ul>
                    <p className={styles.title}> Độ bóng</p>
                    <ul>
                        <li>
                            <label>
                                <input type="checkbox"></input>
                                <span>Trung bình</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox"></input>
                                <span>Thấp</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox"></input>
                                <span>Cao</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox"></input>
                                <span>không bóng</span>
                            </label>
                        </li>

                    </ul>
                    <p className={styles.title}> Độ giữ nếp</p>
                    <ul>
                        <li>
                            <label>
                                <input type="checkbox"></input>
                                <span>Trung bình</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox"></input>
                                <span>Mềm tự nhiên</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox"></input>
                                <span>Cao</span>
                            </label>
                        </li>

                    </ul>
                    <p className={styles.title}> Size</p>
                    <ul>
                        <li>
                            <label>
                                <input type="checkbox"></input>
                                <span>XL</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox"></input>
                                <span>L</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox"></input>
                                <span>M</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox"></input>
                                <span>S</span>
                            </label>
                        </li>

                    </ul>
                    <p className={styles.title}>Giá</p>
                    <ul>
                        <li>
                            <label>
                                <input type="checkbox"></input>
                                <span>300 000 VND - 600 000 VND</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox"></input>
                                <span>0 VND - 300 000 VND</span>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={styles.productSite}>
                <div className={styles.nameListProduct}>
                    <a><p> HOLUP </p></a>
                    <hr></hr>
                </div>
                <div className={styles.listProduct}>
                    {products.map((item, index) => {
                        if (item.category === "holdup")
                            return (
                                <div key={index} className={styles.items}>
                                    {/* <img src={productsloganteee} alt="product"></img> */}

                                    <DisplayProductImages imageId={item.productCode}></DisplayProductImages>
                                    <a><p className={styles.itemName}>{item.name}</p></a>
                                    <a><p className={styles.itemPrice}>{item.price} VNĐ</p></a>
                                </div>
                            )
                    })}
                </div>

                <div className={styles.nameListProduct}>
                    <a><p> MERCHANDISE </p></a>
                    <hr></hr>
                </div>


                <div className={styles.listProduct}>
                    {products.map((item, index) => {
                        if (item.category === "mechandise")
                            return (
                                <div key={index} className={styles.items}>
                                    <DisplayProductImages imageId={item.productCode}></DisplayProductImages>
                                    <a><p className={styles.itemName}>{item.name}</p></a>
                                    <a><p className={styles.itemPrice}>{item.price} VNĐ</p></a>
                                </div>
                            )
                    })}
                </div>

                <div className={styles.nameListProduct}>
                    <a><p> POMADE </p></a>
                    <hr></hr>
                </div>


                <div className={styles.listProduct}>
                    {products.map((item, index) => {
                        if (item.category === "pomade")
                            return (
                                <div key={index} className={styles.items}>
                                    <DisplayProductImages imageId={item.productCode}></DisplayProductImages>
                                    <a><p className={styles.itemName}>{item.name}</p></a>
                                    <a><p className={styles.itemPrice}>{item.price} VNĐ</p></a>
                                </div>
                            )
                    })}
                </div>




            </div>
        </div>
    )


}

export default MainShop;