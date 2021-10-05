import logo from './logo.svg';
import './App.css';
import'./Login.js';
import React,{useEffect,useState} from 'react';
import { Checkbox, FormGroup, FormControlLabel, Select, MenuItem , FormControl, InputLabel} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
 
function App() {
 const [userType,setUserType]=useState("");



const handleChange = (event) => {
  setUserType(event.target.value);
};


  return (
    <div className="App">
   

  <div className="container" id="container">
    <div className="form-container sign-up-container">
      <form action="#">
        <h1>Create Account</h1>
        <span>or use your email for registration</span>
        <input type="text" placeholder="Name" required/>
        <input type="email" placeholder="Email" required/>
        <input type="number" placeholder="Mobile"required/>
        <input type="password" placeholder="Password" required/>
        <input type="password" placeholder="Confirm Password" required/>
        <FormControl >
        <InputLabel id="demo-simple-select-label">User Type</InputLabel>
          <Select 
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userType}
            onChange={handleChange}
            required
            className="select"
          >
          <MenuItem value="doctor">Doctor</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
        </FormControl>

          <FormGroup>
            <FormControlLabel
              control={<Checkbox name="Terms"  value="on" required/>}
              label="Accept Terms & Conditions"
              required
            />
            <FormControlLabel
              control={<Checkbox name="remember_me"value="on"/>}
              label="Remember Me"
              required
            />
          </FormGroup>
        <button>Sign Up</button>
      </form>
    </div>
    <div className="form-container sign-in-container">
      <form action="#">
        <h1>Sign in</h1>
     
        <span>or use your account</span>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
    <div className="overlay-container">
      <div className="overlay">
        <div className="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <h3 id="he3">OR</h3>
          <button className="ghost" id="signIn">
            Sign In
          </button>
        </div>
        <div className="overlay-panel overlay-right">
          <h1>Hello, Friend!</h1>
          <p>Enter your personal details and start journey with us</p>
          <button className="ghost" id="signUp">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  </div>
  

    </div>
  );
}

export default App;
