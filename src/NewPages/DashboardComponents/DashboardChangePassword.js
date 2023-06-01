import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter, useHistory, useLocation } from "react-router-dom";

import { MyUrl } from "../../App";
import DashboardHeader from "./DashboardHeader";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
var jwtToken = "";
export default function DashboardChangePassword() {
  const location = useLocation();
  const Username = location.state.name1;
  const Userpassword = location.state.password1;
  const data2 = location.state.data2;
  const email1 = location.state.email1;

  console.log(Username);
  console.log(data2);

  const [password, setPassword] = useState();
  const [password1, setPassword1] = useState();

  const [OldPassword, setOldPassword] = useState();
  const items1 = localStorage.getItem("User");

  let history = useHistory();
  const ChckRefreshFunc = async () => {
    const data = localStorage.getItem("User");
    console.log(data);
    function handleFocus() {
      console.log("Component is focused");
    }
    function handleBlur() {
      console.log("Component is unfocused");
    }
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
    if (items1 === null) {
      const items = sessionStorage.getItem("User");
      var parsed = JSON.parse(items);
      console.log(parsed.token);
      jwtToken = parsed.token;
      //const jwtToken = "your_jwt_token_here";
      const base64Url = jwtToken.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(atob(base64));
      const expirationDate = new Date(payload.exp * 1000);
      const currentTime = new Date().getTime(); // Get the current time in milliseconds
      if (expirationDate < currentTime) {
        console.log("Token has expired");
        console.log(jwtToken);
        var userToken = {
          accessToken: jwtToken,
        };
        try {
          axios
            .post(
              `${MyUrl}/api/RefreshToken/refresh`,
              { accessToken: jwtToken },
              { withCredentials: true }
            )
            .then((response) => {
              parsed.token = response.data.accessToken;
              // Store the updated object back in sessionStorage
              const updatedObjString = JSON.stringify(parsed);
              sessionStorage.setItem("User", updatedObjString);
              //     jwtToken = response.data.accessToken;
              console.log(response.data.accessToken);
              //getUrl();
              return () => {
                window.removeEventListener("focus", handleFocus);
                window.removeEventListener("blur", handleBlur);
              };
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {}
      } else {
        console.log("Token is still valid");
      }
    } else {
      const items = sessionStorage.setItem("User", JSON.stringify(items1));
      var parsed = JSON.parse(items1);
      jwtToken = parsed.token;
      //getUrl();
      console.log(parsed.role);
    }
  };
  useEffect(() => {
    ChckRefreshFunc();
  }, []);
  const UpdateAdvertiserCampaign = () => {
    console.log("UpdateTrafficSource");
    let base64 = require("base-64"); // install it before use from npm i base-64
    var userObj = {
      userName: Username,
      oldPass: OldPassword,
      newPass: password,
    };
    const article = { title: "React PUT Request Example" };
    axios
      .put(`${MyUrl}/api/Account/updatePass`, userObj, {
        headers: {
          Authorization: `Bearer ${jwtToken.replace("Bearer ", "")}`,
        },
      })
      .then((response) => {
        localStorage.removeItem("User");
        history.replace("/");
        //history.push("");
        window.location.reload();
      })
      .catch((error) => {
        // setErorrMessage(error.response.data.errorMessage);
      });
  };
  return (
    <div style={{ flex: 1 }}>
      <DashboardHeader
        data2={data2}
        name1={Username}
        password1={Userpassword}
        email1={email1}
      />
      <div
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "30%",
          }}
        >
          Enter old password
          <TextField
            style={{ width: "100%", paddingBottom: "2%" }}
            id="outlined-basic"
            label="Enter old password"
            variant="outlined"
            value={OldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "30%",
          }}
        >
          Enter new password
          <TextField
            style={{ width: "100%", paddingBottom: "2%" }}
            id="outlined-basic"
            label="Enter new password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "30%",
          }}
        >
          Confirm Password
          <TextField
            style={{ width: "100%", paddingBottom: "2%" }}
            id="outlined-basic"
            label="Confirm password"
            variant="outlined"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
        </div>

        <br></br>
        <Button
          style={{
            textTransform: "none",

            background: "black",
          }}
          variant="contained"
          onClick={() => {
            UpdateAdvertiserCampaign();
          }}
        >
          Change Password
        </Button>
      </div>
    </div>
  );
}
