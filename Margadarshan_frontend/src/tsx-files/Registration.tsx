import { useMutation } from 'react-query';
import '../css-files/register.css'
import {useForm} from "react-hook-form";
import axios from 'axios';

function Registration() {
    const saveData = useMutation({
        mutationKey:"SAVEDATA",
        mutationFn: (requestData:any) => {
            console.log(requestData)
            return axios.post("http://localhost:8080/api/students", requestData)
        }
    });

    const {register, 
        handleSubmit,
    formState} = useForm();

    const {errors} = formState;

    const onSubmit=(values:any) :void => {
        saveData.mutate(values);
    }

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
                        <input className='text-field-name' type='text' placeholder='Full Name' {...register("full_name", {required: "*Full name is required"})}></input>
                        <p style={{ color: 'red', fontSize: 11, marginBottom: -10}}>{errors?.full_name?.message}</p>

                        <input className='text-field-address' type='text' placeholder='Full Address' {...register("address", {required: "*Full address is required"})}></input>
                        <p style={{ color: 'red', fontSize: 11, marginBottom: -10}}>{errors?.address?.message}</p>

                        <input className='text-field-number' type='text' placeholder='Mobile Number' {...register("number", {required: "*Mobile number is required"})}></input>
                        <p style={{ color: 'red', fontSize: 11, marginBottom: -10}}>{errors?.number?.message}</p>

                        <input className='text-field-email' type='text' placeholder='Email Address' {...register("email", {required: "*Email address is required"})}></input>
                        <p style={{ color: 'red', fontSize: 11, marginBottom: -10}}>{errors?.email?.message}</p>

                        <div className='password-text-fields'>
                            <input className='text-field-password' type='password' placeholder='Password' {...register("password", {required: "*Password is required"})}></input>
                            <input className='text-field-rePassword' type='password' placeholder='Re-enter your password'></input>
                        </div>
                        <p style={{ color: 'red', fontSize: 11, marginBottom: -10, display: 'block'}}>{errors?.password?.message}</p>
        
                    </div>
                    <button type="submit" className='register-button'>Create Account</button>
                </form>

                <div className='button-container'>
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