import React from "react";
import { Outlet, Link } from "react-router-dom";
import styles from "./MenuAdmin.module.css"
import logo from "./../../../assets/logo4.png"
import icon_fb from "./../../../assets/icon_fb.png"
import icon_yt from "./../../../assets/icon_yt.png"
import icon_insta from "./../../../assets/icon_insta.png"
import icon_cart from "./../../../assets/cartt.png"
class Menu extends React.Component {
    render() {
        return (
            <div className={styles.menu1}>
                <div className={styles.mainMenu1}>
                    <div className={styles.element1MainMenu}>
                        <div className={styles.button1}>
                            <ul >
                                <Link to="/Admin/productmanager">  Sản phẩm</Link>
                            </ul>

                        </div>
                        <div className={styles.button1}>

                            <ul>
                                <Link to="/Admin/Appoitment&serviceManager">Dịch vụ & lịch hẹn</Link>
                            </ul>
                        </div>


                    </div>
                    <div className={styles.element2MainMenu}>
                        <Link to="/ ">
                            <img src={logo} alt="Logo" /></Link>
                    </div>
                    <div className={styles.element3MainMenu}>
                        <div className={styles.button2}>
                            <ul >
                                <Link to="/Admin/OrderManager">Đơn hàng</Link>
                            </ul>
                        </div>
                        <div className={styles.button2}>
                            <ul >
                                <Link to="/Admin/RevenueManager">Doanh thu</Link>
                            </ul>
                        </div>


                    </div>

                </div>
                <Outlet />

            </div >
        )
    }

}

export default Menu;