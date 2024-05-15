import React from 'react'

function ChatButtons({icon, onClick}) {
    return (
      <button onClick={onClick} className='text-black text-xl p-2 rounded-xl hover:bg-[#f0f9e9] '>
          {icon}
      </button>
    )
  }
export default ChatButtons