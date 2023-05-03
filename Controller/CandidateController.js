const Election_candidate=require("../Model/Candidates");
const bcrypt=require("bcrypt");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;



exports.createuser=async(req,res)=>{

  try {
    
const data=req.body;
console.log(data);
const password=req.body.password;

const salt = await bcrypt.genSalt(10)
const hash= await bcrypt.hash(req.body.password, salt);
data.password=hash;
data.isverified=false;

const number=Math.floor(100000 + Math.random() * 900000);
const thisdate=Date.now();
const expriry_date=Date.now() + 3600 * 1000;

const opt={
  no:number,
  from:thisdate,
  expiry:expriry_date
};



data.otp=opt;



 
const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject();
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN
    }
  });

  return transporter;
};


const sendEmail = async (emailOptions) => {
  let emailTransporter = await createTransporter();
  await emailTransporter.sendMail(emailOptions);
};


sendEmail({
  subject: "Please verify otp for vefification",
  text: `${opt.no} is your verification number,verify as soon as possible `,
  to: req.body.EmailID,
  from: process.env.EMAIL
});
  




const registercandidate=new Election_candidate(data);

await registercandidate.save();
res.status(200).json({
  success: true,
  registercandidate,
});
} 
catch (error)
{
    console.log(error);
} 

};

exports.otpverification=async (req,res)=>{

  try {
    
  const obj=await Election_candidate.findOne({_id:req.body._id});
  if(!obj)
  {
    res.send({status:false,message:"no object registerd"});
  }
  
 if(obj.otp.expiry<Date.now())
 {
  console.log(Date.now()+" "+obj.otp.expiry);
    await Election_candidate.findOneAndDelete({_id:req.body._id});
  res.send({status:false,message:"otp session expired"});

 } 
if(req.body.number!=obj.otp.no)
{
  
  res.send({status:false,message:"wrong otp number"});
}

 await Election_candidate.findOneAndUpdate({_id:req.body._id},{isverified:true});
res.send({status:true,message:"email verified",data:obj});



} catch (error)
{
    res.send({status:failed,message:"failed otp verification"});
}
  
};


exports.login=async (req,res)=>{

try {


  const obj=await Election_candidate.findOne({Voter_ID:req.body.Voter_ID});

// if(!obj||!obj.isverified)
// {
//   res.send({status:false,message:"no user found"});
// }
// console.log("hello");
// console.log(req.body);
const isvalid= await bcrypt.compare(req.body.password, obj.password);
if(!isvalid)
{
  
  res.status(500).json({
    success: false,
    message:"invalid email or password",
  });
}
else
{

res.status(200).json({
  success: true,
  obj
});

}
  
} catch (error) {

  res.status(500).json({
    success: false,
    error,
  });
  
}


};

exports.logout=async (req,res)=>{



};

exports.updatepassword=async (req,res)=>{

  try {
    

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(req.body.password, salt);
const prevpassword=bcrypt.hashSync(req.body.prevpassword, salt);
await Election_candidate.findOneAndUpdate({password:prevpassword},{password:hash});

res.send({updated:true});

  } catch (error) {
    console.log(error);
  }


};
exports.update=async (req,res)=>{

  try {
    
const data=req.body;
await Election_candidate.findOneAndUpdate({_id:req._id},data);

res.send({updated:true,data:data});

  } catch (error) {
    console.log(error);
  }


};



exports.allusers=async (req,res)=>{

  try {
    

const data=await Election_candidate.find({});

res.send({status:true,data:data});

  } catch (error) {
    
    console.log(error);
  }


};