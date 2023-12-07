import { useState, useEffect } from "react";
import resets from "../styles/_resets.module.css";
import classes from "../styles/SignUpPage.module.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const createAccount = () => {
    if (password == confirmPassword) {
      const new_user = {
        username,
        password,
      };
      axios
        .post("http://localhost:5555/users", new_user)
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          //alert("An error occurred. Please check the console.");
          //alert(error);

          if (
            error.toString() ==
            "AxiosError: Request failed with status code 400"
          ) {
            setErrorMessage("*All fields are required*");
          }

          if (
            error.toString() ==
            "AxiosError: Request failed with status code 409"
          ) {
            setErrorMessage("*Duplicate username. Enter another username*");
          }
        });
    } else {
      setErrorMessage("*Passwords do not match. Enter matching passwords*");
    }
  };

  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      {/* <div className={classes.tasteUCLA}>TasteUCLA</div>
      <div className={classes.logo}></div> */}
      <img src="/tasteUCLA.png" className={classes.tasteucla_logo} />
      <div className={classes.error_message}>{errorMessage}</div>
      <div className={classes.username}>Username</div>
      <div className={classes.username_textbox}>
        <input
          name="username_input"
          value={username}
          onChange={(input) => setUsername(input.target.value)}
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
          value={password}
          onChange={(input) => setPassword(input.target.value)}
          style={{
            width: "255.4289px",
            outline: "none",
            marginLeft: "10px",
            marginRight: "10px",
          }}
          maxLength="20"
        />
      </div>
      <div className={classes.confirm_password}>Confirm Password</div>
      <div className={classes.confirm_password_textbox}>
        <input
          name="confirm_password_input"
          value={confirmPassword}
          onChange={(input) => setConfirmPassword(input.target.value)}
          style={{
            width: "255.4289px",
            outline: "none",
            marginLeft: "10px",
            marginRight: "10px",
          }}
          maxLength="20"
        />
      </div>
      <div className={classes.createAccount}>Create Account</div>
      <div className={classes.createAccountButton}>
        <Button
          name="create_account_button"
          onClick={createAccount}
          style={{ width: "145.2855px" }}
        ></Button>
      </div>
      <div className={classes.back}>Back to login</div>
      <div className={classes.backButton}>
        <Button
          name="back_button"
          style={{ width: "145.2855px" }}
          href="/login"
        ></Button>
      </div>
    </div>
  );
}

export default SignUpPage;

//onClick={() => login(user, pass)}
