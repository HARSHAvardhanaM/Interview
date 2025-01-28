import React from 'react'

function Trainings() {
    let [trainings,setTrainings] = useState([])
    useEffect(
        axios.get("localhost:3003/api/v1/oppertunity")
        .then((res)=>{setTrainings(res)})
    ),[]


  return (
    <div>
      {
        trainings.map((training)=>(
            <div>
                <p> Field Type : {training.fieldType} </p>
                <p> Course : {training.course} </p>
                <p> Location : {training.location} </p>
                <button onClick={axios.get("localhost:3003/api/v1/trainer/",+trainings._id)}>Show intrest</button>
            </div>
        ))
      }
    </div>
  )
}

export default Trainings
