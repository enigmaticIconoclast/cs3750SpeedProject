import React from "react";
import { Route, Routes } from "react-router-dom";

// Import components
import Hello from "./components/hello";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </div>
  );
};

export default App;
