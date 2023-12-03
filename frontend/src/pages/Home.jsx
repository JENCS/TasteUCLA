import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import '../styles/Home.css'; 

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5555/reviews')
      .then((res) => {
        setReviews(res.data.data); // Adjust this accordingly
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <h1 className="home-title">TasteUCLA</h1>
        <div className="home-logo"></div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="reviews-grid">
            {reviews.map((review) => (
              <Link to={`/reviews/details/${review._id}`} key={review._id} className="review-card">
                <img src="/munch.jpeg" alt={"image can't load"} />
                <h3>{review.title}</h3>
                {review.rating && (
                  <p className="review-rating">Rating by {review.author}: {review.rating}</p>
                )}
                <p>{review.description}description here!!!</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
