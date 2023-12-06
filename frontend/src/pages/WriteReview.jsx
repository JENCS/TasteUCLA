import "../styles/WriteReview.css";
import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

const WriteReview = () => {
  // const [title, setTitle] = useState("");
  // const [author, setAuthor] = useState("");
  // const [photo, setPhoto] = useState();
  // const [description, setDescription] = useState("");
  // const [file, setFile] = useState(null);
  // const [image, setImage] = useState(null);

  // async function uploadImage(e) {
  //   console.log(e.target.files);
  //   setFile(e.target.files[0]);
  //   // setImage(file);
  //   setPhoto(URL.createObjectURL(e.target.files[0]));
  //   console.log("UPLOADED");
  //   const promise = e.target.files[0].arrayBuffer();
  //   promise.then((value) => {
  //     console.log(value);
  //     setImage(Buffer.from(value));
  //     console.log(typeof image);
  //   });

  //   // imageBuffer = fs.readFileSync(file);
  //   // fs.writeFileSync("lkawenfoawef.png", imageBuffer);
  // }

  // function removeImage(e) {
  //   setPhoto();
  // }
  // const handleSubmitReview = () => {
  //   // const reader = new FileReader();
  //   const data = {
  //     title,
  //     author,
  //     rating,
  //     description,
  //     image,
  //   };
  //   setLoading(true);
  //   axios
  //     .post("http://localhost:5555/reviews", data)
  //     .then(() => {
  //       setLoading(false);
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       alert("An error occurred. Please check the console.");
  //       console.log(file);
  //       console.log(error);
  //     });
  // };

  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", text);
    formData.append("image", image);

    setLoading(true);
    axios
      .post("/api/reviews", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
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
      <BackButton />
      <h1 className="header">Write a Review</h1>
      {loading ? <Spinner /> : ""}
      {/* <div>
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
        <div className="submit-container">
          <button onClick={handleSubmitReview} className="submit-btn">
            Submit
          </button>
        </div>
      </div> */}
      <form onSubmit={handleSubmit}>
        <div className="title-rating">
          <div className="title-container">
            <label>
              Title
              <textarea
                value={text}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
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
            <label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          </div>
        </div>
        <div>
          <label>Restaurant: NEED A DROPDOWN MENU</label>
        </div>
        <div className="description-container">
          <label>
            Description
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="description-input"
            />
          </label>
        </div>
        <div className="submit-container">
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default WriteReview;
