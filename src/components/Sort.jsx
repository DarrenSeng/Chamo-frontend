import React from 'react'

function Sort({}) {
  return (
    <div className='pt-4 pb-3 p-4 flex w-full justify-end'>
        <button className="btn-dropdown" onClick={() => {console.log("Sort topics")}}> ↓ Sort </button>
    </div>
    
  )
}

export default Sort;