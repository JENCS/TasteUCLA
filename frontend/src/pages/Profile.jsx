import "../styles/Profile.css";
import { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { Buffer } from "buffer";

export default function Profile({ userData, updateProfileInfo }) {
  const [file, setFile] = useState(userData.profile_picture);
  const [username, setUsername] = useState(userData.username);
  const [bio, setBio] = useState(userData.bio);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (userData.profile_picture) {
      setFile(
        "data:image/png;base64," +
          Buffer.from(userData.profile_picture).toString("base64")
      );
    }
  }, []);

  // "data:image/png;base64," + Buffer.from(userData.profile_picture).toString("base64")

  // const mimeType = "image/png";
  // const b64 = Buffer.from(userData.profile_picture).toString("base64");
  // setImageDisplay(`data:${mimeType};base64,${b64}`);

  function uploadImage(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    const promise = e.target.files[0].arrayBuffer();
    promise.then((value) => {
      console.log(value);
      setImage(Buffer.from(value));
      console.log(typeof image);
    });
  }
  function removeImage(e) {
    setFile(null);
  }
  function saveProfile() {
    if (file) {
      updateProfileInfo(image, bio);
    } else {
      updateProfileInfo(null, bio);
    }
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
        <textarea
          className="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
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
