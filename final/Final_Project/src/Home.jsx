import React from "react";
import "./Home.css"; // Import your CSS file for styling

function Home({darkTheme}) {
  return (
    <div className={darkTheme ? "dark": ""}>
      <div className={`home-container`}>

        <div className="home-header">
          <h1>Welcome to the Game Center!</h1>
        </div>
        
        <div className="home-content">
          <p>
            In this website, you can play games, chat with your friends, and shop for your favorite games!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
