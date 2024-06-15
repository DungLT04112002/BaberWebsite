// import React, { useState, useEffect } from 'react';

// const ImageDisplay = ({ imageId }) => {
//     const [imageSrc, setImageSrc] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchImage = async () => {
//             try {
//                 const response = await fetch(`http://localhost:8081/getImages/${imageId}`);
//                 if (!response.ok) {
//                     throw new Error('Không thể lấy hình ảnh.');
//                 }
//                 const blob = await response.blob(); // Lấy dữ liệu dưới dạng Blob
//                 const url = URL.createObjectURL(blob); // Tạo URL từ Blob
//                 setImageSrc(url); // Đặt URL này vào state
//             } catch (error) {
//                 setError(error.message);
//             }
//         };

//         fetchImage();
//     }, [imageId]); // Chạy useEffect mỗi khi imageId thay đổi

//     if (error) {
//         return <div>Lỗi: {error}</div>;
//     }

//     return (
//         <div>
//             <img src={imageSrc} alt="Product images" />
//         </div>
//     );
// };

// export default ImageDisplay;
