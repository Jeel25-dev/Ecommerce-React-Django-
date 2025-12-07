//import logo from './logo.svg';
import './App.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './components/screens/HomeScreen';
import ProductScreen from './components/screens/ProductScreen';
import CartScreen from './components/screens/CartScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import ShippingScreen from './components/screens/ShippingScreen';
import PaymentScreen from './components/screens/PaymentScreen';
import PlaceorderScreen from './components/screens/PlaceorderScreen';
import OrderScreen from './components/screens/OrderScreen';
import OrderListScreen from './components/screens/OrderListScreen';
import UserListScreen from './components/screens/UserListScreen';
import EditUserScreen from './components/screens/UserEditScreen';
import ProductListScreen from './components/screens/ProductListScreen';
import ProductEditScreen from './components/screens/ProductEditScreen';


function App() {
  return (
    <Router>
      <Header></Header>
      <main className='py-3'>
        <Container>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/cart/:id?" component={CartScreen } />
        <Route path="/login/" component={LoginScreen } />
        <Route path="/register/" component={RegisterScreen } />
        <Route path="/profile/" component={ProfileScreen } />
        <Route path="/shipping/" component={ShippingScreen } />
        <Route path="/payment/" component={PaymentScreen } />
        <Route path="/placeorder/" component={PlaceorderScreen }/>
        <Route path="/order/:id" component={OrderScreen } />
        <Route path="/admin/orderlist" component={OrderListScreen } />
        <Route path="/admin/userlist/" component={UserListScreen } />
        <Route path="/admin/user/:id/edit" component={EditUserScreen } />
        <Route path="/admin/productlist" component={ProductListScreen } />
        <Route path="/admin/product/:id/edit" component={ProductEditScreen } />

        </Container>
      </main>
      <Footer></Footer>
    </Router>
  );
}

export default App;
