import classes from '../styles/Restaurant.module.css';
import { useState } from 'react';

function Restaurant() {
  const [restaurant_name, setRestaurantName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  //setRestaurantName("Epic at Ackerman");
  /*
  <input
              type="text"
              value={title}
              onChange={() => setRestaurantName("Epic at Ackerman")}
              className="title-input"
              />
  */


  return (
      <div className={`${classes.root}`}>
        <div className={classes.row}>
          <div className={classes.container}>
            <div className={classes.restaurant_name}>Restaurant</div>
            <div className={classes.restaurant_location}>Location</div>
            <div className={classes.rating}>Rating</div>
            <div className={classes.description}>Description
            </div>
          </div> 
          <div className={classes.logo}>
          </div>
        </div>
        <div className={classes.reviews_title}>Reviews</div>
        <div className={classes.reviews_container}>
          <div className={classes.reviews_grid}>
            <div class={classes.grid_item}>1
            <span class={classes.profile_pic}></span>
            </div>
            <div class={classes.grid_item}>2</div>
          </div>
        </div>
        
      </div>
  );
};

export default Restaurant;