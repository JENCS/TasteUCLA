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

  const [response, setResponse] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(response); // For now, just log the response.
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/reviews/${id}`)
      .then((res) => {
        setReview(res.data);
        const mimeType = "image/png";
        const b64 = Buffer.from(res.data.image).toString("base64");
        setImageDisplay(`data:${mimeType};base64,${b64}`);
        setLoading(false);
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
              <p className="text-2xl mr-4 text-black">
                Location: {review.location}
              </p>
              <p className="text-xl mr-4 text-gray-500">
                Review written by {review.author}author
              </p>
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
                  <button
                    type="submit"
                    className="px-4 py-2 mt-2 text-white bg-blue-300 rounded hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div className="comments_content">
              <div className="comments_user_container">
                <div className="comments_username">{"user"}</div>
                <span className="comments_profile_pic"></span>
              </div>
              <div className="comments_description">
                {
                  "Chipotle Mexican Grill offers a unique and customizable dining experience that caters to those seeking fresh, fast, and flavorful Mexican-inspired cuisine. Located in [City], the restaurant boasts a minimalist yet inviting atmosphere, with a focus on efficiency and transparency in food preparation. One of Chipotle's standout features is its commitment to using high-quality ingredients. The menu emphasizes responsibly sourced meats, organic produce, and wholesome grains. This dedication to quality is evident in the rich flavors and vibrant textures found in each dish. The cornerstone of Chipotle's menu is its burritos, bowls, tacos, and salads, all of which allow customers to tailor their meals to their preferences. The protein choices include grilled chicken, barbacoa, carnitas, sofritas (tofu), and more. The toppings range from classic options like pico de gallo and guacamole to less conventional choices like corn salsa and queso. This customization aspect caters to a diverse range of taste preferences, making Chipotle an inclusive dining option for various dietary needs. While the customization is a strength, it can also be a potential pitfall if not managed efficiently. During peak hours, the line can be long, leading to a wait for your order. However, the staff at Chipotle is generally quick and efficient, ensuring that the process moves along as smoothly as possible. The restaurant's commitment to sustainability is commendable. From its responsibly raised meats to its recycling initiatives, Chipotle strives to minimize its environmental impact. This commitment adds to the overall appeal for customers who prioritize ethical dining choices. In terms of taste, Chipotle excels in delivering bold and authentic flavors. The marinades, salsas, and sauces contribute to a well-balanced and satisfying dining experience. The guacamole, prepared fresh daily, is a must-try and adds a creamy richness to any dish. In conclusion, Chipotle Mexican Grill offers a reliable and enjoyable dining experience with its fresh, customizable menu. While the customization process may lead to longer wait times during peak hours, the quality of ingredients, commitment to sustainability, and bold flavors make Chipotle a go-to choice for a quick and satisfying Mexican-inspired meal."
                }
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowReview;
