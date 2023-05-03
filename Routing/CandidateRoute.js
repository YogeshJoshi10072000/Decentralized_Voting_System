const express=require("express");
const {createuser,otpverification,login,logout,updatepassword,update,allusers}=require("../Controller/CandidateController");

const router=express.Router();

router.route("/register").post(createuser);
router.route("/login").post(login);
router.route("/update/:id").put(update);
router.route("/updatepassword/:id").put(updatepassword);
router.route("/otpverification/:id").post(otpverification);
router.route("/allusers").get(allusers);


module.exports=router;