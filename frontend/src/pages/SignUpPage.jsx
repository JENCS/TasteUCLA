import { useState } from 'react';
import resets from '../styles/_resets.module.css';
import classes from '../styles/SignUpPage.module.css';
import Button from '@mui/material/Button';
import axios from "axios";
import { useNavigate } from "react-router-dom";


function SignUpPage() {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();

  const createAccount = () => {
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
          alert("An error occurred. Please check the console.");
          alert(error);
        });
  }

  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.tasteUCLA}>TasteUCLA</div>
      <div className={classes.logo}></div>
      <div className={classes.username}>Username</div>
      <div className={classes.username_textbox}>
        <input name="username_input" value = {username} onChange={input => setUser(input.target.value)} style={{ width:"255.4289px", outline: "none", marginLeft: "10px", marginRight: "10px"}} maxLength = "20"/>
      </div>
      <div className={classes.password}>Password</div>
      <div className={classes.password_textbox}>
        <input name="password_input" value = {password} onChange={input => setPass(input.target.value)} style={{ width:"255.4289px", outline: "none", marginLeft: "10px", marginRight: "10px"}} maxLength = "20"/>
      </div>
      <div className={classes.confirm_password}>Confirm Password</div>
      <div className={classes.confirm_password_textbox}>
        <input name="confirm_password_input" value = {confirmPass} onChange={input => setConfirmPass(input.target.value)} style={{ width:"255.4289px", outline: "none", marginLeft: "10px", marginRight: "10px"}} maxLength = "20"/>
      </div>
      <div className={classes.createAccount}>Create Account</div>
      <div className={classes.createAccountButton}>
        <Button name= "create_account_button" onClick={createAccount} style={{ width:"145.2855px"}}></Button>
      </div>
      <div className={classes.back}>Back to login</div>
      <div className={classes.backButton}>
        <Button name= "back_button" style={{ width:"145.2855px"}} href = "/login"></Button>
      </div>
    </div>
    );
  };

  export default SignUpPage;

  //onClick={() => login(user, pass)}