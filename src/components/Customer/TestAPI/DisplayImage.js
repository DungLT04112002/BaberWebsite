import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DisplayImage({ imageId }) {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        if (!imageId) return;

        const fetchImage = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/image/${imageId}`, {
                    responseType: 'blob',
                });

                const url = URL.createObjectURL(response.data);
                setImageSrc(url);
            } catch (error) {
                console.error('Error fetching the image', error);
            }
        };

        fetchImage();
    }, [imageId]);

    return (
        <div>
            {imageSrc ? (
                <img src={imageSrc} alt={`Image ${imageId}`} />
            ) : (
                <p>Select an image to display</p>
            )}
        </div>
    );
}

export default DisplayImage;
