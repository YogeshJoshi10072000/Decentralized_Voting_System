const Election_candidate=require("../Model/Candidates");
// const registercandidate=require("../Model/Voter");
// const re
const registering_candidate=require("../Model/Voter");
const mongodb = require('mongodb')

exports.verifycandidate=async(req,res)=>{
   try {
    console.log(req.params.id);
    await Election_candidate.findOneAndUpdate({_id:req.params.id},{isverifiedbyadmin:true});
    res.status(200).json({
        success: true,
        
    });
}
 catch (error) {
    console.log(error);
    res.status(500).json({
        success: false,
    });
}

}

exports.showallcandidates=async(req,res)=>{
    try {
    const obj= await Election_candidate.find({});
    res.status(200).json({
        success: true,
        obj,
    });
 }
  catch (error) {
     console.log(error);
     res.send({status:false,message:"not verified"});
 }
 
 }

 exports.contestelection=async(req,res)=>{
   try {
    // console.log(req.body);
    const result = await registering_candidate.updateMany({}, {isvoted: false});
    const result2 = await Election_candidate.updateMany({}, {electionid:req.body.electionid});
    const result3 = await registering_candidate.updateMany({}, {electionid:req.body.electionid});
    
    res.status(200).json({
        sucess:true
      });

   } catch (error) {
    
    console.log(error);
    res.send({status:false,message:"server issues cannot contest election now"});


   }
 
 }

 exports.stopelection=async(req,res)=>{
    try {
     const result = await registering_candidate.updateMany({}, { isvoted: true});
     
     res.status(200).json({
         sucess:true
       });
 
    } catch (error) {
     
     console.log(error);
     res.send({status:false,message:"server issues cannot contest election now"});
 
 
    }
  
  }

 exports.showsinglecandidate=async(req,res)=>{
    try {
        // console.log(req.params);     
    const obj= await Election_candidate.findOne({_id:req.params.id});
   
    res.status(200).json({
        success: true,
        obj,
    });
 }
  catch (error) {
     console.log(error);
     res.status(500).json({
        success: false,
        error,
    });
 }
 
 }
 exports.showsinglevoter=async(req,res)=>{
    try {
       
    const obj= await registering_candidate.findOne({_id:req.params.id});

    res.status(200).json({
        success: true,
        obj,
    });
 }
  catch (error) {
     console.log(error);
     res.send({status:false,message:"not verified",id:req.params});
 }
 
 }

 
exports.deletecandidate=async(req,res)=>{
    try {

        const obj= await Election_candidate.findOneAndDelete({_id:req.params.id});

        res.status(200).json({
            success: true,
            message:"deleted"
        });
 }
  catch (error) {
     console.log(error);
     res.send({status:false,message:"not verified"});
 }
 
 }

 exports.allusers=async (req,res)=>{

    try {
  const obj=await registering_candidate.find({});
  res.status(200).json({
    success: true,
    obj
  });
  
  } catch (error) {
    console.log(error);
    res.status(500).json({
        sucess:false,
    
    })
    }
  
  };


  exports.cleanvoters=async (req,res)=>{

  try {
    
 await registering_candidate.deleteMany({});
 res.status(500).json({
    sucess:true,
    message:"deleted all voters"
 });

  } catch (error) {
    res.status(500).json({
        sucess:false,
        message:error
     });
  }
  
  };


  exports.cleanparticipants=async (req,res)=>{

  
    try {
    
        await Election_candidate.deleteMany({isadmin:false});
        res.status(500).json({
           sucess:true,
           message:"deleted all participants from election"
        });
       
         } catch (error) {
           res.status(500).json({
               sucess:false,
               message:error
            });
         }
         
  
  };
  exports.newelectionid=async(req,res)=>{
    try {
     const result = await Election_candidate.updateMany({}, {electionid:req.body.id});
     const result2 = await registering_candidate.updateMany({}, {electionid:req.body.id});
     
     res.status(200).json({
         sucess:true
       });
 
    } catch (error) {
     
     console.log(error);
     res.send({status:false,message:"server issues cannot contest election now"});
 
 
    }
  
  }

  
  