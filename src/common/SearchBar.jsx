import React, { useState } from 'react';

function Searchbar({ onInputChange, onSubmit,icon, text }) {
  const [query, setQuery] = useState('');

  const handleChange = async (event) => {
    const inputQuery = event.target.value;
    setQuery(inputQuery);
    onInputChange(inputQuery);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    onSubmit(query);
  };

  return (
    <form onSubmit={handleSubmit} className="pt-6 pb-3 flex w-full items-center justify-center">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={text}
        className="w-3/4 border border-zinc-900 px-3 py-2 rounded-md focus:outline-none 
        focus:border-emerald-700 bg-zinc-800 text-white"
      />
      <button
        type="submit"
        className="bg-emerald-500 flex justify-center items-center h-[45px] text-gray-800 px-2 py-2 rounded-lg ml-2 hover:bg-emerald-600"
      >
        {icon}
      </button>
    </form>
  );
}

export default Searchbar;
