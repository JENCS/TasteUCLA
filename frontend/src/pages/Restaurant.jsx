import classes from '../styles/Restaurant.module.css';
import { useState } from 'react';

function Restaurant() {
  return (
      <div className={`${classes.root}`}>
        <div className={classes.restaurant_name}>Restaurant</div>
        <p>HI</p>
        <div className={classes.restaurant_location}>Location</div>
      </div>
  );
};

export default Restaurant;