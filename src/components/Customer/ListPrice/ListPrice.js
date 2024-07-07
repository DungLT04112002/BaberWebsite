import React from "react";
import styles from "./ListPrice.module.css"
import listPriceImg from "./../../../assets/list_prices.png"
import instaImg1 from "./../../../assets/instaImg1.jpg"
import instaImg2 from "./../../../assets/instaImg2.jpg"
import instaImg3 from "./../../../assets/instaImg3.jpg"
import instaImg4 from "./../../../assets/instaImg4.jpg"
import instaImg5 from "./../../../assets/instaImg5.jpg"
import instaImg6 from "./../../../assets/instaImg6.jpg"
import instaImg7 from "./../../../assets/instaImg7.jpg"
import instaImg8 from "./../../../assets/instaImg8.jpg"
import instaImg9 from "./../../../assets/instaImg9.jpg"
import instaImg10 from "./../../../assets/instaImg10.jpg"
import instaImg11 from "./../../../assets/instaImg11.jpg"
import instaImg12 from "./../../../assets/instaImg12.jpg"

class ListPrice extends React.Component {

    render() {
        return (
            < div className={styles.indexListPrices} >
                <div className={styles.containerTile}>
                    <p > BẢNG GIÁ
                    </p>
                    <hr className={styles.line}></hr>

                </div>
                <div className={styles.listPrice}>
                    <img src={listPriceImg}></img>
                </div>
                <div className={styles.indexInstagram}>
                    <div className={styles.containerTile}>
                        <a href="https://www.instagram.com/4rau.vn/"><p > INSTAGRAM
                        </p></a>
                        <hr className={styles.line}></hr>

                    </div>
                    <div className={styles.listInstaImg}>
                        <ul id="listInstaImg">
                        
                            <li>
                                <img className={StyleSheet.InstaImg} src={instaImg1}></img>
                            </li>
                            <li>
                                <img className={StyleSheet.InstaImg} src={instaImg2}></img>
                            </li>
                            <li>
                                <img className={StyleSheet.InstaImg} src={instaImg3}></img>
                            </li>
                            <li>
                                <img className={StyleSheet.InstaImg} src={instaImg4}></img>
                            </li>
                            <li>
                                <img className={StyleSheet.InstaImg} src={instaImg5}></img>
                            </li>
                            <li>
                                <img className={StyleSheet.InstaImg} src={instaImg6}></img>
                            </li>
                            <li>
                                <img className={StyleSheet.InstaImg} src={instaImg7}></img>
                            </li>
                            <li>
                                <img className={StyleSheet.InstaImg} src={instaImg8}></img>
                            </li>
                            <li>
                                <img className={StyleSheet.InstaImg} src={instaImg9}></img>
                            </li>
                            <li>
                                <img className={StyleSheet.InstaImg} src={instaImg10}></img>
                            </li>
                            <li>
                                <img className={StyleSheet.InstaImg} src={instaImg11}></img>
                            </li>
                            <li>
                                <img className={StyleSheet.InstaImg} src={instaImg12}></img>
                            </li>

                        </ul>

                    </div>
                </div>
            </div >

        )
    }

}

export default ListPrice;
// import React from "react";
// import styles from "./ListPrice.module.css"
// import listPriceImg from "./../../../assets/list_prices.png"
// import instaImg1 from "./../../../assets/instaImg1.jpg"
// import instaImg2 from "./../../../assets/instaImg2.jpg"
// import instaImg3 from "./../../../assets/instaImg3.jpg"
// import instaImg4 from "./../../../assets/instaImg4.jpg"
// import instaImg5 from "./../../../assets/instaImg5.jpg"
// import instaImg6 from "./../../../assets/instaImg6.jpg"
// import instaImg7 from "./../../../assets/instaImg7.jpg"
// import instaImg8 from "./../../../assets/instaImg8.jpg"
// import instaImg9 from "./../../../assets/instaImg9.jpg"
// import instaImg10 from "./../../../assets/instaImg10.jpg"
// import instaImg11 from "./../../../assets/instaImg11.jpg"
// import instaImg12 from "./../../../assets/instaImg12.jpg"

// class ListPrice extends React.Component {
//     render() {
//         const instaImgs = [instaImg1,
//             instaImg2,
//             instaImg3,
//             instaImg4,
//             instaImg5,
//             instaImg6,
//             instaImg7,
//             instaImg8,
//             instaImg9,
//             instaImg10,
//             instaImg11,
//             instaImg12];
        
//         for (let i = 1; i <= 12; i++) {
//             instaImgs.push(
//                 <li key={i}>
//                     <img  src={`${instaImgs[i]}`}  />
//                 </li>
//             );
//         }

//         return (
//             <div className={styles.indexListPrices}>
//                 <div className={styles.containerTile}>
//                     <p>BẢNG GIÁ</p>
//                     <hr className={styles.line} />
//                 </div>
//                 <div className={styles.listPrice}>
//                     <img src={listPriceImg} alt="List Prices" />
//                 </div>
//                 <div className={styles.indexInstagram}>
//                     <div className={styles.containerTile}>
//                         <p>INSTAGRAM</p>
//                         <hr className={styles.line} />
//                     </div>
//                     <div className={styles.listInstaImg}>
//                         <ul>
//                             {instaImgs}
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// export default ListPrice;
