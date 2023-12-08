import "../styles/Profile.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { Buffer } from "buffer";
import axios from "axios";

export default function UserProfile() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState();
  const [image, setImage] = useState(null);

  const { id } = useParams();

  //   useEffect(() => {
  //     if (userData.profile_picture) {
  //       setFile(
  //         "data:image/png;base64," +
  //           Buffer.from(userData.profile_picture).toString("base64")
  //       );
  //     }
  //   }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5555/users/${id}`)
      .then((res) => {
        setUsername(res.data.username);
        setBio(res.data.bio);
        setImage(res.data.imageUrl);
        //setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching search results", error);
        //setLoading(false);
      });
  }, []);

  // "data:image/png;base64," + Buffer.from(userData.profile_picture).toString("base64")

  // const mimeType = "image/png";
  // const b64 = Buffer.from(userData.profile_picture).toString("base64");
  // setImageDisplay(`data:${mimeType};base64,${b64}`);

  return (
    <div className="profile-page">
      <div className="user-info">
        <h1>{username}</h1>
      </div>
      <div className="img-container-profile">
        {!image && <CgProfile className="default-profile-img" />}
        {image && (
          <div className="crop-img">
            <img src={image} className="jiwejfijwe" />
          </div>
        )}
      </div>
      <div className="bio-container">
        <label>Bio</label>
        <p className="bio">{bio}</p>
      </div>
    </div>
  );
}
