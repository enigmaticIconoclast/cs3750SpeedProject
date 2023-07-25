import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5050");

export default function Hello() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
    console.log("Socket connected from hello.js:", socket.connected);
    socket.on("dataFromServer", (dataFromServer) => {
      if (dataFromServer) {
        console.log("Received data from the server:", dataFromServer);
        setData((prevData) => ({
          ...prevData,
          serverData: dataFromServer,
        }));
      }
    });
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5050/record"); // Replace with your server's API endpoint
      const jsonData = await response.json();
      setData((prevData) => ({
        ...prevData,
        apiData: jsonData,
      }));
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      {data ? (
        <div>
          <h1>API Data:</h1>
          {data.apiData ? (
            <pre>{JSON.stringify(data.apiData, null, 2)}</pre>
          ) : (
            <h3>Loading API data...</h3>
          )}

          <h1>Socket Data:</h1>
          {data.serverData ? (
            <pre>{JSON.stringify(data.serverData, null, 2)}</pre>
          ) : (
            <h3>No socket data yet.</h3>
          )}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
