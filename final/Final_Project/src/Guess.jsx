import React, { useState } from "react";
import compare from "./compare";
import "./Form.css";


function Game({setIsLoggedIn, darkTheme}) {
  const [word, setWord] = useState("");
  const [error, setError] = useState("");
  const [gameStat, setGameStat] = useState({class: '', message: ''});

  const secretWord = "RECAT";
  const inputHandler = (e) => {
    setWord(e.target.value);
    setError("");
    setGameStat({});
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (word.trim().length === 0) {
      setError("The word cannot be empty");
    } else if (word.length !== 5) {
      setError(`"${word}" is not a valid word`);
    }
      
    if (secretWord.toLowerCase() === word.toLowerCase()) {
    setGameStat({
        class: "success",
        message: ` "${word}" is the secret word!`,
    });
        return;
    }

    const commonWords = compare(word, secretWord);
    if (word.length === 5 && commonWords >= 0) {
        setGameStat({
            class: "warning",
            message: `"${word}" had ${commonWords} letter in common`,
        });
    }
  };


  return (
    <div className={darkTheme ? "dark": ""}>
        <div className="form">

            <h1 className="title">Game Start</h1>

            <form method="POST">
                <div className="input-field">
                    <input
                        type="text"
                        className="word"
                        name="word"
                        value={word}
                        onInput={inputHandler}
                        placeholder="Type your word here!"
                    />
                </div>
                
                <button onClick={submitHandler} className="btn">
                    Submit
                </button>
                
            </form>

            {error && <span className="error-msg">{error}</span>}
            {gameStat.message && <span className={gameStat.class}>{gameStat.message}</span>}
        </div>
    </div>
  );
}

export default Game;
