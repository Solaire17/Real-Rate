import React, { useState, useEffect } from "react";
import {baseURL, fetchApi} from '../util/fetchApi'
import ListOfProperties from "../components/ListOfProperties";


const InputHouses = () => {

    const [properties, setProperties] = useState([])

    
    const [house, setHouse] = useState({
        title: "",
        picture: "",
        price: 0
    });



    async function addHouse(house: string, picture: string, price: number) {
        console.log(house)
        try {
            const body = { house, picture, price };
            const response = await fetch("http://localhost:5000/houses", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
        } catch (err: any) {
            console.error(err.message)
        }
    }




   useEffect(() => {
        const propertyForSale = Promise.resolve(fetchApi(`${baseURL}properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`))

        propertyForSale.then(
            (res) => {
                console.log(res)
                
                setProperties(res.hits)
            }
        )
   }, []);
    
    const property =  properties.map((item: {title: string, coverPhoto: {url:string}, price:number, id:number})=> {
        return (
            <div >
                <ListOfProperties 
                key={item.id}
                {...item}
                />
                <button onClick={() => {
                    addHouse(item.title, item.coverPhoto.url, item.price)
                }}>Add</button>
            </div>
        )
    })

    return (
        <div>
            {property}
        </div>
    )
}

export default InputHouses;


            

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
            
            console.error(err.message);
        }
    }
    */
    // return (
    //     <div>
    //      //have to map it in later
    //         <button onClick={() => {
    //             // addHouse();
    //         }}>ADD</button>
    //     </div>
    // )