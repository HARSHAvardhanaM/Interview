const { Trainer } = require("../models/trainer.model");
const Response = require("../utils/response")
const CustError = require("../utils/Error")

const createTrainer = async (req, res,next) => {
    try {
        const { trainerName="", availability="", expertise=[], contactInfo="" } = req.body;
        // Validation: Ensure all fields are provided
        if ([trainerName, availability, expertise[0], contactInfo].some((val) => val.trim() === "")) {
            throw new CustError(400,"All fields are required");
        }
    
        // Check if a trainer with the same name already exists
        const trainer = await Trainer.findOne({$or : [{ trainerName: trainerName } , {contactInfo : contactInfo} ]});
        if (trainer) {
            throw new CustError(401,"Trainer already exists");
        }
    
        // Create a new trainer object using the provided data
        const newTrainer = new Trainer({
            trainerName,  // Name of the trainer
            availability, // Availability of the trainer
            expertise,    // Expertise areas of the trainer
            contactInfo    // Contact information of the trainer
        });
    
        // Save the new trainer
        await newTrainer.save();
    
        // Return the success response
        return res.send(
            new Response(200,"Data saved successfully",newTrainer)
        );
    } catch (error) {
        return next(error)
    }
};


const editTrainer = async (req,res)=>{
    const {id} = req.params;
    const {trainerName,availability,expertise,constactInfo} = req.body;
    if(!trainerName && !availability && !expertise && !constactInfo) {
        res.send (new Error("Any one field is required to update"))
    }
    const trainer = await Trainer.findById(id)
    if(!trainer){
        throw new Error("No data found")
    }
    // let updateObj = {};
    // let keyNames = ["trainerName","availability","expertise","constactInfo"];
    // [trainerName, availability, expertise, constactInfo].forEach((ele, ind) => {
    //     if(ele.trim() !== ""){
    //         updateObj[keyNames[ind]] = ele
    //     }
    // });
        
    // console.log(updateObj)
    const updatedTrainer = await Trainer.findByIdAndUpdate(id,
       {$set : {trainerName,availability,expertise,constactInfo}},{new:true}
    )
    if(!updatedTrainer){
        res.send (new Error("Something went wrong"))
    };
    return res.send(
        new Response(200,"Data saved successfully",updatedTrainer)
    )
};

const deleteTrainer = async (req,res) =>{
    const {id} = req.params;
    const deleteduser = await Trainer.findByIdAndDelete(id);
    if(!deleteduser){
        res.send (new Error("Something went wrong"))
    }
    return res.send(
        "Data deleted successfully" + deleteduser
    )
}

// const loginTrainer = async(req,res)=>{
//     const {trainerName,password} = req.body;
//     const user = await Trainer.findOne({trainerName});
//     const passwordCheck = user.checkPassword(password);
//     if(!passwordCheck){
//         throw new Error("Invalid credentials")
//     }
//     const jwt = await user.generateToken();
//     res.cookie("token",jwt)
//     return res.send(
//         new Response(200,"Data saved successfully",user)
//     )

// }

const getTrainers = async (req,res)=>{
    const trainers = await Trainer.aggregate([
        {
            $match : {}
        }
    ])
    if(!trainers){
        res.send (new Error("No trainers found"))
    }
    return res.send(
        new Response(200,"Data fetched successfully",trainers)
    )
};

const getTrainerById = async (req,res)=>{
    const {id} = req.params
    console.log(id)
    if (!id || id.trim() === "") {
        throw new Error("No data found");
    }
    const trainer = await Trainer.findById(id)
    if(!trainer){
        res.send (new Error("No trainers found"))
    }
    return res.send(
        new Response(200,"Data fetched successfully",trainer)
    )
};

module.exports = {createTrainer,editTrainer , getTrainerById, getTrainers,deleteTrainer}