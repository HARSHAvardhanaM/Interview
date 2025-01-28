const { Trainer } = require("../models/trainer.model");
const Response = require("../utils/response")

const createTrainer = async (req, res) => {
    const { trainerName, availability, expertise, contactInfo="abc@abc.com" } = req.body;
    
    // Validation: Ensure all fields are provided
    // if ([trainerName, availability, expertise, contactInfo].some((val) => val.trim())) {
    //     throw new Error("All fields are required");
    // }

    // Check if a trainer with the same name already exists
    const trainer = await Trainer.findOne({ trainerName: trainerName });
    if (trainer) {
        throw new Error("Trainer already exists");
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
       newTrainer
    );
};


const editTrainer = async (req,res)=>{
    const {id} = req.params;
    const {trainerName="",availability="",expertise="",constactInfo=""} = req.body;
    // if([trainerName,availability,expertise,constactInfo].map((val)=>val.trim()==="")){
    //     throw new Error("All fields are required")
    // }
    const trainer = await Trainer.findById(id)
    if(!trainer){
        throw new Error("Already exists")
    }
    const updatedTrainer = await Trainer.findByIdAndUpdate(id,{trainerName,availability,expertise,constactInfo})
    if(!updatedTrainer){
        throw new Error("Something went wrong")
    };
    return res.send(
        new Response(200,"Data saved successfully",updatedTrainer)
    )
};

const deleteTrainer = async (req,res) =>{
    const {id} = req.params;
    const deleteduser = await Trainer.findByIdAndDelete(id);
    if(!deleteduser){
        throw new Error("Something went wrong")
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
    const trainers = await Trainer.find({})
    if(!trainers){
        throw new Error("No trainers found")
    }
    return res.send(
        new Response(200,"Data fetched successfully",trainers)
    )
};

const getTrainerById = async (req,res)=>{
    const {id} = req.params
    const trainer = await Trainer.findOne({id})
    if(!trainer){
        throw new Error("No trainers found")
    }
    return res.send(
        new Response(200,"Data fetched successfully",trainer)
    )
};

module.exports = {createTrainer,editTrainer , getTrainerById, getTrainers,deleteTrainer}