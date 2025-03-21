import React, { useContext } from 'react'
import { Validuser } from './App'
import { Navigate,useLocation } from 'react-router-dom'
function ProtectedRoute({children,olduser}) {
    const {isvalid} =useContext(Validuser)
    console.log(isvalid)
    let location = useLocation();

    if(!isvalid) {
        return <Navigate to="/" state={{ from: location}} replace />
    }
 return children
}

export default ProtectedRoute
