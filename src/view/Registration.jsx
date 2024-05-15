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
  const [darkMode, setDarkMode] = useState(false); 

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

    const toggleDarkMode = () => { 
        setDarkMode(!darkMode);
    }

   
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
    <div className={`${darkMode && "dark"}`}>  
        <div className='bg-med-green dark:bg-light-green'>
            <div className='flex items-start'> 
                <Toaster richColors/>
                <div className='w-7/12 h-sceen bg-med-green dark:bg-light-green m-1 p-4'/>
                <div className='flex-col w-5/12 h-screen m-auto bg-gray-100 dark:bg-dark-grey p-8 border border-gray-400 dark:border-transparent  overflow-scroll'> {/* container (form)*/}
                    <section className="flex flex-col items-center gap-2 w-auto mt-8">
                        <div className="text-dark-green dark:text-med-green text-5xl font-bold p-1">Sign Up</div> 
                        <div className="w-16 h-1.5 mt-3 bg-dark-green dark:bg-med-green rounded-lg"></div> 
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
                        <section className="flex flex-col items-center justify-center gap-4 m-[40px] overflow-auto"> {/* submit container*/}
                            <button type="submit" 
                                 onClick={() => {
                                    validateForm()
                                  }}
                            className="btn-create">
                                Create Account
                            </button>
                            <a className="text-dark-green dark:text-med-green justify-center" href="/login">Already have an account?</a>
                            <a className="text-dark-green dark:text-med-green justify-center" href="/privacy">Privacy Policy</a>
                            <p className='text-black dark:text-white text-xs'>By creating an account, you are agreeing to our privacy policy.</p>
                        </section> 
                    </form>
                </div>
            </div>
        </div> 
    </div> 
  )
}

export default Registration;
