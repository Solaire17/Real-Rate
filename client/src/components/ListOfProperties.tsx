import { Box, Card, Image, Stack, CardBody, Heading, Text, CardFooter, Button } from '@chakra-ui/react'
import React from 'react'

export default function ListOfProperties (props: { coverPhoto: {url: string}, title: string, price: number, addHouse: any}) {
    return (
        <Box p="2px">
            <Card direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline' >
                <Image objectFit='cover' maxW={{ base: '100%', sm: '200px' }} src={props.coverPhoto.url} />
                    <Stack>
                        <CardBody>
                            <Heading size='md'>{props.title}</Heading>

                            <Text py='2' fontSize='2xl' color='blue.300'>
                                ${props.price}
                            </Text>
                            </CardBody>

                            <CardFooter>
                            <Button variant='solid' colorScheme='gray' onClick={() => {
                                props.addHouse(props.title, props.coverPhoto.url, props.price)
                                }}>
                                Add Property
                            </Button>
                        </CardFooter>
                    </Stack>
            </Card>
        </Box>
    )
}

