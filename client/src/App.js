import React from "react";
import { Route, Routes } from "react-router-dom";

// Import components
import Hello from "./components/hello";
import Foyer from "./components/foyer";
import CreateUser from "./components/create-user";
import Login from "./components/login";
import ClassicSpeed from "./components/classic-speed";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/foyer" element={<Foyer />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/hello" element={<Hello />} />
        <Route path="/classic-speed" element={<ClassicSpeed/>}/>
      </Routes>
    </div>
  );
};

export default App;
