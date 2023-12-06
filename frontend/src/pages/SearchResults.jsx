import Spinner from "../components/Spinner";
import axios from "axios";
import classes from '../styles/SearchResults.module.css';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
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
                console.error('Error fetching search results', error);
                setLoading(false);
            });
    }, [] );

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
                                <div className={classes.not_found_message}>No restaurants matching "{query}" found</div>
                            ) : (
                                <div className={classes.section_grid}>
                                    {restaurants.map((rest, index) => (
                                        <a key={index} className={classes.section_grid_item} href={"/locations/" + rest._id}>
                                            <div className={classes.section_grid_item_col}>
                                                <div>
                                                    <img className={classes.grid_item_img} src={`/logos/${rest._id}.png`}/>
                                                </div>
                                                <div>
                                                    <div className={classes.grid_item_title}>{rest.name}</div>
                                                    <div className={classes.grid_item_text}>{rest.location}</div>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className={classes.users_container}>
                            <div className={classes.section_title}>Users</div>
                            {users.length === 0 ? (
                                <div className={classes.not_found_message}>No users matching "{query}" found</div>
                            ) : (
                                <div className={classes.section_grid}>
                                    {users.map((user, index) => (
                                        <a key={index} className={classes.section_grid_item} href={"/profile/" + user._id}>
                                            <div className={classes.section_grid_item_col}>
                                                <div>
                                                    <img className={classes.grid_item_img} src={user.imageUrl} alt="N/A"/>
                                                </div>
                                                <div>
                                                    <div className={classes.grid_item_title}>{user.username}</div>
                                                    <div className={classes.grid_item_text}>{user.bio}</div>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className={classes.reviews_container}>
                            <div className={classes.section_title}>Reviews</div>
                            {reviews.length === 0 ? (
                                <div className={classes.not_found_message}>No reviews matching "{query}" found</div>
                            ) : (
                                <div className={classes.section_grid}>
                                    {reviews.map((review, index) => (
                                        <a key={index} className={classes.section_grid_item} href={"/reviews/details/" + review._id}>
                                            <div className={classes.section_grid_item}>
                                                <div className={classes.grid_item_title}>{review.title}</div>
                                                <div className={classes.grid_item_text}>{"of " + review.restaurant}</div>
                                                <div className={classes.grid_item_text} style={{color: "yellow"}}>{"★".repeat(review.rating)}</div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
};

export default SearchResults;
