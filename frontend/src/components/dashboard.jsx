import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

function dashboard() {
    let [trainers,setTrainers] = useState([])
    useEffect(
        axios.get("localhost:3003/api/v1/trainer")
        .then((res)=>{setTrainers(res)})
    ),[]


  return (
    <div>
     <Link to={"/add-trainer"}><button>Add Trainer</button></Link>
      {
        trainers.map((trainer)=>(
            <div>
                <p> Name : {trainer.trainerName} </p>
                <p> Availability : {trainer.availability} </p>
                <p> Contact : {trainer.contactInfo} </p>
                <Link to={"/update"}><button >Update</button></Link>
                <button onClick={axios.delete("localhost:3003/api/v1/trainer/",+trainer._id)}>Delete</button>
            </div>
        ))
      }
    </div>
  )
}

export default dashboard
