import React from 'react'
import {useForm} from 'react-hook-form'

function Addtrainer() {
const {register,handleSubmit} = useForm();

const submit =async(data) =>{
    axios.post("/localhost:3003/api/v1/trainer",data)
    .then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })
}
  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <input placeholder='Enter trainerName' {...register("trainerName")}></input>
        <input placeholder='Enter availability' {...register("availability")}></input>
        <input placeholder='Enter expertise' {...register("expertise")}></input>
        <input placeholder='Enter constactInfo' {...register("constactInfo")}></input>
      </form>
    </div>
  )
}

export default Addtrainer
