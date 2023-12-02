import { useState } from "react";
import { Link } from "react-router-dom";
import resets from "../styles/_resets.module.css";
import classes from "../styles/LoginPage.module.css";
import Button from "@mui/material/Button";
import axios from "axios";
import "../styles/LoginPage.css";

// search username and check password

function LoginPage({ changeLoginState, checkLoginInfo }) {
  const [loginPath, setLoginPath] = useState("/login");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  function login(username, password) {
    console.log("inside");
    if (username != "jencs") {
      alert("Username does not exist");
      setLoginPath("/login");
    } else {
      if (password != "1234") {
        alert("incorrect password");
        setLoginPath("/login");
      } else {
        console.log("HERE");
        setLoginPath("/");
        changeLoginState(true);
        //window.location.href = "/";
      }
    }
  }

  // function checkLogin() {
  //   console.log(user);
  //   console.log(pass);
  //   checkLoginInfo(user, pass);
  // }

  const checkLogin = () => {
    console.log("bro");
    checkLoginInfo(user, pass);
  };

  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.tasteUCLA}>TasteUCLA</div>
      <div className={classes.logo}></div>
      <div className={classes.username}>Username</div>
      <div className={classes.username_textbox}>
        <input
          name="username_input"
          value={user}
          onChange={(input) => setUser(input.target.value)}
          style={{
            width: "255.4289px",
            outline: "none",
            marginLeft: "10px",
            marginRight: "10px",
          }}
          maxLength="20"
        />
      </div>
      <div className={classes.password}>Password</div>
      <div className={classes.password_textbox}>
        <input
          name="password_input"
          value={pass}
          onChange={(input) => setPass(input.target.value)}
          style={{
            width: "255.4289px",
            outline: "none",
            marginLeft: "10px",
            marginRight: "10px",
          }}
          maxLength="20"
        />
      </div>
      <div className={classes.donTHaveAnAccount}>Don’t have an account?</div>
      <div className={classes.signIn}>Sign in</div>
      <div className={classes.signInButton}>
        <Link to={loginPath}>
          <Button
            name="signin_button"
            style={{ width: "162.267px", height: "100%" }}
            // onClick={() => login(user, pass)}
            onClick={checkLogin}
          ></Button>
        </Link>
      </div>
      <div className={classes.signUp}>Sign up</div>
      <div className={classes.signUpButton}>
        <Button
          name="signup_button"
          style={{ width: "145.2855px" }}
          href="/signup"
        ></Button>
      </div>
    </div>
    // <div>
    //   <p>p</p>
    //   <p>p</p>
    //   <p>p</p>
    //   <div>
    //     <input
    //       name="username_input"
    //       value={user}
    //       onChange={(input) => setUser(input.target.value)}
    //       style={{
    //         width: "255.4289px",
    //         outline: "none",
    //         marginLeft: "10px",
    //         marginRight: "10px",
    //       }}
    //       maxLength="20"
    //     />
    //   </div>
    //   <div>
    //     <input
    //       name="password_input"
    //       value={pass}
    //       onChange={(input) => setPass(input.target.value)}
    //       style={{
    //         width: "255.4289px",
    //         outline: "none",
    //         marginLeft: "10px",
    //         marginRight: "10px",
    //       }}
    //       maxLength="20"
    //     />
    //   </div>
    //   <div className="sign-in-btn">
    //     <button onClick={checkLogin}>SIGN IN</button>
    //   </div>
    // </div>
  );
}

export default LoginPage;
