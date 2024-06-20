import { useNavigate, Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthProvider";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "../css/homestyle.css"

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    const [searchString, setSearchString] = useState('');
    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/');
    }

    function searchHandler(){
        const searchURL = "/search/"+searchString;
        navigate(searchURL, { state: { from: location }, replace: true });
    }

    return (
        <div className = "home">
        {/*==Title==================================*/}
        <title>superMART Store</title>
        {/*==Stylesheet=============================*/}
        <link rel="stylesheet" type="text/css" href="../css/homestyle.css" />
        {/*==Fav-icon===============================*/}
        <link rel="shortcut icon" href="images/fav-icon.png" />
        {/*==Using-Font-Awesome=====================*/}
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous" />
        {/*==Import-Font-Family======================*/}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        {/*==Navigation================================*/}
        <nav className="navigation">
          {/*logo------*/}
          <a href="index.html" className="logo">
            SUPER-MART<span></span>
          </a>
          {/*menu-btn--*/}
          <input type="checkbox" className="menu-btn" id="menu-btn" />
          <label htmlFor="menu-btn" className="menu-icon">
            <span className="nav-icon" />
          </label>
          {/*menu------*/}
    
          <ul className="menu">
            <li><Link to = "/">Home</Link></li>
            <li><Link to = "/orders">Orders</Link></li>
            <li><Link to="/account">Account</Link></li>
            <li><Link to="/wallet"> Wallet</Link></li>
            <li><div onClick = {() => logout()} className = "logout"> Logout</div></li>
          </ul>
  
          {/*right-nav-(cart-like)*/}
          <div className="right-nav">
            {/*like---*/}
            {/* <a href="#" class="profile">
                <i class="fa-solid fa-user"></i>
            </a> */}
            {/*cart---*/}
            <Link to="/cart" className="cart">
              <i className="fas fa-shopping-cart" />
              {/* <span>0</span> */}
            </Link>
          </div>
        </nav>
        {/*nav-end-------------------*/}
        {/*==Search-banner=======================================*/}
        <section id="search-banner">
          {/*bg-------*/}
          <img alt="bg" className="bg-1" src="images/bg-1.png" />
          <img alt="bg-2" className="bg-2" src="images/bg-2.png" />
          {/*text-----*/}
          <div className="search-banner-text">
            <h1>Mega Savings Festival</h1>
            <h3>Get upto 20% off</h3>
            <strong>#Free Delivery</strong>
            {/*search-box----*/}
            <form action className="search-box" >
              {/*icon----*/}
              <i className="fas fa-search" />
              {/*input---*/}
              <input type="text" className="search-input" onChange={(e) => setSearchString(e.target.value)} placeholder="Search items" name="search" required />
              {/*btn-----*/}
              <input type="submit" className="search-btn" onClick={searchHandler}  defaultValue="Search" />
            </form>
          </div>
        </section>
        {/*search-banner-end-------------*/}
        {/*==category=========================================*/}
        <section id="category">
          {/*heading--------------*/}
          <div className="category-heading">
            <h2>Category</h2>
            {/* <span>All</span> */}
          </div>
          {/*box-container--------*/}
          <div className="category-container">
            {/*box--------------*/}
            <Link to="/category/electronics" className="category-box">
              {/* <img alt="Fish" src="images/fish.png" /> */}
              <span>Electronics</span>
            </Link>
            {/*box--------------*/}
            <Link to="/category/snacks" className="category-box">
              {/* <img alt="Fish" src="images/Vegetables.png" /> */}
              <span>Snacks</span>
            </Link>
            {/*box--------------*/}
            <Link to="/category/medicine" className="category-box">
              {/* <img alt="Fish" src="images/medicine.png" /> */}
              <span>Medicine</span>
            </Link>
            {/*box--------------*/}
            <Link to="/category/soft drinks" className="category-box">
              {/* <img alt="Fish" src="images/baby.png" /> */}
              <span>Soft Drinks</span>
            </Link>
            {/*box--------------*/}
            <Link to="/category/clothes" className="category-box">
              {/* <img alt="Fish" src="images/office.png" /> */}
              <span>Clothes</span>
            </Link>
            {/*box--------------*/}
            <Link to="/category/books" className="category-box">
              {/* <img alt="Fish" src="images/beauty.png" /> */}
              <span>Books</span>
            </Link>
            {/*box--------------*/}
            <Link to="/category/foorwear" className="category-box">
              {/* <img alt="Fish" src="images/Gardening.png" /> */}
              <span>Footwear</span>
            </Link>
          </div>
        </section>
        {/*category-end---------------------------------*/}
      </div>
    )
}

export default Home
