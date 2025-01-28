const { Oppertunity } = require("../models/oppertunity.model.js");
const Response = require("../utils/response.js");

const getOppertunities = async (req, res) => {
    const { type } = req.params;
    let oppertunities;
    try {
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
                new Response(404, "Data not found", [])
            );
        }
    } catch (error) {
        return res.status(500).send(
            new Response(500, "An error occurred", error.message)
        );
    }
};

const uploadOppertunity = async (req, res) => {
    const { fieldType, course, location } = req.body;
    try {
        // Validate that no field is empty
        if ([fieldType, course, location].some((val) => !val.trim())) {
            return res.status(400).send(new Response(400, "All fields are required", []));
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
             "Data saved successfully"+ newOpp
        );
    } catch (error) {
        return res.status(500).send(
           "Something went wrong"+ error.message
        );
    }
};

module.exports = { getOppertunities, uploadOppertunity };
