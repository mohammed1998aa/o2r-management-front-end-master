import React from "react";
import UsersTableBIProjectConfigurationTrafficSource from "../UsersTableBIProjectConfigurationComponents/UsersTableBIProjectConfigurationTrafficSource";
import { withRouter, useHistory, useLocation } from "react-router-dom";

export default function UsersTableBIProjectConfiguration() {
  let history = useHistory();

  const TrafficSource = async () => {
    // var userObj = {
    //   name: name1,
    //   password: password1,
    //   data2: data2,
    // };
    history.push("/UsersTableBIProjectConfigurationTrafficSource"); //, { userObj2Send: userObj }
  };

  const GoToUsersAdv = async () => {
    // var userObj = {
    //   name: name1,
    //   password: password1,
    //   data2: data2,
    // };
    history.push("/UsersTableBIProjectConfigurationADV"); //, { userObj2Send: userObj }
  };

  return (
    <div>
      UsersTableBIProjectConfiguration
      <br></br>
      <button
        onClick={() => {
          TrafficSource();
        }}
      >
        Go To Traffic Source Table
      </button>
      <button
        onClick={() => {
          GoToUsersAdv();
        }}
      >
        Go To Adv Table
      </button>
    </div>
  );
}
