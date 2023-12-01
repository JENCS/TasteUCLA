import { useState } from 'react';
import resets from '../styles/_resets.module.css';
import classes from '../styles/LoginPage.module.css';
import Button from '@mui/material/Button';

// search username and check password
function login(username, password) {
  if (username != "jencs")
    alert("Username does not exist");
  else {
    if (password != "1234")
      alert("incorrect password");
    else {
      window.location.href = '/';
    }
  }
}

function LoginPage() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.tasteUCLA}>TasteUCLA</div>
      <div className={classes.logo}></div>
      <div className={classes.username}>Username</div>
      <div className={classes.username_textbox}>
        <input name="username_input" value = {user} onChange={input => setUser(input.target.value)} style={{ width:"255.4289px", outline: "none", marginLeft: "10px", marginRight: "10px"}} maxLength = "20"/>
      </div>
      <div className={classes.password}>Password</div>
      <div className={classes.password_textbox}>
        <input name="password_input" value = {pass} onChange={input => setPass(input.target.value)} style={{ width:"255.4289px", outline: "none", marginLeft: "10px", marginRight: "10px"}} maxLength = "20"/>
      </div>
      <div className={classes.donTHaveAnAccount}>Don’t have an account?</div>
      <div className={classes.signIn}>Sign in</div>
      <div className={classes.signInButton}>
        <Button name= "signin_button" style={{ width:"162.267px"}} onClick={() => login(user, pass)}></Button>
      </div>
      <div className={classes.signUp}>Sign up</div>
      <div className={classes.signUpButton}>
        <Button name= "signup_button" style={{ width:"145.2855px"}} href = "/sign-up"></Button>
      </div>
    </div>
  );
};

export default LoginPage;