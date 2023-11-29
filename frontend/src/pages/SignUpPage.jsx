import { useState } from 'react';
import resets from '../styles/_resets.module.css';
import classes from '../styles/SignUpPage.module.css';
import Button from '@mui/material/Button';

function SignUpPage() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setComfirmPass] = useState("");
  
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
      <div className={classes.confirm_password}>Confirm Password</div>
      <div className={classes.confirm_password_textbox}>
        <input name="confirm_password_input" value = {confirmPass} onChange={input => setConfirmPass(input.target.value)} style={{ width:"255.4289px", outline: "none", marginLeft: "10px", marginRight: "10px"}} maxLength = "20"/>
      </div>
      <div className={classes.createAccount}>Create Account</div>
      <div className={classes.createAccountButton}>
        <Button name= "create_account_button" style={{ width:"145.2855px"}} href = "/login"></Button>
      </div>
      <div className={classes.back}>Back to login</div>
      <div className={classes.backButton}>
        <Button name= "back_button" style={{ width:"145.2855px"}} href = "/login"></Button>
      </div>
    </div>
    );
  };

  export default SignUpPage;