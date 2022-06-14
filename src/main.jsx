import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Library from "./Library";
import App from "./App";
import { Profile, CreateAccountForm, LoggedInForm } from "./Profile";
// import Lesson from "./Lesson";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Homepage />} />
        <Route path="library" element={<Library />} />
        <Route path="profile" element={<Profile />}></Route>
        <Route path="createAccount" element={<CreateAccountForm />} />

        {/* <Route path="lesson" element={<Lesson />} /> */}
        {/* <Route path="teams" element={<Teams />}>
          <Route path=":teamId" element={<Team />} />
          <Route path="new" element={<NewTeamForm />} />
          <Route index element={<LeagueStandings />} />
        </Route> */}
      </Route>
    </Routes>
  </BrowserRouter>
);
