import React from 'react'
import "./register.css";
import Header from '../../basiccomponent/Header/Header';
import Footer from '../../basiccomponent/Footer/Footer';
import { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Register() {

  const first_name=useRef();
  const Last_Name=useRef();
  const password=useRef();
  const Adhar_Card_Number=useRef();
  const Voter_ID=useRef();
const  confirmpassword=useRef();
const Mobile_Number=useRef();
const EmailID=useRef();

const navigate=useNavigate();

  const handleclick=async(e)=>{
    e.preventDefault();
    const data={
      first_name:first_name.current.value,
      Last_Name:Last_Name.current.value,
      Adhar_Card_Number:Adhar_Card_Number.current.value,
      Voter_ID:Voter_ID.current.value,
      EmailID:EmailID.current.value,
      Mobile_Number:Mobile_Number.current.value,
      password:password.current.value
    };
    console.log(data);
    axios.post(`http://localhost:4000/v1/voters/register`,data).then((response) => {
     
    });

navigate('/Voterslogin');
  }

  return (
    <>
    <Header />
   
<body>
    <div class="container">
      <form onSubmit={handleclick}>
        <h1>Register for Voting</h1>

        <div class="form-group">
          <label for="username">First Name</label>
          <input type="text" className="username" name="first_name" placeholder="Enter Your First Name" ref={first_name} required></input>
        </div>

        <div class="form-group">
          <label for="username">Last Name</label>
          <input type="text" className="username" name="Last_Name" placeholder="Enter Your Last Name" ref={Last_Name} required></input>
        </div>

        <div class="form-group">
          <label for="username">EmailId</label>
          <input type="text" className="username" name="EmailID" placeholder="Enter Your Email-ID" ref={EmailID} required></input>
        </div>

        <div class="form-group">
          <label for="username">Phone Number</label>
          <input type="text"className="username" name="Mobile_Number" placeholder="Enter Your Phone Number" ref={Mobile_Number} required></input>
        </div>

        <div class="form-group">
          <label for="username">Voter ID Card</label>
          <input type="text" className="username" name="Voter_ID" placeholder="Enter Your Voter ID" ref={Voter_ID} required></input>
        </div>
        <div class="form-group">
          <label for="username">Adhar Card</label>
          <input type="text" className="username" name="Adhar_Card_Number" placeholder="Enter Your AdharCard Number" ref={Adhar_Card_Number} required></input>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter password" ref={password} required></input>
        </div>
        <div class="form-group">
          <label for="password">Confirm Password</label>
          <input type="password" id="password2" name="confirmpassword" placeholder="Enter password Again" ref={confirmpassword} required></input>
        </div>
        <button type="submit" >Submit</button>
      </form>
    </div>
  </body>

  <Footer />
  </>


  )
}
