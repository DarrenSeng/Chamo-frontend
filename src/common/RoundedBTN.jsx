import React from 'react'

function RoundedBTN({ icon, onClick }) {
  return (
    <div className="cursor-pointer border border-[#a8a29e] p-2 rounded-xl text-xl text-[#d1d3d6] hover:bg-neutral-800" onClick={onClick}>
    {icon}
  </div>
  )
}

export default RoundedBTN