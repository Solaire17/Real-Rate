import { Flex, Box, Text, Button, Card, CardHeader, Heading, CardBody, Center, IconButton, HStack, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,   Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalHeader,
    ModalBody,
    ModalFooter,} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import LeaderboardModal from '../components/LeaderboardModal'
import MatchInfo from '../components/MatchInfo'

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

    const getLeaderboard = async () => {
        try {
            const response = await fetch("http://localhost:5000/houses/sorted")
            const jsonData = await response.json()
            console.log(jsonData)
            setLeaderboards(jsonData)
        }
        catch (err: any) {
            console.error(err.message)
        }
    }
    useEffect(() => {
        getLeaderboard();
    },[]);

    const leaderboard = leaderboards.map((leaderboards: IHouses, count)=> {
        count++
        console.log(leaderboards.percent)
        console.log(leaderboards.percent==0 )
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