import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Menu from '../components/Customer/Menu/Menu';
import Booking from '../components/Customer/Booking/Booking';
import News from '../components/Customer/News/News';
import Product from '../components/Customer/ProductMenu/Product';
import ListPrice from '../components/Customer/ListPrice/ListPrice';
import Footer from '../components/Customer/Footer/Footer';
import Banner from '../components/Customer/BannerShop/BannerShop';
import MainShop from '../components/Customer/MainShop/MainShop';
import AddProduct from '../components/Admin/ProductManager/AddProduct';
import PageShop from '../components/Customer/PageShop/Pageshop';
import HomePage from '../components/Customer/HomePage/HomePage';
function App() {
  return (

    <BrowserRouter>
      <Routes >
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/shop" element={<PageShop></PageShop>} />
      </Routes>
    </BrowserRouter>

    // <div className="App">
    //   {/* <Booking></Booking>
    //   <News></News>
    //   <Product></Product>
    //   <ListPrice></ListPrice>
    //   <Footer></Footer> */}
    //   {/* <Menu></Menu> */}
    //   <HomePage></HomePage>
    //   <PageShop></PageShop>
    // </div>
  );
}



export default App;
