import React, { useState } from 'react';

function ImageUploader() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('image', selectedFile);

        fetch('http://localhost:8081/uploadImages', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to upload image');
                }
                return response.text(); // hoặc response.json() nếu server trả về JSON
            })
            .then(data => {
                console.log(data);
                // Xử lý phản hồi từ server (nếu cần)
            })
            .catch(error => {
                console.error('Error uploading image:', error);
            });
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default ImageUploader;
