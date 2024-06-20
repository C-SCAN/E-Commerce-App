import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import "../css/homestyle.css"
import "../css/orders.css"

const GET_ORDERS_URL = "/api/user/orders";

function orders_cards(orders) {
    var divs = orders.map((order)=>
    <div key = {order.id} id={order.id} className="history_order_card">
        <p className="history_order_card_id">Order ID : {order.id}</p>
        <p className="history_order_card_id">Date : {order.orderDate.substring(0,10)}</p>
        
        

        {/* <table>
            <tr>
                <th>Item Image</th>
                <th>Item Name</th>
                <th>Price</th>
            </tr>
            {order.items.map(item=>
                <tr>
                    <td><img src={item.img_src}></img></td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                </tr>
            )}
        </table> */}

        <p className="history_order_card_id">Total cost : {order.orderTotal}</p>
        
    </div>)
    return divs;
}

const Orders = ()=>{
    // var orders=[
    //                 {id:1 ,items:[{name:"banana",price:"2",img_src:"../images/banana.jpeg"},{name:"banana",price:"2",img_src:"../images/banana.jpeg"}],total_price:"100",date:"1111"},
    //                 {id:2,items:[{name:"apple",price:"3",img_src:"../images/banana.jpeg"},{name:"apple",price:"3",img_src:"../images/banana.jpeg"}],total_price:"100",date:"1111",img_src:""}
    //             ]

    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();

    
    useEffect( () => {
        try{
            axiosPrivate(GET_ORDERS_URL, { 
                method : 'GET',
            })
                .then(res => {
                    console.log(res.data);
                    setOrders(res.data);
                })
                .catch()
        }catch(e){
            console.log(e);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }, [])

    //call database
    //store in orders
    var order_divs=orders_cards(orders);

    return(
        <div className="orders">
            {/* <p>Orders History</p> */}
            <h2 className="heading">Order History</h2>
            {order_divs}
        </div>
    )
}

export default Orders