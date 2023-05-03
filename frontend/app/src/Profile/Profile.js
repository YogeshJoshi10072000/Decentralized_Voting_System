import React from 'react'
import Header from '../basiccomponent/Header/Header';
import Footer from '../basiccomponent/Footer/Footer';
import axios from 'axios';
import {useNavigate,useParams } from "react-router-dom";
import { useEffect,useState } from 'react';
import {ethers} from "ethers";
import "./Profile.css";

export default function Profile(blockchain) {

   const [data,setdata]=useState(0);
    const [allparticipants,setparticipants]=useState(0);
    const [clicked,setclicked]=useState(1);
    const userlogin=JSON.parse(localStorage.getItem("user"));
    
    
    const navigate=useNavigate();
    const [m,setm]=useState(0);
    const  { userId } = useParams();
    useEffect(() => {
      
        axios.get(`http://localhost:4000/v1/admin/allcandidates`).then((response) => {
            setparticipants(response.data.obj);
          });

          axios.get(`http://localhost:4000/v1/admin/voter/${userlogin.obj._id}`).then((response) => {
            setdata(response.data.obj);
          });
          // console.log(data);

    }, [data,allparticipants])


    const fun2=async(f1,f2)=>{
       
      if(clicked==0)
      {
        alert("You Have Already Voted");
      }
      else{

      

      setclicked(0);
      

     try {
      
   
        console.log(`voting given by this id ${f1} to ${f2} `);
        console.log(blockchain.m);
        // navigate(`/`);

        const { contract } = blockchain.m;
        const user_id = f1;
        const candidate_id = f2;
        let election_id=data.electionid.toString();
        
       
        const amount = { value: ethers.utils.parseEther("0.001") };
     
        const transaction = await contract.addToBlockchain(user_id,election_id,candidate_id);
        await transaction.wait();
        // console.log("Transaction is done");

        const getalltrans= await contract.getAllTransaction();
        console.log(getalltrans);

        // const transcount= await contract.getTransactionCount();
        // console.log(transcount);
       await  axios.put(`http://localhost:4000/v1/voters/voting/${f1}`).then((response) => {
          setdata(response.data.obj);
        });

        navigate("/");

      } catch (error) {
      console.log(error);
      } 

    }


    }

  return (
    <>
    <Header />
  

    <h1 className='xx'>Give  Vote to candidate </h1>

<div class="card-container">
{allparticipants && allparticipants.map((p) => (

!data.isvoted?(
p.isverifiedbyadmin?(
<div class="card">
  <img src="https://via.placeholder.com/300" alt="Card Image" />
  <div class="card-content">
    <h3>{p.first_name} {p.Last_Name}</h3>
		<p>{p.adress}</p>
    <p>Mobile Number : {p.Mobile_Number}</p>
    <p>Adhar Card Number :{p.Adhar_Card_Number}</p>
    <p> Voter Id :{p.Voter_ID}</p>
    <p>Email:{p.EmailID}</p>
		<p>Location: {p.adress}</p>
    <p>Poltitical Party: {p.Political_Party}</p>
    <p>Party_Symbol: {p.Party_Symbol}</p>
    <p>Party_Menefesto: {p.Party_Menefesto}</p>
    <button  className='btn'  onClick={() => fun2(userId,p._id)}>Give Vote To Candidate</button>
   
  </div>
</div>
):null):(<h1>You are not AlLowed to vote now,wait Till Next Elections</h1>)

 ))}

 </div> 
 






    <Footer />
    </>
  )
}
