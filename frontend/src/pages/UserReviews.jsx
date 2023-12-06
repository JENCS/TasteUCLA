import "../styles/UserReviews.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

export default function UserReviews() {
  const [myReviews, setMyReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5555/reviews")
      .then((res) => {
        setMyReviews(res.data.data); // Adjust this accordingly
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="my-reviews-container">
      <div className="my-reviews-header">
        <h1 className="my-reviews-title">My Reviews</h1>
        <div className="home-logo"></div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="reviews-grid">
          {myReviews.map((review) => (
            <Link
              to={`/reviews/details/${review._id}`}
              key={review._id}
              className="review-card"
            >
              <h3>{review.title}</h3>
              {review.rating && (
                <p className="review-rating">
                  Rating by {review.author}: {review.rating}
                </p>
              )}
              <p>{review.description}description here!!!</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  // const [myReviews, setMyReviews] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5555/reviews")
  //     .then((res) => {
  //       setMyReviews(res.data.data); // Adjust this accordingly
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching reviews:", error);
  //       setLoading(false);
  //     });
  // }, []);

  // return (
  //   <div className="my-reviews-container">
  //     <h1>My Reviews</h1>
  //     {loading ? (
  //       <Spinner className="spinner" />
  //     ) : (
  //       <div className="my-reviews-grid">
  //         {myReviews.map((review) => {
  //           <Link
  //             to={`/reviews/details/${review._id}`}
  //             key={review._id}
  //             className="review-card"
  //           >
  //             <h1>This is my review</h1>
  //             {review.title}
  //           </Link>;
  //         })}
  //       </div>
  //     )}
  //   </div>
  // );
  // return <div>{loading ? (<Spinner />) : (<p>p</p>
  // <h1>My Reviews</h1>
  // )}</div>;
}
