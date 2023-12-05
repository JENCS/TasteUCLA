import "../styles/Profile.css";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaPencilAlt } from "react-icons/fa";

export default function Profile({ token }) {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("Username");
  const [bio, setBio] = useState("");

  function uploadImage(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  function removeImage(e) {
    setFile(null);
  }
  function deleteAccount() {
    console.log("deleting user...");
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <h1>{username}</h1>
      </div>
      <div className="img-container-profile">
        {!file && <CgProfile className="default-profile-img" />}
        {file && (
          <div className="crop-img">
            <img src={file} className="jiwejfijwe" />
          </div>
        )}
        <label className="custom-file-upload">
          <input type="file" onChange={uploadImage} />
          Upload Photo
        </label>
        <p onClick={removeImage}>Delete photo</p>
      </div>
      <div className="bio-container">
        <label>Bio</label>
        <textarea className="bio" value={bio}></textarea>
      </div>
      <div className="lower-btns">
        <button className="save-profile-btn">Save Profile</button>
        <button className="delete-account-btn" onClick={deleteAccount}>
          Delete Account
        </button>
      </div>
    </div>
  );
}
