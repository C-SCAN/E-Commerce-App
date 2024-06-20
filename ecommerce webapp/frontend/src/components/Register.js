import { useRef, useState, useEffect } from "react";
import axios from '../api/axios';
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/register.css"

const Register = () => {
    const [username, setUsername] = useState('');
    const [emailID, setEmailID] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [success, setSuccess] = useState(false);
   
    const navigate = useNavigate();
    const location = useLocation();

    const REGISTER_URL = "/api/user/register"
    
    const handleSubmit = () => {
        try {
            const response = axios.post(REGISTER_URL,
                JSON.stringify({
                    "username" : username,
                    "emailID" : emailID,
                    "password" : password,
                    "phoneNumber" : phoneNumber
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            setUsername('');
            setPassword('');
            setPhoneNumber('');
            setEmailID('');
            setSuccess(true);
            navigate('/login', { state: { from: location }, replace: true });
        } catch (e) {
            console.log(e);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }

    return(
            <div className="reglogin">
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <button type = "button" className = "toggle-btn"><Link to = "/login">Sign In</Link></button>
                    </p>
                </section>
            ) : (
    
                <div className = "cover">
                <div className = "form-box">
                <div class="button-box">
                    <div id="btn"></div>
                    <button type="button" className="toggle-btn">Register</button>
                </div>
                <form className = "input-group" onSubmit={handleSubmit}>
                    <input type="text" className="input-field" onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                    <input type="email" className="input-field" onChange={(e) => setEmailID(e.target.value)} placeholder="Email ID" required />
                    <input type="password" className="input-field" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                    <input type="tel" className="input-field" onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" required />
                    <button type="submit" className="submit-btn">Register</button>
                </form>
                </div>
                </div>
  
            )}
            </div>
    )
}

export default Register