import "./Admin.css";
import React from 'react'
import Header from '../basiccomponent/Header/Header';
import Footer from '../basiccomponent/Footer/Footer';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Adminheader from "./adminheader";
import axios from "axios";
// import Header from "../basiccomponent/Header/Header";
export default function Admin() {
    const navigate = useNavigate();
    const fun1 = (e) => {
        navigate('/admin/verify')
        
          }
    const   fun2=(e)=>
    {
      const user= JSON.parse(localStorage.getItem("user"));

    localStorage.removeItem("user");
     user.obj.electionid=user.obj.electionid+1;
    localStorage.setItem("user", JSON.stringify(user));

      const data={
        electionid:user.obj.electionid+1
      }
     
        axios.put(`http://localhost:4000/v1/admin/startelection`,data).then((response) => {
        
          });
    navigate("/");

    }
    const   fun3=(e)=>
    {
        

 navigate("/admin/allvoters");
    }
    const   fun4=(e)=>
    {
        axios.put(`http://localhost:4000/v1/admin/stopelection`).then((response) => {
        
          });
     navigate("/");
    }
    const   fun5=(e)=>
    {
        navigate("/admin/generateresult")

    }
  return (
    <>
<Header />
 
 <div className='btnn'>
<Button variant="contained"   onClick={fun1}>Verify Candidates</Button>
</div>

<div className='btnn'>
<Button variant="contained"  onClick={fun2} >Start Election</Button>
</div>

<div className='btnn'>
<Button variant="contained"  onClick={fun3} >All Voters</Button>
</div>

<div className='btnn'>
<Button variant="contained"  onClick={fun4} >Stop Election</Button>
</div>

<div className='btnn'>
<Button variant="contained"  onClick={fun5} >Generate Result</Button>
</div>

<Footer />
    </>
  )
}
