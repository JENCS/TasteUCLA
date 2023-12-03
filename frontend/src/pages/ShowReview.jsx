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

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/reviews/${id}`)
      .then((res) => {
        setReview(res.data);
        // const blob = new Blob([review.image]);
        // const file = new File([blob], "my_name", { type: "image/png" });
        // const srcBlob = URL.createObjectURL(file);
        // const img = new Image();

        const mimeType = "image/png";
        const b64 = Buffer.from(res.data.image).toString("base64");
        setImageDisplay(`data:${mimeType};base64,${b64}`);

        // img.src = `data:${mimeType};base64,${b64}`;
        // document.body.appendChild(img);
        // setImageDisplay(srcBlob);
        console.log(srcBlob);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show review</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{review._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{review.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <span>{review.author}</span>
          </div>
          {imageDisplay && (
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Photo</span>
              <img className="review-image" src={imageDisplay} />
              {/* <div>{imageDisplay}</div> */}
            </div>
          )}
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Rating</span>
            <span>{review.rating}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Create time</span>
            <span>{new Date(review.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Last update time</span>
            <span>{new Date(review.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowReview;
