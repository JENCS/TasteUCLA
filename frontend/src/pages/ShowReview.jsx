import "../styles/ShowReview.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import Popup from "reactjs-popup";
import Button from "@mui/material/Button";
import "reactjs-popup/dist/index.css";

const ShowReview = ({ submitComment, loggedIn, userData }) => {
  const [review, setReview] = useState({});
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState({});
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  const [response, setResponse] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!loggedIn)
  //     setOpenPopup(true);
  //   else if (response){
  //     await submitComment(id, response);
  //     setResponse("");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loggedIn) setOpenPopup(true);
    else if (response) {
      await submitComment(id, response);
      setResponse("");
      setLoading(true);
      await axios
        .get(`http://localhost:5555/reviews/${id}`)
        .then((res) => {
          setComments(res.data.comments);
          setLoading(false);
          console.log(comments);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
      setLoading(false);
    } else setErrorMessage("Empty comment!");
  };

  const typeInComment = () => {
    if (!loggedIn) {
      setOpenPopup(true);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/reviews/${id}`)
      .then((res) => {
        setReview(res.data);
        if (res.data.comments.length != comments.length) {
          setComments(res.data.comments);
        }
        setLoading(false);
        setRestaurant(res.data.restaurant);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [comments]);

  return (
    <div className="p-4 mt-16">
      <BackButton />
      {loading ? (
        <Spinner />
      ) : (
        <div className="show-review-page">
          <div className-="restaurant-logo">
            <img
              src={"/logos/" + restaurant._id + ".png"}
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
                position: "absolute",
                left: "80vw",
              }}
            />
          </div>
          {review.imageUrl && (
            <div className="review-image">
              <img
                src={review.imageUrl}
                alt="Review image"
                style={{
                  width: "300px",
                  height: "300px",
                  objectFit: "cover",
                  position: "absolute",
                  left: "50vw",
                  top: "15vh",
                }}
              />
            </div>
          )}
          <div className="row">
            <div className="container">
              <div className="restaurant-name">
                <Link to={"/locations/" + restaurant._id}>
                  <p>{review.restaurant.name}</p>
                </Link>
              </div>
              <h1>{review.title}</h1>
              <p className="content">{review.text}</p>
              <div className="review-username">
                <p className="text-xl mr-4 mt-2 text-gray-500">
                  Review written by{" "}
                  {/* <Link to={"/profile/" + review.user._id}>
                    <a className="underline">{review.user.username}</a>
                  </Link> */}
                  {/* Redirect to profile page if the user searches themself */}
                  {loggedIn ? (
                    review.user._id === userData._id ? (
                      <Link
                        to={`/profile`}
                        style={{ textDecoration: "underline", color: "grey" }}
                        onMouseEnter={(e) => (
                          (e.target.style.textDecoration = "underline"),
                          (e.target.style.color = "blue")
                        )}
                        onMouseLeave={(e) => (
                          (e.target.style.textDecoration = "none"),
                          (e.target.style.color = "initial")
                        )}
                      >
                        {review.user.username}
                      </Link>
                    ) : (
                      <Link
                        to={`/profile/${review.user._id}`}
                        style={{ textDecoration: "underline", color: "grey" }}
                        onMouseEnter={(e) => (
                          (e.target.style.textDecoration = "underline"),
                          (e.target.style.color = "blue")
                        )}
                        onMouseLeave={(e) => (
                          (e.target.style.textDecoration = "none"),
                          (e.target.style.color = "initial")
                        )}
                      >
                        {review.user.username}
                      </Link>
                    )
                  ) : (
                    <Link
                      to={`/profile/${review.user._id}`}
                      style={{ textDecoration: "underline", color: "grey" }}
                      onMouseEnter={(e) => (
                        (e.target.style.textDecoration = "underline"),
                        (e.target.style.color = "blue")
                      )}
                      onMouseLeave={(e) => (
                        (e.target.style.textDecoration = "none"),
                        (e.target.style.color = "initial")
                      )}
                    >
                      {review.user.username}
                    </Link>
                  )}
                </p>
              </div>
            </div>
            <div className="created_time">
              {"Created at: " + review.createdAt}
            </div>
            {/* <div className="updated_time">
              {"Updated at: " + review.updatedAt}
            </div> */}
            <div className="reviews-header">Comments</div>
            <div className="error_message">{errorMessage}</div>
            <div className="comments-grid">
              <div className="comment-textbox">
                <form onSubmit={handleSubmit}>
                  <textarea
                    className="w-full p-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                    rows="4"
                    placeholder="Write your comment..."
                    value={response}
                    onClick={typeInComment}
                    onChange={(e) => setResponse(e.target.value)}
                  />
                  {openPopup && (
                    <Popup
                      open={openPopup}
                      closeOnDocumentClick
                      onClose={() => setOpenPopup(false)}
                    >
                      <div className="popup-content">
                        <p>Please sign in to comment.</p>
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
                  <div className="text-right">
                    <button
                      type="submit"
                      className="px-4 py-2 mt-2 text-white bg-blue-700 rounded hover:bg-blue-900"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div className="user-comments-grid">
                {comments.map((comment, index) => (
                  <div className="comments_grid_item" key={index}>
                    <div className="comments_content">
                      <div className="comments_user_container">
                        <div className="comments_username">
                          {comment.user.username}
                        </div>
                        <span className="comments_profile_pic"></span>
                      </div>
                      <div className="comments_description">{comment.body}</div>
                    </div>
                    <div className="created_time_comment">
                      {"Created at: " + comment.createdAt}
                    </div>
                    {/* <div className="updated_time_comment">
                      {"Updated at: " + comment.updatedAt}
                    </div> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowReview;
