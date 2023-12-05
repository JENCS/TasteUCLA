import classes from '../styles/Locations.module.css';
import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar.jsx";

function Locations() {
  const NorthCampusRestaurants = [
    {name: "Café 451", img: "/logos/NorthCampus/451.png", id: "656e8b776c581d194c6d6c05"},
    {name: "All Rise Pizza", img: "/logos/NorthCampus/allrise.png", id: "656e8b776c581d194c6d6c06"},
    {name: "Anderson Café", img: "/logos/NorthCampus/anderson.png", id: "656e8b776c581d194c6d6c07"},
    {name: "Burger Assembly", img: "/logos/NorthCampus/assembly.png", id: "656e8b776c581d194c6d6c08"},
    {name: "Epazote", img: "/logos/NorthCampus/epazote.png", id: "656e8b776c581d194c6d6c09"},
    {name: "Fusion", img: "/logos/NorthCampus/fusion.png", id: "656e8b776c581d194c6d6c0a"},
    {name: "Jimmy's", img: "/logos/NorthCampus/jimmys.png", id: "656e8b776c581d194c6d6c0b"},
    {name: "Northern Lights Café", img: "/logos/NorthCampus/northern.png", id: "656e8b776c581d194c6d6c0c"}
  ]

  const CentralCampusRestaurants = [
    {name: "Bruin Buzz", img: "/logos/CentralCampus/bruin.png", id: "656e8949c2fd5dacf99c5106"},
    {name: "Carl's Jr.", img: "/logos/CentralCampus/carls.png", id: "656e8949c2fd5dacf99c5107"},
    {name: "Epicuria at Ackerman", img: "/logos/CentralCampus/epic.png", id: "656e8949c2fd5dacf99c5108"},
    {name: "Kerckhoff Coffee House", img: "/logos/CentralCampus/kerckhoff.png", id: "656e8949c2fd5dacf99c5109"},
    {name: "Kikka Sushi", img: "/logos/CentralCampus/kikka.png", id: "656e8949c2fd5dacf99c510a"},
    {name: "Lollicup Fresh", img: "/logos/CentralCampus/lollicup.png", id: "656e8949c2fd5dacf99c510b"},
    {name: "Music Café", img: "/logos/CentralCampus/music.png", id: "656e8949c2fd5dacf99c510c"},
    {name: "Panda Express", img: "/logos/CentralCampus/panda.png", id: "656e8949c2fd5dacf99c510d"},
    {name: "Rubio's", img: "/logos/CentralCampus/rubios.png", id: "656e8949c2fd5dacf99c510e"},
    {name: "Sambazon", img: "/logos/CentralCampus/sambazon.png", id: "656e8949c2fd5dacf99c510f"},
    {name: "Taco Bell", img: "/logos/CentralCampus/taco.png", id: "656e8a66b8810ee7997c4b5c"},
    {name: "Veggie Grill", img: "/logos/CentralCampus/veggie.png", id: "656e8a66b8810ee7997c4b5d"},
    {name: "Wetzel's Pretzels", img: "/logos/CentralCampus/wetzel.png", id: "656e8949c2fd5dacf99c5112"}
  ]
  
  const SouthCampusRestaurants = [
    {name: "Blaze Pizza", img: "/logos/SouthCampus/blaze.png", id: "656e8d3df40395536ccb0935"},
    {name: "Fusion", img: "/logos/SouthCampus/fusion.png", id: "656e8d3df40395536ccb0936"},
    {name: "ScrubJay Café", img: "/logos/SouthCampus/scrubjay.png", id: "656e8d3df40395536ccb0937"},
    {name: "Southern Lights Café", img: "/logos/SouthCampus/southern.png", id: "656e8d3df40395536ccb0938"},
    {name: "Subway", img: "/logos/SouthCampus/subway.png", id: "656e8d3df40395536ccb0939"},
    {name: "Café Synapse", img: "/logos/SouthCampus/synapse.png", id: "656e8d3df40395536ccb093a"},
    {name: "Yoshinoya", img: "/logos/SouthCampus/yoshinoya.png", id: "656e8d3df40395536ccb093b"},
  ]

    return (
        <div className={classes.root}>
            <div className={classes.Locations_title}>Restaurant Locations</div>
            <div className={classes.NorthCampus_title}>North Campus</div>
            <div className={classes.NorthCampus_reviews_grid}>
              {NorthCampusRestaurants.map((restaurant, index) => (     
                <div className={classes.grid_item} key={index}>
                  <a href={"/locations/" + restaurant.id}>
                  <img src={restaurant.img} alt="N/A" />
                  </a>
                  <div className={classes.grid_item_restaurant_name}>{restaurant.name}</div>
                </div>
              ))}
            </div>
            <div className={classes.CentralCampus_title}>Central Campus</div>
            <div className={classes.CentralCampus_reviews_grid}>
            {CentralCampusRestaurants.map((restaurant, index) => (     
                <div className={classes.grid_item} key={index}>
                  <a href={"/locations/" + restaurant.id}>
                  <img src={restaurant.img} alt="N/A" />
                  </a>
                  <div className={classes.grid_item_restaurant_name}>{restaurant.name}</div>
                </div>
              ))}
            </div>
            <div className={classes.SouthCampus_title}>South Campus</div>
            <div className={classes.SouthCampus_reviews_grid}>
              {SouthCampusRestaurants.map((restaurant, index) => (     
                <div className={classes.grid_item} key={index}>
                  <a href= {"/locations/" + restaurant.id}>
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
