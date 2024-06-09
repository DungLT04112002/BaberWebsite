import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetImg = ({ id }) => {
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        const getImage = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/getImages/${id}`, {
                    responseType: 'arraybuffer' // Set responseType to 'arraybuffer' to handle binary data
                });

                // Convert array buffer to base64
                const binary = new Uint8Array(response.data);
                const base64String = btoa(
                    binary.reduce((data, byte) => data + String.fromCharCode(byte), '')
                );

                // Create a data URL
                const imageDataUrl = `data:image/png;base64,${base64String}`;

                // Set the image data state
                setImageData(imageDataUrl);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        getImage();
    }, [id]);

    return (
        <div>

            <img src={imageData} alt={`Image ${id}`} />

        </div>
    );
};

export default GetImg;
