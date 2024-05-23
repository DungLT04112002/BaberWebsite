import React from "react";
import styles from "./MainShop.module.css"
import productsloganteee from "./../../../assets/product_merchandise11.jpg"
class MainShop extends React.Component {
    render() {
        const products = [
            { name: "4RAU SLOGAN TEE", price: "450 000 VND" },
            // Thêm các sản phẩm khác nếu cần
        ];

        // Tạo các phần tử sản phẩm từ dữ liệu
        const productItems = products.map((product, index) => (
            <div key={index} className={styles.items}>
                <img src={productsloganteee} alt="product"></img>
                <a><p className={styles.itemName}>{product.name}</p></a>
                <a><p className={styles.itemPrice}>{product.price}</p></a>
            </div>
        ));
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
                <div className={styles.listProduct}>
                    <div className={styles.items}>
                        <img src={productsloganteee}></img>
                        <a><p className={styles.itemName}> 4RAU SLOGAN TEE</p></a>
                        <a><p className={styles.itemPrice}>450 000 VND</p></a>

                    </div>
                    {productItems}

                </div>
            </div>
        )
    }

}

export default MainShop;