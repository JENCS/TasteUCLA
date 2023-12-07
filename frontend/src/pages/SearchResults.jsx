import Spinner from "../components/Spinner";
import axios from "axios";
import classes from "../styles/SearchResults.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CgGlassAlt } from "react-icons/cg";

function SearchResults() {
  const [restaurants, setRestResults] = useState([]);
  const [users, setUserResults] = useState([]);
  const [reviews, setReviewResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { query } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5555/search/${query}`)
      .then((res) => {
        setRestResults(res.data.restaurants);
        setUserResults(res.data.users);
        setReviewResults(res.data.reviews);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching search results", error);
        setLoading(false);
      });
  }, [query]);

  return (
    <div className={classes.root}>
      <div className={classes.searchResults_title}>
        Search Results - "{query}"
      </div>
      <div className={classes.results_container}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className={classes.rests_container}>
              <div className={classes.section_title}>Restaurants</div>
              {restaurants.length === 0 ? (
                <div className={classes.not_found_message}>
                  No restaurants matching "{query}" found
                </div>
              ) : (
                <div className={classes.section_grid}>
                  {restaurants.map((rest, index) => (
                    <Link
                      to={"/locations/" + rest._id}
                      className={classes.section_grid_item}
                    >
                      <div className={classes.section_grid_item_col}>
                        <div>
                          <img
                            className={classes.grid_item_img}
                            src={`/logos/${rest._id}.png`} alt={"Image failed"}
                          />
                        </div>
                        <div>
                          <div className={classes.grid_item_title}>
                            {rest.name}
                          </div>
                          <div className={classes.grid_item_text}>
                            {rest.location}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className={classes.users_container}>
              <div className={classes.section_title}>Users</div>
              {users.length === 0 ? (
                <div className={classes.not_found_message}>
                  No users matching "{query}" found
                </div>
              ) : (
                <div className={classes.section_grid}>
                  {users.map((user, index) => (
                    <Link
                      to={"/profile/" + user._id}
                      className={classes.section_grid_item}
                    >
                      <div className={classes.section_grid_item_col}>
                        <div>
                            {user.imageUrl !== null ? (
                                <img
                                className={classes.grid_item_img}
                                src={user.imageUrl}
                                alt="N/A"
                                />
                            ) : (
                              <div style={{
                                margin: "10px",
                                offset: "10px",
                                width: "20px",
                                height: "20px",
                                backgroundColor: "rgb(" + ((Math.random() * 100) + 155) + "," + ((Math.random() * 100) + 155) + "," + ((Math.random() * 100) + 155) + ")"
                              }} className="home-logo"></div>
                            )}
                        </div>
                        <div>
                          <div className={classes.grid_item_title}>
                            {user.username}
                          </div>
                          <div className={classes.grid_item_text}>
                            {user.bio}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className={classes.reviews_container}>
              <div className={classes.section_title}>Reviews</div>
              {reviews.length === 0 ? (
                <div className={classes.not_found_message}>
                  No reviews matching "{query}" found
                </div>
              ) : (
                <div className={classes.section_grid}>
                  {reviews.map((review, index) => (
                    <Link
                      to={"/reviews/details/" + review._id}
                      className={classes.section_grid_item}
                    >
                      <div className={classes.section_grid_item_col}>
                        <div>
                            {review.imageUrl !== null ? (
                              <img
                              className={classes.grid_item_img}
                              src={review.imageUrl}
                              alt="N/A"
                              />
                            ) : (
                              <div className="home-logo" style={{
                                top: "25px",
                                margin: "10px",
                                offset: "0px",
                                width: "50px",
                                height: "50px",
                                backgroundColor: "rgb(" + ((Math.random() * 100) + 155) + ","
                                  + ((Math.random() * 100) + 155) + ","
                                  + ((Math.random() * 100) + 155) + ")"
                              }} ></div>
                            )}
                        </div>
                        <div>
                          <div className={classes.grid_item_title}>
                            {review.title}
                          </div>
                          <div className={classes.grid_item_text}>
                            {"of " + review.restaurant.name}
                          </div>
                          <div className={classes.grid_item_text} style={{ color: "black" }}>
                            {"by " + review.user.username}
                          </div>
                          <div
                            className={classes.grid_item_text}
                            style={{ color: "yellow" }}
                          >
                            {"★".repeat(review.rating)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
