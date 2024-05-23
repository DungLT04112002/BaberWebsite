import React from "react";
import styles from "./BannerShop.module.css"
import BannerImg from "./../../../assets/bannerProductImg.jpg"
class Banner extends React.Component {
    render() {
        return (

            <div className={styles.bannerShop}>
                <div className={styles.mainBannerShop}>
                    <p className={styles.title}> SẢN PHẨM</p>
                    <div >
                        <a><span className={styles.text}> TRANG CHỦ/</span></a>
                        <a><span className={styles.text}> SẢN PHẨM</span></a>
                    </div>


                </div>

            </div>
        )
    }

}

export default Banner;