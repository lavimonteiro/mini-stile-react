import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./css/NavStyle.css";

function App() {
  let profile;

  if (sessionStorage.length > 0) {
    profile = sessionStorage.getItem("access-token");
  } else {
    profile = "Profile";
  }

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
                  {profile}
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
