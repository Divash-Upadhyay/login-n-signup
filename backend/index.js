const express = require("express");
const mongoose = require("mongoose");
const cors =  require("cors");
// const passport = require("passport");
// const googleStrategy = require("passport-google-oauth20")
const app = express()
app.use(express.json());

app.use(cors());
app.use(express.urlencoded())





// db Connection
const connect =()=>{ 
    return mongoose.connect('mongodb+srv://dishu:qwerty123456@auth.ubmpk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
}


// user Schema
const userSchema = new mongoose.Schema({
    first_name:{type:String,required:true},
    last_name: {type:String,required:true},
    email:{ type:String, required:true},
    password:{ type:String},
    dob: {type:String},
    number:{type:Number}
})

const User = new mongoose.model("User",userSchema);


// CRUD
app.post("/login", (req,res)=>{
    const {email,password} = req.body;
    User.findOne({email:email} , (err , user) =>{
        if(user){
            if(password === user.password){
                res.send({message:"login Successfull" ,user:user})
            }
            else{
                res.send({message:"password didnt matched"})
            }
        }
        else{
            res.send({message:"user not registered"});
        }
    })
});

app.post("/register", (req,res)=>{
   const {first_name , last_name , email , password , dob, number} = req.body;
   User.findOne({email:email}, (err,user) =>{
       if(user){
           res.send({message:"user already registered"})
       }
       else{
        const user = new User({
            first_name,
            last_name,
            email,
            password,
            dob,
            number
        })
        user.save(err =>{
            if(err){
                res.send(err)
            }
            else{
                res.send( {message:"succesfully added"})
            }
        })
       }
   })
 
});


app.get("/users", async (req, res) => {
    try {
      const users = await User.find().lean().exec();
  
      return res.send(users);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });

const port = process.env.PORT|| 9002;

app.listen(port, async () =>{
   try{
       await connect();
       console.log("connected on port 9002");
   } 
   catch(e){
     console.log(e);  
   }
})