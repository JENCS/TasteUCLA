import Button from '@mui/material/Button';
import classes from '../styles/Locations.module.css';
import { useState } from 'react';

function Locations() {
  const [NorthCampusRestaurants, setNorthCampusRestaurants] = useState([]);
  
    return (
        <div className={`${classes.root}`}>
            <div className={classes.Locations_title}>Restaurant Locations</div>
            <div className={classes.NorthCampus_title}>North Campus</div>
            <div class={classes.NorthCampus_reviews_grid}>
              <div class={classes.grid_item}>
                <a href="/locations/restaurant">
                <img src="123.jpeg"></img>
                </a>
                </div>
              <div class={classes.grid_item}>2</div>
              <div class={classes.grid_item}>3</div>
              <div class={classes.grid_item}>4</div>
              <div class={classes.grid_item}>5</div>
              <div class={classes.grid_item}>6</div>
              <div class={classes.grid_item}>7</div>
              <div class={classes.grid_item}>8</div>
              <div class={classes.grid_item}>9</div>
              <div class={classes.grid_item}>10</div>
              <div class={classes.grid_item}>11</div>
              <div class={classes.grid_item}>12</div>
            </div>
            <div className={classes.CentralCampus_title}>Central Campus</div>
            <div class={classes.CentralCampus_reviews_grid}>
            <div class={classes.grid_item}>1</div>
              <div class={classes.grid_item}>2</div>
              <div class={classes.grid_item}>3</div>
              <div class={classes.grid_item}>4</div>
              <div class={classes.grid_item}>5</div>
              <div class={classes.grid_item}>6</div>
              <div class={classes.grid_item}>7</div>
              <div class={classes.grid_item}>8</div>
              <div class={classes.grid_item}>9</div>
              <div class={classes.grid_item}>10</div>
              <div class={classes.grid_item}>11</div>
              <div class={classes.grid_item}>12</div>
            </div>
            <div className={classes.CentralCampus_title}>South Campus</div>
            <div class={classes.CentralCampus_reviews_grid}>
            <div class={classes.grid_item}>1</div>
              <div class={classes.grid_item}>2</div>
              <div class={classes.grid_item}>3</div>
              <div class={classes.grid_item}>4</div>
              <div class={classes.grid_item}>5</div>
              <div class={classes.grid_item}>6</div>
              <div class={classes.grid_item}>7</div>
              <div class={classes.grid_item}>8</div>
              <div class={classes.grid_item}>9</div>
              <div class={classes.grid_item}>10</div>
              <div class={classes.grid_item}>11</div>
              <div class={classes.grid_item}>12</div>
            </div>
        </div>
    );
};

export default Locations;
