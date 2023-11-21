import "../styles/WriteReview.css";
import Navbar from "../components/Navbar.jsx";
import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WriteReview = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const handleSubmitReview = () => {
    const data = {
      title,
      author,
      rating,
      photo,
      description,
    };
    setLoading(true);
    axios
      .post("http://localhost:5555/reviews", data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occurred. Please check the console.");
        console.log(error);
      });
  };

  return (
    <div>
      <Navbar />
      <BackButton />
      <h1 className="header">Write a Review</h1>
      {loading ? <Spinner /> : ""}
      <div>
        <div className="title-rating">
          <div className="title-container">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="title-input"
            />
          </div>
          <div className="rating-container">
            <label>Rating</label>
            <input
              type="number"
              step=".1"
              min="0"
              max="10"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="rating-input"
            />
          </div>
        </div>
        <div className="photo-container">
          <label>Photo (optional)</label>
          <input
            type="file"
            value={photo}
            onChange={handleChange}
            className="photo-input"
          />
          <div className="uploaded-img">
            <img src={file} />
          </div>
        </div>
        <div className="description-container">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="description-input"
          ></textarea>
        </div>
        <div>
          <label>Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label>Stars</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <div className="submit-container">
          <button onClick={handleSubmitReview} className="submit-btn">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
