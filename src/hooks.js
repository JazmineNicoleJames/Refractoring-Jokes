import axios from "axios";
import { useState } from "react";


const useAxios = (url) => {
    const [response, setResponse] = useState([])
    const fetchData = async(numJokes = 5, formatter = (data) => data) => {
        try {
            const jokes = [];
            const seenJokes = new Set();
            for(let i =0; i < numJokes; i++){
                const res = await axios.get(`${url}`, {
                    headers: { Accept: "application/json" }
                });
                const joke = res.data;
                console.log('Request URL:', `${url}`);
                console.log('Response data:', res.data);
                if (!seenJokes.has(joke.id)) {
                    seenJokes.add(joke.id);
                    jokes.push({ ...joke, votes: 0 });
                } else {
                    console.log("duplicate found!");
                    i--;
                }
            }
            setResponse(jokes)
        } catch (error) {
            console.error('axios error', error)    
        }
    }
   return [response, fetchData]
}

export { useAxios };