import "./App.css";
import { useState } from "react";
import Login from "./Login";
import Game from "./Game";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="app">
      <div className="heading">
        <h1>Guess the Word</h1>
      </div>

      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Game  setIsLoggedIn={setIsLoggedIn}/>
      )}
    </div>
  );
}

export default App;
