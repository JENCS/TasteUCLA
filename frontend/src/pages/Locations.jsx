import Button from '@mui/material/Button';
import classes from '../styles/Locations.module.css';
import { useState, useEffect } from 'react';
import nc from "/logos/NorthCampus/451.png"
import nc2 from "/logos/NorthCampus/allrise.png"


function Locations() {
  const [NorthCampusRestaurants, setNorthCampusRestaurants] = useState([]);
  const [CentralCampusRestaurants, setCentralCampusRestaurants] = useState([]);
  const [SouthCampusRestaurants, setSouthCampusRestaurants] = useState([]);

  useEffect(() => {
    setNorthCampusRestaurants([
      {name: "Café 451", img: "/logos/NorthCampus/451.png",},
      {name: "All Rise Pizza", img: "/logos/NorthCampus/allrise.png",},
      {name: "Anderson Café", img: "/logos/NorthCampus/anderson.png",},
      {name: "Burger Assembly", img: "/logos/NorthCampus/assembly.png",},
      {name: "Epazote", img: "/logos/NorthCampus/epazote.png",},
      {name: "Fusion", img: "/logos/NorthCampus/fusion.png",},
      {name: "Jimmy's", img: "/logos/NorthCampus/jimmys.png",},
      {name: "Northern Lights", img: "/logos/NorthCampus/northern.png",}
    ]);

    setCentralCampusRestaurants([
      {name: "Bruin Buzz", img: "/logos/CentralCampus/bruin.png",},
      {name: "Carl's Jr.", img: "/logos/CentralCampus/carls.png",},
      {name: "Epicuria at Ackerman", img: "/logos/CentralCampus/epic.png",},
      {name: "Kerckhoff Coffee House", img: "/logos/CentralCampus/kerckhoff.png",},
      {name: "Kikka Sushi", img: "/logos/CentralCampus/kikka.png",},
      {name: "Lollicup Fresh", img: "/logos/CentralCampus/lollicup.png",},
      {name: "Music Cafe", img: "/logos/CentralCampus/music.png",},
      {name: "Panda Express", img: "/logos/CentralCampus/panda.png",},
      {name: "Rubio's", img: "/logos/CentralCampus/rubios.png",},
      {name: "Sambazon", img: "/logos/CentralCampus/sambazon.png",},
      {name: "Taco Bell", img: "/logos/CentralCampus/taco.png",},
      {name: "Veggie Grill", img: "/logos/CentralCampus/veggie.png",},
      {name: "Wetzel's Pretzels", img: "/logos/CentralCampus/wetzel.png",}
    ]);

    setSouthCampusRestaurants([
      {name: "Blaze Pizza", img: "/logos/SouthCampus/blaze.png",},
      {name: "Fusion", img: "/logos/SouthCampus/fusion.png",},
      {name: "ScrubJay Café", img: "/logos/SouthCampus/scrubjay.png",},
      {name: "Southern Lights", img: "/logos/SouthCampus/southern.png",},
      {name: "Subway", img: "/logos/SouthCampus/subway.png",},
      {name: "Café Synapse", img: "/logos/SouthCampus/synapse.png",},
      {name: "Yoshinoya", img: "/logos/SouthCampus/yoshinoya.png",},
      
    ]);
  });

    return (
        <div className={`${classes.root}`}>
            <div className={classes.Locations_title}>Restaurant Locations</div>
            <div className={classes.NorthCampus_title}>North Campus</div>
            <div class={classes.NorthCampus_reviews_grid}>
              {NorthCampusRestaurants.map((restaurant) => (     
                <div class={classes.grid_item}>
                  <a href="/locations/restaurant">
                  <img src={restaurant.img} alt="N/A" />
                  </a>
                  <div className={classes.grid_item_restaurant_name}>{restaurant.name}</div>
                </div>
              ))}
            </div>
            <div className={classes.CentralCampus_title}>Central Campus</div>
            <div class={classes.CentralCampus_reviews_grid}>
            {CentralCampusRestaurants.map((restaurant) => (     
                <div class={classes.grid_item}>
                  <a href="/locations/restaurant">
                  <img src={restaurant.img} alt="N/A" />
                  </a>
                  <div className={classes.grid_item_restaurant_name}>{restaurant.name}</div>
                </div>
              ))}
            </div>
            <div className={classes.SouthCampus_title}>South Campus</div>
            <div class={classes.SouthCampus_reviews_grid}>
              {SouthCampusRestaurants.map((restaurant) => (     
                <div class={classes.grid_item}>
                  <a href= {"/locations/" + restaurant.name}>
                  <img src={restaurant.img} alt="N/A" />
                  </a>
                  <div className={classes.grid_item_restaurant_name}>{restaurant.name}</div>
                </div>
              ))}
            </div>
        </div>
    );
};

export default Locations;
