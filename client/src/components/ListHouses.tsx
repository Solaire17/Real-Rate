import React, { useState, useEffect } from "react";

const ListHouses = () => {

    
    const [houses, setHouses] = useState<any[]>([]);

    const getHouses = async () => {
        try {
            const response = await fetch("http://localhost:5000/houses")
            const jsonData = await response.json()

            setHouses(jsonData);
        } catch (err: any) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getHouses();
    }, [])


    return (
        <div>
            <table>
                <tr>
                    <th>House</th>
                    <th>Picture</th>
                    <th>Price</th>
                    <th>elo</th>
                    <th>Percent</th>
                </tr>
                <div>
                    {houses.map(house => (
                        <div key={house.houses_id}>
                            <td>{house.house}</td>
                            <td>{house.picture}</td>
                            <td>{house.price}</td>
                            <td>{house.elo}</td>
                            <td>{house.percent}</td>
                    </div>
                    ))}
                </div>
            </table>
        </div>
    )
}

export default ListHouses;