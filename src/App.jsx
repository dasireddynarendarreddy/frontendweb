import React, { createContext, useContext, useState } from 'react'
import Chart from './Chart'
import User from './User'
import ProtectedRoute from './ProtectedRoute'
import {Routes,Route} from "react-router-dom"
import Persons from './Persons'
export const Validuser=createContext()
function App() {
  
 
  const savedData = localStorage.getItem("isvalidusertochart");

  // Parse the data correctly
  const parsedData = savedData ? JSON.parse(savedData) : null;
  
  // Set initial states
  const [isvalid, setvalid] = useState(parsedData ? parsedData.valid : false);
  const [name, setname] = useState(parsedData ? parsedData.name : "");
  const [mail, setmail] = useState(parsedData ? parsedData.mail : "");
  const[socket,setsocket]=useState('')
   
  return (
    <>
<Validuser.Provider value={{isvalid,setvalid,name,setname,mail,setmail,socket,setsocket}} >
      <Routes>

        <Route path="/chart" element={
          <ProtectedRoute>
          <Chart/>
        </ProtectedRoute>}/>
        <Route path="/" element={<User olduser={isvalid}/>}/>
        {/*<Route path="/persons" element={<Persons/>}/>*/}
      </Routes>
      </Validuser.Provider>
    </>
  )
}

export default App
