import "../styles/Profile.css";
import { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { Buffer } from "buffer";

export default function Profile({ userData, updateProfileInfo }) {
  const [file, setFile] = useState(userData.imageUrl);
  const [username, setUsername] = useState(userData.username);
  const [bio, setBio] = useState(userData.bio);
  const [image, setImage] = useState(null);

  function uploadImage(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  }
  function removeImage(e) {
    setFile(null);
  }
  async function saveProfile(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("bio", bio);

    if (image) {
      formData.append("imageUrl", image);
    }

    await updateProfileInfo(formData);
  }

  return (
    <div className="profile-page">
      <form onSubmit={saveProfile} method="post" enctype="multipart/form-data">
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
            <input
              type="file"
              accept="image/*"
              onChange={(e) => uploadImage(e)}
              name="imageUrl"
            />
            Upload Photo
          </label>
          <p onClick={removeImage}>Delete photo</p>
        </div>
        <div className="bio-container">
          <label>Bio</label>
          <textarea
            className="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>
        <div className="lower-btns">
          <button type="submit" className="save-profile-btn">
            Save Profile
          </button>
          {/* <button className="delete-account-btn" onClick={deleteAccount}>
            Delete Account
          </button> */}
        </div>
      </form>
    </div>
  );
}
