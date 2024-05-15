import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';
import { IoPersonCircle } from 'react-icons/io5';
import { getUserDetails, updateUserProfile, getCountries } from '../api/api';
import cookies from 'js-cookie'

const colors = ['#526275', '#6B0842', '#A61F21', '#B8671F', '#D5DB8C', '#61B38F', '#2D924A', '#126FA2', '#56028F', "#ffffff"];
const personalityTypes = [
  "ISTJ", "ISFJ", "INFJ", "INTJ",
  "ISTP", "ISFP", "INFP", "INTP",
  "ESTP", "ESFP", "ENFP", "ENTP",
  "ESTJ", "ESFJ", "ENFJ", "ENTJ"
];

function ProfileMenu() {
  const [ authUser, setAuthUser ] = useState(cookies.get('user'));
  const [userDetails, setUserDetails] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState(""); 
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [currentColor, setCurrentColor] = useState('');
  const [privateProfilePicture, setPrivateProfilePicture] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [iconColor, setIconColor] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails(authUser)
        setUserDetails(response.data);
        setUsername(response.data.username);
        setLastName(response.data.lastName);
        setFirstName(response.data.firstName);
        setDisplayName(`${response.data.firstName} ${response.data.lastName}`);
        setAge(response.data.age || "");
        setBio(response.data.bio || "");
        setSelectedCountry(response.data.location || "");
        setTopics(response.data.topics || []);
        setSelectedType(response.data.personalityTypes && response.data.personalityTypes[0] ? response.data.personalityTypes[0] : "");
        setCurrentColor(response.data.iconColor || ""); // Update currentColor with the fetched iconColor value
        setIconColor(response.data.iconColor || ""); // Update iconColor with the fetched iconColor value

      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
  
    fetchUserDetails();
  }, [authUser]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCountries();
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleColorChange = (color) => {
    setCurrentColor(color);
    setIconColor(color);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    
  };

  const handleInputChange = (event) => {
    setNewTopic(event.target.value);
  };

  const handleAddTopic = async () => {
    if (newTopic && newTopic.trim() !== '' && topics && topics.length < 10) {
      const updatedTopics = [...topics, newTopic.trim()];
      setTopics(updatedTopics);
      setNewTopic('');
      setShowInput(false);

      // Save updated topics to the database
      try {
        const profileData = {
          topics: updatedTopics,
        };

        const response = await updateUserProfile(authUser, profileData);
        console.log('Response:', response.data);
      } catch (error) {
        console.error("Error saving changes:", error);
        alert("Error saving changes. Please try again later.");
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddTopic();
    }
  };

  const handleRemoveTopic = async (index) => {
    const updatedTopics = [...topics];
    updatedTopics.splice(index, 1);
    setTopics(updatedTopics);

    // Remove the topic from the database
    try {
      const profileData = {
        topics: updatedTopics,
      };

      const response = await updateUserProfile(authUser, profileData);
      console.log('Response:', response.data);
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Error saving changes. Please try again later.");
    }
  };

  const handlePrivateProfilePictureChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // You can perform additional checks/validation here
      setPrivateProfilePicture(file);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };


  const handleCancelTopic = () => {
    setNewTopic('');
    setShowInput(false);
  };

  
  

  
  const saveChanges = async () => {
    try {
      const profileData = {
        firstName,
        lastName,
        age,
        location: selectedCountry,
        bio,
        topics,
        personalityTypes: [selectedType],
        iconColor: currentColor
      };

      const response = await updateUserProfile(authUser, profileData);
      setDisplayName(`${firstName} ${lastName}`); 
      alert("Changes saved successfully!");
    } catch (error) {
      alert("Error saving changes. Please try again later.");
    }
  };

  

  return (
    <div className='max-w-[1400px] mt-[10px] w-full h-full mx-auto text-center bg-gray-200 dark:bg-dark-grey rounded-lg py-16'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3'>
        {/* Public Profile */}
        <div className="col-auto text-gray-700 dark:text-white font-bold text-2xl flex flex-col items-center md:items-start md:col-span-1 mb-8">
          <div className="mr-4 md:mr-8">
            <h1>Profile Icon Color</h1>
            
          </div>
          <IoPersonCircle size={180} color={currentColor} />
          

        </div>

        {/* Color buttons */}
      {/* Color buttons */}
      <div className="relative flex items-center justify-center md:col-span-2 flex-wrap md:flex-nowrap space-y-4 md:space-y-0 md:space-x-4">
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => handleColorChange(color)}
            style={{ backgroundColor: color, width: '60px', height: '60px', borderRadius: '8px', margin: '8px' }}
          />
        ))}
        <button
          onClick={saveChanges}
          className="absolute bottom-4 right-4 bg-green-500 hover:bg-green-700 text-gray-700 dark:text-white font-bold py-2 px-4 rounded"
        >
          Save Icon Color
        </button>
      </div>
          
        {/* Private Profile Settings */}
        <div className='text-3xl font-bold text-gray-700 dark:text-white flex items-center mx-2 md:col-span-4 py-10'>
          Private Profile Settings For User: 
        </div>
        <div className='text-2xl  text-gray-700 dark:text-white flex items-center mx-2 md:col-span-4'>
          @{username}
        </div>
        

        <div className='mx-2 text-xl font-normal text-gray-700 dark:text-white flex items-center md:col-span-6 py-5'>
          Hello, {firstName} {lastName}</div>
  
        <div className='mx-2 text-xl font-normal text-gray-700 dark:text-white flex items-center md:col-span-6 py-5'>About</div>
        <div className='mx-2 md:col-span-6 py-2 flex flex-col'>
          <textarea
            className='bg-gray-100 dark:bg-dark-grey text-dark-grey dark:text-slate-200  mx-2 p-4 border border-gray-500 rounded-md resize-none'
            placeholder='Tell us a little about yourself...'
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <button onClick={saveChanges} className="bg-green-500 hover:bg-green-700 text-gray-700 dark:text-white font-bold py-2 px-4 rounded mt-2 mr-2 self-end">Save</button>
        </div>

        <div>
          <div className=' text-xl font-bold text-gray-700 dark:text-white flex items-center md:col-span-6 py-5'>Information</div>
          <div className=' mx-3 text-lg font-normal text-gray-700 dark:text-white flex items-center md:col-span-6 py-2'>Name</div>
          <div className='mx-3 flex md:col-span-6 py-2'>
            <input
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
              className='mx-3 text-lg font-normal bg-gray-100 dark:bg-dark-grey text-dark-grey dark:text-slate-200 border border-gray-500 rounded-md p-2'
              
            />
            <input
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
              className='mx-3 text-lg font-normal bg-gray-100 dark:bg-dark-grey text-dark-grey dark:text-slate-200 border border-gray-500 rounded-md p-2'
              
            />
            <button onClick={saveChanges} className="bg-green-500 hover:bg-green-700 text-gray-700 dark:text-white font-bold py-2 px-4 rounded">Save</button>
          </div>
          <div className=' mx-3 text-lg font-normal text-gray-700 dark:text-white flex items-center md:col-span-6 py-2'>Age</div>
          <div className='mx-3 flex md:col-span-6 py-2'>
            <input
              type="text"
              value={age}
              onChange={handleAgeChange}
              className='mx-3 text-lg font-normal bg-gray-100 dark:bg-dark-grey text-dark-grey dark:text-slate-200 border border-gray-500 rounded-md p-2'
            />
            <button onClick={saveChanges} className="bg-green-500 hover:bg-green-700 text-gray-700 dark:text-white font-bold py-2 px-4 rounded">Save</button>
          </div>
          <div>
          <div className='mx-3 text-lg font-normal text-white flex items-center md:col-span-6 py-2'>Personality Type:</div>
            <div className='mx-3 flex md:col-span-6 py-2'>
              <select
                value={personalityTypes[selectedType]}
                onChange={handleTypeChange}
                className='mx-3 text-lg font-normal text-white bg-[#272727] border border-gray-500 rounded-md p-2 text-white'>
                <option value=''>Select Type</option>
                {personalityTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
              <button onClick={saveChanges} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Save</button>
            </div>
          </div>
          <div className=' mx-3 text-lg font-normal text-gray-700 dark:text-white flex items-center md:col-span-6 py-2'>Country</div>
          <div className='mx-3 flex md:col-span-6 py-2'>
            <select
              value={selectedCountry}
              onChange={handleCountryChange}
              className='mx-3 text-lg font-normal bg-gray-100 dark:bg-dark-grey text-dark-grey dark:text-slate-200 border border-gray-500 rounded-md p-2'
            >
              <option value=''>Select Country</option>
              {countries
                .sort((a, b) => a.name.common.localeCompare(b.name.common))
                .map((country, index) => (
                  <option key={index} value={country.name.common}>
                    {country.name.common}
                  </option>
              ))}
            </select>
            <button onClick={saveChanges} className="bg-green-500 hover:bg-green-700 text-gray-700 dark:text-white font-bold py-2 px-4 rounded">Save</button>
          </div>
                <div className=' mx-3 text-lg font-normal text-gray-700 dark:text-white flex items-center md:col-span-6 py-2'>Favorite Topics</div>
            <div className='mx-3 flex md:col-span-6 py-2 flex-wrap'>
              {topics && topics.map((topic, index) => (
                <div key={index} className="bg-gray-300 dark:bg-black rounded-full px-3 py-1 mr-2 mb-2 flex items-center text-gray-700 dark:text-white">
                  {topic}
                  <button className="ml-2 text-red-500" onClick={() => handleRemoveTopic(index)}>×</button>
                </div>
              ))}
              {showInput && (
                <div className="flex items-center flex-wrap">
                  <div className="flex items-center mr-2 mb-2">
                    <input
                      type="text"
                      value={newTopic}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      className='bg-gray-300 dark:bg-black rounded-full px-3 py-1 text-gray-700 dark:text-white'
                      placeholder="Add topic"
                    />
                    <button onClick={handleAddTopic} className="bg-green-500 hover:bg-green-700 rounded-full px-3 py-1 ml-2 text-gray-700 dark:text-white">
                      Add
                    </button>
                    <button onClick={handleCancelTopic} className="bg-red-500 hover:bg-red-700 rounded-full px-3 py-1 ml-2 text-gray-700 dark:text-white">
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              {!showInput && (
                <button onClick={() => setShowInput(true)} className="bg-green-500 hover:bg-green-700 rounded-full px-3 py-1 mr-2 mb-2 text-gray-700 dark:text-white">
                  +
                </button>
              )}
            </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileMenu;