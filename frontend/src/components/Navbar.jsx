import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { LiaSearchSolid } from "react-icons/lia";
import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
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

export default function Navbar({ loggedIn, changeLoginState }) {
  const [searchInput, setSearchInput] = useState("");
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [reviewRedirect, setReviewRedirect] = useState("/login");
  const [query, setQuery] = useState("");

  const [searchResults, setSearchResults] = useState([]);
  const [isDebouncing, setIsDebouncing] = useState(false);

  const debouncedSearch = debounce(() => {
    setIsDebouncing(false);
    search();
  }, 500);

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const search = () => {
    console.log(query)
    axios
      .get(`http://localhost:5555/search/${query}`)
      .then((res) => {
        setSearchResults(res.data.data);
        console.log(res.data.data)
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

  useEffect(() => {
    if (query !== '' && isDebouncing) {
      debouncedSearch();
    }
  }, [query, isDebouncing]);

  useEffect(() => {
    const closeDropdown = () => {
      setSearchDropdown(false);
    };

    document.addEventListener('click', closeDropdown);

    return () => {
      document.removeEventListener('click', closeDropdown);
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
              placeholder="Search here"
              className="input-field"
              onChange={(e) => {
                setQuery(e.target.value);
                setIsDebouncing(true);
              }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent the click from bubbling to document
                searchMenu();
              }}
            />
            <LiaSearchSolid className="search-icon" onClick={search} />
            {searchDropdown && (
              <div className="search-dropdown">
                {searchResults.length > 0 ? (
                  searchResults.map((result, index) => (
                    <Link 
                    to={`/locations/${result.id}`}
                    key={index}
                    className="search-result-item">
                      {result.name && <p>{result.name}</p>}
                    </Link>
                  ))
                ) : (
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
