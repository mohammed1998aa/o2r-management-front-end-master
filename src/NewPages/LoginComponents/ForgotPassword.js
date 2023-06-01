import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { validEditEmail, emailRegex } from "../../Pages/Regex";
import { MyUrl, Redirect } from "../../App";
import checked from "./../../Images/checked.png";
import { withRouter, useHistory, useLocation } from "react-router-dom";

export default function ForgotPassword() {
  const [Email, setEmail] = useState();
  const [data, setData] = useState();
  const [Hide, setHide] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState(0);
  const { pathname } = useLocation();

  const ForgotPasswordAxios = () => {
    let base64 = require("base-64"); // install it before use from npm i base-64
    if (emailRegex.test(Email)) {
      setErrorMessage(0);
      try {
        axios
          .get(
            `${MyUrl}/api/Account/sendRestoreLink?email=${Email}
            `
          )
          .then((res) => {
            const data = res.data;
            console.log(res.status);
            if (res.status === 200) {
              setHide(true);
              setErrorMessage(3);
              setTimeout(() => {
                //   setData(data);
                const redirectUrl = Redirect;
                window.location = redirectUrl;
              }, 3000);
            } else {
            }
          })
          .catch((error) => {
            setErrorMessage(1);
            console.log("error11");

            console.log(error.response.status);
          });
      } catch (error) {
        console.log("error");

        console.log(error);
      }
    } else {
      setErrorMessage(2);
    }
  };
  const [height, width] = useWindowSize();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, height]);

  function useWindowSize() {
    const [size, setSize] = useState([window.innerHeight, window.innerWidth]);
    useEffect(() => {
      const handleResize = () => {
        setSize([window.innerHeight, window.innerWidth]);
      };
      window.addEventListener("resize", handleResize);
    }, []);
    return size;
  }
  return (
    <div>
      {Hide === false ? (
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
            label="Email"
            variant="outlined"
            type="text"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={() => {
              ForgotPasswordAxios();
              //EmailRegexFunc();
            }}
          >
            Send
          </Button>
          {/* {EmailRegexFunc()} */}
          {ErrorMessage === 3 ? (
            <>
              <h2 style={{ color: "Green" }}>
                You will receive link to reset your password!
              </h2>
            </>
          ) : (
            <></>
          )}
          {ErrorMessage === 1 ? (
            <>
              <h2 style={{ color: "red" }}>This email does not Exist!</h2>
            </>
          ) : (
            <></>
          )}
          {ErrorMessage === 2 ? (
            <>
              <h2 style={{ color: "red" }}>Invalid Email!</h2>
            </>
          ) : (
            <></>
          )}
        </div>
      ) : (
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
          <h4>link sent to your mail</h4>
          <img
            style={{
              width: "auto",
              maxWidth: width < 1500 ? 50 : 80,
            }}
            src={checked}
          ></img>
        </div>
      )}
    </div>
  );
}
