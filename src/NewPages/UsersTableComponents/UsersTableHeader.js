import React, { useEffect, useState, useCallback, CSSProperties } from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import axios from "axios";

import logoHome from "./../../Images/logoHome.png";
import openmenu from "./../../Images/openmenu.png";
import ControlPanel from "./../../Images/ControlPanel.png";

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
import { color } from "@mui/system";
import { MyUrl, GoToBI } from "../../App";
import ProfilePicture1 from "./../../Images/ProfilePicture1.png";
import Menu1 from "./../../Images/Menu1.png";
import O2RLogo from "./../../Images/O2RLogo.png";

var aa = 0;
var jwtToken = "";
export default function UsersTableHeader({
  name1,
  password1,
  data3,
  MyText,
  sendData,
  email1,
}) {
  // const name1 = props.location.state.userObj2Send.name;
  // const password1 = props.location.state.userObj2Send.password;
  // const data3 = props.location.state.userObj2Send.data3;

  // console.log("UsersTableHeader");
  // console.log(name1);
  // console.log(password1);
  // console.log(data3);

  const [Data, setData] = useState("");
  const [ColorButton, setColorButton] = useState(1);
  let [thecolor, setthecolor] = useState();
  const [thebutton, setthebutton] = useState("");

  let history = useHistory();

  // const LogOut = () => {
  //   localStorage.removeItem("User");
  //   sessionStorage.removeItem("User");
  //   console.log("User deleted");
  //   history.push("/Login");
  // };
  const GoToAdminDashboard = async () => {
    console.log(userObj2Send);
    var userObj2Send = {
      name: name1,
      password: password1,
      data3: data3,
      email1: email1,
    };

    history.push("/AdminDashboard", { userObj2Send });
  };
  const GoToUsersTbale = async () => {
    console.log("GoToUsersTbale");
    console.log(name1);
    console.log(password1);
    console.log(data3);

    var userObj = {
      name: name1,
      password: password1,
      data2: data3,
    };
    history.push("/UsersTable", { userObj2Send: userObj });
  };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl1, setAnchorEl1] = useState(null);
  const open1 = Boolean(anchorEl1);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
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
              // getUrl();
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
      // getUrl();
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
  const [bgColor, setBgColor] = useState("white");
  const [bgColor1, setBgColor1] = useState("white");
  const [isTrue, setIsTrue] = useState(true);

  const handleClick2 = () => {
    setIsTrue(!isTrue);
    sendData(!isTrue);
  };

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
        // justifyContent: "space-between",
        // paddingRight: "1%",
        // paddingLeft: 70,
        //        minWidth: 1500,
        width: "100%",
        paddingTop: "0%",
      }}
    >
      {width < 766 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            marginLeft: "4%",
          }}
          onClick={() => {
            handleClick2();
            setIsTrue(!isTrue);
          }}
        >
          <img src={O2RLogo} width={40}></img>
        </div>
      ) : (
        <></>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingLeft: "2.5%",
        }}
      >
        <a style={{ fontSize: width < 766 ? 13 : 25, fontWeight: 500 }}>
          {MyText}
        </a>
        {/* fontWeight: "bold"  */}
        {/* <img
          style={{
            width: width > 800 ? "20%" : "30%",
          }}
          src={logoHome}
        ></img> */}
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
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
                aria-controls={open1 ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open1 ? "true" : undefined}
              >
                <div style={{ background: "white", borderRadius: 100 }}>
                  <img
                    style={{
                      width: "auto",
                      maxWidth: width < 1500 ? 50 : 50,
                      padding: "20%",
                    }}
                    src={Menu1}
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
                // "&:before": {
                //   content: '""',
                //   display: "block",
                //   position: "absolute",
                //   top: 0,
                //   right: 14,
                //   width: 10,
                //   height: 10,
                //   bgcolor: "background.paper",
                //   transform: "translateY(-50%) rotate(45deg)",
                //   zIndex: 0,
                // },
                borderRadius: 5,
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                minWidth: 300,
                justifyContent: "space-around",
                paddingTop: "6%",
                paddingBottom: "6%",
              }}
            >
              <div
                onMouseEnter={() => {
                  setBgColor("#e9e8ea");
                }}
                onMouseLeave={() => {
                  setBgColor("");
                }}
                style={{
                  flexDirection: "column",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  height: 100,
                  alignItems: "center",
                  justifyContent: "center",
                  width: "45%",
                  borderRadius: 20,
                  background: bgColor,
                }}
                onClick={() => {
                  GoToUsersTbale();
                }}
              >
                <img src={ControlPanel} style={{ width: 50 }}></img>
                Admin Panel
              </div>
              <div
                onMouseEnter={() => {
                  setBgColor1("#e9e8ea");
                }}
                onMouseLeave={() => {
                  setBgColor1("");
                }}
                style={{
                  flexDirection: "column",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  height: 100,
                  alignItems: "center",
                  justifyContent: "center",
                  width: "45%",
                  borderRadius: 20,
                  background: bgColor1,
                }}
                onClick={() => {
                  GoToAdminDashboard();
                }}
              >
                <img src={ProfilePicture1} style={{ width: 50 }}></img>
                Account
              </div>
            </div>

            <Divider
              style={{ opacity: 1, marginLeft: "8%", marginRight: "8%" }}
            />
            <div style={{ paddingTop: 10, paddingLeft: 10 }}>
              <h1 style={{ fontSize: 15, paddingTop: 10, opacity: 0.5 }}>
                Services
              </h1>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                width: 300,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              {Array.isArray(data3.responseData) ? (
                data3 &&
                data3.responseData.map((responseData) => (
                  <div
                    onMouseEnter={() => {
                      aa = responseData.id;
                      setthebutton(responseData.id);
                      setthecolor("green");
                      console.log(thebutton);
                    }}
                    onMouseLeave={() => {
                      aa = 0;
                      setthecolor("black");
                    }}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      borderRadius: 30,
                      background: responseData.id === aa ? "#e9e8ea" : "",
                      flex: width > 481 ? "0 1 45%" : "0 1 45%",
                      //  border: responseData.id === aa ? `1px solid black` : "",
                    }}
                  >
                    {responseData.imageUrl !== "" ? (
                      <div
                        onClick={async (e) => {
                          await ChckRefreshFunc();
                          console.log("its ok ");
                          const token = btoa(name1 + ":" + password1) || null; // encode the token with btoa or set to null
                          //  const redirectUrl = `http://${responseData.url}?Authorization=Basic ${token}`;
                          //      const redirectUrl = `${responseData.url}?Authorization=Basic ${token}`; //LinkToBI
                          // window.location = redirectUrl;
                          // window.open(
                          //   `${responseData.url}?Authorization=Basic ${token}`,
                          //   "_blank"
                          // );
                          //for shrat
                          // const url = `https://newbi.o2rintelligence.com/?Authorization=Bearer ${jwtToken}`;
                          // window.open(url, "_blank");
                          //for local
                          console.log("he click me!");
                          const url = `${GoToBI}/?Authorization=Bearer ${jwtToken}`;
                          window.open(url, "_blank");
                        }}
                        style={{
                          borderRadius: 20,
                          cursor: "pointer",
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                          flexDirection: "column",
                          width: "90%",
                        }}
                      >
                        <img
                          src={require(`../../Images/${responseData.imageUrl}.png`)}
                          height="20%"
                          width="40%"
                          style={{ margin: 25 }}
                        ></img>
                        <h4
                          style={{
                            // color: "#9333ea",
                            fontSize: "100%",
                            textAlign: "center",
                          }}
                        >
                          {responseData.name}
                        </h4>
                      </div>
                    ) : (
                      <>
                        <Button variant="contained">{responseData.url}</Button>
                      </>
                    )}

                    <br></br>
                  </div>
                ))
              ) : (
                <>
                  <h5>You dont have any website!</h5>
                  <div
                    style={{ paddingTop: width > 1500 ? "15%" : "8%" }}
                  ></div>
                </>
              )}
            </div>
            {/* <Avatar style={{ width: 75, height: 75 }} />
          <Avatar style={{ width: 75, height: 75 }} /> */}
          </Menu>
        </React.Fragment>
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
                onClick={handleClick1}
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
            anchorEl={anchorEl1}
            id="account-menu"
            open={open1}
            onClose={handleClose1}
            onClick={handleClose1}
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
                // "&:before": {
                //   content: '""',
                //   display: "block",
                //   position: "absolute",
                //   top: 0,
                //   right: 14,
                //   width: 10,
                //   height: 10,
                //   bgcolor: "background.paper",
                //   transform: "translateY(-50%) rotate(45deg)",
                //   zIndex: 0,
                // },
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
              }}
            >
              <img src={ProfilePicture1} style={{ width: 75 }}></img>
            </div>
            <Typography sx={{ minWidth: 300 }}>
              <div
                style={{
                  padding: 5,
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
                  paddingBottom: "5%",
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
                variant="text"
                onClick={() => {
                  history.push(`/DashboardChangePassword`, {
                    name1: name1,
                    password1: password1,
                    email1: email1,
                    data2: data3,
                  });
                }}
              >
                Manage your account
              </Button>
            </div>
            <Divider
              style={{ opacity: 1, marginLeft: "8%", marginRight: "8%" }}
            />

            <div
              style={{
                padding: 10,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                display: "flex",
              }}
            >
              {/* <Button
              style={{ backgroundColor: "black", textTransform: "none" }}
              variant="contained"
            >
              <ListItemIcon>
                <Settings style={{ color: "white" }} fontSize="small" />
              </ListItemIcon>
              Manage Users
            </Button> */}
            </div>

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
    </div>
  );
}
