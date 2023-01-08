import React from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
// import InputTodos from "./components/InputTodos"
// import ListTodos from "./components/ListTodos"
import ApiTest from "./components/ApiTest"
import Home from "./pages/Home";
import InputHouses from "./pages/InputHouses";
import Matches from "./pages/Matches";
import MatchInfo from "./pages/MatchInfo";
import Scoreboard from "./pages/Scoreboard";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/AddHouse" element={<InputHouses />} />
        <Route path="/Matches" element={<Matches />} />
        <Route path="/MatcheInfo" element={<MatchInfo />} />
        <Route path="/Scoreboard" element={<Scoreboard />} />
      </Routes>
    </Router>
  )
}

export default App
