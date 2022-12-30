import React, { useState, useEffect } from "react";


//have to pass it later for update
const EditHouses = ({ house }: any) => {
    
    console.log(house)
    const [elo, setElo] = useState([house.elo]);
    console.log(elo)

    const updateElo = async (e: any)  =>  {
        e.preventDefault();
        try {
            const body = {elo}
            const response = await fetch(`http://localhost:5000/houses/${house.houses_id}`,  {
                method: "PUT",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(body)
            })
//rfer to ss to fix
            window.location.assign('/')
        } catch (err: any) {
            console.error(err.message);
        }

    }

    return (
        <div>
            <button onClick= {() => setElo(house.elo)}>
                Edit
            </button>
        </div>
    )
}

export default EditHouses;