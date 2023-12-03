import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import { Buffer } from "buffer";

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageDisplay, setImageDisplay] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5555/reviews")
      .then((res) => {
        setReviews(res.data.data); // Adjust this accordingly
        // if (res.data.data.image) {
        //   const mimeType = "image/png";
        //   const b64 = Buffer.from(res.data.image).toString("base64");
        //   setImageDisplay(`data:${mimeType};base64,${b64}`);
        // }
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
        <h1 className="home-title">TasteUCLA</h1>
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
                <h3>{review.title}</h3>
                {review.image && (
                  <img
                    src={
                      "data:image/png;base64," +
                      Buffer.from(review.image).toString("base64")
                    }
                    alt={"image can't load"}
                  />
                )}
                <p className="review-rating">
                  Rating by {review.author}: {review.rating}
                </p>
                <p>{review.description}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
