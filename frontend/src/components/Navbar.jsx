import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LiaSearchSolid } from "react-icons/lia";
import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
  const searchBar = () => {};
  const [searchInput, setSearchInput] = useState("");
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [searchDropdown, setSearchDropdown] = useState(false);

  function profileMenu() {
    setProfileDropdown(!profileDropdown);
  }
  function searchMenu() {
    setSearchDropdown(!searchDropdown);
  }

  return (
    <>
      <div className="navbar">
        <div className="navigation-left">
          <Link to="/">
            <AiFillHome className="home-btn" />
          </Link>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search here"
              className="input-field"
              onClick={() => searchMenu()}
              // onChange={handleChange}
              // value={searchInput}
            />
            <LiaSearchSolid className="search-icon" />
            {/* <Link to="/">
            <button className="sign-out-btn">Sign out</button>
          </Link> */}
          </div>
        </div>
        <div className="navigation-middle">
          <p className="locations-btn">Locations</p>
          <Link to="/reviews/create">
            <p className="write-review-btn">Write a review</p>
          </Link>
        </div>
        <div className="navigation-right">
          <p>Username</p>
          <CgProfile className="profile-icon" onClick={() => profileMenu()} />
        </div>
      </div>
      {profileDropdown && (
        <div className="profile-dropdown">
          <p>Profile</p>
          <p>My Reviews</p>
          <Link to="/">
            <p className="sign-out-btn">Sign out</p>
          </Link>
        </div>
      )}
      {searchDropdown && (
        <div className="search-dropdown">
          <p>Search by tag</p>
        </div>
      )}
    </>
  );
}
