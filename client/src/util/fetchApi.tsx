import axios from 'axios'
import dotenv from 'dotenv';
require("dotenv").config();

export const baseURL = 'https://bayut.p.rapidapi.com/'
export const fetchApi = async (url:string) => {
    console.log(process.env.REACT_APP_RAPIDAPIKEY)
    const { data } = await axios.get((url), {
    headers: {
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
    }
    })

    return data
}