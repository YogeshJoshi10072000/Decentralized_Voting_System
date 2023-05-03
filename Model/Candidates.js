const mongoose=require('mongoose');

const Election_Candidates=new mongoose.Schema({
first_name:{
    type:   String,
    required:[true,"enter your first name"]
   },
Last_Name:String,

password:String,

Mobile_Number:{
    type:   String,
    required:[true,"enter your Phone Number"]
   },
   isadmin:{
    type:Boolean,
    default:false
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
   electionid:{
type:Number,
default:1
},

   Political_Party:{
    type:String,
  default:"Individual Participant"
   },

   Party_Symbol:String,

   Party_Menefesto:String,

Constituency:{
type:String

// required:[true,"enter constituency"]

},

EmailID:String,

isverified:{
    type:Boolean,
    default:false
},

isverifiedbyadmin:{
    type:Boolean,
    default:false
}

});

const Election_candidate=mongoose.model('Election_candidate',Election_Candidates);

module.exports = Election_candidate;