import classes from "../styles/Restaurant.module.css";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import Button from "@mui/material/Button";

function Restaurant({ loggedIn, setMyRestaurant }) {
  const [restaurant, setRestaurant] = useState({});
  const [restaurantRating, setRestaurantRating] = useState("");
  const [numOfReviews, setNumOfReviews] = useState(0);

  const [imageDisplay, setImageDisplay] = useState(null);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [ratingLoading, setRatingsLoading] = useState(true);
  const [commentsExist, setCommentsExist] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [images, setImages] = useState([]);
  const [I, setI] = useState(null);

  const { id } = useParams();

  function sendRestaurant() {
    setMyRestaurant(restaurant.name);
  }

  const getRestaurantRating = () => {
    let sum = 0;
    for (let i = 0; i < reviews.length; i++) {
      sum += reviews[i].rating;
    }
    setRatingsLoading(false);
    return Math.round((sum / reviews.length) * 100) / 100;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5555/locations/${id}`)
      .then((res) => {
        setRestaurant(res.data);
        let reviews = res.data.reviews;
        reviews.map((review) => {
          let creationTime = new Date(review.createdAt);
          let updateTime = new Date(review.updatedAt);
          review.createdAt = creationTime.toString();
          review.updatedAt = updateTime.toString();

          let comments = review.comments;
          comments.map((comment) => {
            let creationTime = new Date(comment.createdAt);
            comment.createdAt = creationTime.toString();
        })
        })
        setReviews(reviews);
        setNumOfReviews(res.data.reviews.length);
        setReviewsLoading(false);
        setRestaurantRating(getRestaurantRating().toString());
      })
      .catch((error) => {
        console.error("Error fetching restaurant:", error);
        setReviewsLoading(false);
      });

    if (isNaN(restaurantRating) && numOfReviews != 0) {
      setRestaurantRating("Loading...");
      setRatingsLoading(false);
    }

    if (isNaN(restaurantRating) && numOfReviews == 0) {
      setRestaurantRating("No reviews");
      setRatingsLoading(false);
    }
  }, [getRestaurantRating]);

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <div className={classes.container}>
          <div className={classes.restaurant_name}>{restaurant.name}</div>
          <div className={classes.restaurant_location}>
            {restaurant.location}
          </div>
          {ratingLoading ? (
            <Spinner />
          ) : (
            <div className={classes.rating}>
              {restaurantRating != "No reviews" && (
                <>
                  {"Overall Rating:  " + restaurantRating}
                  <div style={{ color: "gold" }}>{"★ "}</div>
                  <div fontSize={"10px"} style={{ color: "gray" }}>
                    {"    (" + numOfReviews + " review(s))"}
                  </div>
                </>
              )}
              {restaurantRating === "No reviews" && <>{restaurantRating}</>}
            </div>
          )}
          <div className={classes.description}>{restaurant.description}</div>
          {!reviewsLoading && !ratingLoading && (
            <div className={classes.write_review_button}>
              {loggedIn && (
                <Link to="/reviews/create">
                  <button onClick={sendRestaurant}>Write a Review</button>
                </Link>
              )}
              {!loggedIn && (
                <Link to="/login">
                  <button
                    onClick={() => {
                      setMyRestaurant(restaurant.name);
                    }}
                  >
                    Write a Review
                  </button>
                </Link>
              )}
            </div>
          )}
        </div>
        <div className={classes.logo}>
          <img
            src={"/logos/" + restaurant._id + ".png"}
            height={"500px"}
            width={"500px"}
            alt={"Loading..."}
          />
        </div>
      </div>
      <div>
        {reviews.length ? (
          <div className={classes.reviews_header}>Reviews:</div>
        ) : (
          <div></div>
        )}
      </div>
      <div className={classes.reviews_container}>
        {reviewsLoading ? (
          <Spinner />
        ) : (
          <div className={classes.reviews_grid}>
            {reviews.map((review, index) => (
              <div className={classes.reviews_grid_item} key={index}>
                <div className={classes.review_content}>
                  <div className={classes.user_container}>
                    <div className={classes.username}>
                      {review.user.username}
                    </div>
                    {review.user.imageUrl ? (
                      <div className={classes.profile_pic}>
                        <img
                          src={review.user.imageUrl}
                          border-radius={"50%"}
                          alt={"image can't load"}
                        />
                      </div>
                    ) : (
                      <div className={classes.default_profile_pic}>
                        <CgProfile />
                      </div>
                    )}
                  </div>
                  <div className={classes.rating_desc_container}>
                    <div className={classes.review_image}>
                      {review.imageUrl && (
                        <img
                          src={review.imageUrl}
                          alt={"image can't load"}
                          className="review_image"
                        />
                      )}
                    </div>
                    <div className={classes.review_rating}>
                      {"Rating: " + review.rating}
                      <div style={{ color: "gold" }}>{"★ "}</div>
                    </div>
                    <div className={classes.review_title}>{review.title}</div>
                    <div className={classes.review_description}>{""}</div>
                    <div className={classes.created_time}>
                      {"Created at: " + review.createdAt}
                    </div>
                    <div className={classes.updated_time}>
                      {"Updated at: " + review.updatedAt}
                    </div>

                    <Link
                      name="review-button"
                      style={{ width: "120px", paddingTop: "5px" }}
                      to={`/reviews/details/${review._id}`}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
                <div>
                  {review.comments.length ? (
                    <div className={classes.comments_header}>
                      Others have commented on your review...
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className={classes.comments_grid}>
                  {review.comments.map((comment, index) => (
                    <div className={classes.comments_grid_item} key={index}>
                      <div className={classes.comments_content}>
                        <div className={classes.comments_user_container}>
                          <div className={classes.comments_username}>
                            {comment.user.username}
                          </div>
                          {comment.user.imageUrl ? (
                            <div className={classes.comments_profile_pic}>
                              <img
                                src={comment.user.imageUrl}
                                border-radius={"50%"}
                                alt={"image can't load"}
                              />
                            </div>
                          ) : (
                            <div
                              className={classes.comments_default_profile_pic}
                            >
                              <CgProfile />
                            </div>
                          )}
                        </div>
                        <div className={classes.comments}>
                          <div className={classes.comments_description}>
                            {comment.body}
                          </div>
                          <div className={classes.created_time_comment}>
                            {"Created at: " + comment.createdAt}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Restaurant;
