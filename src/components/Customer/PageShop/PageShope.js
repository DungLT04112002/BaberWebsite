import React from "react";
import Menu from "../Menu/Menu";
import Footer from './../Footer/Footer';
import Banner from "../BannerShop/BannerShop";
import MainShop from "../MainShop/MainShop";
class PageShop extends React.Component {
    render() {
        return (
            <div>
                <Menu></Menu>
                <Banner></Banner>
                <MainShop></MainShop>
                <Footer></Footer>
            </div>
        )


    }

}

export default PageShop;