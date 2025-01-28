const Schedule = require("../models/schedule.model");
const Response = require("../utils/response")

module.exports.uploadSchedule = async(req,res)=>{
    const {date,time,course} = req.body;
    if([date,time,course].some((val)=>val.trim()==="")){
        throw new Error("All fields are required")
    }
    const newSchedule = new Schedule(date,time,course);
    if(!newSchedule){
        throw new Error("Something went wrong")
    };
    return res.send(
        new Response(200,"Data saved successfully",newSchedule)
    )
}
