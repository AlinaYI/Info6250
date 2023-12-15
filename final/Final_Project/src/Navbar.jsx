import "./Navbar.css";
import { PAGES } from "./constants";
const Navbar = ({ username, onChangeMode, darkTheme, onNavigate, onLogout }) => {

  
  return (
    <div className={darkTheme ? "dark": ""}>
      <nav className="navbar" onClick={onNavigate}>
        <div className="sub-navbar">
          <ul className="navbar-options">
            <li className="navbar-option" data-page={PAGES.HOME}>
              Home
            </li>
            <li className="navbar-option" data-page={PAGES.GUESS}>
              Guess
            </li>
            <li className="navbar-option" data-page={PAGES.CHAT}>
              Chat
            </li>
            <li className="navbar-option" data-page={PAGES.SHOPPINGCART}>
              Game Store
            </li>
          </ul>
          <ul className="navbar-extra">
            <li className="navbar-user">Welcome, {username}</li>
            <li className="navbar-btn">
              <button className="logout-btn" onClick={onLogout}>
                Logout
              </button>
            </li>
            <li className="navbar-mode">
              <label>
                <input
                  type="checkbox"
                  onChange={onChangeMode}
                  checked={darkTheme}
                  className="mode-selector"
                />
                <span className="check"></span>
              </label>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
