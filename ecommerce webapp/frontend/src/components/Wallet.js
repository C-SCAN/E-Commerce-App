import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/wallet.css";

const ADD_BALANCE_URL = "/api/user/add-balance";
const GET_USER_DETAILS_URL = "/api/user/get-details";

function Wallet(){
    const [walletAmount, setWalletAmount] = useState(0);
    const [addedAmount, setAdddedAmount] = useState(0);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect( () => {
        try{
            axiosPrivate(GET_USER_DETAILS_URL, { 
                method : 'GET',
            })
                .then(res => {
                    console.log(res)
                    setWalletAmount(res.data.walletAmount)
                })
                .catch()
        }catch(e){
            console.log(e);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }, [addedAmount])

    const handleSubmit = (e) =>{
        // console.log("aaaaaaaaa");
        e.preventDefault();
        try{
            axiosPrivate.patch(ADD_BALANCE_URL,
                JSON.stringify({
                "balance" : addedAmount
            }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
                .then(res=>{
                    if(res.status === 200){
                        //setWalletAmount(walletAmount + addedAmount);
                        setAdddedAmount(0);
                    }
                })
        }catch(e){
            console.log(e);
            //while(1);
        }
    }

    return(
        // <div>
        //     <h2>Wallet Amount: </h2>
        //     <h4>{walletAmount}</h4>
        //     <form onSubmit={handleSubmit}>
        //         <input type="tel" className="input-field" onChange={(e) => setAdddedAmount(e.target.value)} placeholder="Add balance" required />
        //         <button type="submit" className="submit-btn">+</button>
        //     </form>
        // </div>

        <div className="wallet">
        <title> Wallet page </title>
        <link rel="stylesheet" href="wallet.css" />
        <div className="cover">
          <div className="form-box">
            <div className="data"> 
              <div className="title-box">
                <div id="btn" />
                <button type className="toggle-btn">WALLET</button>
              </div>
              <form id="wallet" className="input-group" onSubmit={handleSubmit}>
                <h2>Balance: {"₹" + walletAmount}</h2>
                <input type="text" className="input-field" onChange={(e) => setAdddedAmount(e.target.value)} placeholder="Add amount" />
                <button type="submit" className="submit-btn">ADD</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Wallet;