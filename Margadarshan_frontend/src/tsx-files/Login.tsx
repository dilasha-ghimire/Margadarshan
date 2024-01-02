import '../css-files/login.css'
import { Link } from "react-router-dom"
import axios from 'axios'
import { useState } from 'react'

function Login() {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const[rememberMe, setRememberMe] = useState(false);

    const handleLogin = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/api/login", {
                email, password
            });

            // const token = response.data.token;
            if(response.data.success) {
                console.log("Login successful!");
            }
            else {
                console.log("Login failed")
            }   
        }

        catch(err) {
            if (err.response && err.response.status === 401) {
                setEmailError('*Invalid email address');
                setPasswordError('*Invalid password');
            } 
            else {
                // Other error (e.g., network issue)
                setEmailError('Error logging in');
            };
        }
    }

    return (
        <>
            <div className="login-page">
                <div className="left-sec-login">
                    <div className="website-title-login">
                        <p className="margadarshan-login">MARGADARSHAN</p>
                        <p className="gyansarathi-login">by GyanSarathi</p>
                    </div>
                    <img className="login-img" src="src\assets\Registration\margadarshan.png"></img>
                </div>

                <div className='right-sec-login'>
                    <div className='page-heading-login'>
                        <p className='login-title'>LOGIN</p>
                        <p className='login-welcome'>Welcome back!</p>
                        <p className='login-to-account'>Please login to your account</p>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className='user-input-login'>
                            <input className='email-txtfld-login' placeholder='Enter your email address' value={email} onChange={(e) => {setEmail(e.target.value); setEmailError("");}}></input>
                            
                            <input className='password-txtfld-login' type='password' placeholder='Enter your password' value={password} onChange={(e) => {setPassword(e.target.value); setPasswordError("")}}></input>
                            {/* {passwordError && <p className='error-message'>{passwordError}</p>} */}
                        </div>

                        <div className='remember-forgot-login-container'>
                            <input type='checkbox' checked={rememberMe} onChange={() => setRememberMe(!rememberMe)}></input>
                            <label className='remember-login'>Remember me</label>
                            <p className='forgot-password-login'>Forgot password</p>
                        </div>

                        <div className='login-btn-container'>
                            <Link to="/register"><button className='signup-login'>Sign up</button></Link>
                            <button className='login-btn-login'>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login