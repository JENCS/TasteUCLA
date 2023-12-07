import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { LiaSearchSolid } from "react-icons/lia";
import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default function Navbar({
  userData,
  loggedIn,
  changeLoginState,
  logoutUser,
}) {
  const [searchInput, setSearchInput] = useState("");
  const [placeholderText, setPlaceholderText] = useState("Search here");
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [reviewRedirect, setReviewRedirect] = useState("/login");
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState({
    restaurants: [],
    users: [],
    reviews: [],
  });
  const [isDebouncing, setIsDebouncing] = useState(false);

  const debouncedSearch = debounce(() => {
    setIsDebouncing(false);
    search();
  }, 500);

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const search = () => {
    console.log(query);
    axios
      .get(`http://localhost:5555/search/${query}`)
      .then((res) => {
        setSearchResults(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        alert("An error occurred. Please check the console.");
        console.log(error);
      });
  };

  function profileMenu() {
    setProfileDropdown(!profileDropdown);
  }
  function searchMenu() {
    setSearchDropdown(!searchDropdown);
  }
  function logOut() {
    profileMenu();
    changeLoginState(false);
    logoutUser();
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

  useEffect(() => {
    if (query !== "" && isDebouncing) {
      debouncedSearch();
    }
  }, [query, isDebouncing]);

  useEffect(() => {
    const closeDropdown = () => {
      setSearchDropdown(false);
    };

    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

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
              placeholder={placeholderText}
              className="input-field"
              onChange={(e) => {
                setQuery(e.target.value);
                setIsDebouncing(true);
              }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent the click from bubbling to document
                searchMenu();
              }}
              onKeyDown={(event) => {
                console.log(event.key);
                if (event.key === "Enter") {
                  navigate(`/search-results/${query}`);
                }
              }}
            />
            <LiaSearchSolid
              className="search-icon"
              onClick={() => {
                // setPlaceholderText(query);
                navigate(`/search-results/${query}`);
              }}
            />
            {searchDropdown && (
              <div className="search-dropdown">
                {searchResults.restaurants.length > 0 && (
                  <div>
                    <h3>Restaurants</h3>
                    {searchResults.restaurants.map((restaurant, index) => (
                      <Link to={`/locations/${restaurant.id}`} key={index}>
                        <p>{restaurant.name}</p>
                      </Link>
                    ))}
                  </div>
                )}
                {searchResults.reviews.length > 0 && (
                  <div>
                    <h3>Reviews</h3>
                    {searchResults.reviews.map((review, index) => (
                      <Link to={`/reviews/details/${review.id}`} key={index}>
                        <p>{review.title}</p>
                      </Link>
                    ))}
                  </div>
                )}
                {searchResults.users.length > 0 && (
                  <div>
                    <h3>Users</h3>
                    {searchResults.users.map((user, index) => (
                      <Link to={`/users/${user._id}`} key={index}>
                        <p>{user.username}</p>
                      </Link>
                    ))}
                  </div>
                )}
                {searchResults.restaurants.length === 0 &&
                  searchResults.reviews.length === 0 &&
                  searchResults.users.length === 0 && (
                    <p>No results found</p>
                  )}
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
          {userData && loggedIn && (
            <>
              <p>{userData.username}</p>
              {userData.profile_picture && (
                <img
                  src={
                    "data:image/png;base64," +
                    Buffer.from(userData.profile_picture).toString("base64")
                  }
                  className="profile-image-icon"
                  onClick={() => profileMenu()}
                />
              )}
              {!userData.profile_picture && (
                <CgProfile
                  className="profile-icon"
                  onClick={() => profileMenu()}
                />
              )}
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
          <Link to="/reviews/me">
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
