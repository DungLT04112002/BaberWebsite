// import React from "react";
// import styles from "./Booking.module.css"
// import background_img1 from "./../../../assets/background1_img.jpg"
// import background_img2 from "./../../../assets/background2_img.jpg"
// import background_img3 from "./../../../assets/background3_img.jpg"
// import background_img4 from "./../../../assets/background4_img.jpg"
// import background_img5 from "./../../../assets/background5_img.jpg"

// class Booking extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { index: 0 };
//     }
//     componentDidMount() {
//         this.slideShow();
//     }


//     slideShow = () => {
//         var imgBG = document.getElementsByClassName(styles.img);
//         for (var i = 0; i < 5; i++) {
//             imgBG[i].style.display = "none";
//         }
//         let newIndex = this.state.index + 1;
//         if (newIndex === 5) {
//             newIndex = 0;
//         }
//         imgBG[newIndex].style.display = "block";
//         this.setState({ index: newIndex });
//         setTimeout(this.slideShow, 8000);
//     };
//     render() {
//         return (
//             <div className={styles.bookingStie}>
//                 <img className={styles.img} src={background_img1}></img>
//                 <img className={styles.img} src={background_img2}></img>
//                 <img className={styles.img} src={background_img3}></img>
//                 <img className={styles.img} src={background_img4}></img>
//                 <img className={styles.img} src={background_img5}></img>

//                 <div className={styles.text}>
//                     <div className={styles.overlay}><a >Đặt lịch</a></div>
//                 </div>
//             </div>
//         )
//     }

// }

// export default Booking;