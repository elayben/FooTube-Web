import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from '../loginLogic/SignIn';
import SignUp from '../loginLogic/SignUp';
import SignUpTwo from '../loginLogic/SignUpTwo'; 
import VideoListResults from '../../videoLogic/videoListResults/VideoListResults';
import VideoMain from '../../videoLogic/videoMain/VideoMain';
import SearchResults from '../searchResults/SearchResults';
import CreateVideo from '../createVideo/CreateVideo';
import UserPage from '../userPage/UserPage';
import UpdateProfile from '../updateProfile/UpdateProfile';
import './RoutesConfiguration.css';

const RoutesConfiguration = ({
  user,
  videoList,
  comments,
  addComment,
  deleteComment,
  editComment,
  userInteractions,
  handleLike,
  handleDislike,
  likesDislikes,
  deleteVideo,
  editVideo,
  getUserByEmail,
  updateVideoViews,
  handleRegisterUser,
  setUser,
  registeredUsers,
  updateUser
}) => {
  return (
    <Routes>
      {/* Routes without application layout */}
      <Route path="/signin" element={<SignIn setUser={setUser} registeredUsers={registeredUsers} />} />
      <Route path="/signup" element={<SignUp handleRegisterUser={handleRegisterUser} />} />
      <Route path="/sign-up-step-two" element={<SignUpTwo handleRegisterUser={handleRegisterUser} />} />

      {/* Routes with application layout */}
      <Route
        path="/*"
        element={<VideoListResults videos={videoList} getUserByEmail={getUserByEmail} />}
      />
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
      <Route path="/create" element={<CreateVideo />} />
      <Route path="/user/:name" element={<UserPage videos={videoList} getUserByEmail={getUserByEmail} />} />
      <Route path="/update-profile" element={<UpdateProfile user={ user } updateUser={updateUser} setUser={setUser}  registeredUsers={registeredUsers} />} />
    </Routes>
  );
};

export default RoutesConfiguration;
