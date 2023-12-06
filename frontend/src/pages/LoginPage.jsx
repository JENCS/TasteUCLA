import { useState } from "react";
import { useNavigate } from "react-router-dom";
import resets from "../styles/_resets.module.css";
import classes from "../styles/LoginPage.module.css";
import Button from "@mui/material/Button";
import axios from "axios";

function LoginPage({ loginUser }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  // // search username and check password
  // async function login(username, password) {
  //   try {
  //     const response = await axios.post("http://localhost:5555/auth", {
  //       username,
  //       password,
  //     });

  //     if (response.data.accessToken) {
  //       // window.location.href = "/";
  //       navigate("/");
  //       changeLoginState(true);
  //       // changeToken(response.data.accessToken);
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       console.error("Login error:", error.response.data);
  //       alert(error.response.data.message);
  //     } else {
  //       console.error("Network error:", error.message);
  //     }
  //   }
  // }

  function callLoginFunction(user, pass) {
    loginUser(user, pass);
  }

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
        <Button
          name="signin_button"
          style={{ width: "162.267px" }}
          onClick={() => callLoginFunction(user, pass)}
        ></Button>
      </div>
      <div className={classes.signUp}>Sign up</div>
      <div className={classes.signUpButton}>
        <Button
          name="signup_button"
          style={{ width: "145.2855px" }}
          href="/sign-up"
        ></Button>
      </div>
    </div>
  );
}

export default LoginPage;
