import React from 'react'
import { useState } from 'react'
import NavBar from '../../components/NavBar'
import ProfileMenu from '../../common/ProfileMenu'
import Help from './Help'
import FAQ from './FAQ'
import Blocklist from './Blocklist'

function Settings() {
  const [activeComponent, setActiveComponent] = useState('help'); // Initial active component

  const handleNavClick = (componentName) => {
    setActiveComponent(componentName);
  };
  //<button className='block font-light py-2' onClick={() => handleNavClick('blocklist')}>Blocklist</button>
  return (
    <div className='bg-gray-100 dark:bg-zinc-700 relative overflow-hidden'>
      <NavBar />
      
      <div className='flex items-start mb-4 p-8'>
        <div className='text-dark-grey dark:text-slate-200 bg-gray-100 dark:bg-zinc-700 flex-col items-center w-1/4 h-screen inset-y-32 left-0 text-3xl px-5'>
          <h1 className='text-dark-grey dark:text-slate-200 text-4xl pb-5'>Settings</h1>
          <button className='block font-light py-2 ' onClick={() => handleNavClick('profile')}>Profile Menu</button>
          <button className='block font-light py-2' onClick={() => handleNavClick('help')}>Help</button>
          <button className='block font-light py-2' onClick={() => handleNavClick('faq')}>FAQ</button>
          
        </div>
        <div className='flex-col w-3/4 h-screen bg-gray-200 dark:bg-dark-grey p-10 rounded-lg content-between space-y-10 overflow-scroll scroll-smooth'>  {/* right container body*/}
          {activeComponent === 'help' && <Help />}
          {activeComponent === 'profile' && <ProfileMenu />}
          {activeComponent === 'faq' && <FAQ />}
          {activeComponent === 'blocklist' && <Blocklist />}
        </div>
      </div>
      
    </div>
  )
}

export default Settings