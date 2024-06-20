import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "../css/products.css"

const INCREMENT_CART_URL = "/api/user/cart/increment";

function SearchProducts() {
    const [products, setProducts] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const searchString = useParams().searchString;

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
                        console.log("sussess");
                    }
                })
        }catch(e){
            console.log(e);
        }
    }

    useEffect( () => {
        try{
            axiosPrivate('/api/product/search', { 
                method : 'GET',
                params: {
                    "searchString" : searchString
                }
            })
                .then(res => {
                    console.log(res)
                    setProducts(res.data)
                })
                .catch()
        }catch(e){
            console.log(e);
            navigate('/login', { state: { from: location }, replace: true });
        }
        
    }, [])

    return (
        <div className="product-container">
            <ul>
                {
                    products.map(product =>
                     <div className="product-box">
                        {/* <img alt="" src=""/> */}
                        {/* <li key = {product.id}>{product.productName}</li> */}
                        <strong key = {product.id}>{product.productName}</strong>
                        <p className="category">{product.categoryName}</p>
                        <p className="price"> {product.price}</p>
                        
                        <button className="cart-btn" id = {product.id} onClick = {() => handleAdd(product.id)}>Add to cart</button>

                    </div>)

                    
                }
            </ul>
        </div>
    )
}

export default SearchProducts