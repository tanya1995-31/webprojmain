import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react'
import AuthContext from "../context/AuthProvider"
import axios from '../api/axios'
import Header from './Header'
import { useNavigate } from 'react-router-dom';

const LOGIN_URL = '/api/login';

const Login = () => {
    
    const navigate = useNavigate();
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
           
            // Update the auth state with the username and accessToken
            setAuth({ user: response.data.username });
            // Reset the form fields
            setUser('');
            setPwd('');
            // Indicate that login was successful
            setSuccess(true);
            // Redirect the user to the home page
            navigate('/');

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
                <Header header='Sign In'/>
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
                            className="text-black"
                        />     
                        <label htmlFor="password">Password:</label>     
                        <input 
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            className="text-black"
                        />     
                        <button
                            type="submit"
                            className="border-2 border-black text-white hover:bg-black hover:text-white font-bold py-1 px-3 rounded-full transition duration-300 mt-2">                                
                             Sign In
                        </button>
                        <p>
                            Need an Account?<br />
                            <span className='line'>
                                {/* LINK TO SIGN IN PAGE */}
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