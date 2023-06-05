import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [btnLogin, setbtnLogin] = useState("Login");

  console.log("header rendered");

  return (
    <div className="header">
      <div className="logo-container">
        {" "}
        <Link to="/">
          {" "}
          <img src={LOGO_URL}></img>
        </Link>
        <p id="app-name">Food Delight</p>
      </div>

      <div className="navbar">
        <ul>
          <li>
            <Link to="/about">About </Link>
          </li>

          <li>
            <a href="">Services</a>
          </li>

          <li>
            {" "}
            <Link to="/contact">Contact us</Link>
          </li>

          <li>
            <a href="">Cart</a>
          </li>
        </ul>
        <button
          className="login-btn"
          onClick={() => {
            btnLogin === "Login" ? setbtnLogin("Logout") : setbtnLogin("Login");
          }}
        >
          {btnLogin}
        </button>
      </div>
    </div>
  );
};

export default Header;
