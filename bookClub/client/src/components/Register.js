import React from 'react'
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import Header from './Header';

// User name is between 4-24 chars, first is a letter others letters/numbers/-/_
const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;

// Password required at least: 1 lower case letter, 1 upper case letter, 1 number, and 1 symbol
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

// Email required example@email.___ 
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const REGISTER_URL = 'http://localhost:5000/api/register';

const Register = () => {

    const userRef = useRef();
    const errRef = useRef();
    
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false); // check if the username is valid or not
    const [userFocus, setUserFocus] = useState(false); // focus on that input field or not
    
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false); // check if the password is valid or not
    const [pwdFocus, setPwdFocus] = useState(false); // focus on that input field or not
    
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false); // check if the matching password is valid or not
    const [matchFocus, setMatchFocus] = useState(false); // focus on that input field or not
    
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false); // check if the matching password is valid or not
    const [emailFocus, setEmailFocus] = useState(false); // focus on that input field or not
    
    const [errMsg, setErrMsg] = useState(''); // error message if there os an error
    const [success, setSuccess] = useState(false); // check if successfuly submit the registration

    useEffect(() => {
        userRef.current.focus(); // focus on the username input
    }, [])
    
    // useEffect hook for handling side effects in functional components.
    useEffect(() => {
        const result = USER_REGEX.test(user); // Test the current 'user' value against the USER_REGEX pattern.
        setValidName(result);
    }, [user]) // Dependency array: This effect runs after the first render and anytime the 'user' value changes.
    
    // useEffect hook for handling side effects in functional components.
    useEffect(() => {
        const result = PWD_REGEX.test(pwd); // Test the current 'password' value against the USER_REGEX pattern.
        setValidPwd(result);
        const match = pwd === matchPwd; // check if the password is equal to the matching password
        setValidMatch(match);
        }, [pwd, matchPwd]) // Dependency array: This effect runs after the first render and anytime the 'pwd or matchPwd' value changes.
        
        // If we displayed an error message, so after a change of on of these 3 inputs, the error message will removed.
    useEffect(() => {
            setErrMsg('');
    }, [user, pwd, matchPwd]) 
  
    useEffect(() => {
        const result = EMAIL_REGEX.test(email); // Test the current 'email' value against the EMAIL_REGEX pattern.
        setValidEmail(result); // Corrected from setValidName to setValidEmail
    }, [email])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isUsernameValid = USER_REGEX.test(user);
        const isPasswordValid = PWD_REGEX.test(pwd);
        const isEmailValid = EMAIL_REGEX.test(email);
        if (!isUsernameValid || !isPasswordValid || !isEmailValid) {
            setErrMsg("Invalid Entry");
            return;
        }  
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ username: user, password: pwd, email: email }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response.data);
            console.log(response.accessToken);
            console.log(JSON.stringify(response));
            setSuccess(true);
            setUser('');
            setPwd('');
            setMatchPwd('');
            setEmail('');
        } catch (err) {
            if(!err?.response) {
                setErrMsg('No Server Response');
            } else if(err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Regestration Failed');
            }
            errRef.current.focus(); // set the focus on this error
        }
    }
  
    return (
        <>
            <div>
                <Header header='Sign Up to Books Club'/>
            </div>
            {success ? (
                    <section>
                        <h1>Success!</h1>
                        <p>
                            <Link to="/signin">Sign In</Link>
                        </p>
                        <br />
                        <p>
                            <Link to="/">Home</Link>
                        </p>
                    </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username: 
                            <span className={validName ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validName || !user ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input 
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby='uidnote'
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id='uidnote' className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle } />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <label htmlFor="password">
                            Password:
                            <span className={validPwd ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validPwd || !pwd ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: 
                            <span aria-label="exclamation mark">!</span> 
                            <span aria-label="at symbol">@</span>
                            <span aria-label="hashtag">#</span>
                            <span aria-label="dollar sign">$</span>
                            <span aria-label="percent">%</span>
                        </p>

                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <span className={validMatch && matchPwd ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <label htmlFor="email">
                            Email:
                            <span className={validEmail ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validEmail || !email ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input 
                            type="email"
                            id="email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-invalid={!validEmail ? "false" : "true"}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="emailnote" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                            Must be a valid email address.
                        </p>


                        <button disabled={!validName || !validPwd || !validMatch ? true : false}>
                            Sign Up
                        </button>
                        <p>
                            Already Registered?<br />
                            <span className='line'>
                                {/* Move to Sign In page after registered success */}
                                <Link to="/signin">Sign In</Link> 
                            </span>
                        </p>
                    </form>
                </section>
            )}
        </>
    )
}

export default Register