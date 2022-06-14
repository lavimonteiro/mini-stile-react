import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./NavStyle.css";

function App() {
  return (
    <>
      <header>
        <div className="navbar">
          <nav>
            <ul>
              <li className="menu-item"></li>
              <li id="home-link" className="menu-item">
                <Link id="home" className="navLinks" to="/">
                  Home
                </Link>
              </li>
              <li id="profile-link" className="menu-item">
                <Link id="profile" className="navLinks" to="/profile">
                  Profile
                </Link>
              </li>
              <li id="library-link" className="menu-item">
                <Link id="nav" className="navLinks" to="/library">
                  Library
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
}
export default App;
