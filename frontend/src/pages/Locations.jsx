import classes from "../styles/Locations.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Locations() {
  const NorthCampusRestaurants = [
    {
      name: "Café 451",
      img: "/logos/657145cab6a35d3fc51c4423.png",
      id: "657145cab6a35d3fc51c4423",
    },
    {
      name: "All Rise Pizza",
      img: "/logos/657145cab6a35d3fc51c4424.png",
      id: "657145cab6a35d3fc51c4424",
    },
    {
      name: "Anderson Café",
      img: "/logos/657145cab6a35d3fc51c4425.png",
      id: "657145cab6a35d3fc51c4425",
    },
    {
      name: "Burger Assembly",
      img: "/logos/657145cab6a35d3fc51c4426.png",
      id: "657145cab6a35d3fc51c4426",
    },
    {
      name: "Epazote",
      img: "/logos/657145cab6a35d3fc51c4427.png",
      id: "657145cab6a35d3fc51c4427",
    },
    {
      name: "Fusion",
      img: "/logos/657145cab6a35d3fc51c4428.png",
      id: "657145cab6a35d3fc51c4428",
    },
    {
      name: "Jimmy's",
      img: "/logos/657145cab6a35d3fc51c4429.png",
      id: "657145cab6a35d3fc51c4429",
    },
    {
      name: "Northern Lights Café",
      img: "/logos/657145cab6a35d3fc51c442a.png",
      id: "657145cab6a35d3fc51c442a",
    },
  ];

  const CentralCampusRestaurants = [
    {
      name: "Bruin Buzz",
      img: "/logos/65714587c0416ee8c923f980.png",
      id: "65714587c0416ee8c923f980",
    },
    {
      name: "Carl's Jr.",
      img: "/logos/65714587c0416ee8c923f981.png",
      id: "65714587c0416ee8c923f981",
    },
    {
      name: "Epicuria at Ackerman",
      img: "/logos/65714587c0416ee8c923f982.png",
      id: "65714587c0416ee8c923f982",
    },
    {
      name: "Kerckhoff Coffee House",
      img: "/logos/65714587c0416ee8c923f983.png",
      id: "65714587c0416ee8c923f983",
    },
    {
      name: "Kikka Sushi",
      img: "/logos/65714587c0416ee8c923f984.png",
      id: "65714587c0416ee8c923f984",
    },
    {
      name: "Lollicup Fresh",
      img: "/logos/65714587c0416ee8c923f985.png",
      id: "65714587c0416ee8c923f985",
    },
    {
      name: "Music Café",
      img: "/logos/65714587c0416ee8c923f986.png",
      id: "65714587c0416ee8c923f986",
    },
    {
      name: "Panda Express",
      img: "/logos/65714587c0416ee8c923f987.png",
      id: "65714587c0416ee8c923f987",
    },
    {
      name: "Rubio's",
      img: "/logos/65714587c0416ee8c923f988.png",
      id: "65714587c0416ee8c923f988",
    },
    {
      name: "Sambazon",
      img: "/logos/65714587c0416ee8c923f989.png",
      id: "65714587c0416ee8c923f989",
    },
    {
      name: "Taco Bell",
      img: "/logos/65714587c0416ee8c923f98a.png",
      id: "65714587c0416ee8c923f98a",
    },
    {
      name: "Veggie Grill",
      img: "/logos/65714587c0416ee8c923f98b.png",
      id: "65714587c0416ee8c923f98b",
    },
    {
      name: "Wetzel's Pretzels",
      img: "/logos/65714587c0416ee8c923f98c.png",
      id: "65714587c0416ee8c923f98c",
    },
  ];

  const SouthCampusRestaurants = [
    {
      name: "Blaze Pizza",
      img: "/logos/6571449c0859299910c3e0b6.png",
      id: "6571449c0859299910c3e0b6",
    },
    {
      name: "Fusion",
      img: "/logos/6571449c0859299910c3e0b7.png",
      id: "6571449c0859299910c3e0b7",
    },
    {
      name: "ScrubJay Café",
      img: "/logos/6571449c0859299910c3e0b8.png",
      id: "6571449c0859299910c3e0b8",
    },
    {
      name: "Southern Lights Café",
      img: "/logos/6571449c0859299910c3e0b9.png",
      id: "6571449c0859299910c3e0b9",
    },
    {
      name: "Subway",
      img: "/logos/6571449c0859299910c3e0ba.png",
      id: "6571449c0859299910c3e0ba",
    },
    {
      name: "Café Synapse",
      img: "/logos/6571449c0859299910c3e0bb.png",
      id: "6571449c0859299910c3e0bb",
    },
    {
      name: "Yoshinoya",
      img: "/logos/6571449c0859299910c3e0bc.png",
      id: "6571449c0859299910c3e0bc",
    },
  ];

  return (
    <div className={classes.root}>
      <div className={classes.Locations_title}>Restaurant Locations</div>
      <div className={classes.NorthCampus_title}>North Campus</div>
      <div className={classes.NorthCampus_reviews_grid}>
        {NorthCampusRestaurants.map((restaurant, index) => (
          <Link to={"/locations/" + restaurant.id}>
            <div className={classes.grid_item} key={index}>
              <img src={restaurant.img} alt="N/A" />
              <div className={classes.grid_item_restaurant_name}>
                {restaurant.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className={classes.CentralCampus_title}>Central Campus</div>
      <div className={classes.CentralCampus_reviews_grid}>
        {CentralCampusRestaurants.map((restaurant, index) => (
          <Link to={"/locations/" + restaurant.id}>
            <div className={classes.grid_item} key={index}>
              <img src={restaurant.img} alt="N/A" />
              <div className={classes.grid_item_restaurant_name}>
                {restaurant.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className={classes.SouthCampus_title}>South Campus</div>
      <div className={classes.SouthCampus_reviews_grid}>
        {SouthCampusRestaurants.map((restaurant, index) => (
          <Link to={"/locations/" + restaurant.id}>
            <div className={classes.grid_item} key={index}>
              <img src={restaurant.img} alt="N/A" />
              <div className={classes.grid_item_restaurant_name}>
                {restaurant.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Locations;
