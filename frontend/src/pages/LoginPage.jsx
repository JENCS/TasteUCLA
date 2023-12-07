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

  function callLoginFunction(user, pass) {
    loginUser(user, pass);
  }

  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <img src="/tasteUCLA.png" className={classes.tasteucla_logo} />
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
