const Oppertunity = require("../models/oppertunity.model.js");
const Response = require("../utils/response.js");
const CustError = require("../utils/Error.js");
const { default: mongoose } = require("mongoose");

const getOppertunities = async (req, res,next) => {
    try {
        const { type } = req.params;
        console.log(["technical", "soft skills", "leadership"].includes(`${type}`))
        if (!type || !(["technical", "soft skills", "leadership"].includes(`${type}`))) {
            throw new CustError(400, "Type is required")
        }
        let oppertunities;

        if (type) {
            oppertunities = await Oppertunity.find({
                fieldType: type
            });
        } else {
            oppertunities = await Oppertunity.find({});
        }

        if (oppertunities.length > 0) {
            return res.status(200).send(
                new Response(200, "Data fetched successfully", oppertunities)
            );
        } else {
            return res.status(404).send(
                new Response(200, "Data fetched successfully", [])
            );
        }
    } catch (error) {
        return next(error)
    }
};

const getOppertunity = async (req, res,next) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new CustError(400, "Id is required")
        }
        // let oppertunity = await Oppertunity.findById(id);
        let oppertunity = await Oppertunity.aggregate([
            {
                $match : {
                    _id : new mongoose.Types.ObjectId(id),
                }      
            },
            {
                $lookup : {
                    from : "trainers",
                    localField : "interested",
                    foreignField : "_id",
                    as : "interested"
                }
            },
            {
                $addFields : {
                    totalInterested : {
                        $size : "$interested"
                    }
                }
            }
        ])

        if (!oppertunity | !oppertunity.length) {
            throw new CustError(404, "Data not found")
        } 
        return res.status(404).send(
                new Response(200, "Data fetched successfully", oppertunity)
            );
        }
    catch (error) {
        return next(error)
    }
};

const showIntrest = async (req, res,next) => {
    try {
        const { id, trainer } = req.params;
        if (!id || !trainer) {
            throw new CustError(400, "Id or TrainerId is required")
        }
        let oppertunity = await Oppertunity.findById(id);

        if (!oppertunity) {
            throw new CustError(404, "Data not found")
        } 
        let updatedOppertunity = await Oppertunity.findByIdAndUpdate(id,{$push : { interested : trainer}},{new : true})
        if (!updatedOppertunity) {
            throw new CustError(500, "Something Went Wrong in server")
        } 
        return res.status(404).send(
                new Response(200, "Data fetched successfully", updatedOppertunity)
            );
        }
    catch (error) {
        return next(error)
    }
};

const uploadOppertunity = async (req, res) => {
    const { fieldType = "", course = "", location = "" } = req.body;
    try {
        // Validate that no field is empty
        console.log([fieldType, course, location].some((val) => { return val.trim() === "" | null }))
        if ([fieldType, course, location].some((val) => { return val.trim() === "" })) {
            return res.send(new CustError(400, "All fields are required"));
        }

        // Create a new opportunity with the provided data
        const newOpp = new Oppertunity({
            fieldType,
            course,
            location
        });

        // Save the new opportunity to the database
        await newOpp.save();

        return res.status(200).send(
            "Data saved successfully" + newOpp
        );
    } catch (error) {
        return res.status(500).send(
            res.send(new Error("Something went wrong" + error.message))
        );
    }
};

module.exports = { getOppertunities, uploadOppertunity, getOppertunity , showIntrest};
