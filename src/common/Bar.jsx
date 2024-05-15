import React, { useState } from 'react'

const Bar = ( {onClick, onInputChange, onKeyPress} ) => {

  const [inputValue, setInputValue] = useState('');


  const handleInputChange = (e) => {
    const value = e.target.value;
    // setInputValue(value);
    onInputChange(value)
    onKeyPress(e);
  };


  return (
    <div>
        <input
        type="text"
        placeholder="Type a message..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputChange}
        autoFocus
      />
    </div>
  )
}

export default Bar