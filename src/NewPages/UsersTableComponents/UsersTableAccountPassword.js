import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Copy from "./../../Images/Copy.png";
import axios from "axios";
import { MyUrl } from "../../App";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import { validPassword } from "../../Pages/Regex";

var jwtToken = "";
// import {
//   validEmail,
//   validPassword,
//   validUserName,
//   validUrlName,
//   validUrl,
//   validEditEmail,
// } from "./Regex.jsx";

export default function UsersTableAccountPassword({
  id,
  name,
  email,
  password,
  status,
  role,
  name1,
  password1,
  dataP2,
  setDataP2,
  sendData,
}) {
  const [showPassword, setShowPassword] = React.useState(false);

  const [newpassword, setNewPassword] = React.useState();
  const [newpassword1, setNewPassword1] = React.useState();
  const [ErrorMessage, setErrorMessage] = React.useState(false);
  const [pwdError, setPwdError] = useState(false);

  const [CurrentPassword, setCurrentPassword] = React.useState(password);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [showPassword1, setShowPassword1] = React.useState(false);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };
  const items1 = localStorage.getItem("User");
  const [CheckTypeOfUser, setCheckTypeOfUser] = useState("");

  const ChckRefreshFunc = async () => {
    if (items1 === null) {
      const items = sessionStorage.getItem("User");
      var parsed = JSON.parse(items);
      setCheckTypeOfUser(parsed.role);
      jwtToken = parsed.token;
      const base64Url = jwtToken.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(atob(base64));
      const expirationDate = new Date(payload.exp * 1000);
      const currentTime = new Date().getTime(); // Get the current time in milliseconds
      if (expirationDate < currentTime) {
        try {
          axios
            .post(
              `${MyUrl}/api/RefreshToken/refresh`,
              { accessToken: jwtToken },
              { withCredentials: true }
            )
            .then((response) => {
              parsed.token = response.data.accessToken;
              const updatedObjString = JSON.stringify(parsed);
              sessionStorage.setItem("User", updatedObjString);
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
      setCheckTypeOfUser(parsed.role);
      jwtToken = parsed.token;
    }
  };
  useEffect(() => {
    ChckRefreshFunc();
  }, []);
  const UpdatePassFunc = async () => {
    await ChckRefreshFunc();
    if (newpassword === newpassword1 && validPassword.test(newpassword)) {
      setPwdError(false);
      let base64 = require("base-64"); // install it before use from npm i base-64
      var userObj = {
        userName: name,
        oldPass: CurrentPassword,
        newPass: newpassword,
      };
      const article = { title: "React PUT Request Example" };
      //setNewpasswordError(false);

      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
      axios
        .put(`${MyUrl}/api/Account/updatePass`, userObj, {
          headers,
        })
        // .then(response => setUpdatedAt(response.data.updatedAt));
        .then((response) => {
          setCurrentPassword(newpassword);
        });
    } else {
      setPwdError(true);
      // setNewpasswordError(true);
    }
  };
  const [EffectToG2, setEffectToG2] = useState(true);
  const handleClickP2 = () => {
    setEffectToG2(!EffectToG2);
    setDataP2({ message2: EffectToG2 });
  };
  const handleClick = () => {
    setIsTrue(!isTrue);
    sendData(!isTrue);
  };
  const [isTrue, setIsTrue] = useState(true);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(CurrentPassword);
      console.log("Text copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickClose = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      {/* <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button> */}
      {/* <IconButton
        size="small"
        aria-label="close"
        color="green"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton> */}
    </React.Fragment>
  );

  return (
    <div>
      <div style={{ paddingRight: "2%", paddingLeft: "2%", paddingTop: "6%" }}>
        <div
          style={{
            background: "#e5e5e5",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              Current Password:
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                fontWeight: "bold",
              }}
            >
              {CurrentPassword}
            </div>
          </div>
          <div
            onClick={() => {
              handleCopyClick();
              handleClickClose();
            }}
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <img width={25} src={Copy}></img>
          </div>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message="Password Copied!"
            action={action}
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <h1 style={{ fontSize: 15, fontWeight: "bold" }}>New Password</h1>
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={newpassword}
              onChange={(e) => setNewPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>
        <div style={{ marginTop: 20 }}>
          <h1 style={{ fontSize: 15, fontWeight: "bold" }}>
            Confirm New Password
          </h1>
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              value={newpassword1}
              onChange={(e) => setNewPassword1(e.target.value)}
              id="outlined-adornment-password"
              type={showPassword1 ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword1}
                    onMouseDown={handleMouseDownPassword1}
                    edge="end"
                  >
                    {showPassword1 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>
        {pwdError && (
          <p style={{ color: "red" }}>
            Password do not match or Empty, please retype!
          </p>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          flex: 1,
          position: "absolute",
          width: "100%",
          paddingRight: "2%",
          paddingLeft: "2%",
          bottom: 10,
        }}
      >
        <Button
          style={{
            color: "black",
            fontWeight: "bold",
            width: "30%",
            textTransform: "none",
          }}
          variant="text"
          onClick={() => {
            handleClick();
            handleClickP2();
          }}
        >
          Cancel
        </Button>
        <Button
          style={{
            background: "black",
            borderRadius: 10,
            width: "30%",
            textTransform: "none",
          }}
          variant="contained"
          onClick={() => {
            // if (newpassword !== newpassword1) {
            //   console.log("Wrong Input");
            //   setErrorMessage(true);
            //   return;
            // } else {
            //    setErrorMessage(false);
            UpdatePassFunc();
            //   }
          }}
        >
          Done
        </Button>
      </div>
      {/* </div> */}
    </div>
  );
}
