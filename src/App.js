import React from "react";
//import { Switch, Route, withRouter, Link, Navigate } from "react-router-dom";

import { HashRouter as Router, Route } from "react-router-dom";
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
import ForCheck1 from "./Pages/ForCheck1";

import ScrollToTop from "./Pages/components/scroll-to-top";
import "./App.css";
import Login from "./NewPages/Login";
import ForgotPassword from "./NewPages/LoginComponents/ForgotPassword";
import ResetPassword from "./NewPages/LoginComponents/ResetPassword";

import DashboardChangePassword from "./NewPages/DashboardComponents/DashboardChangePassword";

import Dashboard from "./NewPages/Dashboard";
import AdminDashboard from "./NewPages/AdminDashboard";
import UsersTable from "./NewPages/UsersTable";
import UsersTableBIProjectConfigurationTrafficSource from "./NewPages/UsersTableBIProjectConfigurationComponents/UsersTableBIProjectConfigurationTrafficSource";
import UsersTableBIProjectConfigurationADV from "./NewPages/UsersTableBIProjectConfigurationComponents/UsersTableBIProjectConfigurationADV";
import UsersTableSeatManagemntTable from "./NewPages/UsersTableSeatManagemntComponents/UsersTableSeatManagemntTable";

//hi 6-111
// For Shrat
// export const MyUrl = "https://api.o2rintelligence.com"; //https://localhost:7006 //http://api.o2rintelligence.com
// export const CallUrlsApi = "https://apinewbi.o2rintelligence.com"; // "https://apinewbi.o2rintelligence.com"; //`https://app.o2rintelligence.com`;
// export const Redirect = "https://app.o2rintelligence.com";
// export const LinkToBI = "https://apinewbi.o2rintelligence.com"; //  https://localhost:3001 //https://apinewbi.o2rintelligence.com
// export const GoToBI = "https://newbi.o2rintelligence.com";

// End For Shrat

// //For Local
export const MyUrl = "https://localhost:7006"; //https://localhost:7006 //http://api.o2rintelligence.com
export const CallUrlsApi = "https://apinewbi.o2rintelligence.com"; // "https://apinewbi.o2rintelligence.com"; //`https://app.o2rintelligence.com`;
export const Redirect = "https://app.o2rintelligence.com";
export const LinkToBI = "https://localhost:7184"; //  https://localhost:3001 //https://apinewbi.o2rintelligence.com
export const GoToBI = "http://localhost:3001";
// //End For Local

//when we work with local should add
//`${LinkToBI}/api/Account/login` change LinkToBI ==>https://localhost:7184/

//Click OnUrl to BI project (Link)
//http://newbi.o2rintelligence.com/

//"http://apinewbi.o2rintelligence.com"; //`http://app.o2rintelligence.com`;

//http://api.o2rintelligence.com
//https://localhost:7006
//https://localhost:7184/
///http:/ / apinewbi.o2rintelligence.com;
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
        {/* <Switch> */}
        <Route exact path="/">
          <Login />
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
        <Route path="/ResetPassword">
          <ResetPassword />
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
        <Route path="/ForCheck1">
          <ForCheck1 />
        </Route>
        <Route path="/AdminHome">
          <AdminHome />
        </Route>

        {/* New Pages */}
        <Route exact path="/Login">
          <Login />
        </Route>
        <Route path="/Dashboard">
          <Dashboard />
        </Route>
        <Route path="/AdminDashboard">
          <AdminDashboard />
        </Route>
        <Route path="/UsersTable">
          <UsersTable />
        </Route>
        <Route path="/UsersTableBIProjectConfigurationTrafficSource">
          <UsersTableBIProjectConfigurationTrafficSource />
        </Route>
        <Route path="/UsersTableBIProjectConfigurationADV">
          <UsersTableBIProjectConfigurationADV />
        </Route>
        <Route path="/UsersTableSeatManagemntTable">
          <UsersTableSeatManagemntTable />
        </Route>
        <Route path="/ForgotPassword">
          <ForgotPassword />
        </Route>
        <Route path="/DashboardChangePassword">
          <DashboardChangePassword />
        </Route>
        {/* </Switch> */}
      </header>
    </div>
  );
}
export default App;
