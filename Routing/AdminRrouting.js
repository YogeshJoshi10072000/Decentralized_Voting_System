const express=require("express");
const { verifycandidate, showallcandidates, contestelection, showsinglevoter, showsinglecandidate, deletecandidate,allusers, stopelection, cleanvoters, cleanparticipants, newelectionid } = require("../Controller/Admincontroller");


const router=express.Router();


router.route("/verifycandidate/:id").put(verifycandidate);
router.route("/allcandidates").get(showallcandidates);
router.route("/startelection").put(contestelection);

router.route("/voter/:id").get(showsinglevoter);
router.route("/candidate/:id").get(showsinglecandidate);

router.route("/delete/:id").delete(deletecandidate);
router.route("/allvoters").get(allusers);
router.route("/stopelection").put(stopelection);


router.route("/deletevoters").delete(cleanvoters);
router.route("/deletecandidates").delete(cleanparticipants);

router.route("/newelection").put(newelectionid);


module.exports=router;