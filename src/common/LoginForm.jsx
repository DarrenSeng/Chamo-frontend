import { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi'; 
import { useNavigate } from 'react-router-dom'
import { loginUser,sendPasswordResetLink } from '../api/api';
import cookies from "js-cookie";

import loginBg from '../assets/login-bg.png'

export function LoginForm() {
  const [ authUser, setAuthUser ] = useState(cookies.get('user'));
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [forgotPasswordMode, setForgotPasswordMode] = useState(false);  
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault() 
        if(!forgotPasswordMode) { 
            if (!validateEmail(email)) {
                return; 
            }
            try {
                const response = await loginUser(email, password);
                console.log("res",response.data)
                if (response != null) {
                    cookies.set("user",response.data.userID, {expires:7})
                    const data = response.data
                    const isLoggedIn = data.isLoggedIn
                    if (isLoggedIn) {
                        setAuthUser(data.userID)
                        navigate("/explore")
                    }
                    } else {
                        setErrorMessage("Login Failed");
                    }
                    console.log("after nav")
            } catch (error) {
            }
        } else { //button changes its fetch call depending on if we're in forgetpasswordmode or not
            try {
                const response = await sendPasswordResetLink(email);
                if (response.ok) {
                    alert("Password Rest Link Sent")
                } else {
                }
            } catch (error) {
                console.log("Error: ",error)
            }
        }
        };

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const handleLogAuthUser = () => {
    };

    return (
        <div className = "min-h-screen min-w-screen bg-med-green dark:bg-light-green text-[rgba(49, 49, 49, 1)] font-inter flex">
        <div className = "w-[600px] min-w-[600px] min-h-[585.33px] flex-auto flex flex-col justify-center items-center pt-30">
        <img src = {loginBg}  alt="Login Background" id='login-bg-logo' 
        className="w-[357px] h-[357px] rounded-full mb-8"></img>
        <div className="flex flex-col items-center">
            <h2>Welcome to Chamo!</h2>
            <p>Enter your email and password to continue.</p>
        </div>
        </div>
        <div className="flex-auto w-[100px] min-w-[380px] min-h-[585.33px] pl-[30px] flex flex-col justify-center items-center bg-gray-100 dark:bg-dark-grey text-dark-green dark:text-med-green border-gray-400 dark:border-transparent">
            <form className='flex flex-col items-start gap-[15px] w-[310px]' onSubmit={handleSubmit}>
                <h1 className="font-normal font-extrabold text-[64px] mb-[70px] mt-[-75px]">Chamo</h1>
                {forgotPasswordMode && (
                    <div className='flex items-start flex-row'>
                        <button
                            className="hover:text-[#a6b78c] mt-[-8px] mb-[8px]  ml-[-20px] pr-[4px] pb-[8px] 
                            text-[14px] bg-transparent border-none outline-none "
                            onClick={() => setForgotPasswordMode(false)}
                            ><FiArrowLeft size={20}/></button>
                    <p className="hover:text-[#a6b78c] mt-[-8px] pr-[50px] text-[14px]">
                        Enter your email address and click the button to receive an email to reset your password.
                        </p>
                    </div>
                )}
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    autoComplete='email'
                    required
                    placeholder='Email'
                    className='min-w-[260px] p-[8px] rounded-[5px] focus:outline-none bg-[#eaeaea] dark:bg-stone-800  text-gray-300'
                /> 
                {!forgotPasswordMode && (
                    <input
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    autoComplete='current-password'
                    required
                    className='min-w-[260px] p-[8px] rounded-[5px] focus:outline-none bg-[#eaeaea] dark:bg-stone-800  text-gray-300'
                    />
                )
                }
                <button onClick={handleLogAuthUser} className="min-w-[260px] min-h-[40px] rounded-[5px] bg-[#E1EACD] text-[#313131] font-bold hover:bg-[#c8dcaa]">
                    {forgotPasswordMode ? "Reset Password" : "Login"}</button>
                    {errorMessage && !forgotPasswordMode && <p className="text-red-500 my-[-8px]">{errorMessage}</p>}
                {!forgotPasswordMode && (
                    <a className="hover:text-[#a6b78c] my-[-8px]" href = "#" 
                    onClick={()=> setForgotPasswordMode(true)}>Forgot Password?</a>
                )}
                <a className="hover:text-[#a6b78c] my-[-4px]" href="/sign-up" >Don't have an account? Create Now</a>
            </form>
        </div>
        </div>
    )
}