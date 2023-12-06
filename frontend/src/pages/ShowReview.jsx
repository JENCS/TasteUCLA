import "../styles/ShowReview.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { Buffer } from "buffer";

const ShowReview = () => {
  const [review, setReview] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageDisplay, setImageDisplay] = useState(null);
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  const [response, setResponse] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(response); // For now, just log the response. 
  }

  useEffect(() => {
    setLoading(true);
    axios
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
  }, []);
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
                    <p className="text-2xl mr-4 text-black">Location: {review.location}</p>
                    <p className="text-xl mr-4 text-gray-500">Review written by {review.author}author</p>
                    <p className="content">{review.description}</p>
                </div> 
                <div>
                {imageDisplay && (
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500"></span>
                        <img className="review-image" src={imageDisplay} />
                    </div>
                )}
                </div>
            </div>
            <div className="created_time">{"Created at: " + review.createdAt}</div>
            <div className="updated_time">{"Updated at: " + review.updatedAt}</div>
            <div className="reviews-header">Comments</div>
            <div className="comments-grid">
                <div className="comment-textbox">
                    <form onSubmit={handleSubmit}>
                        <textarea
                            className="w-full p-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                            rows="4"
                            placeholder="Write your comment..."
                            value={response}
                            onChange={(e) => setResponse(e.target.value)}
                        />
                    <div className="text-right">
                        <button type="submit" className="px-4 py-2 mt-2 text-white bg-blue-300 rounded hover:bg-blue-700">Submit</button>
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
                        <div className="comments_description">
                        {comment.body}
                        </div>
                    </div>
                    <div className="created_time_comment">{"Created at: " + comment.createdAt}</div>
                    <div className="updated_time_comment">{"Updated at: " + comment.updatedAt}</div>
                  </div>
                  ))} 
                </div>
                
            </div>
                         
        </div>    
      )}
    </div>
  );
};

export default ShowReview;
