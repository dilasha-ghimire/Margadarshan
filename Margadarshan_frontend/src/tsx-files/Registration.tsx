import '../css-files/register.css'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { useEffect } from "react";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function Registration() {
    const [password, setPassword] = useState('');
    const [isUpperCase, setIsUpperCase] = useState(false);
    const [isNumber, setIsNumber] = useState(false);
    const [isSpecialChar, setIsSpecialChar] = useState(false);
    const [isLengthValid, setIsLengthValid] = useState(false);

    useEffect(() => {
        document.title = "Registration | Margadarshan"
    }, [])

    const navigate = useNavigate();

    const saveData = useMutation({
        mutationKey: "SAVE DATA",
        mutationFn: (requestData: any) => {
            console.log(requestData)
            return axios.post("http://localhost:8080/api/save-student", requestData);
        },

        onSuccess: () => {
            navigate("/login");
        }
    });

    const { register,
        handleSubmit,
        formState } = useForm();

    const { errors } = formState;

    const onSubmit = (value: any): void => {
        saveData.mutate(value);
    }

    const checkPasswordStrength = (password) => {
        const minLength = 8;

        const isLengthValid = password.length >= minLength;
        setIsLengthValid(isLengthValid);

        const uppercaseRegex = /[A-Z]/;
        setIsUpperCase(uppercaseRegex.test(password));

        const numberRegex = /\d/;
        setIsNumber(numberRegex.test(password));

        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        setIsSpecialChar(specialCharRegex.test(password));
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        checkPasswordStrength(newPassword);
    };

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

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='user-input'>
                            <input className='text-field-name' type='text' placeholder='Full Name' {...register("studentFullName", { required: "*Full name is required" })}></input>
                            <p style={{ color: 'red', fontSize: 11, marginBottom: -10 }}>{errors?.studentFullName?.message}</p>

                            <input className='text-field-address' type='text' placeholder='Full Address' {...register("studentAddress", { required: "*Full address is required" })}></input>
                            <p style={{ color: 'red', fontSize: 11, marginBottom: -10 }}>{errors?.studentAddress?.message}</p>

                            <input className='text-field-number' type='text' placeholder='Mobile Number' {...register("studentNumber", { required: "*Mobile number is required" })}></input>
                            <p style={{ color: 'red', fontSize: 11, marginBottom: -10 }}>{errors?.studentNumber?.message}</p>

                            <input className='text-field-email' type='text' placeholder='Email Address' {...register("studentEmail", { required: "*Email address is required" })}></input>
                            <p style={{ color: 'red', fontSize: 11, marginBottom: -10 }}>{errors?.studentEmail?.message}</p>

                            <div className='password-text-fields'>
                                <input className='text-field-password' type='password' placeholder='Password' {...register("studentPassword", { required: "*Password is required" })} onChange={handlePasswordChange}></input>
                                <input className='text-field-rePassword' type='password' placeholder='Re-enter your password'></input>
                            </div>
                            <p style={{ color: 'red', fontSize: 11, marginBottom: -10, display: 'block' }}>{errors?.studentPassword?.message}</p>

                            <div className='password-strength'>
                                <p className={`password-strength-item ${isLengthValid ? 'green' : 'red'}`}>
                                    {isLengthValid ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faXmark} />} Minimum 8 characters
                                </p>
                                <p className={`password-strength-item ${isUpperCase ? 'green' : 'red'}`}>
                                    {isUpperCase ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faXmark} />} At least one uppercase letter
                                </p>
                                <p className={`password-strength-item ${isNumber ? 'green' : 'red'}`}>
                                    {isNumber ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faXmark} />} At least one number
                                </p>
                                <p className={`password-strength-item ${isSpecialChar ? 'green' : 'red'}`}>
                                    {isSpecialChar ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faXmark} />} At least one special character
                                </p>
                            </div>

                        </div>
                        <button type="submit" className='register-button'>Create Account</button>
                    </form>
                    <div className='login-container'>
                        <p className='already-account'>Already have an account?</p>
                        <Link to="/login"><p className='login'>Login</p></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Registration