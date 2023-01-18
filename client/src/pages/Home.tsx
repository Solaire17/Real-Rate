import React from "react"
import { Box, Text, Image, Center, Heading, VStack } from '@chakra-ui/react'
    

export default function Home() {
    return (
        <Box pb="40px" h="100vh">
            <Center h="100%" w="100%">
                <VStack>
                    <Image boxSize='350px' src='https://cdn.discordapp.com/attachments/746035358524899369/1062187459548561439/markhouse.png'/>
                    <Heading>Welcome to Real Rate!</Heading>
                    <Text>An web application where users decide if a property is overvalued or undervalued  </Text>
                </VStack>
            </Center>
        </Box>
    )
}