import { Image, Box, Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import getRating from "../util/getRating";

//TypeScript Interfaces
interface IMatches {
    firstHouseId: number,
    secondHouseId: number,
    firstOldElo: number, 
    secondOldElo: number,
    firstNewElo: number,
    secondNewElo: number, 
    status: boolean,
}
interface IHouses {
    house_id: number,
    house: string,
    picture: string, 
    price: number,
    elo: number, 
    percent: number,
}

export default function CreateMatches (props: {houses: IHouses}) {
    //Chakra UI Modal functions
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [id, setId] = useState(props.houses.house_id)
    const [secondHouseInfo, setSecondHouseInfo] = useState({
        house_id: 0,
        house: "",
        picture: "",
        price: 0,
        elo: 0,
        percent: 0
    })
    const [match, setMatch] = useState({
        firstHouseId: 0,
        secondHouseId: 0,
        firstOldElo: 0, 
        secondOldElo: 0,
        firstNewElo: 0,
        secondNewElo: 0, 
        status: false
    });
    const [result, setResult] = useState()
    const [secondHouseElo, setSecondHouseElo] = useState();

    //GET for the id/elo selected and a random id/elo
    async function getElos(id: number) {
        try {
            const response = await fetch(`http://localhost:5000/houses/${id}`)
            const jsonData = await response.json()

            setMatch((prevMatchData: IMatches) => {
                return {
                  ...prevMatchData,
                  firstHouseId: jsonData.house_id,
                  firstOldElo: jsonData.elo
                };
              });
        } catch (err: any) {
            console.error(err.message);
        }
        try {
            const response = await fetch(`http://localhost:5000/houses/random/${id}`)
            const jsonData = await response.json()

            setMatch((prevMatchData: IMatches) => {
                return {
                  ...prevMatchData,
                  secondHouseId: jsonData.house_id,
                  secondOldElo: jsonData.elo
                };
              });
              secondhouseInfo(match)
        } catch (err: any) {
            console.error(err.message);
        }
    }

    //GET for the random id/elo data
    async function secondhouseInfo(match: IMatches) {
        try {
            const response = await fetch(`http://localhost:5000/houses/${match.secondHouseId}`)
            const jsonData = await response.json()
            setSecondHouseInfo(()=> {
                return {
                    house_id: jsonData.house_id,
                    house: jsonData.house,
                    picture: jsonData.picture,
                    price: jsonData.price,
                    elo: jsonData.elo,
                    percent: jsonData.percent
                }
            })
        } catch (err: any) {
            console.error(err.message);
        }
    }

    //POST for creating a match between the two properties
    async function addMatch() {
        try {
            const body = { match };
            const response = await fetch("http://localhost:5000/matches", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
        } catch (err: any) {
            console.error(err.message)
        }
    }

    //Updates match info and calls the POST and PUT function 
    function calculateResult(result: boolean) {
        var resultInfo = getRating(match.firstOldElo, match.secondOldElo, result);
        
        setMatch((prevMatchData: IMatches) => {
            return {
              ...prevMatchData,
              firstNewElo: resultInfo.firstNewRating,
              secondNewElo: resultInfo.secondNewRating,
              status: result
            };
          });

          addMatch();
          updateElo();
    }

    //PUT to update the elos of the two properties after a match is decided
    async function updateElo() {
        const { 
            firstHouseId, 
            secondHouseId,
            firstNewElo, 
            secondNewElo, 
            status
        } = match

        try {
            const body = {
                firstHouseId, 
                secondHouseId,
                firstNewElo, 
                secondNewElo, 
                status}
            const response = await fetch('http://localhost:5000/matchResult', {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
        } catch (err: any) {
            console.error(err.message);
        }
    }

    //Modal for the two properties
    function MatchResult () {
        return (
            <>
            <Button onClick={() => {
                getElos(id)
                onOpen()
            }}>Create Match</Button>
      <Modal
        closeOnOverlayClick={false}
        size='full'
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Match</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Center>
            <Box>
                <TableContainer>
                    <Table>
                    <Thead>
                    <Tr>
                        <Center>
                            <Th>Picture</Th>
                        </Center>
                        <Th>Title</Th>
                        <Th isNumeric>Price</Th>
                        <Center>
                            <Th>Match</Th>
                        </Center>
                    </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>
                                <Image boxSize='250px' objectFit='cover' src={props.houses.picture}/>      
                            </Td>
                            <Td>
                                {props.houses.house}
                            </Td>
                            <Td isNumeric>
                                ${props.houses.price}
                            </Td>
                            <Td>
                            <Button onClick={() => {
                                onClose()
                                calculateResult(true)
                            }}>Wins</Button>
                            </Td>
                        </Tr>
                    </Tbody>
                    <Tbody>
                        <Tr>
                            <Td>
                                <Image boxSize='250px' objectFit='cover' src={secondHouseInfo.picture}/>
                            </Td>
                            <Td>
                                {secondHouseInfo.house}
                            </Td>
                            <Td isNumeric>
                                ${secondHouseInfo.price}
                            </Td>
                            <Td>
                                <Button onClick={() => {
                                    onClose()
                                    calculateResult(false)
                                }}>Wins</Button>
                            </Td>
                        </Tr>
                    </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
          </>
        )
    }

    return (
        <Box>
            <MatchResult/>
        </Box>
    )
}