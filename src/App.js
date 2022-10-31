import React from "react";

import { Switch, Route, withRouter, Link, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import AdminHome from "./Pages/AdminHome";

import LogInPage from "./Pages/LogInPage";
import Register from "./Pages/Register";
import AdminPage from "./Pages/AdminPage";
import AddClientPage from "./Pages/AddClientPage";
import ErorrPage from "./Pages/ErorrPage";
import PasswordForget from "./Pages/PasswordForget";
import ConfirmationPassword from "./Pages/ConfirmationPassword";
import UsersPanel from "./Pages/UsersPanel";
import ForCheck from "./Pages/ForCheck";
import ScrollToTop from "./Pages/components/scroll-to-top";
import "./App.css";

//className="App"
function App() {
  return (
    <div>
      {/* <div style={{ margin: 10 }}>
        <Link to="/LogInPage">LogInPage</Link>
        <Link to="/Home">Home</Link>
        <Link to="/AddClientPage">AddClientPage</Link>
        <Link to="/AdminPage">AdminPage</Link>
      </div> */}
      <header>
        {/* className="App-header" */}
        <Switch>
          <Route exact path="/">
            <LogInPage />
          </Route>
          <Route exact path="/ScrollToTop">
            <ScrollToTop />
          </Route>
          <Route exact path="/LogInPage">
            <LogInPage />
          </Route>
          <Route exact path="/Home">
            <Home />
          </Route>

          {/* <Route path="/student/:userId" component={CCStudent} /> */}
          <Route path="/Register">
            <Register />
          </Route>
          <Route path="/AdminPage">
            <AdminPage />
          </Route>
          <Route path="/AddClientPage">
            <AddClientPage />
          </Route>
          <Route path="/ErorrPage">
            <ErorrPage />
          </Route>
          <Route path="/PasswordForget">
            <PasswordForget />
          </Route>
          <Route path="/ConfirmationPassword">
            <ConfirmationPassword />
          </Route>
          <Route path="/UsersPanel">
            <UsersPanel />
          </Route>
          <Route path="/ForCheck">
            <ForCheck />
          </Route>
          <Route path="/AdminHome">
            <AdminHome />
          </Route>
        </Switch>
      </header>
    </div>
  );
}
export default withRouter(App);
