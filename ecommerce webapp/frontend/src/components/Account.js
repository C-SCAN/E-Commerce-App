import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/manager.css"

const GET_USER_DETAILS = "/api/user/get-details";
const DELETE_USER_URL = "/api/user/delete"



const Account = () => {

    const [user, setUser] = useState([]);
    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
    const [editedPassword, setEditedPassword] = useState('');

    const [line1, setLine1] = useState('')
    const [line2, setLine2] = useState('')
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [state, setState] = useState('')
    const [pincode, setPincode] = useState('')

    
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

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
                    navigate('/account', { state: { from: location }, replace: true });
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
                    navigate('/account', { state: { from: location }, replace: true });
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
                    navigate('/account', { state: { from: location }, replace: true });
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
                    navigate('/account', { state: { from: location }, replace: true });
                })
                .catch()
        }catch(e){
            console.log(e);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }

    function changeAddressHandler(){
        try{
            axiosPrivate("/api/user/update-address", { 
                method : 'PATCH',
                data:{
                    "address" :{
                        "line1" : line1,
                    "line2" : line2,
                    "city" : city,
                    "district" : district,
                    "state" : state,
                    "pinCode" : pincode
                    }
                    
                },
            })
                .then(res => {
                    navigate('/account', { state: { from: location }, replace: true });
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
                          {/* <p className="mb-0"><strong className="pr-1 ml-2">Address Line 1:</strong>{user.address.line1}</p>
                          <p className="mb-0"><strong className="pr-1 ml-2">Address Line 2:</strong>{user.address.line2}</p>
                          <p className="mb-0"><strong className="pr-1 ml-2">City:</strong>{user.address.city}</p>
                          <p className="mb-0"><strong className="pr-1 ml-2">District:</strong>{user.address.district}</p>
                          <p className="mb-0"><strong className="pr-1 ml-2">State:</strong>{user.address.state}</p>
                          <p className="mb-0"><strong className="pr-1 ml-2">Pincode:</strong>{user.address.pincode}</p> */}
                          <p className="mb-0 m-lg-2  ml-xl-5 "> <button type="submit" className="submit-btn" onClick={deleteHandler}>Delete Account</button></p>
                        </div>
                      </div>
                    </div>
                    <div className="col ml-5">
                      <div className="col-lg-12">
                        <div className="card shadow-sm">
                          <div className="card-header bg-transparent border-0">
                            <h3 className="mb-0 py-2 pl-2">Edit Profile</h3>
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
                                <tr>
                                  <th width="30%">Address Line 1</th>
                                  <td width="2%">:</td>
                                  <td> <input type="text" onChange={(e) => setLine1(e.target.value)} /> 
                                  </td>
                                </tr> 
                                <tr>
                                  <th width="30%">Address Line 2</th>
                                  <td width="2%">:</td>
                                  <td> <input type="text" onChange={(e) => setLine2(e.target.value)} /> 
                                  </td>
                                </tr> 
                                <tr>
                                  <th width="30%">City</th>
                                  <td width="2%">:</td>
                                  <td> <input type="text" onChange={(e) => setCity(e.target.value)} /> 
                                  </td>
                                </tr> 
                                <tr>
                                  <th width="30%">District</th>
                                  <td width="2%">:</td>
                                  <td> <input type="text" onChange={(e) => setDistrict(e.target.value)} /> 
                                  </td>
                                </tr> 
                                <tr>
                                  <th width="30%">State</th>
                                  <td width="2%">:</td>
                                  <td> <input type="text" onChange={(e) => setState(e.target.value)} /> 
                                  </td>
                                </tr> 
                                <tr>
                                  <th width="30%">Pincode</th>
                                  <td width="2%">:</td>
                                  <td> <input type="text" onChange={(e) => setPincode(e.target.value)} /> <button type="submit" onClick={changeAddressHandler}  className="submit-btn">Save Address</button>
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

export default Account;
