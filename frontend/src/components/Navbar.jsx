import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { LiaSearchSolid } from "react-icons/lia";
import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

export default function Navbar({ loggedIn, changeLoginState }) {
  const searchBar = () => {};
  const [searchInput, setSearchInput] = useState("");
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [reviewRedirect, setReviewRedirect] = useState("/login");

  function profileMenu() {
    setProfileDropdown(!profileDropdown);
  }
  function searchMenu() {
    setSearchDropdown(!searchDropdown);
  }
  function logOut() {
    profileMenu();
    changeLoginState();
  }
  function removeMenus() {
    setProfileDropdown(false);
    setSearchDropdown(false);
  }

  useEffect(() => {
    if (loggedIn) {
      setReviewRedirect("/reviews/create");
    } else {
      setReviewRedirect("/login");
    }
  });

  return (
    <>
      <div className="navbar">
        <div className="navigation-left">
          <Link to="/">
            <AiFillHome className="home-btn" onClick={removeMenus} />
          </Link>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search here"
              className="input-field"
              onClick={() => searchMenu()}
            />
            <LiaSearchSolid className="search-icon" onClick={removeMenus} />
            {searchDropdown && (
              <div className="search-dropdown">
                <p>Search by tag</p>
              </div>
            )}
          </div>
        </div>
        <div className="navigation-middle">
          <Link to="/locations">
            <p className="locations-btn" onClick={removeMenus}>
              Locations
            </p>
          </Link>
          <Link to={reviewRedirect}>
            <p className="write-review-btn" onClick={removeMenus}>
              Write a review
            </p>
          </Link>
        </div>
        <div className="navigation-right">
          {loggedIn && (
            <>
              <p>Username</p>
              <CgProfile
                className="profile-icon"
                onClick={() => profileMenu()}
              />
            </>
          )}
          {!loggedIn && (
            <div className="sign-btns">
              <Link to="/login">
                <p>Sign In</p>
              </Link>
              <Link to="/sign-up">
                <p>Sign Up</p>
              </Link>
            </div>
          )}
        </div>
      </div>
      {profileDropdown && (
        <div className="profile-dropdown">
          <Link to="/profile">
            <p onClick={removeMenus}>Profile</p>
          </Link>
          <Link to="/id/reviews">
            <p onClick={removeMenus}>My Reviews</p>
          </Link>
          <Link to="/">
            <p className="sign-out-btn" onClick={logOut}>
              Sign out
            </p>
          </Link>
        </div>
      )}
    </>
  );
}
