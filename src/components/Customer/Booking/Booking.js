import React, { useState, useEffect } from "react";
import styles from "./Booking.module.css";
import background_img1 from "./../../../assets/background1_img.jpg";
import background_img2 from "./../../../assets/background2_img.jpg";
import background_img3 from "./../../../assets/background3_img.jpg";
import background_img4 from "./../../../assets/background4_img.jpg";
import background_img5 from "./../../../assets/background5_img.jpg";
import { Link } from "react-router-dom";

const Booking = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const slideShow = () => {
            let newIndex = index + 1;
            if (newIndex === 5) {
                newIndex = 0;
            }
            setIndex(newIndex);
        };

        const interval = setInterval(slideShow, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [index]);

    return (
        <div className={styles.bookingStie}>
            <img
                className={`${styles.img} ${index === 0 ? styles.active : ""}`}
                src={background_img1}
                alt="Background 1"
            />
            <img
                className={`${styles.img} ${index === 1 ? styles.active : ""}`}
                src={background_img2}
                alt="Background 2"
            />
            <img
                className={`${styles.img} ${index === 2 ? styles.active : ""}`}
                src={background_img3}
                alt="Background 3"
            />
            <img
                className={`${styles.img} ${index === 3 ? styles.active : ""}`}
                src={background_img4}
                alt="Background 4"
            />
            <img
                className={`${styles.img} ${index === 4 ? styles.active : ""}`}
                src={background_img5}
                alt="Background 5"
            />

            <div className={styles.text}>
                <div className={styles.overlay}>
                    <Link to="/booking">
                        <a>Đặt lịch</a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Booking;
