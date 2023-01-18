import axios from 'axios'

export const baseURL = 'https://bayut.p.rapidapi.com/'
export const fetchApi = async (url:string) => {
    const { data } = await axios.get((url), {
    headers: {
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
    }
    })
    return data
}