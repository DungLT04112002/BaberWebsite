import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DisplayImage({ imageId, router }) {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        if (!imageId) return;

        const fetchImage = async () => {
            try {
                const response = await axios.get(`${router}${imageId}`, {
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
            <img src={imageSrc} alt={`Image ${imageId}`} />
        </div>
    );
}

export default DisplayImage;
    