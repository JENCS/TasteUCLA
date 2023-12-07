import classes from "../styles/MyReviews.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

export default function MyReviews({ getMyReviews }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyReviews()
      .then((res) => {
        setReviews(res);
        setLoading(false);
      })
  }, []);

  return (
    <div className={classes.root}>
      <div className="my-reviews-container">
        <div className="my-reviews-header">
          <h1 className={classes.myreviews_title}>My Reviews</h1>
          <div className="home-logo"></div>
        </div>
        <div className={classes.results_container}>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className={classes.reviews_container}>
                {reviews.length === 0 ? (
                  <div className={classes.not_found_message}>You do not have any reviews</div>
                ) : (
                  <div className={classes.section_grid}>
                    {reviews.map((review, index) => (
                      <Link key={index} className={classes.section_grid_item} to={"/reviews/details/" + review._id}>
                        <div className={classes.section_grid_item_col}>
                          <div>
                            {review.imageUrl !== null ? (
                              <img className={classes.grid_item_img} src={"/tasteUCLA.png"/*review.imageUrl*/} alt={"Image failed"}/>
                            ) : (
                              <div style={{
                                margin: "10px",
                                offset: "10px",
                                width: "20px",
                                height: "20px",
                                backgroundColor: "rgb(" + ((Math.random() * 100) + 155) + "," + ((Math.random() * 100) + 155) + "," + ((Math.random() * 100) + 155) + ")"
                              }} className="home-logo"></div>
                            )}
                          </div>
                          <div>
                            <div className={classes.grid_item_title}>{review.title}</div>
                            <div className={classes.grid_item_text}>{review.text}</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
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
