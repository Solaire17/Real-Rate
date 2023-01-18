import React from 'react';
import { Text, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react'
import MatchInfo from '../components/MatchInfo'

//TypeScript Interfaces
interface IHouses {
    house_id: number,
    house: string,
    picture: string, 
    price: number,
    elo: number, 
    percent: number,
}

export default function LeaderboardModal(leaderboard: IHouses) {
    //Chakra UI Modal functions
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