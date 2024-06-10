import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateVideo.css";

const CreateVideo = ({ setVideoList, user }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null); // State to store the video file
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.signedIn) {
      navigate("/signin");
    }
  }, [navigate, user.signedIn]);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (!image || !video) {
      alert("Please upload both an image and a video.");
      return;
    }
  
    const videoUrl = URL.createObjectURL(video); // Convert video file to URL
  
    const newVideo = {
      id: Date.now(), // Using current timestamp as a unique id
      title,
      pic: URL.createObjectURL(image), // Store the image file directly
      url: videoUrl, // Store the video URL
      author: user.name, // Assuming user's name is the author
      views: 0, // Initial views
      date: new Date().toLocaleDateString(), // Current date
      description: "", // Empty description for now
    };
  
    console.log(newVideo); // Check if the newVideo object contains the url property
  
    setVideoList((prevList) => [...prevList, newVideo]);
    navigate("/");
  };
  
  
  

  return (
    <form className="create-video-form" onSubmit={handleSubmit}>
      <h2>Create a Video</h2>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Image:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
      </label>
      <label>
        Video:
        <input
          type="file"
          accept="video/*" // Allow all video types
          onChange={(e) => setVideo(e.target.files[0])}
          required
        />
      </label>
      <button type="submit">Create Video</button>
    </form>
  );
};

export default CreateVideo;
