import React, { useState } from 'react'; 

export const PrivacyPolicy = () => {
  const [darkMode, setDarkMode] = useState(false);

  // this is the function for toggling dark mode, connecting dark mode toggle variable to the state.
  const toggleDarkMode = () => { 
    setDarkMode(!darkMode);
  }

  return (
    //NOTE -- in tailwind, darkMode styling is defined in their class styles.
    <div className={`${darkMode && "dark"}`}> 
      <div className='bg-gray-100 dark:bg-light-grey'> 
        <nav className='h-16 w-auto bg-dark-grey items-center mb-8 p-4 pl-5'>
          <a className='text-med-green text-2xl font-bold h-8 w-auto p-4 ' href="/sign-up">Chamo</a>
        </nav> 

        <div className='inset-0 mx-auto max-w-7xl px-6 lg:px-8 p-8'>  
            <div className="">
                <h2 class="text-3xl font-bold tracking-tight text-gray-800 dark:text-white sm:text-6xl">Privacy Policy</h2>
                <p class="mt-6 text-lg leading-8 text-gray-500 dark:text-gray-300">This is our privacy which outlines what information we collect, why we collect it, and how we use it to give you the best experience on our app. </p>
                <p class="text-sm italic leading-8 text-dark-grey dark:text-gray-300">Effective March 9, 2024</p>
                <p class="text-sm italic leading-8 text-dark-grey dark:text-gray-300">Last Updated: March 9, 2024</p>
              </div>
        </div>
        
        <div className='flex items-start mb-4 p-8'> 
          
          <div className='flex-col items-center w-1/4 h-sceen bg-transparent text-gray-600 dark:text-white m-1 p-4'> {/*left container toc*/}
          
            <ol className='space-y-2 text-lg'>
              <li className='nav-toc-h1'><a href='#overview'>Overview</a></li>
              <li className='nav-toc-h1'><a href='#collect'>What We Collect</a></li>
                <ul className=''>
                  <li className='nav-toc-h2'><a href='#collect---info-shared'> Info You Share</a></li>
                  <li className='nav-toc-h2'><a href='#collect---info-app'>Info When Using the App</a></li>
                </ul>
              <li className='nav-toc-h1'><a href='#use'>How We Use It</a></li>
                <ul>
                  <li className='nav-toc-h2'><a href='#use---operate'>To operate the app</a></li>
                  <li className='nav-toc-h2'><a href='#use---safety'>To maintain safety and security</a></li>
                  <li className='nav-toc-h2'><a href='#use---communicate'>To communicate with you</a></li>
                </ul>
              <li className='nav-toc-h1'><a href='#disclose'>How we disclose your information</a></li>
                <ul>
                  <li className='nav-toc-h2's><a href='#disclose---does-not'>Chamo doesn’t.</a></li>
                </ul>
            </ol>
          </div>

          
          <div className='flex-col w-3/4 h-screen bg-gray-200 dark:bg-dark-grey p-10 rounded-lg content-between space-y-10 overflow-scroll scroll-smooth'>  {/* right container body*/}
              
              <h2 id='overview' className='h2'>Overview</h2>
                <sub className='subtitle'>This is our privacy which outlines what information we collect, why we collect it, and how we use it to give you the best experience on our app. </sub>
              <h2 id='collect' className='h2'>What We Collect</h2>
                <sub className='subtitle'>We collect information, including info you choose to share with us and info while you’re using our app.</sub>
                <div className='space-y-4'> 
                  <h3 id='collect---info-shared' className='h3'>Info You Share</h3>
                    <p className='p'>
                      We collect the information that you share with us when creating an account. Account creation includes providing us with your first, last name, and email address.
                      When you've created an account, you're able to customize your profile by adding a profile picture, biography, and custom tags.
                      We record this information that you share with us, including your profile biography, any profile pictures uploaded, and any tags you’ve added to your profile.
                    </p>
                    <h3 id='collect---info-app' className='h3'>Info When Using the App</h3>
                      <p className='p'>
                        We also collect information needed to use the app and its features. Chamo is primarily a messaging app, so of course, we collect and store information on the 
                        chats you’ve joined, including the user who you’ve joined the chat with. When you create a new chat with a user, we collect information about that chat, 
                        including the user you’re paired with. We collect information about your interactions in the chatroom, including its messages and the timestamps of those 
                        messages. <br/> <br/>When using Chamo’s messaging feature, you have the ability to send friend requests to users you’ve chatted with. We collect information on the friends 
                        you’ve added from the chats you created, as well as the list of your friends. We collect information about your browsing session, including the timestamp of 
                        your current login session
                      </p>
                </div>  
              <h2 id='use' className='h2'>How We Use It</h2>
                <sub className='subtitle'>We collect  information about you for many reasons, including maintaining the operability of the app, maintaining its safety and security, and communicating with you.</sub>
                <div className='space-y-4'> 
                  <h3 id='use---operate' className='h3'>To operate the app</h3>
                    <p className='p'>
                    We collect information in order to provide you with our services and allow you to use our apps features. For example, Chamo’s messaging capability is one of its core features. For this feature to function, we collect and record messages and their timestamps so that you can chat with fellow users and read your chat history. 
                    </p>
                  <h3 id='use---safety' className='h3'>To maintain safety and security</h3>
                    <p className='p'>
                    We also collect information to maintain the safety and security of your account and our app. For example, during the account creation process, ensuring the legitimacy of an email address is important! We collect your email address so that we can verify that the email entered is usable, which is important for managing your account as well as communicating with you! <br/> <br/>
                    To ensure our users abide by our terms of service, we collect information about your messages to ensure it abides by our safety filter. 
                    We collect information about your browsing session so that your sessions time out when you’ve been inactive for too long.
                    </p>
                  <h3 id='use---communicate' className='h3'>To communicate with you</h3>
                    <p className='p'>
                    We also use the email you provided us with to communicate you regarding any help or customer service requests. This includes things like responding to any help requests or reports.
                    </p>
                </div>  
              <h2 id='disclose' className='h2'>How we disclose your information</h2>
                <sub className='subtitle'>We don't disclose your information.</sub>
                <div className='space-y-4'>
                  <h3 id='disclose---does-not' className='h3'>Chamo doesn’t.</h3>
                    <p className='p'>
                    Only our development team has access to your information strictly for development purposes. Chamo doesn’t sell or disclose your information to third-parties. 
                    </p>
                </div>  
          </div> 
        </div> 

        <div className='w-auto bg-gray-100 dark:bg-light-grey'> 
          <button className='absolute w-16 h-16 right-0 m-4 mb-3 p-1 bg-neutral-900 dark:bg-white text-white dark:text-black text-lg rounded-full font-semibold'
          onClick={(toggleDarkMode)}>
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy;
