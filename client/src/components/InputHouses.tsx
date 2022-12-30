import React, { useState, useEffect } from "react";
import {baseURL, fetchApi} from '../util/fetchApi'


const InputHouses = () => {

    
    const [house, setHouse] = useState([{
        house: "",
        picture: "",
        price: 0,
        elo: 0,
        percent: 0.0
    }]);


    const addHouse = async (e: any) =>{
        e.preventDefault();
        try {
            const body = { house };
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            window.location.assign('/')
        } catch (err: any) {

            /*
HAVE TO ADD CHECK TO SEE IF IT ALREADY EXIST IF IT DOES THEN ERROR MESSAGE HERE

some check like this but if it is equla to okay just say success if not then say it has alrady been added before


    if (data.status === "ok") {
      setClothing((prevClothingData) => {
        return {
          ...prevClothingData,
          userId: data.userId,
          username: data.username,
        };
      });


        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate username or email' })
    }
            */
            console.error(err.message);
        }
    }
    return (
        <div>
         //have to map it in later
            <button onClick={() => {
                addHouse();
            }}>ADD</button>
        </div>
    )
}



   useEffect(() => {
        const propertyForSale = Promise.resolve(fetchApi(`${baseURL}properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`))

        propertyForSale.then(
            (res) => {
                console.log(res)
            }
        )
   }, []);
    
    

    return (
        <div>

        </div>
    )
}

export default InputHouses;