import React, { useState } from 'react';
import styles from "./AddProduct.module.css"
import ImageUploader from './ImageUploader';
import ImageDisplay from './DisplayImg';
import axios from 'axios';
const AddProduct = () => {
    const [name, setProductName] = useState('');
    const [cost, setCost] = useState('');
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState('');
    const [inform, setInform] = useState('');
    const [glossiness, setGlossiness] = useState('');
    const [tablename, setTableName] = useState('');
    const [productCode, setProductCode] = useState('');
    const [image, setImage] = useState('');

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        if (productCode.trim() === '') {
            alert('Product code cannot be empty');
            return;
        }

        e.preventDefault();
        console.log(name, size, cost, quantity, inform, glossiness, tablename);
        // upload thông tin product
        try {
            const response = await axios.post('http://localhost:8081/uploadProduct', {
                name: name,
                productCode: productCode,
                size: size,
                cost: cost,
                quantity: quantity,
                inform: inform,
                glossiness: glossiness,
                category: tablename
            });
            console.log('Product added successfully:', response);

        } catch (error) {
            console.error('Error adding product:', error);
        }
        // upload hình ảnh
        const formData = new FormData();
        formData.append('image', image);
        formData.append('product_code', productCode);
        try {
            const response = await axios.post('http://localhost:8081/uploadImages', formData, {
                header: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            alert('Image uploaded successfully.');
        } catch (error) {
            console.error('Failed to upload image: ', error);
            alert('Failed to upload image.');
        }


    };

    return (
        <div className={styles.siteForm}>
            <div>
                <form onSubmit={handleSubmit} className={styles.formAddProduct} >
                    <div className={styles.elementForm}>
                        <label htmlFor="tablename" ><p>Type product:</p></label>
                        <select name="tablename" value={tablename} className={styles.selectTypeProduct} onChange={(e) => { setTableName(e.target.value) }}>
                            <option value="mechandise">mechandise</option>
                            <option value="holdup">holdup</option>
                            <option value="pomade">pomade</option>
                        </select>

                    </div>
                    <div className={styles.elementForm}>
                        <label ><p>Product Name:</p></label>
                        <input
                            id="productName"
                            value={name}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>
                    <div className={styles.elementForm}>
                        <label ><p>Product Code:</p></label>
                        <input
                            id="productCode"
                            value={productCode}
                            onChange={(e) => setProductCode(e.target.value)}
                        />
                    </div>
                    <div className={styles.elementForm}>
                        <label ><p>Size:</p></label>
                        <input
                            id="size"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                        />
                    </div>
                    <div className={styles.elementForm}>
                        <label ><p>Cost:</p></label>
                        <input
                            id="cost"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                        />
                    </div>
                    <div className={styles.elementForm}>
                        <label ><p>Quantity:</p></label>
                        <input
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>
                    <div className={styles.elementForm}>
                        <label ><p>Inform:</p></label>
                        <input
                            id="inform"
                            value={inform}
                            onChange={(e) => setInform(e.target.value)}
                        />
                    </div>
                    <div className={styles.elementForm}>
                        <label ><p>Glossiness:</p></label>
                        <input
                            id="glossiness"
                            value={glossiness}
                            onChange={(e) => setGlossiness(e.target.value)}
                        />
                    </div>
                    <div className={styles.elementForm}>
                        <label ><p>Add Image:</p></label>
                        <input type="file" onChange={handleFileChange}></input>
                    </div>

                    <button type="submit" className={styles.buttonSubmit}>Add Product</button>
                </form >
            </div>

        </div >
    );
};

export default AddProduct;
