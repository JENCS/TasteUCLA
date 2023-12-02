import "../styles/WriteReview.css";
import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as fs from "fs";

const WriteReview = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState("");
  const [photo, setPhoto] = useState();
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [file, setFile] = useState();

  async function uploadImage(e) {
    console.log(e.target.files);
    setFile(e.target.files[0]);
    setPhoto(URL.createObjectURL(e.target.files[0]));
    console.log("UPLOADED");
    const promise = e.target.files[0].arrayBuffer();
    promise.then((value) => {
      console.log(value);
    });

    // imageBuffer = fs.readFileSync(file);
    // fs.writeFileSync("lkawenfoawef.png", imageBuffer);
  }

  function removeImage(e) {
    setPhoto();
  }
  const handleSubmitReview = () => {
    const data = {
      title,
      author,
      rating,
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
        console.log(file);
        console.log(error);
      });
  };

  return (
    <div>
      {/* <Navbar /> */}
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
          <div className="photo-input">
            <input type="file" onChange={uploadImage} />
            {photo && (
              <div className="uploaded-img">
                <img src={photo} />
                <button onClick={removeImage}>Delete</button>
              </div>
            )}
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
