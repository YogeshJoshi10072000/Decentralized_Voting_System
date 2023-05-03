import React from 'react'
import "./login.css";
import Header from '../../../basiccomponent/Header/Header';
import Footer from '../../../basiccomponent/Footer/Footer';

import { useRef } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Login() {

const navigate=useNavigate();
  const password=useRef();

  const Voter_ID=useRef();
const  password2=useRef();

const EmailID=useRef();
const [user,userinfo]=useState(0);


const handleClick=async(e)=>{
  e.preventDefault();
  const data={
    Voter_ID:Voter_ID.current.value,
    EmailID:EmailID.current.value,
    password:password.current.value
  };
  
  axios.post(`http://localhost:4000/v1/electioncandidates/login`,data).then((response) => {
   userinfo(response.data.obj);
  });

  console.log(user);
  navigate('/');

}

  return (
   
    <>
    <Header />
  

  <body>
    <div class="container">
      <form onSubmit={handleClick}>
        <h1>Login </h1>

    
        <div class="form-group">
          <label for="username">EmailId</label>
          <input type="text" id="username" name="EmailID" placeholder="Enter Your Email-ID" ref={EmailID} required></input>
        </div>

        <div class="form-group">
          <label for="username">Voter ID Card</label>
          <input type="text" id="username" name="Voter_ID" placeholder="Enter Your Voter ID" ref={Voter_ID} required></input>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter password" ref={password} required></input>
        </div>
        <div class="form-group">
          <label for="password">Confirm Password</label>
          <input type="password" id="password" name="password" placeholder="Enter password Again" ref={password2} required></input>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  </body>

<Footer />
  </>

)




  
}
