import React, { useState, useRef, useEffect } from 'react';

function DropTopButton({ icon, itemList }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleButtonClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block p-2" ref={dropdownRef}>
      <button onClick={handleButtonClick} className="text-black text-xl p-2 rounded-xl hover:bg-[#bbf7d0]">
        {icon}
      </button>


      {itemList.length > 0 && isDropdownOpen && (
        <div className="absolute z-10  divide-y divide-gray-100 rounded-lg shadow w-30 bg-[#86efac] top-0 mt-[-152px] left-[1px]">
          <ul className="py-2 text-sm text-[#134e4a] dark:text-[#134e4a]" aria-labelledby="dropdownTopButton">
            {itemList.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-[#bbf7d0] dark:hover:text-[#134e4a]"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropTopButton;
