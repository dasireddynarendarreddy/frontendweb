import React, { createContext,useEffect, useContext, useState } from 'react'
import Chart from './Chart'
import User from './User'
import ProtectedRoute from './ProtectedRoute'
import {Routes,Route} from "react-router-dom"
import { io } from "socket.io-client";
import Persons from './Persons'
import PersonChat from './PersonChat'

export const Validuser=createContext()

function App() {
  let socket;
 
  const savedData = localStorage.getItem("isvalidusertochart");

  // Parse the data correctly
  const parsedData = savedData ? JSON.parse(savedData) : null;
  
  // Set initial states
  const [isvalid, setvalid] = useState(parsedData ? parsedData.valid : false);
  const [name, setname] = useState(parsedData ? parsedData.name : "");
  const [mail, setmail] = useState(parsedData ? parsedData.mail : "");
  
  const[socketobj,setsocket]=useState()
  const[message,setMessage]=useState([])
  const[users,setusers]=useState([])
  const[ptopchart,setchart]=useState([])
  useEffect(() => {
    console.log(import.meta.env.MODE)
    if (!socket) {
      socket = io((import.meta.env.MODE === 'production'?import.meta.env.VITE_BACKEND_URL:"http://localhost:3000"),{
        
      }); 
      console.log(socket)
          setsocket(socket)
    }

    
    socket.on("message", (data) => {
      console.log("Message from server:", data);
      
      setMessage(data);
     
    });
    socket.on("noofusers",(data)=>{
      console.log("the no of users are ",data)
      setusers(data)
    
    })
    if(localStorage.getItem("isvalidusertochart"))
    {
    socket.emit("senddata",{name:name,mail:mail,uid:JSON.parse(localStorage.getItem("isvalidusertochart")).uid})
    }
   
   
    return () => {
      if (socket) {
        socket.disconnect(); 
        socket = null; 
      }
    };
  }, []); 
  return (
    <>
<Validuser.Provider value={{isvalid,setvalid,name,setname,mail,setmail,socket,setsocket,message,socketobj,users,ptopchart,setchart}} >
      <Routes>

        <Route path="/chart" element={
          <ProtectedRoute>
          <Chart/>
        </ProtectedRoute>}/>
        <Route path="/" element={<User olduser={isvalid}/>}/>
        <Route path="/persons" element={ <ProtectedRoute><Persons/></ProtectedRoute>}/>
       
      </Routes>
      </Validuser.Provider>
    </>
  )
}

export default App
