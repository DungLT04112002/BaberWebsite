// import React from "react";
// import styles from "./MainShop.module.css"
// import productsloganteee from "./../../../assets/product_merchandise11.jpg"
// class MainShop extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             data: [],
//             loading: true,
//             error: null
//         };
//     }

//     componentDidMount() {

//         fetch('http://localhost:8081/getlistmechandise')
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 console.log(data);
//                 this.setState({ data, loading: false });

//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//                 this.setState({ error, loading: false });
//             });
//     }
//     render() {
//         const listProduct = this.state.data;

//         const products = listProduct.map(product => ({
//             name: product.name,
//             price: product.cost
//         }));
//         // Tạo các phần tử sản phẩm từ dữ liệu
//         const productItems = products.map((product, index) => (
//             <div key={index} className={styles.items}>
//                 <img src={productsloganteee} alt="product"></img>
//                 <a><p className={styles.itemName}>{product.name}</p></a>
//                 <a><p className={styles.itemPrice}>{product.price}</p></a>
//             </div>
//         ));
//         return (
//             <div className={styles.MainShop}>
//                 <div className={styles.filter}>
//                     <h3>FILTER</h3>
//                     <hr></hr>
//                     <div className={styles.filterElement}>
//                         <p className={styles.title}> Danh mục</p>
//                         <ul>
//                             <li>
//                                 <label>
//                                     <input type="checkbox"></input>
//                                     <span>HOLUP</span>
//                                 </label>
//                             </li>
//                             <li>
//                                 <label>
//                                     <input type="checkbox"></input>
//                                     <span>4RAU MERCHANDISE</span>
//                                 </label>
//                             </li>
//                             <li>
//                                 <label>
//                                     <input type="checkbox"></input>
//                                     <span>BROSH POMADE</span>
//                                 </label>
//                             </li>
//                             <li>
//                                 {/* <label>
//                                     <input type="checkbox"></input>
//                                     <span>THE MAVERICK</span>
//                                 </label> */}
//                                 <label>
//                                     <input type="checkbox"></input>
//                                     <span>COMB</span>
//                                 </label>
//                             </li>
//                             {/* <li>
//                                 <label>
//                                     <input type="checkbox"></input>
//                                     <span>KING BROWN</span>
//                                 </label>
//                             </li>
//                             <li>
//                                 <label>
//                                     <input type="checkbox"></input>
//                                     <span>SUAVECITO</span>
//                                 </label>
//                             </li> */}
//                         </ul>
//                         <p className={styles.title}> Pomade</p>
//                         <ul>
//                             {/* <li>
//                                 <label>
//                                     <input type="checkbox"></input>
//                                     <span>Tonic dưỡng tóc</span>
//                                 </label>
//                             </li>
//                             <li>
//                                 <label>
//                                     <input type="checkbox"></input>
//                                     <span>Clay-Matte-Fiber</span>
//                                 </label>
//                             </li>
//                             <li>
//                                 <label>
//                                     <input type="checkbox"></input>
//                                     <span>Dụng Cụ Tóc</span>
//                                 </label>
//                             </li> */}
//                             <li>
//                                 <label>
//                                     <input type="checkbox"></input>
//                                     <span>Pomade gốc dầu</span>
//                                 </label>
//                             </li>
//                             <li>
//                                 <label>
//                                     <input type="checkbox"></input>
//                                     <span>Pomade gốc nước</span>
//                                 </label>
//                             </li>

//                         </ul>
//                         <p className={styles.title}> Độ bóng</p>
//                         <ul>
//                             <li>
//                                 <label>
//                                     <input type="checkbox"></input>
//                                     <span>Trung bình</span>
//                                 </label>
//                             </li>
//                             <li>
//                                 <label>
//                                     <input type="checkbox"></input>
//                                     <span>Thấp</span>
//                                 </label>
//                             </li>
//                             <li>
//                                 <label>
//                                     <input type="checkbox"></input>
//                                     <span>Cao</span>
//                                 </label>
//                             </li>
//                             <li>
//                                 <label>
//                                     <input type="checkbox"></input>
//                                     <span>không bóng</span>
//                                 </label>
//                             </li>

//                         </ul>
//                         <p className={styles.title}> Độ giữ nếp</p>
//                         <ul>
//                             <li>
//                                 <label>
//                                     <input type="checkbox"></input>
//                                     <span>Trung bình</span>
//                                 </label>
//                             </li>
//                             <li>
//                                 <label>
//                                     <input type="checkbox"></input>
//                                     <span>Mềm tự nhiên</span>
//                                 </label>
//                             </li>
//                             <li>
//                                 <label>
//                                     <input type="checkbox"></input>
//                                     <span>Cao</span>
//                                 </label>
//                             </li>

//                         </ul>
//                         <p className={styles.title}> Size</p>
//                         <ul>
//                             <li>
//                                 <label>
//                                     <input type="checkbox"></input>
//                                     <span>XL</span>
//                                 </label>
//                             </li>
//                             <li>
//                                 <label>
//                                     <input type="checkbox"></input>
//                                     <span>L</span>
//                                 </label>
//                             </li>
//                             <li>
//                                 <label>
//                                     <input type="checkbox"></input>
//                                     <span>M</span>
//                                 </label>
//                             </li>
//                             <li>
//                                 <label>
//                                     <input type="checkbox"></input>
//                                     <span>S</span>
//                                 </label>
//                             </li>

//                         </ul>
//                         <p className={styles.title}>Giá</p>
//                         <ul>
//                             <li>
//                                 <label>
//                                     <input type="checkbox"></input>
//                                     <span>300 000 VND - 600 000 VND</span>
//                                 </label>
//                             </li>
//                             <li>
//                                 <label>
//                                     <input type="checkbox"></input>
//                                     <span>0 VND - 300 000 VND</span>
//                                 </label>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>

//                 <div className={styles.productSite}>
//                     <div className={styles.nameListProduct}>
//                         <a><p> HOLUP </p></a>
//                         <hr></hr>
//                     </div>
//                     <div className={styles.listProduct}>
//                         {products.map((item, index) => (
//                             <div className={styles.items}>
//                                 <img src={productsloganteee}></img>
//                                 <a><p className={styles.itemName}> {item.name}</p></a>
//                                 <a><p className={styles.itemPrice}>{item.price}</p></a>
//                             </div>
//                         ))}
//                     </div>
//                     <div className={styles.nameListProduct}>
//                         <a><p> MERCHANDISE </p></a>
//                         <hr></hr>
//                     </div>
//                     <div>
//                         {products.map((item, index) => (
//                             <div className={styles.items}>
//                                 <img src={productsloganteee}></img>
//                                 <a><p className={styles.itemName}> {item.name}</p></a>
//                                 <a><p className={styles.itemPrice}>{item.price}</p></a>
//                             </div>
//                         ))}
//                     </div>




//                 </div>
//             </div>
//         )
//     }

// }

// export default MainShop;