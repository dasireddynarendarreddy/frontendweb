import { useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { Validuser } from "./App";
let socket; // Declare socket outside to persist across renders

function Chart() {
  const [message, setMessage] = useState([]);
  const [ymsg,setymsg]=useState('')
   const {name,mail}=useContext(Validuser)
   const[status,setstatus]=useState(false)
   const backend_url = import.meta.env.VITE_BACKEND_URL
  useEffect(() => {
    // Avoid re-creating socket if already connected
    if (!socket) {
      socket = io(backend_url,{

      }); // Create socket only once
    }

    // Listen for incoming messages
    socket.on("message", (data) => {
      console.log("Message from server:", data);
      setMessage([...message,data]);
    });
    socket.emit("senddata",{name:name,mail:mail,uid:JSON.parse(localStorage.getItem("isvalidusertochart")).uid})
   socket.on("count",(data)=>{
    console.log(data)
   })
  
   
    return () => {
      if (socket) {
        socket.disconnect(); // Properly close socket
        socket = null; // Reset socket to avoid re-creating
      }
    };
  }, []); // Empty dependency array means this runs only once
  const sendMessage=()=>{
    socket.emit("message",ymsg)
    console.log(message)
    setymsg('')
  }
  const getMessage=(e)=>{
    //setstatus((pre)=>!pre)
    setymsg(e.target.value)

  }

  return (
    <div className="App">
      <h3>welcome {name}</h3>
      <h5>{status?"typing":""}</h5>
      {
        message.length>0?message.map((d,i)=>(
          <div>
           <div>{d}</div>
          </div>
        )):""
      }
      <input type="text" value={ymsg} onChange={getMessage}/>
      <button onClick={sendMessage}>send</button>
      
    </div>
  );
}

export default Chart;
