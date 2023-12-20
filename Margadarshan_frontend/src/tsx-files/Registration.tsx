import '../css-files/register.css'

function Registration() {
    return (
        <>
        <div className='main-section'>
            <div className="left-section">
                <div className="website-title">
                    <p className="margadarshan">MARGADARSHAN</p>
                    <p className="gyansarathi">by GyanSarathi</p>
                </div>
                <div className="website-img-container">
                    <img className="website-img" src="src\assets\Registration\margadarshan.png"></img>
                </div>
            </div>

            <div className="right-section">
                <div className="page-title">
                    <p className='main-title'>REGISTER</p>
                    <p className='subtitle'>Please fill in your details.</p>
                </div>
                <form>
                    <div className='user-input'>
                        <input className='text-field-name' type='text' placeholder='Full Name'></input>
                        <input className='text-field-address' type='text' placeholder='Full Address'></input>
                        <input className='text-field-number' type='text' placeholder='Mobile Number'></input>
                        <input className='text-field-email' type='text' placeholder='Email Address'></input>
                        <div className='password-text-fields'>
                            <input className='text-field-password' type='password' placeholder='Password'></input>
                            <input className='text-field-rePassword' type='password' placeholder='Re-enter your password'></input>
                        </div>
                    </div>
                </form>
                <div className='button-container'>
                    <button className='register-button'>Create Account</button>
                    <div className='login-container'>
                        <p className='already-account'>Already have an account?</p>
                        <p className='login'>Login</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Registration