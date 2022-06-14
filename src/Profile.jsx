import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Login.css";

function storingCreateAccountDetails(event, data) {
  event.preventDefault();

  let username = data.username;
  let email = data.email;
  let password = data.password;
  let confirmPassword = data.confirmPassword;

  console.log(username, password, email, confirmPassword);

  if (password === confirmPassword) {
    fetch("/api/v1/user", {
      method: "PUT",
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message == "account created") {
          sessionStorage.setItem("access-token", username);
          window.location.href = "/profile";
        } else {
          let messageElement = document.querySelector(".create-account-error");
          messageElement.textContent =
            "Failed to create Account. Please Try again.";
        }
      });
  } else {
    let messageElement = document.querySelector(".create-account-error");
    messageElement.textContent = "Password does not match. Please Try again.";
  }
}

function login(event, data) {
  event.preventDefault();

  let username = data.username;
  let password = data.password;

  fetch("/api/v1/login", {
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message == "log-in successful") {
        sessionStorage.setItem("access-token", username);
        console.log("success", sessionStorage.getItem("access-token"));
        window.location.href = "/profile";
      } else {
        let messageElement = document.querySelector(".login-error");
        messageElement.textContent = "Invalid username or password.";
        console.log("failed", sessionStorage);
      }
    });
}

function loggingOut() {
  sessionStorage.clear();
  console.log(sessionStorage);
}

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div className="login-container">
        <form className="form" id="login">
          <h1 className="form-title">Log in</h1>
          <br />
          <br />
          <div className="form-message form-message-error login-error"></div>
          <div className="input-group">
            <input
              className="form-input"
              name="username"
              type="text"
              autoFocus
              required
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="input-group">
            <input
              className="form-input"
              name="password"
              type="password"
              autoFocus
              required
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>
          <button
            className="input-group"
            id="login-button"
            type="submit"
            onClick={(event) => login(event, this.state)}
          >
            Continue
          </button>
          <p className="form-text">
            <a href="#" className="form-link">
              Forgot your Password?
            </a>
          </p>
          <p className="form-text">
            <Link
              className="form-link"
              id="linkCreateAccount"
              to="/createAccount"
            >
              Don't have an account? Create Account
            </Link>
          </p>
        </form>
        <Outlet />
      </div>
    );
  }
}

export class CreateAccountForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div className="create-container">
        <form id="createAccount">
          <h1 className="form-title">Create Account</h1>
          <br />
          <div className="form-message form-message-error create-account-error"></div>
          <div className="input-group">
            <input
              type="text"
              className="form-input"
              name="username"
              required
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="input-group">
            <input
              className="form-input"
              name="email"
              type="text"
              required
              placeholder="Email Address"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="input-group">
            <input
              className="form-input"
              name="password"
              type="password"
              required
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="input-group">
            <input
              className="form-input"
              name="confirmPassword"
              type="password"
              required
              placeholder="Confirm Password"
              value={this.state.confirmPassword}
              onChange={this.handleInputChange}
            />
          </div>
          <button
            className="input-group"
            id="create-button"
            type="submit"
            onClick={(event) => storingCreateAccountDetails(event, this.state)}
          >
            Continue
          </button>
          <p className="form-text">
            <Link className="form-link" id="linkLogin" to="/profile">
              Already have an account? Log in
            </Link>
          </p>
        </form>
      </div>
    );
  }
}

export class LoggedInForm extends React.Component {
  render() {
    return (
      <div>
        <form id="logout">
          <h1 className="form-logout">You're signed in.</h1>
          <br />
          <br />
          <div className="input-group">
            <button
              className="input-group"
              id="logout-button"
              type="submit"
              onClick={() => loggingOut()}
            >
              log out
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export class Profile extends React.Component {
  render() {
    console.log(sessionStorage);
    if (sessionStorage.length > 0) {
      return (
        <div>
          <div className="welcome-text">
            <p id="log-in">
              Welcome to Mini-stile {sessionStorage.getItem("access-token")}
            </p>
          </div>
          <div className="profile-container">
            <LoggedInForm />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="welcome-text">
            <p id="log-in">Log-in and start your journey</p>
          </div>
          <div className="profile-container">
            <LoginForm />
          </div>
        </div>
      );
    }
  }
}
