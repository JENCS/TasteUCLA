import "../styles/WriteReview.css";
import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import Button from "@mui/material/Button";
import "reactjs-popup/dist/index.css";

const WriteReview = ({
  createReview,
  restaurantToReview,
  setMyRestaurant,
  loggedIn,
}) => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [imageDisplay, setImageDisplay] = useState(null);
  const [loading, setLoading] = useState(false);
  const [restaurant, setRestaurant] = useState(null);
  const [displayCloseRestaurant, setDisplayCloseRestaurant] = useState(false);
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [preSelected, setPreSelected] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);

  useEffect(() => {
    if (!loggedIn) {
      setOpenPopUp(true);
    }
    const fetchRestaurants = async () => {
      try {
        const rest = await axios.get("http://localhost:5555/locations");
        let fetchedRestaurants = rest.data.data;

        setSelectedRestaurant("");
        if (restaurantToReview) {
          const foundRestaurant = fetchedRestaurants.find(
            (r) => r.name === restaurantToReview
          );
          if (foundRestaurant) {
            restaurantToReview = "";
            //console.log("selected: ", selectedRestaurant, "found", foundRestaurant.name)
            setPreSelected(true);
            const i = getRestIndex(foundRestaurant.name, fetchedRestaurants);
            //console.log(i)
            //console.log(fetchedRestaurants[i])
            setSelectedRestaurant(fetchedRestaurants[i].name);
            //fetchedRestaurants = fetchedRestaurants.filter(r => r.name !== restaurantToReview);
          } else {
            setSelectedRestaurant("");
          }
        } else {
          setSelectedRestaurant("");
        }

        setRestaurants(fetchedRestaurants);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };
    fetchRestaurants();
    //restaurantToReview = "";
    console.log(preSelected);
  }, [restaurantToReview]);

  function getRestIndex(name, rests) {
    const index = rests.findIndex((restaurant) => restaurant.name === name);
    return index;
  }

  function uploadImage(e) {
    setImage(e.target.files[0]);
    setImageDisplay(URL.createObjectURL(e.target.files[0]));
  }

  function removeImage(e) {
    setImage(null);
    setImageDisplay();
  }

  function removeRestaurant() {
    console.log("removing restaurant...");
    setMyRestaurant(null);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("restaurant", selectedRestaurant);
    formData.append("rating", rating);
    formData.append("text", text);

    if (image) {
      formData.append("image", image);
    }
    //console.log("form", formData.get("restaurant"));

    //console.log(title);
    if (
      title.length == 0 ||
      selectedRestaurant === "" ||
      isNaN(rating) ||
      text === ""
    ) {
      //console.log("here!")
      setErrorMessage(
        "Please ensure all required fields are completed before submitting."
      );
      //return;
    } else {
      createReview(formData);
    }
  };

  return (
    <div className="p-4 mt-16">
      <h1 className="header">Write a Review</h1>
      {loading ? <Spinner /> : ""}
      <div className="error_message">{errorMessage}</div>
      {openPopUp && (
        <Popup
          open={openPopUp}
          closeOnDocumentClick={false}
          //onClose={() => setOpenPopUp(false)}
        >
          <div className="popup-content">
            <p>Please sign in to comment.</p>
            {
              <Button
                name="signin-button"
                style={{ width: "120px" }}
                href="/login"
              >
                Sign in
              </Button>
            }
          </div>
        </Popup>
      )}

      <form onSubmit={handleSubmit} method="post" enctype="multipart/form-data">
        <div className="restaurant-dropdown">
          <select
            value={selectedRestaurant}
            onChange={(e) => setSelectedRestaurant(e.target.value)}
            className="restaurant-select"
          >
            <option value="">Select a Restaurant</option>
            {restaurants.map((restaurant, index) => (
              //(console.log(index, "rest: ", restaurant))
              <option key={index} value={restaurant.name}>
                {restaurant.name}
              </option>
            ))}
          </select>
          {/* <IoIosArrowDown className="dropdown-arrow" /> */}
        </div>
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
              step="1"
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
            {image && (
              <div className="uploaded-img">
                <img src={imageDisplay} />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => uploadImage(e)}
              name="imageUrl"
            />
            {image && <button onClick={removeImage}>Delete</button>}
          </div>
        </div>
        <div className="description-container">
          <label>Description</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="description-input"
          />
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
