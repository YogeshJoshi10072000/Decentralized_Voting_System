import React from 'react';
import Adminheader from '../adminheader';
import { Routes, Route, useParams } from 'react-router-dom';
import Footer from '../../basiccomponent/Footer/Footer';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import "./participants.css";
import { Button } from '@mui/material';
import {useNavigate } from 'react-router-dom';
import Header from '../../basiccomponent/Header/Header';
export default function Participants() {
  
const [info,setinfo]=useState(0);
const  { userId } = useParams();
const navigate=useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:4000/v1/admin/candidate/${userId}`).then((response) => {
        setinfo(response.data.obj);
      });
  }, [])
  const f1=async(e)=>{
    
    axios.put(`http://localhost:4000/v1/admin/verifycandidate/${userId}`).then((response) => {
      setinfo(response.data.obj);
    });
    navigate("/admin/verify");
  }  
  const f2=async(e)=>{
    axios.delete(`http://localhost:4000/v1/admin/delete/${userId}`).then((response) => {
    });
    navigate("/admin/verify");
  }  


   console.log(info);

  return (
    <>
    <Header />

    <body>
	<div class="profile">
		<img src="https://via.placeholder.com/300" alt="https://via.placeholder.com/300" />
		<h1>{info.first_name} {info.Last_Name}</h1>
		<p>{info.adress}</p>
    <p>Mobile Number : {info.Mobile_Number}</p>
    <p>Adhar Card Number :{info.Adhar_Card_Number}</p>
    <p> Voter Id :{info.Voter_ID}</p>
    <p>Email:{info.EmailID}</p>
		<p>Location: {info.adress}</p>
    <p>Poltitical Party: {info.Political_Party}</p>
    {/* <p>Party_Symbol: {info.Party_Symbol}</p> */}
    <p>Party_Menefesto: {info.Party_Menefesto}</p>
  <Button  variant="contained"  onClick={f1}>Accept  Candidature</Button>
  <Button variant="contained"  onClick={f2}>Reject  Candidature</Button>

	</div>
</body>

    <Footer  />
    
    </>
  )
}
