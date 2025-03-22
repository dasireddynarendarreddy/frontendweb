import { useContext, useEffect } from "react";
import { Validuser } from "./App"; // Adjust path if necessary

const MyComponent = () => {
  const { socket } = useContext(Validuser);

  useEffect(() => {
    if (!socket) {
      console.log("Socket not initialized");
      return;
    }

    console.log(socket); // Check if socket is connected

    // Listen for 'noofusers' event
    const handleUserCount = (data) => {
      console.log(`Number of connected users: ${data}`);
    };

    socket.on("noofusers", handleUserCount);

    // Cleanup: Remove listener when component unmounts
    return () => {
      socket.off("noofusers", handleUserCount);
    };
  }, [socket]);

  return (
    <div>
      <h1>Listening for user count...</h1>
    </div>
  );
};

export default MyComponent;
