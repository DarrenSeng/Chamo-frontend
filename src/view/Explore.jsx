import { React, useEffect } from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import NavBar from '../components/NavBar'
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import axios from 'axios';
import loginBg from "../assets/login-bg.png";
import topicAnime from "../assets/topic-anime.png";
import topicComic from "../assets/topic-comic.png";
import topicGame from "../assets/topic-game.png";
import topicMusic from "../assets/topic-music.png";
import topicArt from "../assets/topic-art.jpg";
import topicCoding from "../assets/topic-coding.jpg";
import topicCooking from "../assets/topic-cooking.jpg";
import topicPhotography from "../assets/topic-photo.jpg";
import topicMovies from "../assets/topic-movies.jpg";
import topicSports from "../assets/topic-sports.jpg";
import topicTabletop from "../assets/topic-tabletop.jpg";
import topicAnimal from "../assets/login-bg.png";
import TopicContainer from '../components/TopicContainer';
import SearchBar from '../components/SearchBar';
import Sort from '../components/Sort';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { IoCloseCircleOutline } from "react-icons/io5";

function Explore() {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [toggleTopicPage, setTopicPage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [topicTitle, setTopicTitle] = useState('');
  const [topicDescription, setTopicDescription] = useState('');
  const [topics, setTopics] = useState([]);
  const [sorted, setSorted] = useState({ sorted: "topicTitle", reversed: false }); 

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/users/${authUser}`);
        setAuthUser(response.data._id)
        setUserDetails(response.data);
        setUsername(response.data.username)
        setFirstName(response.data.firstName)
        const fetchTopics = async () => {
          try {
            const response = await axios.get('http://localhost:3001/api/topic/render_topics');
            setTopics(response.data);
            console.log(response.data);
          } catch (error) {
            console.error('Error fetching topics:', error);
          }
        };

        fetchTopics();
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    if (authUser) {
      fetchUserDetails();
    }
  }, [authUser]);

  const handleSearch = (query) => {
    const filtered = topics.filter(item =>
      item.topicTitle.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const sortByName = () => {
    const newReversed = !sorted.reversed;
    setSorted({ sorted: "topicTitle", reversed: newReversed });
    const topicsCopy = [...topics];
    topicsCopy.sort((topicA, topicB) => {
      if (topicA.topicTitle && topicB.topicTitle) {
        if (newReversed) {
          return topicB.topicTitle.localeCompare(topicA.topicTitle);
        }
        return topicA.topicTitle.localeCompare(topicB.topicTitle);
      }
      return 0;
    })
    topicsCopy.map((item, i) =>
      <div key={i}>{item.identifier} {item.authUser} {item.containerItems} </div>
    );
    setTopics([...topicsCopy]);
    console.log("sorted topicItems", topics);
  };

  const renderArrow = () => {
    if (sorted.reversed) {
      return <FaArrowUp />;
    }
    return <FaArrowDown />;
  };

  const CreateTopicBtn = () => {
    const createTopic = () => {
      setTopicPage(!toggleTopicPage)
    }

    return (
      <button onClick={createTopic} type="submit" className="bg-emerald-500 h-[45px] text-gray-800
        px-6 py-2 ml-40 rounded-md ml-2 hover:bg-emerald-600">
        Add Topic
      </button>
    )
  }

  const ExitBtn = () => {
    const createTopic = () => {
      setTopicPage(!toggleTopicPage)
    }

    return (
      <button onClick={createTopic} type="submit">
        <IoCloseCircleOutline size={42} />
      </button>
    )
  }

  const CreateTopic = async () => {
    try {
      const formData = new FormData();
      formData.append('topicCreator', authUser);
      formData.append('topicTitle', topicTitle);
      formData.append('topicDescription', topicDescription);
      formData.append('subscriber', []);

      if (selectedImage) {
        formData.append('topicImage', selectedImage);
      }

      const response = await axios.post('http://localhost:3001/api/topic/create_topic', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data.message);
    } catch (error) {
      console.error('Error creating topic:', error);
    }
  }

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const UploadImageButton = () => {
    return (
      <label
        htmlFor="image-upload"
        className="flex flex-col items-center justify-center w-full h-full bg-gray-300 rounded-md cursor-pointer hover:bg-light-green"
      >
        <div className="text-6xl font-bold text-emerald-500">+</div>
        <p className="text-2xl font-bold text-gray-700">[Insert image here]</p>
        <input
          id="image-upload"
          type="file"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>
    );
  };
  return (
    <div className="relative h-screen max-h-screen">
      <NavBar />
      <div className="m-0 p-0 text-slate-200 box-border h-full" style={{ backgroundColor: "#313131" }}>
        <SearchBar onSearch={handleSearch} />
        <CreateTopicBtn />
        {toggleTopicPage ? (
          <div className='absolute top-16 left-0 w-full bg-light-grey flex flex-col' style={{ height: '325px' }}>
            <div className="flex justify-between items-center p-4">
              <h2 className="text-2xl font-bold">Create Topic</h2>
              <ExitBtn />
            </div>
            <div className='flex'>
              <div className='w-1/2 p-4 relative'>
                <input
                  type="text"
                  placeholder="Enter your topic! (Ex. Anime, Gaming, Music, etc)"
                  id="topicTitle"
                  name="topicTitle"
                  value={topicTitle}
                  onChange={(e) => setTopicTitle(e.target.value)}
                  className="appearance-none w-full h-8 bg-gray-200 text-gray-700 border border-gray-400 rounded py-1 px-2 mb-2 focus:outline-none focus:bg-white focus:border-gray-500"
                />
                <textarea
                  id="topicDescription"
                  placeholder="Enter your topic description!"
                  name="topicDescription"
                  value={topicDescription}
                  onChange={(e) => setTopicDescription(e.target.value)}
                  required
                  className="appearance-none w-full h-24 bg-gray-200 text-gray-700 border border-gray-400 rounded p-2 focus:outline-none focus:bg-white focus:border-gray-500 resize-none"
                  style={{ resize: 'none' }}
                />
                <button onClick={CreateTopic} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline absolute bottom-[-30px] right-4">
                  Submit
                </button>
              </div>
              <div className='w-1/2'>
                <UploadImageButton />
              </div>
            </div>
          </div>
        ) : null}
        <div className="pr-40 flex flex-row-reverse justify-between items-center">
          <button className="btn-dropdown" onClick={sortByName}> {sorted.sorted === "topicTitle" ? renderArrow() : null} Sort </button>
        </div>
        <div className="overflow-y-auto h-full">
        <TopicContainer
          identifier="All Topics"
          authUser={authUser}
          containerItems={filteredItems.length ? filteredItems : topics}
          className={toggleTopicPage ? 'mt-48' : ''}
        />
        </div>
      </div>
    </div>
  )
}
export default Explore