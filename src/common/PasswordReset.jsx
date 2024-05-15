import {useState } from 'react'
import loginBg from '../assets/login-bg.png'
import { useParams, Link,useNavigate } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Axios from 'axios'
import { verifyPasswordResetLink,resetPassword } from '../api/api';

export function PasswordReset() {
    const navigate = useNavigate();
    const { userId, token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    async function verifyPasswordResetLink() {
            try {
                await verifyPasswordResetLink(userId, token);
            } catch (error) {
                navigate("/login"); 
            }
        };
        verifyPasswordResetLink();


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return;
        }
        try {
            await resetPassword(userId, token, password);
            alert("Password reset successfully");
            navigate("/login")
        } catch (error) {
            console.error("Error resetting password:", error);
        }
    };
    return (
        <div className = "min-h-screen min-w-screen bg-[#e1eacd] text-[rgba(49, 49, 49, 1)] font-inter flex">
            <div className = "w-[600px] min-w-[600px] min-h-[585.33px] flex-auto flex flex-col justify-center items-center pt-30">
                <img src = {loginBg} 
                alt="Login Background" 
                id='login-bg-logo' 
                className="w-[357px] h-[357px] rounded-full mb-8"></img>
                <div className="flex flex-col items-center">
                    <h2>Welcome to Chamo!</h2>
                    <p>Enter your email and password to continue.</p>
                </div>
            </div>
            <div className="flex-auto w-[100px] min-w-[380px] min-h-[585.33px] flex flex-col justify-center items-center bg-[#313131] text-[#BED292]">
                <form className='flex flex-col items-start gap-[15px] w-[310px]' onSubmit={handleSubmit}>
                    <h1 className="font-normal font-extrabold text-[48px] mb-[70px] mt-[-75px]">Reset Password</h1>
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        autoComplete='new-password'
                        required
                        placeholder='New Password'
                        className='min-w-[260px] p-[8px] rounded-[5px] focus:outline-none bg-stone-800 text-gray-300'
                    />
                    <input
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        type="password"
                        autoComplete='new-password'
                        required
                        placeholder='Confirm New Password'
                        className='min-w-[260px] p-[8px] rounded-[5px] focus:outline-none bg-stone-800 text-gray-300'
                    />
                    <button className="min-w-[260px] min-h-[40px] rounded-[5px] bg-[#E1EACD] text-[#313131] font-bold hover:bg-[#c8dcaa]">
                        Reset Password
                    </button>
                    <Link to="/login">Return to Login</Link>
                </form>
            </div>
        </div>
    );
}