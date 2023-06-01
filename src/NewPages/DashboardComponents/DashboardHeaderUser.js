import React, { useEffect, useState, useCallback, CSSProperties } from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import axios from "axios";

import O2RLogo1 from "./../../Images/O2RLogo1.png";
import ProfilePicture1 from "./../../Images/ProfilePicture1.png";
import Menu1 from "./../../Images/Menu1.png";

import logoHome from "./../../Images/logoHome.png";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { MyUrl } from "../../App";
var jwtToken = "";
export default function DashboardHeaderUser({
  name1,
  password1,
  email1,
  data2,
}) {
  const [Data, setData] = useState("");
  let history = useHistory();
  //   const name1 = props.location.state.userObj2Send.name;
  //   const password1 = props.location.state.userObj2Send.password;
  const location = useLocation();
  const UserEmail = location.state.userObj2Send.email;
  const Username = location.state.userObj2Send.name;

  // const LogOut = () => {
  //   localStorage.removeItem("User");
  //   sessionStorage.removeItem("User");

  //   console.log("User deleted");
  //   history.push("/Login");
  // };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  //console.log(userObj2Send);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { pathname } = useLocation();
  const [height, width] = useWindowSize();

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

  const FirstLogOut = async () => {
    try {
      axios
        .delete(
          `${MyUrl}/api/RefreshToken/revoke`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken.replace("Bearer ", "")}`,
            },
          }
          //{
          //   headers: {
          //     Authorization: `Bearer ${jwtToken}`,
          //   },
          // }
        )
        .then((response) => {
          parsed.token = response.data.accessToken;
          // Store the updated object back in sessionStorage
          const updatedObjString = JSON.stringify(parsed);
          sessionStorage.setItem("User", updatedObjString);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {}
  };

  const SecondLogOut = async () => {
    localStorage.removeItem("User");
    sessionStorage.removeItem("User");
    console.log("User deleted");
    history.push("/Login");
  };
  const LogOut = async () => {
    await ChckRefreshFunc();
    await FirstLogOut();
    await SecondLogOut();
  };
  // useEffect(() => {
  //   getUrl();
  // }, []);
  // const getUrl = () => {
  //   let base64 = require("base-64"); // install it before use from npm i base-64
  //   try {
  //     axios
  //       .get(
  //         `${MyUrl}/api/Account/myUrls
  //           `,
  //         {
  //           headers: {
  //             Authorization: "Basic " + base64.encode(name1 + ":" + password1),
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         const data = res.data;
  //         console.log(data);
  //         setData(data);
  //       })
  //       .catch((error) => {});
  //   } catch (error) {}
  // };
  const items1 = localStorage.getItem("User");
  if (items1 === null) {
    const items = sessionStorage.getItem("User");
    var parsed = JSON.parse(items);
  } else {
    const items = sessionStorage.setItem("User", JSON.stringify(items1));
    var parsed = JSON.parse(items1);
  }

  return (
    <div
      style={{
        flex: 1,

        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <div style={{ flex: 1, paddingTop: 5 }}>
        <img
          style={{
            maxWidth:
              height < 570
                ? "0%"
                : width > 1201
                ? "4%"
                : width > 1025
                ? "5%"
                : width > 769
                ? "7%"
                : width > 481
                ? "9%"
                : width > 320
                ? "18%"
                : "20%",
          }}
          src={O2RLogo1}
        ></img>
      </div>

      <React.Fragment>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <div style={{ background: "white", borderRadius: 100 }}>
                <img
                  style={{ width: "auto", maxWidth: width < 1500 ? 50 : 50 }}
                  src={ProfilePicture1}
                ></img>
              </div>
              {/* <Avatar
                src="./../../Images/O2RLogo1.png"
                sx={{ width: 32, height: 32 }}
              /> */}
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              //   "&:before": {
              //     content: '""',
              //     display: "block",
              //     position: "absolute",
              //     top: 0,
              //     right: 14,
              //     width: 10,
              //     height: 10,
              //     bgcolor: "background.paper",
              //     transform: "translateY(-50%) rotate(45deg)",
              //     zIndex: 0,
              //   },
              borderRadius: 5,
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              display: "flex",
              minWidth: 300,
            }}
          >
            <img
              style={{ width: "auto", maxWidth: width < 1500 ? 80 : 80 }}
              src={ProfilePicture1}
            ></img>
          </div>
          <Typography sx={{ minWidth: 100 }}>
            <div
              style={{
                //  padding: 5,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                display: "flex",
                fontWeight: "bold",
              }}
            >
              {parsed.name}
            </div>
          </Typography>
          <Typography sx={{ minWidth: 100 }}>
            <div
              style={{
                padding: 10,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                display: "flex",
              }}
            >
              {parsed.email}
            </div>
          </Typography>

          <Divider
            style={{ opacity: 1, marginLeft: "8%", marginRight: "8%" }}
          />
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              display: "flex",
              paddingTop: "5%",
              paddingBottom: "5%",
            }}
          >
            <Button
              style={{ textTransform: "none" }}
              variant="text"
              onClick={() => {
                console.log("sss");

                history.push(`/DashboardChangePassword`, {
                  name1: name1,
                  password1: password1,
                  data2: data2,
                  email1: email1,
                });
              }}
            >
              Manage your Account
            </Button>
          </div>
          <Divider
            style={{ opacity: 1, marginLeft: "8%", marginRight: "8%" }}
          />
          {/* 
          <div
            style={{
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              display: "flex",
            }}
          >
            <Button
              style={{ backgroundColor: "black", textTransform: "none" }}
              variant="contained"
            >
              <ListItemIcon>
                <Settings style={{ color: "white" }} fontSize="small" />
              </ListItemIcon>
              Manage Users
            </Button>
          </div> */}

          <div
            style={{
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              display: "flex",
            }}
          >
            <Button
              style={{
                backgroundColor: "white",
                textTransform: "none",
                width: "80%",
                borderRadius: 10,
              }}
              variant="contained"
              onClick={() => {
                LogOut();
              }}
            >
              {/* <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon> */}
              <a style={{ color: "black" }}>Logout</a>
            </Button>
          </div>
        </Menu>
      </React.Fragment>
    </div>
  );
}
