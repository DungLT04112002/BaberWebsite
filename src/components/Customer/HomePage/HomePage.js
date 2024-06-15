import React, { useState } from 'react';
import News from '../News/News';
import ListPrice from '../ListPrice/ListPrice';
import Menu from '../Menu/Menu';
import Booking from '../Booking/Booking';
import Product from '../ProductMenu/Product';
import Footer from '../Footer/Footer';
const HomePage = () => {
    return (
        <div  >
            <Menu></Menu>
            <Booking></Booking>
            <News></News>
            <Product></Product>
            <ListPrice></ListPrice>
            <Footer></Footer>
        </div>

    )
};

export default HomePage;
