import React from "react";
import logo from "./../../../assets/logo4.png"
import icon_fb from "./../../../assets/icon_fb.png"
import icon_insta from "./../../../assets/icon_insta.png"
import icon_yt from "./../../../assets/icon_yt.png"

import styles from "./Footer.module.css"
class Footer extends React.Component {
    render() {
        return (
            <div className={styles.indexFooter}>
                <div className={styles.logo}><img src={logo}></img></div>
                <div className={styles.mainFooter}>
                    <div className={styles.redirect}>
                        <ul>
                            <li><a><p className={styles.text1}>Home</p></a></li>
                            <li><a><p className={styles.text1}>Video </p></a></li>
                            <li><a><p className={styles.text1}>Contact Us </p></a></li>
                            <li><a><p className={styles.text1}>Tems & Conditionals of Use </p></a></li>
                            <li><a><p className={styles.text1}>Privacy Policy </p></a></li>
                        </ul>
                    </div>
                    <div className={styles.sreach}>
                        <p className={styles.text1}>SEARCH</p>
                        <input placeholder="Enter your keyword"></input>
                        <div>
                            <button>SEARCH</button>
                        </div>

                    </div>
                    <div className={styles.getLetter}>
                        <p className={styles.text1}>SEARCH</p>
                        <input placeholder="Email"></input>
                        <div>
                            <button>SEARCH</button>
                        </div>
                    </div>
                    <div className={styles.social}>
                    <p className={styles.text1}>SOCIAL</p>
                        <div className={styles.iconSocial}>
                            <img src={icon_fb}></img>
                        </div>
                        <div className={styles.iconSocial}>
                            <img src={icon_insta}></img>
                        </div>
                        <div className={styles.iconSocial}>
                            <img src={icon_yt}></img>
                        </div>
                    </div>
                </div>
                <div className={styles.text}><p>© 2020 4Rau Barber Shop | Cut Club Saigon. Powered by Webgalaxy</p></div>

            </div>
        )
    }

}

export default Footer;