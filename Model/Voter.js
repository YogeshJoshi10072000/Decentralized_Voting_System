const mongoose=require('mongoose');

const VoterSchema=new mongoose.Schema({
first_name:{
    type:   String,
    required:[true,"enter your first name"]
   },
Last_Name:String,

Mobile_Number:{
    type:   String,
    required:[true,"enter your Phone Number"]
   },
   password:{
    type:   String,
    required:[true,"enter your password"]
   },

   photograph: {
    public_id: {
        type: String,
    },
    url: {
        type: String,
    }
},

Adhar_Card_Number:{
 type:   String,
 required:[true,"enter adhar card"]
},
Voter_ID:{
    type:   String,
    required:[true,"enter voterID card"]
   },
isvoted:{
    type:Boolean,
    default:true
},
isadmin:{
    type:Boolean,
    default:false
},
electionid:{
    type:Number,
    default:1
    },
EmailID:String,
isverified:Boolean,
otp:{
    no:Number,
    from:Date,
    expiry:Date
}

});

const registering_candidate=mongoose.model('registering_candidate',VoterSchema);

module.exports=registering_candidate;