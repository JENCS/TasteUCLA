import "../styles/Profile.css";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaPencilAlt } from "react-icons/fa";

export default function Profile() {
  const [file, setFile] = useState();

  function uploadImage(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  function removeImage(e) {
    setFile();
  }

  return (
    <div className="profile-page">
      <div className="img-container-profile">
        {!file && <CgProfile className="default-profile-img" />}
        {file && (
          <div className="crop-img">
            <img src={file} className="jiwejfijwe" width="300" height="300" />
          </div>
        )}
        <label class="custom-file-upload">
          <input type="file" onChange={uploadImage} />
          Upload Photo
        </label>
        <p onClick={removeImage}>Delete</p>
      </div>
      <div className="user-info">
        <h1>Username</h1>
        <FaPencilAlt />
        <h3>Password</h3>
        <FaPencilAlt />
      </div>
    </div>
  );
}
