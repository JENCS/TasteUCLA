import "../styles/Profile.css";
import { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import axios from "axios";

export default function Profile({ userData }) {
  const [file, setFile] = useState(userData.profile_picture);
  const [username, setUsername] = useState(userData.username);
  const [bio, setBio] = useState(userData.bio);

  function uploadImage(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  function removeImage(e) {
    setFile(null);
  }
  function saveProfile() {
    setBio(bio);
    axios.patch("http://localhost:5555/users/me", {
      bio: bio,
    });
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
        <button className="save-profile-btn" onClick={saveProfile}>
          Save Profile
        </button>
        <button className="delete-account-btn" onClick={deleteAccount}>
          Delete Account
        </button>
      </div>
    </div>
  );
}
