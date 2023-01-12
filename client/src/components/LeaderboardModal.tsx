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
import MatchInfo from '../components/MatchInfo'

interface IHouses {
    house_id: number,
    house: string,
    picture: string, 
    price: number,
    elo: number, 
    percent: number,
}



export default function LeaderboardModal(leaderboard: IHouses) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
        <Button onClick={onOpen}>Matches</Button>
  
        <Modal onClose={onClose} isOpen={isOpen} isCentered size='xl'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Matches</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                <MatchInfo key={leaderboard.house_id} {...leaderboard}/>
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }