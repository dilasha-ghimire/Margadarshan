import '../css-files/login.css'
import { Link } from "react-router-dom"

function Login() {
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

                    <div className='user-input-login'>
                        <input className='email-txtfld-login' placeholder='Enter your email address'></input>
                        <input className='password-txtfld-login' placeholder='Enter your password'></input>
                    </div>

                    <div className='remember-forgot-login-container'>
                        <input type='checkbox'></input>
                        <label className='remember-login'>Remember me</label>
                        <p className='forgot-password-login'>Forgot password</p>
                    </div>

                    <div className='login-btn-container'>
                        <Link to="/register"><button className='signup-login'>Sign up</button></Link>
                        <button className='login-btn-login'>Login</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login