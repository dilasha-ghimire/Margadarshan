import '../css-files/login.css'
import { Link } from "react-router-dom"
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {

    useEffect(() => {
        document.title = "Login | Margadarshan"
    }, [])

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/login', {
                email,
                password,
                
            });

            console.log('Response:', response.data);
            const { message, status } = response.data;

            if (status) {
                console.log('Login successful!');
                navigate('/mainhomepage');
            } else {
                console.log('Login failed');
                console.log(message)
                if (message === 'password does not match') {
                    setPasswordError('*Password does not match');
                } else if (message === 'email does not exist') {
                    setEmailError('*Email does not exist');
                } else {
                    setEmailError('*Email does not exist');
                    setPasswordError('*Password does not match');
                }
            }
        } catch (err) {
            console.error('Error during login:', err.message);
        }
    };

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
                            <div className='email-container-login'>
                                <input className='email-txtfld-login' placeholder='Enter your email address' value={email} onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}></input>
                                {emailError && <p className='error-message-email'>{emailError}</p>}
                            </div>

                            <div className='password-container-login'>
                                <input className='password-txtfld-login' type='password' placeholder='Enter your password' value={password} onChange={(e) => { setPassword(e.target.value); setPasswordError("") }}></input>
                                {passwordError && <p className='error-message-password'>{passwordError}</p>}
                            </div>
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