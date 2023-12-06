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
                    <><div className={classes.reviews_grid}>
                    {reviews.length === 0 ? (
                        <div>No reviews matching "{query}" found</div>
                        ) : (
                        <div className={classes.reviews_grid}>
                            {reviews.map((review, index) => (
                                <div key={index}>review{index}</div>
                            ))}
                        </div>
                        )}
                    </div></>
                )}
            </div>
        </div>
    )
};

export default SearchResults;
