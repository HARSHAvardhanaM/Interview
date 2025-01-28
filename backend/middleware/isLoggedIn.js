import { Trainer } from "../models/trainer.model";

const jwt = require("jsonwebtoken")

export default isLoggedIn = async(req,res,next)=>{
    const value = jwt.verify(req.token,process.env.DATABASE_VALUE);
    const user = await Trainer.findById(value._id)
    if(user){
        next()
    }
    throw new Error(400,"Login to access"); 
}