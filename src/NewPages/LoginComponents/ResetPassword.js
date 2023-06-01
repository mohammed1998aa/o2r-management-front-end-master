import axios from "axios";
import React, { useState } from "react";
import { passwordRegex } from "../../Pages/Regex";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { MyUrl, Redirect } from "../../App";
import { withRouter, useHistory, useLocation } from "react-router-dom";

var Obj = {};
function ResetPassword({ location }) {
  const [Password, setPassword] = useState("");
  const [Password1, setPassword1] = useState("");
  const [ErrorM, setErrorM] = useState(false);
  const [error, setError] = useState("");

  const [data, setData] = useState({});
  const [Hide, setHide] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const tokenFromUrl = urlParams.get("token");
  let history = useHistory();

  console.log(tokenFromUrl);

  if (tokenFromUrl !== null) {
    var token = tokenFromUrl;
    localStorage.setItem("Token", JSON.stringify(token));
    const MyToken = JSON.parse(localStorage.getItem("Token"));
    console.log(MyToken);
  }
  const MyToken = JSON.parse(localStorage.getItem("Token"));
  console.log(MyToken);

  const handleClick = () => {
    if (Password === Password1) {
      setErrorM(false);
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(Password)) {
        setError(
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
      } else {
        Obj = {
          password: Password,
          token: tokenFromUrl,
        };
        try {
          axios
            .put(`${MyUrl}/api/Account/updatePassByLink`, Obj)
            .then((response) => {
              console.log(response.status);
              history.push("/Login");
            })
            .catch((error) => {
              console.log(error.message);
            });
        } catch (error) {}
        setError("");
      }

      console.log(Obj);
    } else {
      setErrorM(true);
      setError("");
      return true;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
        paddingTop: 200,
        flexDirection: "column",
      }}
    >
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        type="text"
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br></br>
      <TextField
        id="outlined-basic"
        label="Confirm Password"
        variant="outlined"
        type="text"
        value={Password1}
        onChange={(e) => setPassword1(e.target.value)}
      />
      <br></br>

      <Button
        variant="contained"
        type="text"
        onClick={handleClick}
        style={{
          background: "#2f74b8",
        }}
      >
        Update Password
      </Button>
      {/* <input
        type="text"
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <br></br>
      <input
        type="text"
        value={Password1}
        onChange={(e) => setPassword1(e.target.value)}
      ></input> */}
      <br></br>
      {ErrorM ? (
        <>
          <h5 style={{ color: "red" }}>Password does not match!</h5>
        </>
      ) : (
        <></>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* <button onClick={handleClick}>Update Data</button> */}
    </div>
  );
}
export default ResetPassword;
