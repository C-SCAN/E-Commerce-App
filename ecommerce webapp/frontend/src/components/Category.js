import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const INCREMENT_CART_URL = "/api/user/cart/increment";

function Category() {
    const [products, setProducts] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const category = useParams().c;
    console.log(category);

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
            axiosPrivate('/api/product/get-category', { 
                method : 'GET',
                params : {
                    "category" : category
                },
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
        // <div>
        //     <ul>
        //         {
        //             products.map(product => <div>
        //                 <li key = {product.id}>{product.productName}</li>
        //                 <p>{product.price}</p>
        //                 <p>{product.categoryName}</p>
        //                 {/* <image src = ""></image> */}
        //                 <button id = {product.id} onClick = {() => handleAdd(product.id)}>Add to cart</button>
        //             </div>)
        //         }
        //     </ul>
        // </div>

                <div className="product-container">
            {/* <ul> */}
                {
                    products.map(product =>
                     <div className="product-box">
                        {/* <img alt="" src=""/> */}
                        {/* <li key = {product.id}>{product.productName}</li> */}
                        <strong key = {product.id}>{product.productName}</strong>
                        <p className="category">{product.categoryName}</p>
                        <p className="price">₹ {product.price}</p>
                        
                        <button className="cart-btn" id = {product.id} onClick = {() => handleAdd(product.id)}>Add to cart</button>

                    </div>)

                    
                }
            {/* </ul> */}
        </div>

    )
}

export default Category