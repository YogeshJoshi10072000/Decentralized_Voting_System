import React from 'react'
import Header from '../../basiccomponent/Header/Header';
import Footer from '../../basiccomponent/Footer/Footer';
import Adminheader from '../adminheader';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import {ethers} from "ethers";
import { Button } from '@mui/material';
// import Header from '../../basiccomponent/Header/Header';
import "./Generateresult.css";
export default function GenerateResult(election) {

    const [candidate,setcandidates]=useState(0);
    const[winner_till,setwinner]=useState(0);
    const [alldata,setalldata]=useState(0);
    const [maxvotes,setvotes]=useState(0);
    let winner_so_far_in_election;
    let winner_votes=0;
useEffect(() => {
    console.log(election.m);
  
    // console.log(typeof(election.m));

    const f=async()=>{
        axios.get(`http://localhost:4000/v1/admin/allcandidates/`).then((response) => {
            setcandidates(response.data.obj);
          });
        //   console.log(winner_till);
    }
    f();

    
    

  const map=new Map();
  

const user= JSON.parse(localStorage.getItem("user"));
const electionid=user.obj.electionid.toString();

    for (const key in election.m) {
        if (election.m.hasOwnProperty(key)) {
        //   console.log(`${key}: ${election.m[key]}`);
        const array=election.m[key];
        // console.log(array);
     if(array[2]!=electionid)
     {
         continue;
     }
    //  console.log(array);
        if(map.get(array[3])==undefined)
        {
          winner_so_far_in_election=array[3];
          winner_votes=1;
            map.set(array[3],1);
        }
        else
        {
            let count = map.get(array[3]);
              count = count+1;
              map.set(array[3], count);
           
              if(map.get(array[3])>winner_votes)
              {
                winner_so_far_in_election=array[3];
                winner_votes=count;
              }

        }

        }
      }
setvotes(winner_votes);

const f2=async()=>{
    axios.get(`http://localhost:4000/v1/admin/candidate/${winner_so_far_in_election}`).then((response) => {
        setwinner(response.data.obj);
      });
    //   console.log(winner_till);
}
if(winner_so_far_in_election!=undefined)
   f2();
  //  console.log("winner  "+winner_so_far_in_election+" vote count "+winner_votes);

 let alldataa=[];
   for(let i=0;i<candidate.length;i++)
   {
    alldataa.push({
        data:candidate[i],
        votingcount:(map.get(candidate[i]._id)==undefined?0:map.get(candidate[i]._id)),
    });
   }
   setalldata(alldataa);


//    console.log(alldata);
    

}, [election,winner_till,candidate,winner_so_far_in_election,winner_votes])






  return (
   <>
   <Header />
   <div className='xyz'>
   <h1>Profile Getting maximum Votes Till Now  </h1>  
  
   <div class="card">
  <img src="https://via.placeholder.com/300" alt="Card Image" />
  <div class="card-content">
  <h3>Maximum Votes Won By Till Now: {winner_till.first_name}  {winner_till.Last_Name}</h3>
    <h3>{winner_till.first_name}  {winner_till.Last_Name}</h3>
    <h3>vote got :  {maxvotes}</h3>
    <p>Menefesto of candidate :{winner_till.Party_Menefesto} </p>
    <p>Political Party :{winner_till.Political_Party} </p>
   
    <button  className='btn'  >Read More About Candidate</button>
   
  </div>
</div>
</div>
   


<h1>All voting cout for each candidate</h1> 
   <div class="card-container">
   
   
{alldata && alldata.map((p) => (


<div class="card">
  <img src="https://via.placeholder.com/300" alt="Card Image" />
  <div class="card-content">
    <h3>{p.data.first_name}  {p.data.Last_Name}</h3>
    <h3>vote got :  {p.votingcount}</h3>
    <p>Menefesto of candidate :{p.data.Party_Menefesto} </p>
    <p>Political Party :{p.data.Political_Party} </p>
   
 
    <button  className='btn'  >Read More About Candidate</button>
   
  </div>
</div>

 ))}

 </div> 


   <Footer />
   
   </>
  )
}
