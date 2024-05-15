import { useEffect } from 'react';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import axios from 'axios';
import { getUserDetails,submitReportRequest } from '../../api/api';
import cookies from 'js-cookie'

const Report = ({ onClose }) => {
  const [ authUser, setAuthUser ] = useState(cookies.get('user'));
  const [userDetails, setUserDetails] = useState();
  const [textAreaValue, setTextAreaValue] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails(authUser);
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    if (authUser) {
      fetchUserDetails();
    }
  }, [authUser]);

  const handleInputChanges = (event) => {
    setTextAreaValue(event.target.value);
  };

  const submitRequest = async () => {
    if (!(/^\s*$/.test(textAreaValue))) {
      try {
        const response = await submitReportRequest(userDetails.username, userDetails._id, textAreaValue);
        setStatus('Report form sent successfully!');
      } catch (error) {
        console.error("Error sending request:", error);
        setStatus('Unable to send request: ' + error.message);
      } finally {
        setTimeout(() => {
          setStatus('');
        }, 5000);
      }
    } else {
      setStatus('Unable to send request: Empty Text Field');
      setTimeout(() => {
        setStatus('');
      }, 5000);
    }
    setTextAreaValue('');
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-light-green text-dark-grey rounded-lg p-6 max-w-2xl mx-auto w-full">
        <div className="mb-4">
          <h2 className="text-xl flex justify-center font-semibold">Report Form</h2>
        </div>
        <textarea
          className="bg-white w-full h-40 p-2 border border-dark-grey rounded-md text-dark-grey resize-none mb-4"
          placeholder="Tell us about a problem..."
          onChange={handleInputChanges}
          value={textAreaValue}
        ></textarea>
        <div className="flex justify-end">
          <button
            className="bg-med-green hover:bg-light-green text-dark-grey font-semibold py-2 px-4 rounded mr-2 border-2 border-transparent hover:border-med-green"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="bg-med-green hover:bg-light-green text-dark-grey font-semibold py-2 px-4 rounded border-2 border-transparent hover:border-med-green"
            onClick={submitRequest}
          >
            Submit
          </button>
        </div>
        {status && <div className="text-dark-grey mt-4">{status}</div>}
      </div>
    </div>
  );
};

export default Report;