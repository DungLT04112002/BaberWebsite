import React, { useState, useEffect } from 'react';
import ProductShop from './ProductShop';
import Menu from '../Menu/Menu';
import { useParams } from 'react-router-dom';

const PageProduct = () => {

    const [productCode, setProductCode] = useState(useParams().ProductCode)

    return (
        <div>
            <Menu></Menu>
            <ProductShop Pcode={productCode}></ProductShop>
        </div>

    )

}
export default PageProduct;