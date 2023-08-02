import React from "react";
import { Route, Routes } from "react-router-dom";

// Import components
import Hello from "./components/hello";
import Foyer from "./components/foyer";
import CreateUser from "./components/create-user";
import Login from "./components/login";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/foyer" element={<Foyer />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
