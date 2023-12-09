import classes from "../styles/MyReviews.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Popup from "reactjs-popup";
import Button from "@mui/material/Button";

export default function MyReviews({ getMyReviews, loggedIn }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openPopUp, setOpenPopUp] = useState(false);

  useEffect(() => {
    if (!loggedIn) {
      setOpenPopUp(true);
    }
    getMyReviews()
      .then((res) => {
        let reviews = res;
        reviews.map((review) => {
          let creationTime = new Date(review.createdAt);
          let updateTime = new Date(review.updatedAt);
          review.createdAt = creationTime.toString();
          review.updatedAt = updateTime.toString();
        })
        setReviews(reviews);
        setLoading(false);
      })
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.title_row}>
        <div>
          <div className={classes.myreviews_title}>My Reviews</div>
          <div className={classes.home_logo}></div>
        </div>
        <div className={classes.myreviews_count}>You have written {reviews.length} review{reviews.length === 1 ? "" : "s" }</div>
      </div>
      {openPopUp && (
        <Popup
          open={openPopUp}
          closeOnDocumentClick={false}
        >
          <div className="popup-content">
            <p>Please sign in to view your reviews</p>
            {
              <Button
                name="signin-button"
                style={{ width: "120px" }}
                href="/login"
              >
                Sign in
              </Button>
            }
          </div>
        </Popup>
      )}
      <div className={classes.results_container}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className={classes.reviews_container}>
              {reviews.length === 0 ? (
                <div className={classes.not_found_message}>Write some reviews!</div>
              ) : (
                <div className={classes.section_grid}>
                  {reviews.map((review, index) => (
                    <Link key={index} className={classes.section_grid_item} to={"/reviews/details/" + review._id}>
                      <div className={classes.section_grid_item_col}>
                        <div>
                          {review.imageUrl !== null ? (
                            <img className={classes.grid_item_img} src={review.imageUrl} alt={"Image failed"}/>
                          ) : (
                            <div style={{
                              margin: "30px",
                              width: "75px",
                              height: "75px",
                              border: "solid 2px #000000",
                              backgroundColor: "rgb(" + ((Math.random() * 100) + 155) + "," + ((Math.random() * 100) + 155) + "," + ((Math.random() * 100) + 155) + ")"
                            }} className="home-logo"></div>
                          )}
                        </div>
                        <div>
                          <div className={classes.grid_item_title}>{review.title}</div>
                          <div className={classes.grid_item_timestamp}>{"Created: " + review.createdAt}</div>
                          <div className={classes.grid_item_timestamp}>{"Updated: " + review.createdAt}</div>
                          <div className={classes.grid_item_text}>{review.text}</div>
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
