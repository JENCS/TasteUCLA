import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

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
                {review.imageUrl && (
                  <img
                    src={review.imageUrl}
                    alt={"image can't load"}
                  />
                )}
                {/* {review.imageUrl && <img src={review.imageUrl} alt="Review" />} */}
                <h3>{review.title}</h3>
                <p className="review-rating">
                  Rating by {review.user.username}: {review.rating}
                  <text style={{ color: "gold" }}>
                  {"★ "}
                  </text>
                </p>
                <p>{review.text}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
