const mongoose=require("mongoose");


const regSchema=mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Username should not be Empty'],
    },

    password:{
        type:String,
        required:[true, 'Password should not be Empty']
    },
    email:{
        type:String,
        required:[true, 'email should not be Empty']
    }
},{timestamps:true});

const   RegisterModel=mongoose.model("credentials", regSchema);

module.exports=RegisterModel

