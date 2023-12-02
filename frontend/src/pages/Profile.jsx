import "../styles/Profile.css";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";

export default function Profile({ deleteAccount }) {
  const [file, setFile] = useState();
  const [bio, setBio] = useState();

  function uploadImage(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  function removeImage(e) {
    setFile();
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="username-container">
          <h1>Username</h1>
        </div>
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
        <p onClick={removeImage}>Delete</p>
      </div>
      <div className="bio-container">
        <label>Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="bio-text-field"
        ></textarea>
      </div>
      <button className="delete-btn" onClick={deleteAccount}>
        Delete Account
      </button>
    </div>
  );
}
