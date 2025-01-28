require('dotenv').config()
console.log(process.env) 
const express = require("express")
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const oppertunity = require("./routes/oppertunity.route")
const schedule = require("./routes/schedule.route")
const trainer = require("./routes/trainer.route")

const app = express();
const port = 3003;

app.listen(port , async()=>{
    try {
        mongoose.connect(process.env.DATABASE_VALUE)
        .then(() => console.log('Connected!'));
        console.log(`Listening on port : ${port}`)
    } catch (error) {
        console.log("error.message")
    }
});

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cookieParser())
app.use("/api/v1/oppertunity",oppertunity)
app.use("/api/v1/schedule",schedule)
app.use("/api/v1/trainer",trainer)

app.get("/",(req,res)=>{
    res.send("Working")
})