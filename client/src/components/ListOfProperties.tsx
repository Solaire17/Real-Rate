import React from 'react'

export default function ListOfProperties (props: { coverPhoto: {url: string}, title: string, price: number}) {
    return (
        <div>
            <img src={props.coverPhoto.url} />
            <h5>{props.title}</h5>
            <p>Price: {props.price}</p>
        </div>
    )
}