import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import Products from './components/Products';
import Wallet from './components/Wallet'
import CartPage from './components/CartPage';
import Orders from './components/Orders';
import Manager from './components/Manager';
import Category from './components/Category';
import SearchProducts from './components/SearchProducts';
import Account from './components/Account';
import Report from './components/Report';


const ROLES = {
  'Customer': 'ROLE_CUSTOMER',
  'Manager': 'ROLE_MANAGER',
  'Admin': 'ROLE_ADMIN',
  'DeliveryPerson' : 'ROLE_DELIVERY_PERSON'
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* <Route path="linkpage" element={<LinkPage />} /> */}
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Customer]} />}>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Orders />} /> 
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path = "/category/:c" element = {<Category />} />
          <Route path = "/search/:searchString" element = {<SearchProducts />} />
          <Route path = "/account" element = {<Account />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Manager]} />}>
          <Route path="/manager" element={<Manager />} />
        </Route>


        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path= "/admin" element={<Admin />} />
          <Route path = "/report" element = {<Report />} />
        </Route>


        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;