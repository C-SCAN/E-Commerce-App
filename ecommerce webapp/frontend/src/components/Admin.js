import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/admin.css"

const GET_USER_DETAILS = "/api/user/get-details";

const Admin = () => {

    const [user, setUser] = useState([]);
    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
    const [editedPassword, setEditedPassword] = useState('');
    const [removedUser, setRemovedUser] = useState('');

    const [addedName, setAddedName] = useState('');
    const [addedEmail, setAddedEmail] = useState('');
    const [addedPhoneNumber, setAddedPhoneNumber] = useState('');
    const [addedPassword, setAddedPassword] = useState('');

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    function changeNameHandler(){
        try{
            axiosPrivate("/api/user/update-username", { 
                method : 'PATCH',
                data : {
                    "username" : editedName
                }
            })
                .then(res => {
                    navigate('/admin', { state: { from: location }, replace: true });
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
                    navigate('/admin', { state: { from: location }, replace: true });
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
                    navigate('/admin', { state: { from: location }, replace: true });
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
                    navigate('/admin', { state: { from: location }, replace: true });
                })
                .catch()
        }catch(e){
            console.log(e);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }

    function removeUserHandler(){
        try{
            axiosPrivate("/api/admin/delete-user", { 
                method : 'DELETE',
                data:{
                    "emailID": removedUser
                },
            })
                .then(res => {
                    console.log(res);
                })
                .catch()
        }catch(e){
            console.log(e);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }

    function addManagerHandler(){
        try{
            axiosPrivate("/api/admin/register-manager", { 
                method : 'POST',
                data:{
                    "username" : addedName,
                    "emailID" : addedEmail,
                    "phoneNumber" : addedPhoneNumber,
                    "password" : addedPassword
                },
            })
                .then(res => {
                    console.log(res);
                })
                .catch()
        }catch(e){
            console.log(e);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }

    function addCustomerHandler(){
        try{
            axiosPrivate("/api/user/register", { 
                method : 'POST',
                data:{
                    "username" : addedName,
                    "emailID" : addedEmail,
                    "phoneNumber" : addedPhoneNumber,
                    "password" : addedPassword
                },
            })
                .then(res => {
                    console.log(res);
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
        
      <div className = "admin-profile">
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" /> 
      <meta name="viewport" content="width=device-width, initial-scale=1.0" /> 
      <title>Admin Profile</title>
      <meta name="author" content="Codeconvey" />
      <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900&display=swap" rel="stylesheet" /><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css" />
      {/*Only for demo purpose - no need to add.*/}
      {/* <link rel="stylesheet" href="css/demo.css" /> */}
      <link rel="stylesheet" href="Admin_profile.css" />
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
                    <div className="col-10">
                      <div className="col-4 ">
                        <div className="card shadow-sm">
                          <div className="card-header bg-transparent text-center">
                            <img className="profile_img" src="https://source.unsplash.com/600x300/?Professional" alt="student dp" />
                            <h3>{user.username}</h3>
                          </div>
                          <div className="card-body py-2">
                            <p className="mb-0"><strong className="pr-1 ml-2">Email:</strong>{user.emailID}</p>
                            <p className="mb-0"><strong className="pr-1 ml-2">Phone No:</strong>{user.phoneNumber}</p>
                            <p className="mb-0 "> <button type="submit" className="submit-btn">Generate Report</button></p>
                          </div>
                        </div>
                      </div>
                      <div style={{height: '26px'}} />
                      <div className="col">
                        <div className="card shadow-sm">
                          <div className="card-header bg-transparent border-0">
                            <h3 className="mb-0 py-2 pl-2">Edit Admin Profile</h3>
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
                      </div>
                      <div style={{height: '26px'}} />
                      <div className="col">
                        <div className="card shadow-sm">
                          <div className="card-header bg-transparent border-0">
                            <h3 className="mb-0 py-2 pl-2">Remove User / Manager</h3>
                          </div>
                          <div className="card-body pt-0">
                            <table className="table table-bordered">
                              <tbody><tr>
                                  <th width="30%">Email</th>
                                  <td width="2%">:</td>
                                  <td> <input type="email" onChange={(e) => setRemovedUser(e.target.value)}  /> <button type="submit" className="submit-btn" onClick={removeUserHandler}>Remove</button>
                                  </td>
                                </tr>
                              </tbody></table>
                          </div>
                        </div>
                      </div>
                      <div style={{height: '26px'}} />
                      <div className="col">
                        <div className="card shadow-sm">
                          <div className="card-header bg-transparent border-0">
                            <h3 className="mb-0 py-2 pl-2">Add User / Manager</h3>
                          </div>
                          <div className="card-body pt-0">
                          <form>
                            <table className="table table-bordered">
                              
                              <tbody><tr>
                                  <th width="30%">Name</th>
                                  <td width="2%">:</td>
                                  <td> <input type="text" onChange={(e) => setAddedName(e.target.value)}  /> 
                                  </td>
                                </tr>
                                <tr>
                                  <th width="30%">Email</th>
                                  <td width="2%">:</td>
                                  <td> <input type="email" onChange={(e) => setAddedEmail(e.target.value)}/>
                                  </td>
                                </tr>
                                <tr>
                                  <th width="30%">Phone number</th>
                                  <td width="2%">:</td>
                                  <td> <input type="number" onChange={(e) => setAddedPhoneNumber(e.target.value)}/>
                                  </td>
                                </tr>
                                <tr>
                                  <th width="30%">Password</th>
                                  <td width="2%">:</td>
                                  <td> <input type="text" onChange={(e) => setAddedPassword(e.target.value)}/> <button type="submit" className="submit-btn" onClick={addManagerHandler}>Add as manager</button><button type="submit" className="submit-btn" onClick={addCustomerHandler}>Add as customer</button>
                                  </td>
                                </tr>
                              </tbody></table></form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* partial */}
                </div>
              </div>
            </div>
          </div></div></section>
      {/* Analytics */}
    </div>
  
    )
}

export default Admin
