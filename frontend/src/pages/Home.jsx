import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5555/reviews")
      .then((res) => {
        setReviews(res.data.data); // Adjust this accordingly
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      });

    // axios
    //   .get("http://localhost:5555/locations")
    //   .then((res) => {
    //     console.log(res.data.data);
    //     setRestaurants(res.data.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching restaurants:", error);
    //     setLoading(false);
    //   });
  }, []);

  return (
    <div>
      <div className="home-container">
        <img src="/tasteUCLA.png" className="tasteucla-logo" />
        {loading ? (
          <Spinner />
        ) : (
          <div className="reviews-grid">
            {reviews.map((review) => (
              <Link
                to={`/reviews/details/${review._id}`}
                key={review._id}
                className="review-card"
              >
                {/* {review.imageUrl && <img src={review.imageUrl} alt="Review" />} */}
                <h1 className="restaurant-name">{review.restaurant.name}</h1>
                <h3>{review.title}</h3>
                <div className="review-rating">
                  <p>{review.user.username}</p>
                  <p>Rating: {review.rating} </p>
                </div>
                {review.imageUrl && (
                  <img
                    src={"http://localhost:5555/" + review.imageUrl}
                    alt={"image can't load"}
                    className="review-image"
                  />
                )}

                <p className="review-description">{review.text}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
