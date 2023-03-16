import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const client = mqtt.connect('mqtt://io.adafruit.com:443', {
      clientId: "smartFarm_backend",
      username: "",
      password: ""
    });

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe('/feeds/light-sensor');
    });

    client.on('message', (topic, message) => {
      console.log(`Received message on topic ${topic}: ${message.toString()}`);
      setMessage(message.toString());
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <div>
      <h1>Received Message: {message}</h1>
    </div>
  );
}

export default App;