const   RegisterModel=require("../Models/RegisterModel")

async function UsernameChecking(req, res, next){
    const userData= req.body;
    try {
        const info=await RegisterModel.findOne({username:userData.username})
        if(info==null)
            {
                next()
            }
        else{
            res.send({Message:"Usename Already exist"})
        }
       } catch (error) {
        console.log(error)
    }
}

module.exports=UsernameChecking;