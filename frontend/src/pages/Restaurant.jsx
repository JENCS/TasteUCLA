import classes from '../styles/Restaurant.module.css';
import { useState,  useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from "../components/Spinner";
import axios from "axios";

function Restaurant() {
  const [restaurant_name, setRestaurantName] = useState("");
  const [restaurant_location, setRestaurantLocation] = useState("");
  const [restaurant_rating, setRestaurantRating] = useState(0);
  const [restaurant_description, setRestaurantDescription] = useState("");

  const [reviewer_username, setReviewerUsername] = useState("");
  const [reviewer_rating, setReviewerRating] = useState(0);
  const [reviewer_title, setReviewerTitle] = useState("");
  const [reviewer_description, setReviewerDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setRestaurantName("Epic at Ackerman");
    setRestaurantLocation("Central Campus");
    setRestaurantRating(5);
    setRestaurantDescription("Fresh taste of the Mediterranean and great selection of freshly prepared pizzas, salads, sandwiches and pastas. Fresh taste of the Mediterranean and great selection of freshly prepared pizzas, salads, sandwiches and pastas.");

    axios.get('http://localhost:5555/reviews')
    .then((res) => {
      setReviews(res.data.data.slice(-4)); 
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching reviews:', error);
      setLoading(false);
    });
  }, [] );
  
  return (
      <div className={`${classes.root}`}>
        <div className={classes.row}>
          <div className={classes.container}>
            <div className={classes.restaurant_name}>{restaurant_name}</div>
            <BackButton destination='/locations'/>
            <div className={classes.restaurant_location}>{restaurant_location}</div>
            <div className={classes.rating}>{"Overall Rating:  " + restaurant_rating}</div>
            <div className={classes.description}>{restaurant_description}</div>
          </div> 
          <div className={classes.logo}>
          <img src={"/logos/CentralCampus/epic.png"} width = {"500px"}alt={"image can't load"} />
          </div>
        </div>
        <div className={classes.reviews_header}>Reviews:</div>
        <div className={classes.reviews_container}>
        {loading ? (
          <Spinner />
          ) : (
            <div className={classes.reviews_grid}>
            {reviews.map((review) => (
              <div class={classes.reviews_grid_item}>
                <div className={classes.review_content}>
                  <div class={classes.user_container}>
                    <div class={classes.username}>{"user"}</div>
                    <div class={classes.profile_pic}>
                    <img src={"/logos/CentralCampus/lollicup.png"} border-radius={"50%"} alt={"image can't load"}/>
                    </div>
                  </div>
                  <div class={classes.rating_desc_container}>
                    <div class={classes.review_image}>
                    <img src={"/logos/CentralCampus/bruin.png"} width = {"300px"}alt={"image can't load"} />
                    </div>
                    <div class={classes.review_rating}>{"Rating: " + review.rating}</div>
                    <div class={classes.review_title}>{review.title}</div>
                    <div class={classes.review_description}>
                      {review.description}
                    </div>
                  </div>
                </div>
                <div class={classes.comments_header}> Others have commented on your review... </div>
                <div class={classes.comments_grid}>
                  <div class={classes.comments_grid_item}>
                    <div class={classes.comments_content}>
                      <div class={classes.comments_user_container}>
                        <div class={classes.comments_username}>{"user"}</div>
                        <div class={classes.comments_profile_pic}>
                        <img src={"/logos/CentralCampus/lollicup.png"} border-radius={"50%"} alt={"image can't load"}/>
                        </div>
                      </div>
                      <div class={classes.comments_description}>
                      {"Cool review"}
                      </div>
                    </div>
                  </div>
                  <div class={classes.comments_grid_item}>2</div>
                  <div class={classes.comments_grid_item}>3</div>
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