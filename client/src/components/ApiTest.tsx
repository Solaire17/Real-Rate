import { Flex, Box, Text, Button } from '@chakra-ui/react'
import React, { useState, useEffect } from "react";

import {baseURL, fetchApi} from '../util/fetchApi'

var EloRating = require('elo-rating');
    

export default function ApiTest() {
 
    var playerWin = false;
    var result = EloRating.calculate(1600, 1600, playerWin);
     
    console.log((result.playerRating)) // Output: 1735
    console.log(result.opponentRating) // Output: 1550
     
    result = EloRating.calculate(1600, 1600, true);
     
    console.log(result.playerRating) // Output: 1754
    console.log(result.opponentRating) // Output: 1531

    // const {propertiesForSale, setPropertiesForSale} =({})

    useEffect(() => {
        const propertyForSale = Promise.resolve(fetchApi(`${baseURL}properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`))

        propertyForSale.then(
            (res) => {
                console.log(res)
            }
        )
    }, []);

    return (
        <Box>
           a 
        </Box>
    )
}