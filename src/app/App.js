// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import LeftMenu from '../components/leftMenu/LeftMenu';
import videosData from '../videoLogic/videoItem/Videos.json';
import Search from '../components/search/Search';
import CreateVideo from '../components/createVideo/CreateVideo';
import VideoListResults from '../videoLogic/videoListResults/VideoListResults';
import VideoMain from '../videoLogic/videoMain/VideoMain';
import SearchResults from '../components/searchResults/SearchResults';
import DarkModeButton from '../components/darkMode/DarkModeButton';
import SignUp from '../loginLogic/SignUp';
import SignUpStepTwo from '../loginLogic/SignUpStepTwo';
import UploadProfileImage from '../loginLogic/UploadProfileImage';
import SignIn from '../loginLogic/SignIn';
import UserPage from '../components/userPage/UserPage';
import UpdateProfile from '../components/updateProfile/UpdateProfile';
import demoUsers from '../mock/DemoUsers.const';
import useUser from '../hooks/UseUser';

function App() {
  const [videoList, setVideoList] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [comments, setComments] = useState({}); //move this
  const [user, setUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);//move this
  const [userInteractions, setUserInteractions] = useState({});//move this
  const [likesDislikes, setLikesDislikes] = useState({});//move this
  const {getUserByEmail} = useUser(registeredUsers);


  const updateUser = (updatedUserData) => {  //move this
    // Assuming updateUser receives updatedUserData with profileImage
    const updatedUser = { ...user, ...updatedUserData };
    setUser(updatedUser);
    // You might want to update registeredUsers as well, depending on your setup
    const updatedRegisteredUsers = registeredUsers.map(u => u.email === updatedUser.email ? updatedUser : u);
    setRegisteredUsers(updatedRegisteredUsers);
  };

  

  const addVideo = (newVideo) => {
    setVideoList((prevList) => [...prevList, newVideo]);
  };

  useEffect(() => {
    setVideoList(videosData);
    setRegisteredUsers(demoUsers); // Initialize registered users with demo users
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
    document.body.classList.toggle('dark-mode');
  };

  const addComment = (videoId, comment) => {
    setComments(prevComments => ({
      ...prevComments,
      [videoId]: [...(prevComments[videoId] || []), comment],
    }));
  };

  const deleteComment = (videoId, index) => {
    setComments(prevComments => ({
      ...prevComments,
      [videoId]: prevComments[videoId].filter((_, i) => i !== index),
    }));
  };

  const editComment = (videoId, index, newText) => {
    setComments(prevComments => ({
      ...prevComments,
      [videoId]: prevComments[videoId].map((comment, i) =>
        i === index ? { ...comment, text: newText } : comment
      ),
    }));
  };

  const handleLike = (videoId) => {
    setUserInteractions(prev => ({
      ...prev,
      [videoId]: { ...prev[videoId], like: !prev[videoId]?.like }
    }));
    setLikesDislikes(prev => ({
      ...prev,
      [videoId]: { ...prev[videoId], likes: (prev[videoId]?.likes || 0) + (userInteractions[videoId]?.like ? -1 : 1) }
    }));
  };

  const handleDislike = (videoId) => {
    setUserInteractions(prev => ({
      ...prev,
      [videoId]: { ...prev[videoId], dislike: !prev[videoId]?.dislike }
    }));
    setLikesDislikes(prev => ({
      ...prev,
      [videoId]: { ...prev[videoId], dislikes: (prev[videoId]?.dislikes || 0) + (userInteractions[videoId]?.dislike ? -1 : 1) }
    }));
  };

  const handleSignOut = () => {
    setUser(null);
  };

  const deleteVideo = (id) => {
    setVideoList((prevList) => prevList.filter(video => video.id !== id));
  };

  const editVideo = (id, newTitle, newDescription, newUrl) => {
    setVideoList((prevList) =>
      prevList.map(video =>
        video.id === id ? { ...video, title: newTitle, description: newDescription, url: newUrl } : video
      )
    );
  };

  const handleRegisterUser = (userData) => {
    setRegisteredUsers((prevUsers) => [...prevUsers, userData]);
    setUser({ ...userData, signedIn: true });
  };

  const updateVideoViews = (id) => {
    setVideoList(prevList =>
      prevList.map(video =>
        video.id === id ? { ...video, views: video.views + 1 } : video
      )
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn setUser={setUser} registeredUsers={registeredUsers} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup-step-two" element={<SignUpStepTwo registerUser={handleRegisterUser} />} />
        <Route path="/upload-profile-image" element={<UploadProfileImage email={user?.email} registeredUsers={registeredUsers} />} />
        <Route
          path="*"
          element={
            <div className={`container-fluid ${isDarkMode ? 'dark-mode' : ''}`}>
              <div className="row">
                <LeftMenu expanded={expanded} setExpanded={setExpanded} />
                <div className={`col main-content ${expanded ? '' : 'collapsed'}`}>
                  <div className="search-signin-container">
                    <Link to="/create" className="btn create-button">
                      <i className="bi bi-patch-plus"></i>
                    </Link>
                    <Search className="search-bar" />
                    <Link to="/" className="app-logo-link">
                      <img src={isDarkMode ? "/images/logo-dark.svg" : "/images/logo-light.svg"} alt="Logo" className="app-logo" />
                    </Link>
                    <DarkModeButton toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
                    {user ? (
                      <div className="user-info">
                        <Link to="/update-profile" className="update-profile-link">
                          {user.profileImage && <img src={user.profileImage} alt="Profile" className="profile-image" />}
                          <span className="user-details">{user.firstName}</span>
                        </Link>
                        <Link to="/signin" className="signin-link">
                          <button type="button" className="btn btn-primary" onClick={handleSignOut}>
                            <span className="bi bi-person-circle" aria-hidden="true"></span>
                            <span className="signin-text">Sign out</span>
                          </button>
                        </Link>
                      </div>



                    ) : (
                      <Link to="/signin" className="signin-link">
                        <button type="button" className="btn btn-primary">
                          <span className="bi bi-person-circle" aria-hidden="true"></span>
                          <span className="signin-text">Sign in</span>
                        </button>
                      </Link>
                    )}
                  </div>
                  <Routes>
                    <Route path="/" element={
                      <>
                        <VideoListResults videos={videoList} getUserByEmail={getUserByEmail} />
                      </>
                    } />

                    <Route
                      path="/video/:id"
                      element={
                        <VideoMain
                          videos={videoList}
                          comments={comments}
                          addComment={addComment}
                          deleteComment={deleteComment}
                          editComment={editComment}
                          user={user}
                          userInteractions={userInteractions}
                          handleLike={handleLike}
                          handleDislike={handleDislike}
                          likesDislikes={likesDislikes}
                          deleteVideo={deleteVideo}
                          editVideo={editVideo}
                          getUserByEmail={getUserByEmail}
                          updateVideoViews={updateVideoViews}
                        />
                      }
                    />
                    <Route path="/search" element={<SearchResults videos={videoList} getUserByEmail={getUserByEmail} />} />
                    <Route path="/create" element={<CreateVideo addVideo={addVideo} user={user} />} />
                    <Route path="/user/:name" element={<UserPage videos={videoList} getUserByEmail={getUserByEmail} />} />
                    <Route
                      path="/update-profile"
                      element={<UpdateProfile user={user} updateUser={updateUser} />}
                    />
                  </Routes>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;