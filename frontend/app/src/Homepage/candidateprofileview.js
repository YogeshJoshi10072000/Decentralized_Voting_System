import React from 'react'
import Footer from '../basiccomponent/Footer/Footer';
import Header from '../basiccomponent/Header/Header';
import { useParams } from 'react-router-dom';
import "./candidateprofileview.css";
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
export default function Candidateprofileview() {
    const {userId}=useParams();
    const [info,setinfo]=useState(0);

    useEffect(() => {
        axios.get(`http://localhost:4000/v1/admin/candidate/${userId}`).then((response) => {
            
             setinfo(response.data.obj);
          });
      }, [])

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
    </div>
</body>


   <Footer />

    </>
  )
}
