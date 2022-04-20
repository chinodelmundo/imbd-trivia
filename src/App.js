import { useState, useEffect } from 'react';
import './App.css';
import Movie from './components/Movie';
import Outcome from './components/Outcome';
import Config from './Config';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [leftMovie, setLeftMovie] = useState({});
  const [rightMovie, setRightMovie] = useState({});
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [round, setRound] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [outcome, setOutcome] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const apikey = process.env.IMDB_KEY || Config.IMDB_KEY;
    const url = `https://imdb-api.com/en/API/Top250Movies/${apikey}`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        const filteredMovies = json.items.filter((i) => i.year >= 2000);
        setMovies(shuffle(filteredMovies));

        if (json.items.length === 0 && json.errorMessage) {
          setError(json.errorMessage);
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      let delay = 0;

      if (round > 0) {
        delay = 1500;
      }

      setTimeout(() => {
        setLeftMovie(movies[round * 2]);
        setRightMovie(movies[round * 2 + 1]);
        setShowRating(false);
      }, delay);
    }
  }, [round, movies]);

  useEffect(() => {
    if (score > highscore) {
      setHighscore(score);
    }
  }, [score, highscore]);

  const handleClick = (chosenLeft) => {
    if (
      (leftMovie.imDbRating > rightMovie.imDbRating && chosenLeft) ||
      (leftMovie.imDbRating < rightMovie.imDbRating && !chosenLeft)
    ) {
      setRound(round + 1);
      setScore(score + 1);
      setOutcome(1);
    } else if (leftMovie.imDbRating !== rightMovie.imDbRating) {
      setOutcome(0);
    } else {
      setOutcome(2);
      setRound(round + 1);
    }

    setShowRating(true);
  };

  const shuffle = (movies) => {
    return movies
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  const handleResetGame = () => {
    setMovies(shuffle(movies));
    setScore(0);
    setRound(0);
  };

  return (
    <div className="app">
      <Movie movie={leftMovie} showRating={showRating} />
      <div>
        {error && <div className="error-container">Error: {error}</div>}
        <div className="scores-container">
          <div className="highscore">Highscore: {highscore}</div>
          <div className="score">Score: {score}</div>
        </div>
        <div className="question">Which has the higher rating?</div>
        <div className="buttons-container">
          <button
            className="btn btn-primary"
            disabled={showRating}
            onClick={() => handleClick(true)}
          >
            Left
          </button>
          <button
            className="btn btn-primary"
            disabled={showRating}
            onClick={() => handleClick(false)}
          >
            Right
          </button>
        </div>
        <Outcome
          outcome={outcome}
          show={showRating}
          score={score}
          onClickReset={handleResetGame}
        />
      </div>
      <Movie movie={rightMovie} showRating={showRating} />
    </div>
  );
};

export default App;
