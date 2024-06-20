import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/manager.css"

const GET_USER_DETAILS = "/api/user/get-details";
const DELETE_USER_URL = "/api/user/delete"



const Manager = () => {

    const [user, setUser] = useState([]);
    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
    const [editedPassword, setEditedPassword] = useState('');

    const [removeProduct, setRemoveProduct] = useState('');

    const [productCategoryName, setProductCategoryName] = useState('');
    const [productName, setProductName] = useState('');
    const [productQuantity, setProductQuantity] = useState(0);
    const [productPrice, setProductPrice] = useState('');
    const [productDiscount, setProductDiscount] = useState(0);
    const [productDeliveryTime, setProductDeliveryTime] = useState(0);
    const [productImageURL, setProductImageURL] = useState('');

    
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const postProduct = () => {
        try {
            const response = axiosPrivate.post("/api/product/add-or-edit",
                JSON.stringify({
                    "productName" : productName,
                    "categoryName" : productCategoryName,
                    "price" : productPrice,
                    "discount" : productDiscount,
                    "deliveryTime" : productDeliveryTime,
                    "quantity" : productQuantity,
                    "imageURL" : productImageURL
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
        } catch (e) {
            console.log(e);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }

    const removeProductHandler = () => {
        try {
            const response = axiosPrivate.delete("/api/product/delete",
                JSON.stringify({
                    "name" : removeProduct
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
        } catch (e) {
            console.log(e);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }

    function deleteHandler(){
        try{
            axiosPrivate(DELETE_USER_URL, { 
                method : 'DELETE',
            })
                .then(res => {
                    navigate('/login', { state: { from: location }, replace: true });
                })
                .catch()
        }catch(e){
            console.log(e);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }
    
    function changeNameHandler(){
        try{
            axiosPrivate("/api/user/update-username", { 
                method : 'PATCH',
                data : {
                    "username" : editedName
                }
            })
                .then(res => {
                    navigate('/manager', { state: { from: location }, replace: true });
                })
                .catch()
        }catch(e){
            console.log(e);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }
    function changeEmailHandler(){
        try{
            axiosPrivate("api/user/update-emailID", { 
                method : 'PATCH',
                data : {
                    "emailID" : editedEmail
                }
            })
                .then(res => {
                    navigate('/manager', { state: { from: location }, replace: true });
                })
                .catch()
        }catch(e){
            console.log(e);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }
    function changePhoneHandler(){
        try{
            axiosPrivate("/api/user/update-phone-number", { 
                method : 'PATCH',
                data:{
                    "phoneNumber" : editedPhoneNumber
                },
            })
                .then(res => {
                    navigate('/manager', { state: { from: location }, replace: true });
                })
                .catch()
        }catch(e){
            console.log(e);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }
    function changePasswordHandler(){
        try{
            axiosPrivate("/api/user/change-password", { 
                method : 'PATCH',
                data:{
                    "password": editedPassword
                },
            })
                .then(res => {
                    navigate('/manager', { state: { from: location }, replace: true });
                })
                .catch()
        }catch(e){
            console.log(e);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }

    useEffect( () => {
        try{
            axiosPrivate(GET_USER_DETAILS, { 
                method : 'GET',
            })
                .then(res => {
                    console.log(res)
                    setUser(res.data)
                })
                .catch()
        }catch(e){
            console.log(e);
            navigate('/login', { state: { from: location }, replace: true });
        }
        
    }, [])




    return (
        
      <div className="manager-profile">
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" /> 
      <meta name="viewport" content="width=device-width, initial-scale=1.0" /> 
      <title>Manager Profile</title>
      <meta name="author" content="Codeconvey" />
      <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900&display=swap" rel="stylesheet" /><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css" />
      <link rel="stylesheet" href="Manager_profile.css" />
      <div className="ScriptTop">
      </div>
      <section>
        <div className="rt-container">
          <div className="col-rt-12">
            <div className="Scriptcontent">
              {/* Student Profile */}
              <div className="student-profile py-4 m-5 ">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="card shadow-sm">
                        <div className="card-header bg-transparent text-center">
                          <img className="profile_img" src="https://source.unsplash.com/600x300/?Professional" alt="student dp" />
                          <h3>{user.username}</h3>
                        </div>
                        <div className="card-body">
                          <p className="mb-0"><strong className="pr-1 ml-2">Email:</strong>{user.emailID}</p>
                          <p className="mb-0"><strong className="pr-1 ml-2">Phone No:</strong>{user.phoneNumber}</p>
                          <p className="mb-0 m-lg-2  ml-xl-5 "> <button type="submit" className="submit-btn" onClick={deleteHandler}>Delete Account</button></p>
                        </div>
                      </div>
                    </div>
                    <div className="col ml-5">
                      <div className="col-lg-12">
                        <div className="card shadow-sm">
                          <div className="card-header bg-transparent border-0">
                            <h3 className="mb-0 py-2 pl-2">Edit Manager Profile</h3>
                          </div>
                          <div className="card-body pt-0">
                            <table className="table table-bordered">
                              <tbody><tr>
                                  <th width="30%">Edit name</th>
                                  <td width="2%">:</td>
                                  <td> <input type="text"  onChange={(e) => setEditedName(e.target.value)}/> <button type="submit" onClick={changeNameHandler} className="submit-btn">Save name</button>
                                  </td>
                                </tr>
                                <tr>
                                  <th width="30%">Edit email</th>
                                  <td width="2%">:</td>
                                  <td> <input type="email" onChange={(e) => setEditedEmail(e.target.value)}/> <button type="submit" onClick={changeEmailHandler}  className="submit-btn">Save email</button>
                                  </td>
                                </tr>
                                <tr>
                                  <th width="30%">Edit phone number</th>
                                  <td width="2%">:</td>
                                  <td> <input type="number" onChange={(e) => setEditedPhoneNumber(e.target.value)}/> <button type="submit" onClick={changePhoneHandler}  className="submit-btn">Save phone number</button>
                                  </td>
                                </tr>
                                <tr>
                                  <th width="30%">Change password</th>
                                  <td width="2%">:</td>
                                  <td> <input type="text" onChange={(e) => setEditedPassword(e.target.value)} /> <button type="submit" onClick={changePasswordHandler}  className="submit-btn">Save password</button>
                                  </td>
                                </tr> 
                              </tbody></table>
                          </div>
                        </div>
                        <div style={{height: '26px'}} />
                      </div>
                      <div className="col-lg-12">
                        <div className="card shadow-sm">
                          <div className="card-header bg-transparent border-0">
                            <h3 className="mb-0 mb-0 py-2 pl-2">Add / Edit products</h3>
                          </div>
                          <div className="card-body pt-0">
                          <form onSubmit={postProduct}>
                          <table className="table table-bordered">
        
        <tbody><tr>
            <th width="30%">Product name</th>
            <td width="2%">:</td>
            <td> <input type="text" onChange={(e) => setProductName(e.target.value)} />
            </td>
          </tr>
          <tr>
            <th width="30%">Category name</th>
            <td width="2%">:</td>
            <td> <input type="text" onChange={(e) => setProductCategoryName(e.target.value)}/> 
            </td>
          </tr>
          <tr>
            <th width="30%">Price in Rupees</th>
            <td width="2%">:</td>
            <td> <input type="number" onChange={(e) => setProductPrice(e.target.value)}/> 
            </td>
          </tr>
          <tr>
            <th width="30%">Discount</th>
            <td width="2%">:</td>
            <td> <input type="text" onChange={(e) => setProductDiscount(e.target.value)} /> 
            </td>
          </tr> 
          <tr>
            <th width="30%">Delivey time</th>
            <td width="2%">:</td>
            <td> <input type="number" onChange={(e) => setProductDeliveryTime(e.target.value)}/> 
            </td>
          </tr> 
          <tr>
            <th width="30%">Quantity</th>
            <td width="2%">:</td>
            <td> <input type="number" onChange={(e) => setProductQuantity(e.target.value)}/> 
            </td>
          </tr> 
          <tr>
            <th width="30%">Image URL</th>
            <td width="2%">:</td>
            <td> <input type="url" onChange={(e) => setProductImageURL(e.target.value)} /> <button type="submit" className="submit-btn">Add Product</button>
            </td>
          </tr> 
        </tbody></table></form>
                          </div>
                        </div>
                        <div style={{height: '26px'}} />
                      </div>
                      <div className="col">
                        <div className="card shadow-sm">
                          <div className="card-header bg-transparent border-0">
                            <h3 className="mb-0 py-2 pl-2">Remove Product</h3>
                          </div>
                          <div className="card-body pt-0">
                            <table className="table table-bordered">
                              <tbody><tr>
                                  <th width="30%">Product name</th>
                                  <td width="2%">:</td>
                                  <td> <input type="text" onChange={(e) => setRemoveProduct(e.target.value)}/> <button type="submit" onClick={removeProductHandler} className="submit-btn">Remove</button>
                                  </td>
                                </tr>
                              </tbody></table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
          
              </div>
            </div>
          </div>
        </div></section>
      
    </div>
  
    )
}

export default Manager
