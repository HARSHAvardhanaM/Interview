const Schedule = require("../models/schedule.model");
const Response = require("../utils/response")
const CustError = require("../utils/response")

const uploadSchedule = async(req,res,next)=>{
    try {
        const {trainer="",date="",time="",courseName=""} = req.body;
        if([trainer,date,time,courseName].some((val)=>val.trim()==="")){
            throw new CustError(400,"All fields are required")
        }
        const newSchedule = new Schedule({trainer,date,time,courseName});
        if(!newSchedule){
            throw new CustError(500,"Something went wrong")
        };
        await newSchedule.save()
        return (res.status(200).send(new Response(200,"Data saved successfully",newSchedule)))
    } catch (error) {
       return next(error) 
    }
}

const getSchedules = async(req,res,next)=>{
    try {
        const schedule = await Schedule.find({});
        console.log(schedule)
        if(!schedule){
            throw new CustError(400,"Schedules not found")
        }
        return res.status(200).send(new Response(200,"Data sent sucessfully",schedule))
    } catch (error) {
        return next(error) 
    }
}

const getScheduleOfTrainer = async(req,res,next)=>{
    try {
        const {id} = req.params;
        if(!id){
            throw new CustError(400,"ID is required")
        }
        const schedule = await Schedule.find({trainer:id});
        if(!schedule){
            throw new CustError(400,"Schedule not found")
        }
        return (res.status(200).send(new Response(200,"Data saved successfully",schedule)))
    } catch (error) {
        return next(error) 
    }
}

module.exports = {getSchedules,uploadSchedule,getScheduleOfTrainer}