import React from 'react'

export default function ListOfHouses (props: {picture: string, house: string, price:number}) {
    return (
        <div>
            <img src={props.picture} />
            <h5>{props.house}</h5>
            <p>Price: {props.price}</p>
        </div>
    )
}