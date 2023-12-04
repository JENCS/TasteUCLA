import classes from '../styles/Restaurant.module.css';
import { useState,  useEffect } from 'react';

function Restaurant() {
  const [restaurant_name, setRestaurantName] = useState("");
  const [restaurant_location, setRestaurantLocation] = useState("");
  const [restaurant_rating, setRestaurantRating] = useState(0);
  const [restaurant_description, setRestaurantDescription] = useState("");

  const [reviewer_username, setReviewerUsername] = useState("");
  const [reviewer_rating, setReviewerRating] = useState(0);
  const [reviewer_title, setReviewerTitle] = useState("");
  const [reviewer_description, setReviewerDescription] = useState("");

  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setRestaurantName("Epic at Ackerman");
    setRestaurantLocation("Central Campus");
    setRestaurantRating(5);
    setRestaurantDescription("Fresh taste of the Mediterranean and great selection of freshly prepared pizzas, salads, sandwiches and pastas.");

    
  });
  
  return (
      <div className={`${classes.root}`}>
        <div className={classes.row}>
          <div className={classes.container}>
            <div className={classes.restaurant_name}>{restaurant_name}</div>
            <div className={classes.restaurant_location}>{restaurant_location}</div>
            <div className={classes.rating}>{"Overall Rating:  " + restaurant_rating}</div>
            <div className={classes.description}>{restaurant_description}</div>
          </div> 
          <div className={classes.logo}>
          <img src={"/logos/CentralCampus/bruin.png"} width = {"500px"}alt={"image can't load"} />
          </div>
        </div>
        <div className={classes.reviews_header}>Reviews:</div>
        <div className={classes.reviews_container}>
          <div className={classes.reviews_grid}>
            <div class={classes.reviews_grid_item}>
              <div className={classes.review_content}>
                <div class={classes.user_container}>
                  <div class={classes.username}>{"user"}</div>
                  <div class={classes.profile_pic}>
                  <img src={"/a.png"} border-radius={"50%"} alt={"image can't load"}/>
                  </div>
                </div>
                <div class={classes.rating_desc_container}>
                  <div class={classes.review_image}>
                  <img src={"/logos/CentralCampus/bruin.png"} width = {"300px"}alt={"image can't load"} />
                  </div>
                  <div class={classes.review_rating}>Rating: </div>
                  <div class={classes.review_title}>A Flavorful Journey at Chipotle</div>
                  <div class={classes.review_description}>
                    {"Chipotle Mexican Grill offers a unique and customizable dining experience that caters to those seeking fresh, fast, and flavorful Mexican-inspired cuisine. Located in [City], the restaurant boasts a minimalist yet inviting atmosphere, with a focus on efficiency and transparency in food preparation. One of Chipotle's standout features is its commitment to using high-quality ingredients. The menu emphasizes responsibly sourced meats, organic produce, and wholesome grains. This dedication to quality is evident in the rich flavors and vibrant textures found in each dish. The cornerstone of Chipotle's menu is its burritos, bowls, tacos, and salads, all of which allow customers to tailor their meals to their preferences. The protein choices include grilled chicken, barbacoa, carnitas, sofritas (tofu), and more. The toppings range from classic options like pico de gallo and guacamole to less conventional choices like corn salsa and queso. This customization aspect caters to a diverse range of taste preferences, making Chipotle an inclusive dining option for various dietary needs. While the customization is a strength, it can also be a potential pitfall if not managed efficiently. During peak hours, the line can be long, leading to a wait for your order. However, the staff at Chipotle is generally quick and efficient, ensuring that the process moves along as smoothly as possible. The restaurant's commitment to sustainability is commendable. From its responsibly raised meats to its recycling initiatives, Chipotle strives to minimize its environmental impact. This commitment adds to the overall appeal for customers who prioritize ethical dining choices. In terms of taste, Chipotle excels in delivering bold and authentic flavors. The marinades, salsas, and sauces contribute to a well-balanced and satisfying dining experience. The guacamole, prepared fresh daily, is a must-try and adds a creamy richness to any dish. In conclusion, Chipotle Mexican Grill offers a reliable and enjoyable dining experience with its fresh, customizable menu. While the customization process may lead to longer wait times during peak hours, the quality of ingredients, commitment to sustainability, and bold flavors make Chipotle a go-to choice for a quick and satisfying Mexican-inspired meal."}
                  </div>
                </div>
              </div>
              <div class={classes.comments_header}> Others have commented on your review... </div>
              <div class={classes.comments_grid}>
                <div class={classes.comments_grid_item}>
                  <div class={classes.comments_content}>
                    <div class={classes.comments_user_container}>
                      <div class={classes.comments_username}>{"user"}</div>
                      <span class={classes.comments_profile_pic}></span>
                    </div>
                    <div class={classes.comments_description}>
                    {"Chipotle Mexican Grill offers a unique and customizable dining experience that caters to those seeking fresh, fast, and flavorful Mexican-inspired cuisine. Located in [City], the restaurant boasts a minimalist yet inviting atmosphere, with a focus on efficiency and transparency in food preparation. One of Chipotle's standout features is its commitment to using high-quality ingredients. The menu emphasizes responsibly sourced meats, organic produce, and wholesome grains. This dedication to quality is evident in the rich flavors and vibrant textures found in each dish. The cornerstone of Chipotle's menu is its burritos, bowls, tacos, and salads, all of which allow customers to tailor their meals to their preferences. The protein choices include grilled chicken, barbacoa, carnitas, sofritas (tofu), and more. The toppings range from classic options like pico de gallo and guacamole to less conventional choices like corn salsa and queso. This customization aspect caters to a diverse range of taste preferences, making Chipotle an inclusive dining option for various dietary needs. While the customization is a strength, it can also be a potential pitfall if not managed efficiently. During peak hours, the line can be long, leading to a wait for your order. However, the staff at Chipotle is generally quick and efficient, ensuring that the process moves along as smoothly as possible. The restaurant's commitment to sustainability is commendable. From its responsibly raised meats to its recycling initiatives, Chipotle strives to minimize its environmental impact. This commitment adds to the overall appeal for customers who prioritize ethical dining choices. In terms of taste, Chipotle excels in delivering bold and authentic flavors. The marinades, salsas, and sauces contribute to a well-balanced and satisfying dining experience. The guacamole, prepared fresh daily, is a must-try and adds a creamy richness to any dish. In conclusion, Chipotle Mexican Grill offers a reliable and enjoyable dining experience with its fresh, customizable menu. While the customization process may lead to longer wait times during peak hours, the quality of ingredients, commitment to sustainability, and bold flavors make Chipotle a go-to choice for a quick and satisfying Mexican-inspired meal."}
                    </div>
                  </div>
                </div>
                <div class={classes.comments_grid_item}>2</div>
                <div class={classes.comments_grid_item}>3</div>
              </div>
            </div>
            <div class={classes.reviews_grid_item}>2</div>
            <div class={classes.reviews_grid_item}>3</div>
            <div class={classes.reviews_grid_item}>4</div>
          </div>
        </div>
        
      </div>
  );
};

export default Restaurant;