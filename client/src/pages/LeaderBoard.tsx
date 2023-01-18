import { Box, Text, Center, Table, Td, StatHelpText, Stat, StatArrow, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import LeaderboardModal from '../components/LeaderboardModal'

//TypeScript Interfaces
interface IHouses {
    house_id: number,
    house: string,
    picture: string, 
    price: number,
    elo: number, 
    percent: number,
}

export default function Scoreboard() {
    const [leaderboards, setLeaderboards] = useState([])

    //GET for houses and sorted by highest to lowest elo
    const getLeaderboard = async () => {
        try {
            const response = await fetch("http://localhost:5000/houses/sorted")
            const jsonData = await response.json()
            setLeaderboards(jsonData)
        }
        catch (err: any) {
            console.error(err.message)
        }
    }
    useEffect(() => {
        getLeaderboard();
    },[]);

    //Mapping leaderboard array
    const leaderboard = leaderboards.map((leaderboards: IHouses, count)=> {
        count++
        return (    
            <Tbody>
                <Tr>
                    <Td>
                        {count}
                    </Td>
                    <Td>
                        {leaderboards.house}
                    </Td>
                    <Td isNumeric>
                        {leaderboards.elo}
                    </Td>
                    <Td isNumeric>
                        {leaderboards.price}
                    </Td>
                    <Td isNumeric>
                        <Stat>
                        <Text fontSize='xm'>{Math.round(leaderboards.price * leaderboards.percent)}</Text>
                            <StatHelpText>
                            {leaderboards.percent==1 ? <></> : (leaderboards.percent > 1 ? ((leaderboards.percent-1)*100).toPrecision(2) : ((leaderboards.percent-1)*-100).toPrecision(2))}
                            {leaderboards.percent==1 ? <></> : '%'}
                            {leaderboards.percent==1 ? <></> : <StatArrow type={(leaderboards.percent>1)? 'increase' : 'decrease'} />}
                            </StatHelpText>
                        </Stat>
                    </Td>
                    <Td>
                        <LeaderboardModal key={leaderboards.house_id} {...leaderboards}/>
                    </Td>
                </Tr>
            </Tbody>
        )  
    })

    return (
        <Center h="100vh">
            <Box>
                <TableContainer>
                    <Table>
                    <Thead>
                    <Tr>
                        <Th isNumeric>Rank</Th>
                        <Th>Property</Th>
                        <Th isNumeric>elo</Th>
                        <Th isNumeric>Price</Th>
                        <Th isNumeric>Real Value</Th>
                        <Center>
                            <Th>View More</Th>
                        </Center>
                    </Tr>
                    </Thead>
                        {leaderboard}
                    </Table>
                </TableContainer>
            </Box>
        </Center>
    )
}