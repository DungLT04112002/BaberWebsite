import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ productCode }) => {
    const [image, setImage] = useState(null);
    const productcode = productCode;
    // const [productCode, setProductCode] = useState('');

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            alert('Please select an image file.');
            return;
        }

        const formData = new FormData();
        console.log(productcode);
        formData.append('image', image);
        formData.append('product_code', productcode);

        try {
            const response = await axios.post('http://localhost:8081/uploadImages', formData, {
                headers: {
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
        <div>

            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default ImageUpload;
