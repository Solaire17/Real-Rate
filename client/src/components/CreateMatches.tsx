import React, { useState, useEffect } from "react";


const CreateMatches = () => {
    //1. DONE Get Elo of both matches and sets them in the states below
    //2. COnfigure the Routes in the backend so it is completely random 2
    //3. Use the API and compare and then update them
    //4. Have to configure the house route for updating
    const [firstHouseElo, setFirstHouseElo] = useState([]);
    const [secondHouseElo, setSecondHouseElo] = useState([]);

    //instead of everything above
    //make the UI and stuff and instead pass in the id from another component 
    //then use that id to make one get call to get a random elo
    //then put it into the elo api


    //get function 1
    const getFirstElo = async (id: any) => {
        try {
            const response = await fetch(`http://localhost:5000/house/${id}`)
            const jsonData = await response.json()

            setFirstHouseElo(jsonData);
        } catch (err: any) {
            console.error(err.message);
        }
    }

    //get function 2
    const getSecondElo = async (id: any) => {
        try {
            const response = await fetch(`http://localhost:5000/house/${id}`)
            const jsonData = await response.json()

            setSecondHouseElo(jsonData);
        } catch (err: any) {
            console.error(err.message);
        }
    }

    return (
        <div>

        </div>
    )
}

export default CreateMatches;