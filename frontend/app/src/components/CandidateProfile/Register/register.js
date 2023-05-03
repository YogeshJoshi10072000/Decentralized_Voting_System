import React from 'react'
import "./register.css";
import Header from '../../../basiccomponent/Header/Header';
import Footer from '../../../basiccomponent/Footer/Footer';
import { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Register() {
const navigate=useNavigate();
  const first_name=useRef();
  const Last_Name=useRef();
  const password=useRef();
  const Adhar_Card_Number=useRef();
  const Voter_ID=useRef();
const  password2=useRef();
const Mobile_Number=useRef();
const EmailID=useRef();
const Political_party=useRef();
const Party_Menefesto=useRef();
const Party_Symbol=useRef();

const handleclick=async(e)=>{
  e.preventDefault();
  const data={
    first_name:first_name.current.value,
    Last_Name:Last_Name.current.value,
    Adhar_Card_Number:Adhar_Card_Number.current.value,
    Voter_ID:Voter_ID.current.value,
    EmailID:EmailID.current.value,
    Mobile_Number:Mobile_Number.current.value,
    password:password.current.value,
    Political_party:Political_party.current.value,
    Party_Menefesto:Party_Menefesto.current.value

  };
  console.log(data);
  // if(password!=password2)
  // {
  //   alert("password do not match");

  // }
  // else
  // {
  axios.post(`http://localhost:4000/v1/electioncandidates/register`,data).then((response) => {
  });  
  navigate("/");
// } 
  


}

  return (
    <>
    <Header />
  
<body>
    <div class="container">
      <form onSubmit={handleclick}>
        <h1>Register for Participating In  Election</h1>

        <div class="form-group">
          <label for="username">First Name</label>
          <input type="text" id="username" name="first_name" placeholder="Enter Your First Name" ref={first_name} required></input>
        </div>

        <div class="form-group">
          <label for="username">Last Name</label>
          <input type="text" id="username" name="Last_Name" placeholder="Enter Your Last Name" ref={Last_Name} required></input>
        </div>

        <div class="form-group">
          <label for="username">EmailId</label>
          <input type="text" id="username" name="EmailID" placeholder="Enter Your Email-ID" ref={EmailID} required></input>
        </div>

        <div class="form-group">
          <label for="username">Phone Number</label>
          <input type="text" id="username" name="Mobile_Number" placeholder="Enter Your Phone Number" ref={Mobile_Number} required></input>
        </div>

        <div class="form-group">
          <label for="username">Voter ID Card</label>
          <input type="text" id="username" name="Voter_ID" placeholder="Enter Your Voter ID" ref={Voter_ID} required></input>
        </div>
        <div class="form-group">
          <label for="username">Adhar Card</label>
          <input type="text" id="username" name="Adhar_Card_Number" placeholder="Enter Your AdharCard Number" ref={Adhar_Card_Number} required></input>
        </div>

        <div class="form-group">
          <label for="username">Political party</label>
          <input type="text" id="username" name="Political_party" placeholder="Enter Your Political Party" ref={Political_party} required></input>
        </div>

        <div class="form-group">
          <label for="username">Party Symbol</label>
          <input type="text" id="username" name="Party_Symbol" placeholder="Enter Your Party Symbol" ref={Party_Symbol} required></input>
        </div>
        <div class="form-group">
          <label for="username">Party Menefesto</label>
          <input type="text" id="username" name="Party_Menefesto" placeholder="Enter Your Party Menefesto" ref={Party_Menefesto} required></input>
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
