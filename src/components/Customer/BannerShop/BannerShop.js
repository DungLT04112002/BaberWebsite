import React from "react";
import { Link } from "react-router-dom";
import styles from "./BannerShop.module.css"
import BannerImg from "./../../../assets/bannerProductImg.jpg"
class Banner extends React.Component {
    render() {
        return (

            <div className={styles.bannerShop}>
                <div className={styles.mainBannerShop}>
                    <p className={styles.title}> SẢN PHẨM</p>
                    <div >
                        <Link to="/"><span className={styles.text}> TRANG CHỦ/</span></Link>
                     <Link to="/shop"><span className={styles.text}> SẢN PHẨM</span></Link>
                    </div>


                </div>

            </div>
        )
    }

}

export default Banner;