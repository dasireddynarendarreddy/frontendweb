import { useContext, useEffect } from "react";
import { Validuser } from "./App"; // Adjust path if necessary
import {Link,Navigate, useNavigate} from "react-router-dom"
const MyComponent = () => {
  const {name,users} = useContext(Validuser);

   
   
  return (
    <div>
      <h4>{users.length} on Chat now</h4>
          <ol>
        {users.map((d,i)=>(
          <>

            <li onClick={()=>chatWithPerson(d.id)}>{d.name}</li>
          </>
        ))}
        </ol>
    </div>
  );
};

export default MyComponent;
