import { Flex, Box, Text, Button } from '@chakra-ui/react'

import React, { useState, useEffect } from 'react';
import ListOfHouses from '../components/ListOfHouses';
import CreateMatches from '../components/CreateMatches'
import ApiTest from '../components/ApiTest';

interface IHouses {
    house_id: number,
    house: string,
    picture: string, 
    price: number,
    elo: number, 
    percent: boolean,
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
            <div >
                <ListOfHouses
                    key={houses.house_id}
                    {...houses}
                />
                <CreateMatches houses={houses}/>
            </div>
        )
    })

    return (
    
        <Box>
            {house}
        </Box>
    )
}