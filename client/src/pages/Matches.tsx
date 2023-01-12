import { Flex, Box, Text, Button, Center, Card, Stack, CardFooter, CardBody, Heading, Image, CardHeader} from '@chakra-ui/react'

import React, { useState, useEffect } from 'react';
import CreateMatches from '../components/CreateMatches'

interface IHouses {
    house_id: number,
    house: string,
    picture: string, 
    price: number,
    elo: number, 
    percent: number,
}


export default function Matches() {

    const [houses, setHouses] = useState([])

    const getHouses = async () => {
        try {
            const response = await fetch("http://localhost:5000/houses")
            const jsonData = await response.json()
            console.log(jsonData)
            setHouses(jsonData)
        }
        catch (err: any) {
            console.error(err.message)
        }
    }
    useEffect(() => {
        getHouses();
    },[]);

    const house = houses.map((houses: IHouses)=> {
        return (
        <Box bg="white">
            <Card maxW='960px'  mt="10px">
                <CardHeader>
                    <Flex>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Box>
                        <Heading size='sm'>{houses.house}</Heading>
                        <Text>${houses.price}</Text>
                        </Box>
                    </Flex>
                    </Flex>
                </CardHeader>
                <Image objectFit='cover' src={houses.picture}/>
                <CardFooter justify='space-between' flexWrap='wrap'
                    sx={{
                    '& > button': {
                        minW: '136px',
                    },
                    }}
                >
                <CreateMatches houses={houses}/>
                </CardFooter>
            </Card>
        </Box>
        )
    })

    return (
    
        <Box>
            <Center>
                <Box>
                    {house}
                </Box>
            </Center>
        </Box>
    )
}