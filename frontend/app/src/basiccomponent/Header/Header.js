import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Header.css";
import { useEffect } from 'react';
export default function Header() {

const [user,setuser]=useState(0);

  useEffect(() => {
  const data=JSON.parse(localStorage.getItem("user"));
  setuser(data);
    
  },[])
  

  const navigate=useNavigate();
  const fun=async(e)=>{
  
    // e.preventDefault();
    console.log("checking ");
    console.log(user);
   
    if(e.isadmin)
    {
      navigate(`/admin`);
    }
    else
    {
    navigate(`/profile/${e._id}`);
    }
  }
  const fun2=async(e)=>{
    localStorage.removeItem("user");
    navigate(`/`);
  }
  return (
   

  <body>
    <nav>
      <ul>
        <li><a class="active" href="/">Home</a></li>
       {user && <li><a  href="" onClick={() => fun(user.obj)}>{user.obj.first_name} </a></li> }
       {!user && <li><a href="/Voterslogin">Voters Login</a></li> }
       {!user && <li><a href="/CandidateLogin">Participants Login</a></li>}
       {!user && <li><a href="/CandidateRegister">Register for Participating in election</a></li>}
       {!user &&  <li><a href="/VotersRegister">Register for voting </a></li>}
     {user &&  <li><a href="" onClick={() => fun2(user.obj._id)}>Log Out</a></li> }
      </ul>
    </nav>
  </body>


  )
}

