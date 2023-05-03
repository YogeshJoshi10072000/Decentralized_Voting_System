const express = require('express')
const dotenv=require("dotenv");
const process=require("process");
var bodyParser = require('body-parser');
const app = express();
let cors = require("cors");
app.use(cors());
const cloudinary = require('cloudinary');

app.use(bodyParser.json());
const Connect_to_database=require('./database');

const adminroutes=require("./Routing/AdminRrouting");
const voterroutes=require("./Routing/VoterRouting");
const candidatesroutes=require("./Routing/CandidateRoute");



dotenv.config({path:__dirname+'/.env'});


Connect_to_database();

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use('/v1/voters',voterroutes);
app.use('/v1/admin',adminroutes);
app.use('/v1/electioncandidates',candidatesroutes);

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/home', (req, res) => {
    res.send('hello world in home page')
  })

app.listen(process.env.PORT,function(){
    console.log("server listening at port 4000");
});