import { useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { Validuser } from "./App";
let socket; // Declare socket outside to persist across renders

function Chart() {
  const [message, setMessage] = useState([]);
  const [ymsg,setymsg]=useState('')
   const {name,mail}=useContext(Validuser)
   const[status,setstatus]=useState(false)
   const backend_url = "https://localhost:3000"
   console.log(backend_url)
  useEffect(() => {
    // Avoid re-creating socket if already connected
    if (!socket) {
      socket = io("http://localhost:3000",{

      }); // Create socket only once
    }

    // Listen for incoming messages
    socket.on("message", (data) => {
      console.log("Message from server:", data);
      setMessage(data);
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
    console.log(typeof message)
    console.log(message.length)
    setymsg('')
  }
  const getMessage=(e)=>{
    //setstatus((pre)=>!pre)
    setymsg(e.target.value)

  }

  return (
    <>
    
  
    <div className="w-full">
    {message.map((d, i) => (
      
        <div key={i} className="p-2 bg-blue-200">{d}</div>
        
      ))}
      </div>
   
    


<input
  type="text"
  value={ymsg}
  onChange={getMessage}
  className="border p-1 mt-2"
/>
<button
  onClick={sendMessage}
  className="bg-blue-500 text-white px-4 py-1 mt-2"
>
  Send
</button>
</>
  );
}

export default Chart;
