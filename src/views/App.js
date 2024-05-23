import logo from './logo.svg';
import './App.css';
import Menu from '../components/Customer/Menu/Menu';
import Booking from '../components/Customer/Booking/Booking';
import News from '../components/Customer/News/News';
import Product from '../components/Customer/ProductMenu/Product';
import ListPrice from '../components/Customer/ListPrice/ListPrice';
import Footer from '../components/Customer/Footer/Footer';
import Banner from '../components/Customer/BannerShop/BannerShop';
import MainShop from '../components/Customer/MainShop/MainShop';
import ListMerchandise from '../components/Customer/TestAPI/ListMerchandise';
function App() {
  return (
    <div className="App">

      <ListMerchandise></ListMerchandise>

    </div>
  );
}

export default App;
