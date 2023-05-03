import React from 'react'
import Adminheader from '../adminheader'
import {useNavigate } from "react-router-dom";
import { useEffect,useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import "./Allvoters.css";
import Header from '../../basiccomponent/Header/Header';
export default function Allvoters() {

    const [allparticipants,setparticipants]=useState(0);
    const [id,setid]=useState(0);
   useEffect(() => {
    
    axios.get(`http://localhost:4000/v1/admin/allvoters`).then((response) => {
        setparticipants(response.data.obj);
      });

   }, [])
  //  console.log(allparticipants);
    const navigate=useNavigate();
    const fun1=(e)=>{
        navigate("/");
    }
    const fun2=(e)=>{
       
        // navigate(`/admin/${e}`);
    }
  return (
   <>
   <Header />

<Button variant="contained"   onClick={fun1}>Back</Button>

<h1 className='xx'>All Voters</h1>

<div class="card-container">
{allparticipants && allparticipants.map((p) => (


<div class="card">
  <img src="https://via.placeholder.com/300" alt="Card Image" />
  <div class="card-content">
    <h3>{p.first_name}  {p.Last_Name}</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis efficitur quam id blandit iaculis. </p>
   
 
    <button  className='btn'  onClick={() => fun2(p._id)}>Read More About Candidate</button>
   
  </div>


  
</div>

 ))}

 </div> 
   </>
  )
}
