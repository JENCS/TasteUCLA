import Spinner from "../components/Spinner";
import axios from "axios";
import classes from '../styles/SearchResults.module.css';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

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
                console.log(JSON.stringify(res.data.restaurants))
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
                        <div className={classes.restaurants_container}>
                            <div className={classes.searchResults_section_title}>Restaurants</div>
                            {restaurants.length === 0 ? (
                                <div>No restaurants matching "{query}" found</div>
                            ) : (
                                <div className={classes.restaurants_grid}>
                                    {restaurants.map((rest, index) => (
                                        <a href={"/locations/" + rest._id}>
                                            <div key={index} className={classes.restaurants_grid_item}>
                                                <div className={classes.restaurant_title}>{rest.name}</div>
                                                <div>{rest.location}</div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* <div className={classes.reviews_grid}>
                        {reviews.length === 0 ? (
                            <div>No reviews matching "{query}" found</div>
                            ) : (
                            <div className={classes.reviews_grid}>
                                {reviews.map((review, index) => (
                                    <div key={index}>{review.title}</div>
                                ))}
                            </div>
                            )}
                        </div> */}
                    </>
                )}
            </div>
        </div>
    )
};

export default SearchResults;
