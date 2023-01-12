import { Flex, Box, Text, Button, Center, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Stat, StatHelpText, StatArrow } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

interface IHouses {
    house_id: number,
    house: string,
    picture: string, 
    price: number,
    elo: number, 
    percent: number,
}

interface IMatches {
    first_house_id: number,
    first_new_elo: number,
    first_old_elo: number,
    match_id: number, 
    second_house_id: number,
    second_new_elo: number, 
    second_old_elo: number,
    status: boolean
}   

export default function MatchInfo(props: IHouses) {

    const [matches, setMatches] = useState([])

    const getMatches = async () => {
        try {
            const response = await fetch(`http://localhost:5000/matches/${props.house_id}`)
            const jsonData = await response.json()
            console.log(jsonData)
            setMatches(jsonData)
        }
        catch (err: any) {
            console.error(err.message)
        }
    }
    useEffect(() => {
        getMatches();
    },[]);

    const match = matches.map((matches: IMatches)=> {
        return (    
            <Tbody>
                <Tr>
                    <Td>
                    {matches.first_old_elo}
                    </Td>
                    <Td isNumeric>
                        
                        <Stat>
                            <StatHelpText>
                                {matches.first_new_elo}
                                <StatArrow type={(matches.first_old_elo<matches.first_new_elo)? 'increase' : 'decrease'} />
                                {matches.first_new_elo-matches.first_old_elo}
                            </StatHelpText>
                        </Stat>
                    </Td>
                    <Td isNumeric>
                        {matches.status? 'Won'  : 'Lost'}
                    </Td>
                </Tr>
            </Tbody>
        ) 
    })
    
    return (
        <Box>
             <Center>
            <Box>
                <TableContainer>
                    <Table>
                    <Thead>
                    <Tr>
                        <Th isNumeric>Elo Before</Th>
                        <Th isNumeric>Elo After</Th>
                        <Th>Result</Th>
                    </Tr>
                    </Thead>
                        {match}
                    </Table>
                </TableContainer>
            </Box>
        </Center>
        </Box>
    )
}
