import React, { useState, useEffect } from 'react';

export default function Hello () {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5050/record'); // Replace with your server's API endpoint
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div>
      {data ? (
        <h1>{data.text}</h1> // Display the fetched data in the component
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

