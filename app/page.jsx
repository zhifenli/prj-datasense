"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Connect to the WebSocket server
    const ws = new WebSocket("ws://localhost:3001");

    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(newData);
    };

    // Cleanup on unmount
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h1>Real-time Data</h1>
      {data ? (
        <div>
          <p>Timestamp: {data.timestamp}</p>
          <p>Temp: {data.temp}</p>
        </div>
      ) : (
        <p>Waiting for data...</p>
      )}
    </div>
  );
}
