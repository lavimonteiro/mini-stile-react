var hiddenClass = "form--hidden";

function loginForm() {
  return document.forms["login"];
}

function createAccountForm() {
  return document.forms["createAccount"];
}

function logoutForm() {
  return document.querySelector("#logout");
}

function toggleCreateAccountLoginForms() {
  document
    .querySelector("#linkCreateAccount")
    .addEventListener("click", (e) => {
      e.preventDefault();
      loginForm().classList.add(hiddenClass);
      createAccountForm().classList.remove(hiddenClass);
    });

  document.querySelector("#linkLogin").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm().classList.remove(hiddenClass);
    createAccountForm().classList.add(hiddenClass);
  });
}

function storingCreateAccountDetails() {
  createAccountForm().addEventListener("submit", (event) => {
    event.preventDefault();
    let inputs = document.querySelectorAll("#createAccount input");

    //check if passwords match
    let passwordArray = [];
    let username = "";
    let email = "";
    inputs.forEach((input) => {
      if (input.name === "password" || input.name === "password-confirm") {
        passwordArray.push(input.value);
      }

      if (input.name === "username") {
        username = input.value;
      }

      if (input.name === "email") {
        email = input.value;
      }
    });

    //saves information
    if (passwordArray[0] === passwordArray[1]) {
      fetch("/api/v1/user", {
        method: "PUT",
        body: JSON.stringify({
          username: username,
          email: email,
          password: passwordArray[0],
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message == "account created") {
            loginForm().classList.remove(hiddenClass);
            createAccountForm().classList.add(hiddenClass);
          } else {
            let messageElement = document.querySelector(
              ".create-account-error"
            );
            messageElement.textContent =
              "Failed to create Account. Please Try again.";
          }
        });
    } else {
      let messageElement = document.querySelector(".create-account-error");
      messageElement.textContent = "Password does not match. Please Try again.";
    }
  });
}

function saveLoginInformation() {
  loginForm().addEventListener("submit", (event) => {
    event.preventDefault();

    let informationArray = [];
    let inputs = document.querySelectorAll("#login input");
    inputs.forEach((input) => {
      informationArray.push(input.value);
    });

    fetch("/api/v1/login", {
      method: "POST",
      body: JSON.stringify({
        username: informationArray[0],
        password: informationArray[1],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message == "log-in successful") {
          let messageElement = document.querySelector(".login-error");
          messageElement.textContent = "";

          sessionStorage.setItem("access-token", informationArray[0]);

          loginForm().classList.add(hiddenClass);
          logoutForm().classList.remove(hiddenClass);
          console.log("success", sessionStorage.getItem("access-token"));
        } else {
          let messageElement = document.querySelector(".login-error");
          messageElement.textContent = "Invalid username or password.";
          console.log("failed", sessionStorage);
        }
      });
  });
}

function formWhileLoggedIn() {
  if (sessionStorage.length >= 1) {
    document.getElementById("log-in").innerHTML =
      "Welcome " + sessionStorage.getItem("access-token") + "!";
    loginForm().classList.add(hiddenClass);
    logoutForm().classList.remove(hiddenClass);
    logoutForm().addEventListener("submit", (e) => {
      e.preventDefault();
      sessionStorage.clear();
      console.log(sessionStorage);
      loginForm().classList.remove(hiddenClass);
      logoutForm().classList.add(hiddenClass);

      //clear input values
      const inputValues = document.querySelectorAll(".form-input");
      inputValues.forEach((input) => {
        input.value = "";
      });
    });
  }
}

let functionArray = [
  toggleCreateAccountLoginForms,
  storingCreatAccountDetails,
  saveLoginInformation,
  formWhileLoggedIn,
];

for (i = 0; i < functionArray.length; i++) {
  document.addEventListener("DOMContentLoaded", functionArray[i]);
}
