import React, { useState } from 'react';
import styles from "./AddService.module.css"

import axios from 'axios';
const AddService = () => {
    const [name, setProductName] = useState('');
    const [cost, setCost] = useState('');


    const handleSubmit = async (e) => {


        e.preventDefault();
        console.log(name, cost);
        // upload thông tin product
        try {
            const response1 = await axios.post('http://localhost:8081/uploadService', {
                name: name,
                cost: cost,
            });
            console.log('Product added successfully:', response1);

        } catch (error) {
            console.error('Error adding product:', error);
        }



    };

    return (
        <div className={styles.siteForm}>
            <div>
                <form onSubmit={handleSubmit} className={styles.formAddProduct} >

                    <div className={styles.elementForm}>
                        <label ><p>Service name:</p></label>
                        <input
                            value={name}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>
                    <div className={styles.elementForm}>
                        <label ><p>Cost:</p></label>
                        <input
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                        />
                    </div>
                    <button type="submit" className={styles.buttonSubmit}>Add Service</button>
                </form >
            </div>

        </div >
    );
};

export default AddService;
