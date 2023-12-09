import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home";
import ShowReview from "./pages/ShowReview";
import EditReview from "./pages/EditReview";
import DeleteReview from "./pages/DeleteReview";
import WriteReview from "./pages/WriteReview";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage.jsx";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";
import MyReviews from "./pages/MyReviews.jsx";
import Locations from "./pages/Locations";
import Restaurant from "./pages/Restaurant";
import SearchResults from "./pages/SearchResults.jsx";
import axios from "axios";
//import BackButton from "./components/BackButton.jsx";

// get(path.join("http://localhost:5555", imageUrl))

const App = () => {
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [restaurantToReview, setRestaurantToReview] = useState("");

  const [user, setUser] = useState("");

  const navigate = useNavigate();

  const changeLoginState = (state) => {
    setLogin(state);
    console.log("changed");
    console.log(login);
  };

  async function updateProfileInfo(formData) {
    console.log("I AM AT UPDATE PROFILE");
    console.log(formData);
    await axios
      .post("http://localhost:5555/users/me", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        axios
          .get("http://localhost:5555/users/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setUserData(res.data);
            navigate("/");
            console.log(res.data);
          })
          .catch((error) => {
            console.error("Error fetching reviews:", error);
          });
      });
    console.log("I HAVE PATCHED MYSELF");
  }

  async function submitComment(reviewID, comment) {
    if (login) {
      await axios
        .post(
          `http://localhost:5555/reviews/${reviewID}/comment`,
          {
            text: comment,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .catch((error) => {
          console.error("Error storing comment:", error);
        });
    } else {
      console.error("Empty comment");
    }
  }

  const setMyRestaurant = (restaurant) => {
    setRestaurantToReview(restaurant);
  };

  // search username and check password
  async function loginUser(username, password) {
    try {
      const response = await axios.post("http://localhost:5555/auth", {
        username,
        password,
      });

      if (response.data.accessToken) {
        // window.location.href = "/";
        navigate("/");
        changeLoginState(true);
        setToken(response.data.accessToken);
        console.log(response.data.accessToken);
        // changeToken(response.data.accessToken);

        await axios
          .get("http://localhost:5555/users/me", {
            headers: {
              Authorization: `Bearer ${response.data.accessToken}`,
            },
          })
          .then((res) => {
            setUserData(res.data);
            console.log(res.data);
          })
          .catch((error) => {
            console.error("Error fetching reviews:", error);
          });
      }
    } catch (error) {
      if (error.response) {
        console.error("Login error:", error.response.data);
        alert(error.response.data.message);
      } else {
        console.error("Network error:", error.message);
      }
    }
  }

  async function logoutUser() {
    axios.post("http://localhost:5555/auth/logout");
  }

  async function createReview(formData) {
    axios
      .post("http://localhost:5555/reviews", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        //setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        //setLoading(false);
        alert("An error occurred. Please check the console.");
        console.log(error);
      });
  }

  async function getMyReviews() {
    let reviews = [];
    await axios
      .get(`http://localhost:5555/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        reviews = res.data.reviews;
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
    return reviews;
  }

  return (
    <>
      <Navbar
        userData={userData}
        loggedIn={login}
        changeLoginState={changeLoginState}
        logoutUser={logoutUser}
      />
      <Routes>
        <Route path="/" element={<Home loggedIn={login} />} />
        <Route
          path="/reviews/create"
          element={
            <WriteReview
              createReview={createReview}
              restaurantToReview={restaurantToReview}
              setMyRestaurant={setMyRestaurant}
              loggedIn={login}
            />
          }
        />
        <Route
          path="/reviews/details/:id"
          element={
            <ShowReview
              submitComment={submitComment}
              loggedIn={login}
              userData={userData}
            />
          }
        />
        <Route
          path="/reviews/me"
          element={<MyReviews getMyReviews={getMyReviews} />}
        />
        <Route path="/reviews/edit/:id" element={<EditReview />} />
        <Route path="/reviews/delete/:id" element={<DeleteReview />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/login" element={<LoginPage loginUser={loginUser} />} />
        <Route
          path="/sign-up"
          element={<SignUpPage changeLoginState={changeLoginState} />}
        />
        <Route
          path="/profile"
          element={
            <Profile
              userData={userData}
              updateProfileInfo={updateProfileInfo}
            />
          }
        />
        <Route path="/locations" element={<Locations />} />
        <Route
          path="/locations/:id"
          element={
            <Restaurant loggedIn={login} setMyRestaurant={setMyRestaurant} />
          }
        />
        <Route path="/search-results/:query" element={<SearchResults />} />
      </Routes>
    </>
  );
};

export default App;
