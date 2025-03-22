import React, { useContext} from 'react'
import {useNavigate} from "react-router-dom"
import { Validuser } from './App'
import {v4 as uuidv4} from "uuid"
function User({olduser}) {
   
    const navigate=useNavigate()
    const {name,setname,mail,setmail,setvalid}=useContext(Validuser)
    const startChart=()=>{
        if(name.length>0&&mail.length>0)
        {
            if(!olduser)
            {

            setvalid(true)
            localStorage.setItem("isvalidusertochart",JSON.stringify({name:name,mail:mail,uid:uuidv4(),valid:true}))
            }
            navigate("/chart")
        }
          

    }
  return (
    <>
        <label>name</label>
      <input type="text" value={name} placeholder="enter your name" onChange={(e)=>setname(e.target.value)}/>
      <label>mail</label>
      <input type="text" value={mail} placeholder='enter your mail' onChange={(e)=>setmail(e.target.value)}/>
      <button onClick={startChart}>start chat</button>
    </>
  )
}

export default User
