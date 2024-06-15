import React, { useState, useEffect } from 'react';
import MainShop from '../MainShop/MainShop';
import Menu from '../Menu/Menu';
import Banner from '../BannerShop/BannerShop';
const PageShop = () => {

    return (
        <div >
            <Menu></Menu>
            <Banner></Banner>
            <MainShop></MainShop>
        </div>

    );
};

export default PageShop;
