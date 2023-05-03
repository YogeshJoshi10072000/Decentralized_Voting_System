const express=require("express");
const {createuser,otpverification,login,logout,updatepassword,update, allusers,votingbycandidate}=require("../Controller/Votercontroller");


const router=express.Router();

router.route("/register").post(createuser);
router.route("/login").post(login);
router.route("/update/:id").put(update);
router.route("/updatepassword/:id").put(updatepassword);
router.route("/otpverification/:id").post(otpverification);
router.route("/allusers").get(allusers);
router.route("/voting/:id").put(votingbycandidate);
module.exports=router;
