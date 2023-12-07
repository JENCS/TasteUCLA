import "../styles/ShowReview.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { Buffer } from "buffer";
import Popup from "reactjs-popup";
import Button from "@mui/material/Button";
import "reactjs-popup/dist/index.css";

const ShowReview = ({ submitComment, loggedIn }) => {
  const [review, setReview] = useState({});
  const [loading, setLoading] = useState(true);
  const [imageDisplay, setImageDisplay] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  const [response, setResponse] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    submitComment(id, response);
    console.log(response); // For now
  };
  const typeInComment = () => {
    if (!loggedIn) {
      setOpenPopup(true);
    }
  };

  async function getImage() {
    const fullUrl = `http://localhost:5555/${review.imageUrl}`;
    try {
      const response = axios.get(fullUrl, {
        responseType: "arraybuffer",
      });

      // Convert the array buffer to a base64-encoded string
      const base64String = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );

      // Construct the data URL
      const dataUrl = `data:${response.headers["Content-Type"]};base64,${base64String}`;

      setImageUrl(dataUrl);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  }

  async function setReviewAndComments() {
    console.log("i'm here");
    await axios
      .get(`http://localhost:5555/reviews/${id}`)
      .then((res) => {
        setReview(res.data);
        setComments(res.data.comments);
        setLoading(false);
        setComments(res.data.comments);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    await getImage();
  }

  useEffect(() => {
    setLoading(true);
    console.log("1");
    setReviewAndComments();
  }, []);

  // const ImageComponent = (review) => {
  //   const [imageUrl, setImageUrl] = useState("");

  //   useEffect(() => {
  //     const fetchImage = async () => {
  //       try {
  //         const response = await axios.get(
  //           path.join("http://localhost:5555", review.imageUrl),
  //           {
  //             responseType: "arraybuffer",
  //           }
  //         );

  //         // Convert the array buffer to a base64-encoded string
  //         const base64String = btoa(
  //           new Uint8Array(response.data).reduce(
  //             (data, byte) => data + String.fromCharCode(byte),
  //             ""
  //           )
  //         );

  //         // Construct the data URL
  //         const dataUrl = `data:${response.headers["content-type"]};base64,${base64String}`;

  //         setImageUrl(dataUrl);
  //       } catch (error) {
  //         console.error("Error fetching image:", error);
  //       }
  //     };

  //     fetchImage();
  //   }, []); // Run once when the component mounts

  //   return (
  //     <div>{imageUrl && <img src={imageUrl} alt="cannot load image" />}</div>
  //   );
  // };

  return (
    <div className="p-4 mt-16">
      <BackButton />
      {loading ? (
        <Spinner />
      ) : (
        <div className="show-review-page">
          <div className="row">
            <div className="container">
              <h1>{review.title}</h1>
              <p className="text-2xl mr-4 text-black">
                Location: {review.location}
              </p>
              <p className="text-xl mr-4 text-gray-500">
                Review written by {review.author}author
              </p>
              <p className="content">{review.description}</p>
            </div>
            <div className="created_time">
              {"Created at: " + review.createdAt}
            </div>
            <div className="updated_time">
              {"Updated at: " + review.updatedAt}
            </div>
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
                      className="px-4 py-2 mt-2 text-white bg-blue-300 rounded hover:bg-blue-700"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div className="comments-grid">
                {comments.map((comment, index) => (
                  <div className="comments_grid_item" key={index}>
                    <div className="comments_content">
                      <div className="comments_user_container">
                        <div className="comments_username">{"user"}</div>
                        <span className="comments_profile_pic"></span>
                      </div>
                      <div className="comments_description">{comment.body}</div>
                    </div>
                    <div className="created_time_comment">
                      {"Created at: " + comment.createdAt}
                    </div>
                    <div className="updated_time_comment">
                      {"Updated at: " + comment.updatedAt}
                    </div>
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
