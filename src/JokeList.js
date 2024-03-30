import React, { useEffect, useState } from "react";
import Joke from "./Joke";
import { useAxios } from "./hooks"
import "./JokeList.css";

/** List of jokes. */

const JokeList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, fetchData] = useAxios("https://icanhazdadjoke.com");
  const [jokes, setJokes] = useState([])

  useEffect(() => {
    fetchData(5);
  }, []);

  useEffect(() => {
    if(data.length > 0){
      const formattedJoke = data.map(joke => ({...joke, votes:0}))
        setJokes(formattedJoke)
        setIsLoading(false)
    }
  }, [data]);

  const generateNewJokes = () => {
    setIsLoading(true)
    fetchData(5);
  };

  const handleVote = (id, delta) => {
    setJokes(prevJoke => 
      prevJoke.map(j => 
        j.id === id ? { ...j, votes : j.votes + delta} : j
      )
    ) 
  };



  return (
    <div className="JokeList">
      <button
        className="JokeList-getmore"
        onClick={generateNewJokes}
      >
        Get New Jokes
      </button>

      {isLoading ? (
              <div className="loading">
              <i className="fas fa-4x fa-spinner fa-spin" />
              </div>
      ) : (
        jokes.map(j => (
        <Joke
          text={j.joke}
          key={j.id}
          id={j.id}
          votes={j.votes}
          vote={handleVote}
        />
      ))
      )}
      </div>
      );
}

export default JokeList;
