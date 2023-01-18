import React, { useState, useEffect } from "react";
import {baseURL, fetchApi} from '../util/fetchApi'
import { Box, Center} from "@chakra-ui/react";
import ListOfProperties from "../components/ListOfProperties";


const InputHouses = () => {
    const [properties, setProperties] = useState([])
    const [house, setHouse] = useState({
        title: "",
        picture: "",
        price: 0
    });

    //Post for houses
    async function addHouse(house: string, picture: string, price: number) {
        try {
            const body = { house, picture, price };
            const response = await fetch("http://localhost:5000/houses", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
        } catch (err: any) {
            console.error(err.message)
        }
    }

    //FetchAPI to retrieve property data from RAPIDAPI
    useEffect(() => {
        const propertyForSale = Promise.resolve(fetchApi(`${baseURL}properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=15`))

        propertyForSale.then(
            (res) => {
                setProperties(res.hits)
            }
        )
    }, []);
    
    //Mapping properties array
    const property = properties.map((item: {title: string, coverPhoto: {url:string}, price:number, id:number})=> {
        return (
            <ListOfProperties key={item.id} {...item} addHouse={addHouse}/>
        )
    })

    return (
        <Box h="100vh">
            <Center>
                <Box w="65%">
                    {property}
                </Box>
            </Center>
        </Box>
    )
}

export default InputHouses;