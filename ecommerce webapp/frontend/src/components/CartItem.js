import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { axiosPrivate } from "../api/axios";


function CartItem (props){

    const INCREMENT_CART_URL = "/api/user/cart/increment";
    const DECREMENT_CART_URL = "/api/user/cart/decrement";
    const GET_PRODUCT_URL = "/api/product/get-one";
    const axiosPrivate = useAxiosPrivate();
    const [product, setProduct] = useState();
    const setUpdate = props.setUpdate;

    const item = props.item;

    console.log(item);

    useEffect( () => {
        console.log("banana");
        try{
            axiosPrivate.get(GET_PRODUCT_URL,{
                params : {
                    "id" : item.productID
                }
            })
                .then(res => {
                    console.log(res)
                    setProduct(res.data)
                    console.log(product);
                })
                .catch()
        }catch(e){
            console.log(e);
            //navigate('/login', { state: { from: location }, replace: true });
        }
        
    }, [])

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



    
    return(
        <div key = {props.key}>
            <p>{product.productName}</p>
            <p>{item.quantity}</p>
            <button id = {product.id} onClick = {() => handleAdd(product.id)}>+</button>
            <button id = {product.id} onClick = {() => handleRemove(product.id)}>-</button>
        </div>
    )
    
}

export default CartItem;