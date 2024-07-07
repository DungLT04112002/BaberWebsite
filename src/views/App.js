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
import ProductShop from '../components/Customer/PageProduct/ProductShop';
import PageProduct from '../components/Customer/PageProduct/PageProduct';
import DisplayProductImages from '../components/Customer/MainShop/DisplayProductImg';
import ProductManger from '../components/Admin/ProductManager/ProductManager';
import AddService from '../components/Admin/Servicemanager/AddService';
import MyCart from '../components/Customer/MyCart/MyCart';
import BookingForm from '../components/Customer/Booking/BookingForm';
import OrderManger from '../components/Admin/OrderManager/OrderManger'
import AppAndSerManager from '../components/Admin/AppointmentAndServiceManager/AppAndServiceManager'
function App() {
  return (

    <BrowserRouter>
      <Routes >
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/Admin/productmanager" element={<ProductManger></ProductManger>} />
        <Route path="/shop" element={<PageShop></PageShop>} />
        <Route path="/shop/product/:ProductCode" element={<PageProduct></PageProduct>} />
        <Route path="/shop/cart" element={<MyCart></MyCart>} />
        <Route path="/booking" element={<BookingForm></BookingForm>} />
        <Route path="/Admin/Appoitment&serviceManager" element={<AppAndSerManager></AppAndSerManager>} />
        <Route path="/Admin/OrderManager" element={<OrderManger></OrderManger>} />
        <Route path="/Admin/RevenueManager" element={<AddService></AddService>} />
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
