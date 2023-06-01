import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import axios from "axios";
import UsersTable from "../UsersTable";
import { MyUrl } from "../../App";
// import {
//   validEmail,
//   validPassword,
//   validUserName,
//   validUrlName,
//   validUrl,
//   validEditEmail,
// } from "./Regex.jsx";

import { validEditEmail } from "../../Pages/Regex";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";

const variants = ["h3", "h3"];
var jwtToken = "";
function TypographyDemo(props) {
  const { loading = false } = props;

  return (
    <div>
      {variants.map((variant) => (
        <Typography component="div" key={variant} variant={variant}>
          {loading ? <Skeleton /> : variant}
        </Typography>
      ))}
    </div>
  );
}

TypographyDemo.propTypes = {
  loading: PropTypes.bool,
};

//Copy
export default function UsersTableAccountSetting({
  props,
  id,
  name,
  email,
  status,
  role,
  name1,
  password1,
  callParentFunction,
  sendData,
  setDataP,
  dataP,
}) {
  const [UpdateEmail, setUpdateEmail] = React.useState(email);
  const [Role1, setRole1] = React.useState();
  const [Status1, setStatus1] = React.useState(status);
  const [data2, setData2] = React.useState("");
  const [userTypeId, setUserTypeId] = React.useState(role);
  const [isLoading, setIsLoading] = React.useState(true);
  const [emailErr1, setEmailErr1] = useState(false);

  //const [isTrue, setIsTrue] = React.useState(true);
  const [EffectToG, setEffectToG] = useState(true);
  const handleClickP = () => {
    setEffectToG(!EffectToG);
    setDataP({ message: EffectToG });
  };

  const handleButtonPress = () => {
    callParentFunction();
  };

  useEffect(() => {
    //callRole();
  }, []);
  const UpdateFunc = async () => {
    await ChckRefreshFunc();
    //  setErorrMessage("");
    if (validEditEmail.test(UpdateEmail)) {
      setEmailErr1(false);

      let base64 = require("base-64"); // install it before use from npm i base-64
      var userObj = {
        id: id,
        userName: name,
        isActive: Status1,
        userTypeId: userTypeId,
        email: UpdateEmail,
      };
      const article = { title: "React PUT Request Example" };
      const headers = {
        Authorization: "Basic " + base64.encode(name1 + ":" + password1),
      };
      axios
        .put(`${MyUrl}/api/Account/updateUser`, userObj, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        // .then(response => setUpdatedAt(response.data.updatedAt));
        .then((response) => {
          // setStatus(response.status);
          // callIt();
          // handleClose1();
          handleClick();
          setIsTrue(!isTrue);
          handleClickP();
        })
        .catch((error) => {
          // setErorrMessage(error.response.data.errorMessage);
        });
    } else {
      setEmailErr1(true);
    }
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
              console.log("aaa");
              callRole();

              parsed.token = response.data.accessToken;
              const updatedObjString = JSON.stringify(parsed);
              sessionStorage.setItem("User", updatedObjString);
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {}
      } else {
        console.log("bbb");
        callRole();
        console.log("Token is still valid");
      }
    } else {
      const items = sessionStorage.setItem("User", JSON.stringify(items1));
      var parsed = JSON.parse(items1);
      setCheckTypeOfUser(parsed.role);
      jwtToken = parsed.token;
      callRole();
    }
  };
  useEffect(() => {
    ChckRefreshFunc();
  }, []);

  const callRole = () => {
    var userObj = {
      userName: name1,
      password: password1,
    };
    //var BasicAuth = "Basic " + window.btoa(name1 + ":" + password1);
    let base64 = require("base-64"); // install it before use from npm i base-64
    try {
      axios
        .get(
          `${MyUrl}/api/Account/gettypes
          `,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )
        .then((res) => {
          const data2 = res.data;
          console.log(data2);
          setData2(data2);
          setIsLoading(false);
        })
        .catch((error) => {});
    } catch (error) {}
  };
  const handleChange = (event) => {
    setUserTypeId(event.target.value);
  };

  const handleChange1 = (event) => {
    setStatus1(event.target.value);
  };
  const handleClick = () => {
    setIsTrue(!isTrue);
    sendData(!isTrue);
  };
  const [isTrue, setIsTrue] = useState(true);
  const [childData, setChildData] = useState(true);
  function handleClick1() {
    props.sendData(childData);
  }

  return (
    <div>
      {/* <button onClick={handleClick1}>Send data to grandparent</button> */}
      {isLoading ? (
        <div
          style={{ paddingRight: "2%", paddingLeft: "2%", paddingTop: "6%" }}
        >
          {" "}
          <Grid container spacing={8}>
            <Grid item xs>
              <TypographyDemo loading />
            </Grid>
            {/* <Grid item xs>
    <TypographyDemo />
  </Grid> */}
          </Grid>
        </div>
      ) : (
        <div>
          <div
            style={{ paddingRight: "2%", paddingLeft: "2%", paddingTop: "6%" }}
          >
            <h1 style={{ fontSize: 15, fontWeight: "bold" }}>Email</h1>
            <TextField
              style={{ width: "100%" }}
              id="outlined-basic"
              value={UpdateEmail}
              //label={email}
              onChange={(e) => setUpdateEmail(e.target.value)}
              variant="outlined"
            />
            {emailErr1 && (
              <>
                <p style={{ color: "red" }}>Your email is invalid</p>
              </>
            )}
          </div>
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              flex: 1,
              paddingTop: 20,
              paddingRight: "2%",
              paddingLeft: "2%",
            }}
          >
            <div
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
              }}
            >
              <h1 style={{ fontSize: 15, fontWeight: "bold" }}>User Status</h1>

              <FormControl style={{ width: "80%" }}>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Status1}
                  label="Status"
                  onChange={handleChange1}
                >
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Not Active</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
              }}
            >
              <h1 style={{ fontSize: 15, fontWeight: "bold" }}>User Type</h1>
              <FormControl style={{ width: "80%" }}>
                <InputLabel id="demo-simple-select-label">User type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={userTypeId}
                  label="userTypeId"
                  onChange={handleChange}
                >
                  {data2 &&
                    data2.responseData.map((responseData) => (
                      <MenuItem
                        value={responseData.id}
                        onClick={() => {
                          //     setuserUpdateUserTypeId(responseData.id);
                        }}
                      >
                        {responseData.permissionType}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
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
                //    UpdateFunc();
                handleClick();
                // setIsTrue(!isTrue);
                // props.handleCountChange(isTrue);
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
                UpdateFunc();

                // props.handleCountChange(isTrue);
              }}
            >
              Done
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// export default function ForCheck1(props, { hi }) {
//   const [isTrue, setIsTrue] = useState(false);
//   return (
//     <button
//       onClick={() => {
//         setIsTrue(!isTrue);
//         props.handleCountChange(isTrue);
//       }}
//     >
//       Increment
//     </button>
//   );
// }
