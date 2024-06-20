import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const INCREMENT_CART_URL = "/api/user/cart/increment";

function Products() {
    const [products, setProducts] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

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
            axiosPrivate('/api/product/all', { 
                method : 'GET',
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
        <div>
            <ul>
                {
                    products.map(product => <div>
                        <li key = {product.id}>{product.productName}</li>
                        <p>{product.price}</p>
                        <p>{product.categoryName}</p>
                        <button id = {product.id} onClick = {() => handleAdd(product.id)}>Add to cart</button>
                    </div>)
                }
            </ul>
        </div>
    )
}

export default Products