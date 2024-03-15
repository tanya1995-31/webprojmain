import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react'
import AuthContext from "../context/AuthProvider"
import axios from '../api/axios'
import Header from './Header'

const LOGIN_URL = 'http://localhost:5000/api/login';

const Login = () => {

    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

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
                JSON.stringify({ username: user, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            ); 
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);

        } catch (err) {
            if(!err?.response) {
                setErrMsg('No Server Response');
            } else if(err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401){
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus(); // set the focus on this error
        }
    }

    return (
        <>
            <div>
                <Header header='Sign In to Books Club'/>
            </div>
            {success ? (
                    <section>
                        <h1>You are logged in!</h1>
                        <br />  
                        <p>
                            <a href="/">Go to Home</a>
                        </p>
                    </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} 
                    aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>     
                        <input 
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />     
                        <label htmlFor="password">Password:</label>     
                        <input 
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />     
                        <button>Sign In</button>
                        <p>
                            Need an Account?<br />
                            <span className='line'>
                                {/* PUT LINK TO SIGN IN PAGE */}
                                <a href='/signup'>Sign Up</a> 
                            </span>
                        </p>
                    </form>
                </section>
            )}
        </>
    )
}

export default Login