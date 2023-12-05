import classes from '../styles/Restaurant.module.css';
import React, { useState,  useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from "../components/Spinner";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Buffer } from "buffer";

function Restaurant() {
  const [restaurant, setRestaurant] = useState({});
  const [restaurantLoading, setRestaurantLoading] = useState(true);
  const [restaurant_rating, setRestaurantRating] = useState(0);

  const [imageDisplay, setImageDisplay] = useState(null);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    setRestaurantRating(5);

    axios.get('http://localhost:5555/reviews')
    .then((res) => {
      setReviews(res.data.data); 
      setReviewsLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching reviews:', error);
      setReviewsLoading(false);
    });

    axios.get(`http://localhost:5555/locations/${id}`)
    .then((res) => {
      setRestaurant(res.data); 
      const mimeType = "image/png";
      const b64 = Buffer.from(res.data.image).toString("base64");
      setImageDisplay(`data:${mimeType};base64,${b64}`);
      setRestaurantLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching restaurant:', error);
    });
  }, [] 
    
  );

  
  return (
      <div className={classes.root}>
          <div className={classes.row}>
            <div className={classes.container}>
              <div className={classes.restaurant_name}>{restaurant.name}</div>
              <BackButton destination='/locations'/>
              <div className={classes.restaurant_location}>{restaurant.location}</div>
              <div className={classes.rating}>{"Overall Rating:  " + restaurant_rating}</div>
              <div className={classes.description}>{restaurant.description}</div>
            </div> 
            <div className={classes.logo}>
            <img src={imageDisplay} width = {"500px"}alt={"image can't load"} />
            </div>
          </div>
          <div className={classes.reviews_header}>Reviews:</div>
          <div className={classes.reviews_container}>
          {reviewsLoading ? (
            <Spinner />
            ) : (
              <div className={classes.reviews_grid}>
              {reviews.map((review, index) => (
                <div className={classes.reviews_grid_item} key={index}>
                  <div className={classes.review_content}>
                    <div className={classes.user_container}>
                      <div className={classes.username}>{"user"}</div>
                      <div className={classes.profile_pic}>
                      <img src={"/logos/CentralCampus/lollicup.png"} border-radius={"50%"} alt={"image can't load"}/>
                      </div>
                    </div>
                    <div className={classes.rating_desc_container}>
                      <div className={classes.review_image}>
                        <img src={""} alt={"image can't load"}/>
                      </div>
                      <div className={classes.review_rating}>{"Rating: " + review.rating}</div>
                      <div className={classes.review_title}>{review.title}</div>
                      <div className={classes.review_description}>
                        {review.description}
                      </div>
                    </div>
                  </div>
                  <div className={classes.comments_header}> Others have commented on your review... </div>
                  <div className={classes.comments_grid}>
                      <div className={classes.comments_grid_item}>
                        <div className={classes.comments_content}>
                          <div className={classes.comments_user_container}>
                            <div className={classes.comments_username}>{"user"}</div>
                            <div className={classes.comments_profile_pic}>
                            <img src={""} border-radius={"50%"} alt={"image can't load"}/>
                            </div>
                          </div>
                          <div className={classes.comments_description}>
                          {"Cool review"}
                          </div>
                        </div>
                      </div>
                    <div className={classes.comments_grid_item}>2</div>
                    <div className={classes.comments_grid_item}>3</div>
                  </div>
                  
                </div>
                ))}
              </div>
              )}
          </div>
      </div>
  );
};

export default Restaurant;