import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import InputTodos from "./components/InputTodos"
// import ListTodos from "./components/ListTodos"
import Home from "./pages/Home";
import InputHouses from "./pages/InputHouses";
import Matches from "./pages/Matches";
import MatchInfo from "./components/MatchInfo";
import LeaderBoard from "./pages/LeaderBoard";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Link, Heading, HStack, Image } from '@chakra-ui/react'

function App() {
  return (
    <Box bg="gray.50">
      <Router>
        <Box bg="white" w="100%" borderBottom="solid" borderBottomColor="alpha.300" pl="10px" >
          <HStack>
          <Link style={{ textDecoration: 'none' }} href="/">
            <Image boxSize='35px' src='https://cdn.discordapp.com/attachments/746035358524899369/1062187459548561439/markhouse.png'/>
          </Link>
          <Box>
              <Link style={{ textDecoration: 'none' }} href="/">
                <Heading>
                Real Rate
                </Heading>
              </Link>
          </Box>
          
          <Tabs pl="5px" pr="5px" variant='enclosed' >
            <TabList>
              <Tab >
                <Link style={{ textDecoration: 'none' }} href='AddHouse'>
                  Add Properties
                </Link>
              </Tab>
              <Tab>
                <Link style={{ textDecoration: 'none' }} href='Matches'>
                  Elo
                </Link>
              </Tab>
              <Tab>
                <Link style={{ textDecoration: 'none' }} href='LeaderBoard'>
                LeaderBoard
                </Link>
              </Tab>
            </TabList>
          </Tabs>
          </HStack>
        </Box>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AddHouse" element={<InputHouses />} />
          <Route path="/Matches" element={<Matches />} />
          <Route path="/LeaderBoard" element={<LeaderBoard />} />
        </Routes>
      </Router>
    </Box>
  )
}

export default App
