import React from "react";
import { Outlet, Link } from "react-router-dom";
import styles from "./Menu.module.css"
import logo from "./../../../assets/logo4.png"
import icon_fb from "./../../../assets/icon_fb.png"
import icon_yt from "./../../../assets/icon_yt.png"
import icon_insta from "./../../../assets/icon_insta.png"

class Menu extends React.Component {
    render() {
        return (
            <div className={styles.menu1}>
                <div className={styles.mainMenu1}>
                    <div className={styles.element1MainMenu}>
                        <div className={styles.button1}>
                            <ul >
                                <Link to="/Lifestyle">Lifestyle</Link>
                                {/* <a>Lifestyle</a> */}
                            </ul>

                        </div>
                        <div className={styles.button1}>

                            <ul>
                                {/* <a>Sản Phẩm</a> */}
                                <Link to="/shop">Sản phẩm</Link>

                                {/* <ul>
                                <a><li> quẩn </li> </a>
                                <a><li> sáp </li> </a>
                                <a><li> pomade</li> </a>
                                <a><li> dụng cụ</li> </a>
                            </ul> */}
                            </ul>
                        </div>
                        <div className={styles.button1}>
                            <ul >
                                {/* <a>Học baber</a> */}
                                <Link to="/Class">Học baber</Link>

                            </ul>
                        </div>

                    </div>
                    <div className={styles.element2MainMenu}>
                        <a > <img src={logo} alt="Logo" /></a>
                    </div>
                    <div className={styles.element3MainMenu}>
                        <div className={styles.button2}>
                            <ul >
                                <a>Đặt lịch</a>
                            </ul>
                        </div>
                        <div className={styles.button2}>
                            <ul >
                                <a>Chi nhánh</a>
                            </ul>
                        </div>

                        <div className={styles.icon}>
                            <a> <img src={icon_fb} alt="" /></a>
                        </div>
                        <div className={styles.icon}>
                            <a> <img src={icon_yt} alt="" /></a>
                        </div>
                        <div className={styles.icon}>
                            <a> <img src={icon_insta} alt="" /></a>
                        </div>
                    </div>

                </div>
                <Outlet />

            </div >
        )
    }

}

export default Menu;