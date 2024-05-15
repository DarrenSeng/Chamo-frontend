import React, { useState } from 'react'; 
import { Toaster, toast } from 'sonner';
import axios from 'axios' 
import { registerUser } from '../api/api';


export const Registration = () => {

  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [username, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const register = async (e) => {
    e.preventDefault();
    try {
      const userData = { firstName, lastName, username, email, password };
      await registerUser(userData);
      toast.success('User registered successfully!');
    } catch (error) {
      toast.error(error.message);
    }
  };
   
   var Filter = require('bad-words'),
   filter = new Filter();
   filter.addWords('bullshit');
    function validateForm() {
       let checkFirstName = filter.isProfane(firstName);
       let checkLastName = filter.isProfane(lastName);
       let checkUsername = filter.isProfane(username);
       if (checkFirstName || checkLastName || checkUsername) {
        alert('Bad word detected. Please change it.')  
        return
       }
          
    }

  return (
    <div className='flex justify-center items-center h-screen bg-[#E1EACC] overflow-auto'>
        <Toaster richColors/>
        <section className='absolute -right-0 flex flex-col m-auto ml-16 h-screen w-[750px] bg-[#313131] p-8 pb-32 '>
            <section className="flex flex-col items-center gap-2 w-auto mt-8">
                <div className="text-[#BED292] text-5xl font-bold p-1">Sign Up</div>
                <div className="w-16 h-1.5 mt-3 bg-[#BED292] rounded-lg"></div> 
            </section>

            <form onSubmit={register}>
                <section className="mt-14 flex flex-col items-center gap-6 p-1 overflow-auto"> 
                    <div className='inputLabelField'>
                        <label className="label-input"> 
                            <strong>First Name</strong><br/>
                        </label>
                        <div className=""> 
                            <input type="text"
                            name='firstName'
                            placeholder="First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                            className="flex items-center m-auto w-[310px] h-[50px] bg-[#eaeaea] rounded-md p-[14px] focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className='inputLabelField'>
                        <label className="label-input"> 
                            <strong>Last Name</strong><br/>
                        </label>
                        <div className="input">
                            <input type="text"
                            name='lastName'
                            placeholder="Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                            className="flex items-center m-auto w-[310px] h-[50px] bg-[#eaeaea] rounded-md p-[14px] focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className='inputLabelField'>
                        <label className="label-input"> 
                            <strong>Email</strong><br/>
                        </label>
                        <div className="input">
                            <input type="email"
                            name='email'
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex items-center m-auto w-[310px] h-[50px] bg-[#eaeaea] rounded-md p-[14px] focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className='inputLabelField'>
                        <label className="label-input">
                            <strong>Username</strong><br/>
                        </label>
                        <div className="input">
                            <input type="text" 
                            name='userName'
                            placeholder="Username"
                            onChange={(e) => setName(e.target.value)}
                            className="flex items-center m-auto w-[310px] h-[50px] bg-[#eaeaea] rounded-md p-[14px] focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className='inputLabelField'>
                        <label className="label-input">
                            <strong>Password</strong><br/>
                        </label>
                        <div className="input">
                            <input type="password" 
                            name='password'
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="flex items-center m-auto w-[310px] h-[50px] bg-[#eaeaea] rounded-md p-[14px] focus:outline-none"
                            />
                        </div>
                    </div>
                </section>
                <section className="flex flex-col items-center justify-center gap-[20px] m-[60px] overflow-auto">
                    <button type="submit" 
                     onClick={() => {
                        validateForm()
                      }}
                    className="flex items-center justify-center w-[220px] h-[59px] text-[#313131] bg-[#E1EACD] rounded-[50px] text-xl font-bold cursor-pointer">
                        Create Account
                    </button>
                    <a className="text-[#BED292] justify-center" href="/login">Already have an account?</a>
                    <a className="text-[#BED292] justify-center" href="/privacy">Privacy Policy</a>
                    <p className='text-white text-xs'>By creating an account, you are agreeing to our privacy policy.</p>
                </section>
            <section className="flex flex-col items-center justify-center gap-[20px] m-[60px] overflow-auto">
                <a className="text-[#BED292] justify-center" href="/login">Already have an account?</a>      
            </section>

            </form>

            
        </section>
        
       
    </div>
  )
}

export default Registration;
