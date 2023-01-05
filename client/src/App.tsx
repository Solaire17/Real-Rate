import React from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
// import InputTodos from "./components/InputTodos"
// import ListTodos from "./components/ListTodos"
// import ApiTest from "./components/ApiTest"
import AddHouse from "./pages/AddHouse";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import MatchInfo from "./pages/MatchInfo";
import Scoreboard from "./pages/Scoreboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AddHouse" element={<AddHouse />} />
        <Route path="/Matches" element={<Matches />} />
        <Route path="/Matches" element={<MatchInfo />} />
        <Route path="/Scoreboard" element={<Scoreboard />} />
      </Routes>
    </Router>
  )
}

export default App
