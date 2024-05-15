import React, { useState } from 'react';

function SearchBar({onSearch}) {
  const [query, setQuery] = useState('');

  const handleChange = async (event) => {
    const inputQuery = event.target.value;
    setQuery(inputQuery);
    onSearch(inputQuery)  
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputQuery = "";
    setQuery(inputQuery);
    onSearch(inputQuery)  
  };


  return (
    <form onSubmit={handleSubmit} className="pt-6 pb-3 flex w-full items-center justify-center">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for a Topic..."
        className="w-3/4 border border-zinc-900 px-3 py-2 rounded-md focus:outline-none 
        focus:border-emerald-700 bg-zinc-800 text-white"/>
      <button type="submit" className="bg-emerald-500 h-[45px] text-gray-800  
        px-6 py-2 rounded-md ml-2 hover:bg-emerald-600">
        Clear
      </button>
    </form>
  );
}

export default SearchBar;