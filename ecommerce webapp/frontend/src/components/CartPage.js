import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/cartpage.css";

const GET_CART_URL = "/api/user/get-cart";
const INCREMENT_CART_URL = "/api/user/cart/increment";
const DECREMENT_CART_URL = "/api/user/cart/decrement";
const ORDER_URL = "/api/user/place-order";
function CartPage(){
    const [cartItems, setCartItems] = useState([]);
    const [update, setUpdate] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect( () => {
        try{
            axiosPrivate(GET_CART_URL, { 
                method : 'GET',
            })
                .then(res => {
                    console.log(res.data);
                    setCartItems(res.data.cart);
                    setCartTotal(res.data.price);
                })
                .catch()
        }catch(e){
            console.log(e);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }, [update])

    const handleAdd = (productID) =>{
        try{
            axiosPrivate.patch(INCREMENT_CART_URL,
                JSON.stringify({
                "productID" : productID
            }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
                .then(res=>{
                    if(res.status === 200){
                        setUpdate(1);
                        setUpdate(0);
                    }
                })
        }catch(e){
            console.log(e);
        }
    }

    const handleRemove = (productID) =>{
        try{
            axiosPrivate.patch(DECREMENT_CART_URL,
                JSON.stringify({
                "productID" : productID
            }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
                .then(res=>{
                    if(res.status === 200){
                        setUpdate(1);
                        setUpdate(0);
                    }
                })
        }catch(e){
            console.log(e);
        }
    }

    const handleOrder = () => {
        axiosPrivate.patch(ORDER_URL).then(res => {
            if(res.status === 200){
                navigate('/orders', { state: { from: location }, replace: true });
            }else{
                navigate('/insufficient-balance', { state: { from: location }, replace: true });
            }
        })
    }

    if(cartItems.length === 0){
        return(
            <div className="cart">
                <p>Empty cart</p>
            </div>
        )
    }else{
        return (
            <div className="cart">
            <div className="CartContainer">
            <div className="Header">
                <h3 className="Heading">Shopping Cart</h3>
            </div>
           { cartItems.map(item => <div key = {item.product.id}>
            <div className="Cart-Items">
            <div className="image-box">
                <img src={item.product.imageURL} alt = {item.product.productName} style={{height: '120px'}} />
            </div>
            <div className="about">
                <h3 className="title">{item.product.productName}</h3>
            </div>
            <div className="counter">
            <div className="btn"><button id = {item.product.id} onClick = {() => handleRemove(item.product.id)}>-</button></div>
            
            <div className="count">{item.quantity}</div>
            <div className="btn"><button id = {item.product.id} onClick = {() => handleAdd(item.product.id)}>+</button></div>
            </div>
            <div className="prices">
            <div className="amount">{"₹" + item.product.price}</div>
            </div>

        </div>
        </div>
        )}
        <hr />
        </div>
        <div className="checkout">
        <div className="total">
          <div>
            <div className="total-amount">Total</div>
            
          </div>
          <div className="total-amount">{"₹" + cartTotal}</div>
        </div>
      </div>
        

        <button class ="button" onClick = {() => handleOrder()}>Place Order</button>
        </div>
        )
    }
}

export default CartPage;