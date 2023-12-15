import React, { useState }  from "react";
import "./Form.css";

function Login({setIsLoggedIn}) {

  const [error, setError] = useState("");
  const [username, setUserName] = useState("");

  const inputHandler = (e) => {
    setUserName(e.target.value);
    setError(false);
  };

  const loginHandler = (e) => {
    e.preventDefault();
    const formattedUname = username.trim().toLowerCase();
    const patternCheck = "^[A-Za-z0-9_]+$*";
    const unameRegexCheck = formattedUname.match(patternCheck);

    if (username === "dog") {
      setError("The user is not valid");
      setUserName('')
      return;
    }

    if(!unameRegexCheck || !formattedUname){
        setError("Invalid username.Try Agian!")
        setUserName('')
        return;
    }
    setIsLoggedIn(true);
  };

  return (
    <div className="login-container">  

      <div className="form">
          <h1 className="title">Login</h1>
          <form>
              <div className="input-field">
              <input
                type="text"
                className="username"
                name="username"
                value={username}
                onInput={inputHandler}
                placeholder="Type your username here!"
              />
              </div>
              <button onClick={loginHandler} className="btn">
                Submit
              </button>
          </form>
          {error && <span className="error-msg">{error}</span>}

      </div>
    </div>        
  );
}

export default Login;
