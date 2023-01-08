import { match } from "assert";
import React, { useState, useEffect } from "react";

var EloRating = require('elo-rating');

interface IMatches {
    firstHouseId: number,
    secondHouseId: number,
    firstOldElo: number, 
    secondOldElo: number,
    firstNewElo: number,
    secondNewElo: number, 
    status: boolean,
}

const CreateMatches = (house: any) => {
    const [id, setId] = useState(house.house_id)

    const [match, setMatch] = useState({
        firstHouseId: 0,
        secondHouseId: 0,
        firstOldElo: 0, 
        secondOldElo: 0,
        firstNewElo: 0,
        secondNewElo: 0, 
        status: false
    });

    const [result, setResult] = useState()

    const [secondHouseElo, setSecondHouseElo] = useState();


    //get function 1
    async function getElos(id: number) {
        try {
            const response = await fetch(`http://localhost:5000/houses/${id}`)
            const jsonData = await response.json()

            setMatch((prevMatchData: IMatches) => {
                return {
                  ...prevMatchData,
                  firstHouseId: jsonData.house_id,
                  firstOldElo: jsonData.elo
                };
              });
            console.log(match)
        } catch (err: any) {
            console.error(err.message);
        }
        try {
            const response = await fetch(`http://localhost:5000/houses/random/${id}`)
            const jsonData = await response.json()

            setMatch((prevMatchData: IMatches) => {
                return {
                  ...prevMatchData,
                  secondHouseId: jsonData.house_id,
                  secondOldElo: jsonData.elo
                };
              });
            console.log(match)
        } catch (err: any) {
            console.error(err.message);
        }
    }

    async function addMatch() {
        try {
            const body = { match };
            const response = await fetch("http://localhost:5000/matches", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
        } catch (err: any) {
            console.error(err.message)
        }
    }

    function calculateResult(result: boolean) {
        console.log(match.firstOldElo, match.secondOldElo)
        var resultInfo = EloRating.calculate(match.firstOldElo, match.secondOldElo, result);
        console.log(resultInfo)
        
        setMatch((prevMatchData: IMatches) => {
            return {
              ...prevMatchData,
              firstNewElo: resultInfo.playerRating,
              secondNewElo: resultInfo.opponentRating,
              status: result
            };
          });

          addMatch();
          updateElo();
    }

    async function updateElo() {
        const { 
            firstHouseId, 
            secondHouseId,
            firstNewElo, 
            secondNewElo, 
            status
        } = match

        try {
            const body = {
                firstHouseId, 
                secondHouseId,
                firstNewElo, 
                secondNewElo, 
                status}
            const response = await fetch('http://localhost:5000/matchResult', {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

        } catch (err: any) {
            console.error(err.message);
        }
    }

    return (
        <div>
            <button onClick={() => {
                    getElos(id)
                    //make modal pop up here
            }}>Add</button>
            <button onClick={() => {
                calculateResult(true)
            }}>Left</button>
            <button onClick={() => {
                calculateResult(false)
            }}>Right</button>
        </div>
    )
}

export default CreateMatches;