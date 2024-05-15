import React from 'react'

const FAQ = () => {
    const faqs = [
        {
          question: "How do I create an account on the chat app?",
          answer: "To create an account, simply download the app from the app store, open it, and follow the on-screen instructions to sign up. You'll need to provide a valid email address or phone number and create a secure password."
        },
        {
          question: "Can I use the chat app on multiple devices simultaneously?",
          answer: "Yes, the chat app supports multi-device functionality. Once logged in, you can access your chats and conversations seamlessly across different devices, such as smartphones, tablets, and computers."
        },
        {
          question: "Is end-to-end encryption supported for private conversations?",
          answer: "Absolutely. Your private conversations are protected with end-to-end encryption, ensuring that only you and the intended recipient can access the messages. This enhances the security and privacy of your communications."
        },
        {
          question: "How do I customize my profile on the chat app?",
          answer: "To customize your profile, go to the settings menu and select the 'Profile' option. Here, you can upload a profile picture, update your status, and add a personal bio. Make your profile uniquely yours!"
        },
        {
          question: "What should I do if I forget my password?",
          answer: "If you forget your password, simply click on the 'Forgot Password' link on the login screen. Follow the prompts to reset your password via email or SMS. Ensure your account remains secure by choosing a strong, unique password."
        }
      ];

    return (
        <div className='max-w-[1400px] mt-[10px] w-full h-screen ov mx-auto text-center bg-[#272727] rounded-lg'>
            <div className='w-full h-3/4 px-10'>
                <div className='text-xl font-normal text-white grid-cols-1 md:col-span-6 '>
                    <h1 className='text-3xl font-semibold py-10'>Frequently Asked Questions</h1>
                    <ul className='text-left'>
                        {faqs.map((faq, index) => (
                            <li className='py-5' key={index}>
                                <strong>{faq.question}</strong>
                                <p>{faq.answer}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default FAQ