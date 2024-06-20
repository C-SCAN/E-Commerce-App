import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import qs from "qs"
import "../css/register.css"

import axios from '../api/axios';
const LOGIN_URL = '/api/user/login';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                qs.stringify({ emailID: user, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
                    withCredentials: true
                }
            );
                console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.access_token;
            const roles = response?.data?.roles;
            console.log(response?.data?.roles);
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (

        <div className="reglogin">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <div>
        <title>Login</title>
        <link rel="stylesheet" href="login.css" />
        <div className="cover">
          <div className="form-box">
            <div className="button-box">
              <div id="btn" />
              <button type="button" className="toggle-btn">Login</button>
            </div>
            <form className="input-group" id = "login" onSubmit={handleSubmit}>
                <label htmlFor="emailID">Email ID:</label>
                <input
                    className="input-field"
                    type="text"
                    id="emailID"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    className="input-field"
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button type = "submit" className = "submit-btn">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    
        </div>

    )
}

export default Login
