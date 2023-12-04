import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home";
import ShowReview from "./pages/ShowReview";
import EditReview from "./pages/EditReview";
import DeleteReview from "./pages/DeleteReview";
import WriteReview from "./pages/WriteReview";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage.jsx";
import Profile from "./pages/Profile";
import UserReviews from "./pages/UserReviews.jsx";
import Locations from "./pages/Locations";
import Restaurant from "./pages/Restaurant";

const App = () => {
  // const [token, setToken] = useState(null);
  const [login, setLogin] = useState(false);

  const changeLoginState = (state) => {
    setLogin(state);
    console.log("changed");
    console.log(login);
  };

  return (
    <>
      <Navbar loggedIn={login} changeLoginState={changeLoginState} />
      <Routes>
        <Route path="/" element={<Home loggedIn={login} />} />
        <Route path="/reviews/create" element={<WriteReview />} />
        <Route path="/reviews/details/:id" element={<ShowReview />} />
        <Route path="/reviews/edit/:id" element={<EditReview />} />
        <Route path="/reviews/delete/:id" element={<DeleteReview />} />
        <Route
          path="/login"
          element={<LoginPage changeLoginState={changeLoginState} />}
        />
        <Route
          path="/sign-up"
          element={<SignUpPage changeLoginState={changeLoginState} />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/id/reviews" element={<UserReviews />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/locations/restaurant" element={<Restaurant />} />
      </Routes>
    </>
  );
};

export default App;
