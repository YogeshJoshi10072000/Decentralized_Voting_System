import Login from "./components/login/login";
import Register from "./components/register/register";
import Candlogin from "./components/CandidateProfile/login/login";
import Candregister from "./components/CandidateProfile/Register/register";
import Header from "./basiccomponent/Header/Header";
import Footer from "./basiccomponent/Footer/Footer";
import Home from "./Homepage/Home";
import Admin from "./admin/Admin";
import Allcandidate from "./admin/Allcandidatelist/Allcandidate";
import Participants from "./admin/verificationcandidate/participants";
import { Routes, Route, useParams } from 'react-router-dom';
import Candidateprofileview from "./Homepage/candidateprofileview";
import Allvoters from "./admin/Allvoters/Allvoters";
import Profile from "./Profile/Profile";
import GenerateResult from "./admin/generateresult/GenerateResult";

import abi from "./contracts/Transaction.json";
import {ethers} from "ethers";
// const ethers = require("ethers")
import { useState } from "react";
import { useEffect } from "react";
function App() {
  
 const[user,setuser]=useState(0);




  const [election,setelection]=useState();
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const user1= JSON.parse(localStorage.getItem("user"));
    setuser(user1);
    // console.log("session");
    // console.log(user1);
    const connectWallet = async () => {
      // const contractAddress = "0x4012499D66747dD754A47Bc436384e04F5a2Bc8D";
      const contractAddress="0x0AF8fa26d8098Fc2f31EE8E4544675F0db2f0Fee";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
      
  
          const signer = provider.getSigner();

          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
          // const { contract } = blockchain.m;
          const getalltrans= await contract.getAllTransaction();
          setelection(getalltrans);

        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  // user
  // console.log(state);


  return (
   <>

  <Routes>
     
      
        {!user && <Route path="/Voterslogin" element={<Login />} /> }
       {!user &&  <Route path="/VotersRegister" element={<Register />} /> }

       {!user &&  <Route path="/CandidateRegister" element={<Candregister />} />}
       {!user &&  <Route path="/CandidateLogin" element={<Candlogin />} />}
   
       <Route path="/home/:userId" element={<Candidateprofileview />} />

        <Route path="/" element={ <Home />} />
        {/* <Route path="/profile/:userId" element={<Profile m={state}/>} /> */}
       { user && !user.obj.isadmin ? (<Route path="/profile/:userId" element={<Profile m={state}/>} />): (<Route path="/" element={ <Home />} />)}

        {user && user.obj.isadmin &&  <Route path="/admin/generateresult" element={<GenerateResult m={election}/>} />}
        {user &&  user.obj.isadmin && <Route path="/admin/:userId" element={<Participants />} />}
        {user && user.obj.isadmin && <Route path="/admin/allvoters" element={<Allvoters />} />}
        {user && user.obj.isadmin &&<Route path="/admin" element={<Admin />} />}
        {user && user.obj.isadmin &&<Route path="/admin/verify" element={<Allcandidate />} />}

    </Routes>

   </>
    

  
  );
}

export default App;
