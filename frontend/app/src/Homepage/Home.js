import React, { useEffect } from 'react'
import Header from '../basiccomponent/Header/Header';
import Footer from '../basiccomponent/Footer/Footer';
import "./Home.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from "axios";

function Card(p){
  
  const navigate=useNavigate();
  const fun2=(e)=>{
       navigate(`/home/${e}`);
  }
  return (
    <>
    <div class="card">
  <img src="https://via.placeholder.com/300" alt="Card Image" />
  <div class="card-content">
    <h3>{p.m.first_name}  {p.m.Last_Name}</h3>
    <p>Menefesto of candidate :{p.m.Party_Menefesto} </p>
    <button class="btn" onClick={() => fun2(p.m._id)}> Read More About Candidate </button>
  </div>
</div>

    </>
  )
}

export default function Home() {

const [allusers,setusers]=useState(0);
const navigate=useNavigate();
useEffect(() => {
 
    axios.get(`http://localhost:4000/v1/admin/allcandidates`).then((response) => {
        setusers(response.data);
      });
    
  
}, [])

const fun2=(e)=>{
       
  navigate(`/home/${e}`);
}

// console.log(allusers.obj);
  return (
    <>
    <Header />
<h1 className='heading'>Participants in Election</h1>

    <div class="card-container">
{allusers.obj && allusers.obj.map((p) => (

p.isverifiedbyadmin? <Card m={p} />:null


 )) }

 </div>  
  
    <Footer />
    </>
  )
}
