import './App.css';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import PageShop from '../components/Customer/PageShop/Pageshop';
import HomePage from '../components/Customer/HomePage/HomePage';
import PageProduct from '../components/Customer/PageProduct/PageProduct';
import ProductManger from '../components/Admin/ProductManager/ProductManager';
import MyCart from '../components/Customer/MyCart/MyCart';
import BookingForm from '../components/Customer/Booking/BookingForm';
import OrderManger from '../components/Admin/OrderManager/OrderManger'
import AppAndSerManager from '../components/Admin/AppointmentAndServiceManager/AppAndServiceManager'
import Login from '../components/Login_SignUp/Login';
import LoginGoogle from '../components/Login_SignUp/LoginGoogle';
import Signup from '../components/Login_SignUp/SignUp';
import RevenueChart from '../components/Admin/Revenue/RevenueChart';
function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/Login" element={<Login></Login>}></Route>
        <Route path="/LoginGoogle" element={<LoginGoogle> </LoginGoogle>}></Route>
        <Route path="/SignUp" element={<Signup></Signup>}></Route>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/Admin/productmanager" element={<ProductManger></ProductManger>} />
        <Route path="/shop" element={<PageShop></PageShop>} />
        <Route path="/shop/product/:ProductCode" element={<PageProduct></PageProduct>} />
        <Route path="/shop/cart" element={<MyCart></MyCart>} />
        <Route path="/booking" element={<BookingForm></BookingForm>} />
        <Route path="/Admin/Appoitment&serviceManager" element={<AppAndSerManager></AppAndSerManager>} />
        <Route path="/Admin/OrderManager" element={<OrderManger></OrderManger>} />
        <Route path="/Admin/RevenueManager" element={<RevenueChart></RevenueChart>} />
      </Routes>
    </BrowserRouter>
  );
}



export default App;
