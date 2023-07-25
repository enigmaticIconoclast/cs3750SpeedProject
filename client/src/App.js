import React from "react";
import { Route, Routes } from "react-router-dom";

// Import components
import Hello from "./components/hello";
import Foyer from "./components/foyer";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/foyer" element={<Foyer />} />
      </Routes>
    </div>
  );
};

export default App;
