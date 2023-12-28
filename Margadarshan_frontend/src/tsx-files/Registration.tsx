import '../css-files/register.css'
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useMutation} from "react-query";
import axios from "axios";

function Registration() {

    const saveData=useMutation({
        mutationKey:"SAVE DATA",
        mutationFn:(requestData:any)=>{
            console.log(requestData)
            return axios.post("http://localhost:8080/api/save-student",requestData)
        }
    });

    const {register,
    handleSubmit, 
    formState} = useForm();

    const {errors}=formState;
    
    const onSubmit = (value:any) :void => {
        saveData.mutate(value);
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
                        <input className='text-field-name' type='text' placeholder='Full Name' {...register("studentFullName", {required: "*Full name is required"})}></input>
                        <p style={{ color: 'red', fontSize: 11, marginBottom: -10}}>{errors?.full_name?.message}</p>

                        <input className='text-field-address' type='text' placeholder='Full Address' {...register("studentAddress", {required: "*Full address is required"})}></input>
                        <p style={{ color: 'red', fontSize: 11, marginBottom: -10}}>{errors?.address?.message}</p>

                        <input className='text-field-number' type='text' placeholder='Mobile Number' {...register("studentNumber", {required: "*Mobile number is required"})}></input>
                        <p style={{ color: 'red', fontSize: 11, marginBottom: -10}}>{errors?.number?.message}</p>

                        <input className='text-field-email' type='text' placeholder='Email Address' {...register("studentEmail", {required: "*Email address is required"})}></input>
                        <p style={{ color: 'red', fontSize: 11, marginBottom: -10}}>{errors?.email?.message}</p>

                        <div className='password-text-fields'>
                            <input className='text-field-password' type='password' placeholder='Password' {...register("studentPassword", {required: "*Password is required"})}></input>
                            <input className='text-field-rePassword' type='password' placeholder='Re-enter your password'></input>
                        </div>
                        <p style={{ color: 'red', fontSize: 11, marginBottom: -10, display: 'block'}}>{errors?.password?.message}</p>
        
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