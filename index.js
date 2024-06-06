//packages
const   mongoose=require("mongoose");
const   express=require("express");
const   bcrypt = require('bcryptjs');
const   cors = require('cors');
const   saltRounds = 10;


//Models
const   RegisterModel=require("./Models/RegisterModel")

//Middleman
const   usernamechecking=require("./Middleman/UsenameChecking")

//connecting DB
mongoose.connect("mongodb://localhost:27017/Mac")
    .then(()=>{
        console.log("DataBase Connected")
    })
    .catch((error)=>{
        console.log(error)
    });

const App=express();
App.use(express.json());
App.use(cors())
App.listen(8080, ()=>{
    console.log("Server is Up And Running");
});

//registration enpoint creation
App.post("/registration", usernamechecking, async(req, res)=>{

    const userData= req.body;

    bcrypt.genSalt(saltRounds, async(err, salt)=> {
        if(!err)
            {
                bcrypt.hash(userData.password, salt, async(err, hash)=> {
                    if(!err)
                        {
                            userData.password=hash;
                            try {
                                const info=await RegisterModel.create(userData);
                                if(info!=null)
                                    {
                                        res.status(200).send({message:"Registration Successful", status:"200"});
                                        console.log("success")
                                    }
                                else{
                                    res.send({Message:"Registration Failed"})
                                    console.log("Failed")
                                }
                            } catch (error) {
                                console.log(error)
                            }
                        }
                })
            }
    }); 
    
})

//Login Endpoint
App.post("/login", async(req, res)=>{
    const loginData= req.body;
    try {
        const info=await RegisterModel.findOne({username:loginData.username});
        if(info!=null)
            {
                bcrypt.compare(loginData.password, info.password, async(err, result)=> {
                    if(result==true)
                      {
                         res.send({message:" Login Success"})
                      }
                    else        
                      {
                        res.send({message:"invalid password"})
                        console.log(err)
                      }   
                }); 
            }
        else
        {
            res.send({message:"User not found"})
        }
        
    } catch (error) {
        console.log(error)
    }
})


