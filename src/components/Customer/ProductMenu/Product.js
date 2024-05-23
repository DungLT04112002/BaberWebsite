import React from "react";
import styles from "./Product.module.css"
import icon_seemore from "./../../../assets/icon_seemore.png"
class Product extends React.Component {
    render() {
        return (
            <div className={styles.indexProduct}      >
                <div className={styles.containerProducts}>
                    <div className={styles.containerTile}>
                        <p >SẢN PHẨM  </p >
                        <hr className={styles.line}></hr>
                    </div>
                    <div className={styles.mainContainerProducts}>

                        <div className={styles.elementProduct}>
                        </div>

                        <div className={styles.elementProduct}>
                        </div>
                        <div className={styles.elementProduct}>
                        </div>
                        <div className={styles.elementProduct}>
                        </div>
                        <div className={styles.elementProduct}>
                        </div>

                    </div>
                    <div className={styles.seeMore}><a><p>Xem thêm</p></a></div>
                </div>

            </div>
        )
    }

}

export default Product;