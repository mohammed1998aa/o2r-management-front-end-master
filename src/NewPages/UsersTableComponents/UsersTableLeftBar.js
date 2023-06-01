import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import UsersTableTable from "./../UsersTableComponents/UsersTableTable";
import UserManagement1 from "./../../Images/UserManagement1.png";
import TrafficSourceImg from "./../../Images/TrafficSourceImg.png";
import TrafficSourceColored from "./../../Images/TrafficSourceColored.png";
import AdvertiserBillingColored from "./../../Images/AdvertiserBillingColored.png";
import DashboardColoredImg from "./../../Images/DashboardColoredImg.png";
import GlobalColoredImg from "./../../Images/GlobalColoredImg.png";
import SupplyColoredImg from "./../../Images/SupplyColoredImg.png";

import DemandColoredImg from "./../../Images/DemandColoredImg.png";

import IncomeColoredImg from "./../../Images/IncomeColoredImg.png";

import AdvertiserBillingImg from "./../../Images/AdvertiserBillingImg.png";
import Dashboard from "./../../Images/Dashboard.png";
import Income from "./../../Images/Income.png";
import Global from "./../../Images/Global.png";
import Supply from "./../../Images/Supply.png";
import Demand from "./../../Images/Demand.png";

import UserManagement from "./../../Images/UserManagement.png";
import UserFlow from "./../../Images/UserFlow.png";
import UserFlowColoredfrom from "./../../Images/UserFlowColored.png";
import BIProjectConfigurationColored from "./../../Images/BIProjectConfigurationColored.png";
import SeatManagementColored from "./../../Images/SeatManagementColored.png";

import TrafficSource from "../BIProjectComponents/TrafficSource";
import AdvertiserBilling from "../BIProjectComponents/AdvertiserBilling";
import BIDashboard from "../BIProjectComponents/BIDashboard";
import BIIncome from "../BIProjectComponents/BIIncome";
import BIGlobal from "../BIProjectComponents/BIGlobal";
import BISupply from "../BIProjectComponents/BISupply";

import BIProjectConfiguration from "./../../Images/BIProjectConfiguration.png";
import SeatManagement from "./../../Images/SeatManagement.png";
import O2RLogo from "./../../Images/O2RLogo.png";
import UsersTableUserFlow from "./UsersTableUserFlow";
import UsersTableBIProjectConfiguration from "./UsersTableBIProjectConfiguration";
import UsersTableSeatManagemnt from "./UsersTableSeatManagemnt";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import Collapse from "@mui/material/Collapse";
import UsersTableHeader from "./UsersTableHeader";
import BIDemand from "../BIProjectComponents/BIDemand";

const useStyles = makeStyles({
  drawerPaper: {
    backgroundColor: "#f9f8f9", // set your desired color here
  },
});

function getViewportWidth() {
  return window.innerWidth;
}
const viewportWidth = getViewportWidth();
console.log(`Page width: ${viewportWidth}px`);

export var ChooesPage = "UserManagement";
const drawerWidth = 270;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: viewportWidth > 766 ? `calc(${theme.spacing(7)} + 1px)` : 0,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function UsersTableLeftBar(props) {
  const classes = useStyles();

  const [ChooseOne, setChooseOne] = useState(0);
  const [MyText, setMyText] = useState("User Management");
  const email1 = props.location.state.userObj2Send.email;
  const name1 = props.location.state.userObj2Send.name;
  const password1 = props.location.state.userObj2Send.password;
  const data2 = props.location.state.userObj2Send.data2;
  const history = useHistory();
  console.log("UsersTableLeftBar");
  console.log(email1);

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
  const [height, width] = useWindowSize();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [open1, setopen1] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setopen1(!open1);
  };
  const [height1, setHeight1] = useState(0);
  useEffect(() => {
    setHeight1(window.innerHeight);
  }, []);

  const [width1, setWidth1] = useState(0);
  useEffect(() => {
    setWidth1(window.innerWidth);
  });
  const [data, setData] = useState(true);

  const handleData = (data) => {
    // setState({ ...state, ["right"]: false });
    // toggleDrawer("right", data);
    console.log(data);
    setData(data);
    setOpen(data);
  };

  return (
    <div
      style={{
        //flex: 1,
        //  display: "flex", // For desktop should flex it  put for mobile when unable it (no flex)
        // paddingRight: "1%",
        display: "flex", // width > 766 ? "flex" : "",
        flexGrow: 1,
      }}
    >
      {/* <div
        style={{ paddingLeft: 300 }}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <img src={O2RLogo} width={40}></img>
      </div> */}
      <div style={{}}>
        <Box sx={{}}>
          <Drawer
            variant="permanent"
            open={open}
            classes={{ paper: classes.drawerPaper }}
          >
            <div
              style={{
                display: open === true ? "flex" : "",
                flexDirection: "row",
                alignItems: open === true ? "center" : "",
                justifyContent: open === true ? "space-between" : "",
              }}
            >
              {open === true ? (
                <div style={{ paddingLeft: "10%" }} onClick={() => {}}>
                  <img src={O2RLogo} width={40}></img>{" "}
                </div>
              ) : (
                <></>
              )}

              <DrawerHeader>
                <IconButton
                  style={{}}
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  {open === true ? (
                    // <div
                    //   style={{
                    //     background: "white",
                    //     borderRadius: "100%",
                    //     borderColor: "gray",
                    //   }}
                    // >
                    <ChevronLeftIcon />
                  ) : (
                    // </div>
                    //<div style={{ background: "white", borderRadius: "100%" }}>
                    <>
                      <div
                        style={{
                          display: "flex",
                          // paddingLeft: "10%",
                          //flexDirection: "column",
                          position: "relative",
                          left: "30%",
                          alignItems: "center",
                        }}
                      >
                        <img src={O2RLogo} width={40}></img>{" "}
                        <ChevronRightIcon />
                      </div>
                    </>
                    //</div>
                  )}
                </IconButton>
              </DrawerHeader>
            </div>
            <Divider />
            <List>
              {/* "User Flow", */}
              {["User Management", "BI Project", "Seat Management"].map(
                (text, index) => (
                  <ListItem key={text} disablePadding sx={{ display: "block" }}>
                    <div
                      onClick={() => {
                        if (text !== "BI Project") {
                          setMyText(text);
                        }
                        if (index === 1) {
                          handleClick();
                        }
                      }}
                      style={{
                        color: text === MyText ? "#5746af" : "",
                        background: text === MyText ? "#e4defc" : "",
                        borderRadius: 10,
                        margin: 5,
                      }}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          <div>
                            {index === 0 ? (
                              <img
                                src={
                                  text === MyText
                                    ? UserManagement
                                    : UserManagement1
                                }
                                width={30}
                              ></img>
                            ) : index === 1 ? (
                              <div>
                                <img
                                  src={
                                    text === MyText
                                      ? BIProjectConfigurationColored
                                      : BIProjectConfiguration
                                  }
                                  width={30}
                                ></img>
                              </div>
                            ) : index === 2 ? (
                              <img
                                src={
                                  text === MyText
                                    ? SeatManagementColored
                                    : SeatManagement
                                }
                                width={30}
                              ></img>
                            ) : (
                              ""
                            )}
                          </div>
                        </ListItemIcon>
                        <ListItemText
                          primary={text}
                          sx={{ opacity: open ? 1 : 0 }}
                        />{" "}
                        {index === 1 && open ? (
                          <>
                            {open1 ? (
                              <ExpandLess />
                            ) : (
                              <ExpandMore style={{ color: "gray" }} />
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </ListItemButton>
                    </div>

                    {index === 1 ? (
                      <>
                        {" "}
                        <Collapse in={open1} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <div
                              onClick={() => {
                                setMyText("Traffic Source");
                                console.log(MyText);
                                console.log(text);
                                console.log(index);
                              }}
                              style={{
                                color:
                                  "Traffic Source" === MyText ? "#5746af" : "",
                                background:
                                  "Traffic Source" === MyText ? "#e4defc" : "",
                                borderRadius: 10,
                                margin: 5,
                              }}
                            >
                              <ListItemButton
                                sx={{ pl: open ? 6 : 3 }}
                                onClick={() => {
                                  setMyText("Traffic Source");
                                }}
                              >
                                <ListItemIcon>
                                  <img
                                    src={
                                      "Traffic Source" === MyText
                                        ? TrafficSourceColored
                                        : TrafficSourceImg
                                    }
                                    width={20}
                                  ></img>{" "}
                                </ListItemIcon>
                                <ListItemText primary="Traffic Source" />
                              </ListItemButton>
                            </div>
                            <div
                              onClick={() => {
                                setMyText("Advertiser Billing");
                                console.log(MyText);
                                console.log(text);
                                console.log(index);
                              }}
                              style={{
                                color:
                                  "Advertiser Billing" === MyText
                                    ? "#5746af"
                                    : "",
                                background:
                                  "Advertiser Billing" === MyText
                                    ? "#e4defc"
                                    : "",
                                borderRadius: 10,
                                margin: 5,
                              }}
                            >
                              <ListItemButton
                                onClick={() => {
                                  setMyText("Advertiser Billing");
                                }}
                                sx={{ pl: open ? 6 : 3 }}
                              >
                                <ListItemIcon>
                                  <img
                                    src={
                                      "Advertiser Billing" === MyText
                                        ? AdvertiserBillingColored
                                        : AdvertiserBillingImg
                                    }
                                    width={20}
                                  ></img>{" "}
                                </ListItemIcon>
                                <ListItemText primary="Advertiser Billing" />
                              </ListItemButton>
                            </div>
                            {/* <div
                              onClick={() => {
                                setMyText("Dashboard");
                                console.log(MyText);
                                console.log(text);
                                console.log(index);
                              }}
                              style={{
                                color: "Dashboard" === MyText ? "#5746af" : "",
                                background:
                                  "Dashboard" === MyText ? "#e4defc" : "",
                                borderRadius: 10,
                                margin: 5,
                              }}
                            >
                              <ListItemButton sx={{ pl: open ? 6 : 3 }}>
                                <ListItemIcon>
                                  <img
                                    src={
                                      "Dashboard" === MyText
                                        ? DashboardColoredImg
                                        : Dashboard
                                    }
                                    width={20}
                                  ></img>{" "}
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                              </ListItemButton>
                            </div> */}

                            <div
                              onClick={() => {
                                setMyText("Income");
                                console.log(MyText);
                                console.log(text);
                                console.log(index);
                              }}
                              style={{
                                color: "Income" === MyText ? "#5746af" : "",
                                background:
                                  "Income" === MyText ? "#e4defc" : "",
                                borderRadius: 10,
                                margin: 5,
                              }}
                            >
                              <ListItemButton sx={{ pl: open ? 6 : 3 }}>
                                <ListItemIcon>
                                  <img
                                    src={
                                      "Income" === MyText
                                        ? IncomeColoredImg
                                        : Income
                                    }
                                    width={20}
                                  ></img>{" "}
                                </ListItemIcon>
                                <ListItemText primary="Income" />
                              </ListItemButton>
                            </div>
                            {/* <ListItemButton sx={{ pl: open ? 6 : 3 }}>
                            <ListItemIcon>
                              <img src={Income} width={20}></img>{" "}
                            </ListItemIcon>
                            <ListItemText primary="Income" />
                          </ListItemButton> */}

                            <div
                              onClick={() => {
                                setMyText("Global");
                                console.log(MyText);
                                console.log(text);
                                console.log(index);
                              }}
                              style={{
                                color: "Global" === MyText ? "#5746af" : "",
                                background:
                                  "Global" === MyText ? "#e4defc" : "",
                                borderRadius: 10,
                                margin: 5,
                              }}
                            >
                              <ListItemButton sx={{ pl: open ? 6 : 3 }}>
                                <ListItemIcon>
                                  <img
                                    src={
                                      "Global" === MyText
                                        ? GlobalColoredImg
                                        : Global
                                    }
                                    width={20}
                                  ></img>{" "}
                                </ListItemIcon>
                                <ListItemText primary="Global" />
                              </ListItemButton>
                            </div>

                            {/* <ListItemButton sx={{ pl: open ? 6 : 3 }}>
                            <ListItemIcon>
                              <img src={Global} width={20}></img>{" "}
                            </ListItemIcon>
                            <ListItemText primary="Global" />
                          </ListItemButton> */}

                            <div
                              onClick={() => {
                                setMyText("Supply");
                                console.log(MyText);
                                console.log(text);
                                console.log(index);
                              }}
                              style={{
                                color: "Supply" === MyText ? "#5746af" : "",
                                background:
                                  "Supply" === MyText ? "#e4defc" : "",
                                borderRadius: 10,
                                margin: 5,
                              }}
                            >
                              <ListItemButton sx={{ pl: open ? 6 : 3 }}>
                                <ListItemIcon>
                                  <img
                                    src={
                                      "Supply" === MyText
                                        ? SupplyColoredImg
                                        : Supply
                                    }
                                    width={20}
                                  ></img>{" "}
                                </ListItemIcon>
                                <ListItemText primary="Supply" />
                              </ListItemButton>
                            </div>
                            {/* <ListItemButton sx={{ pl: open ? 6 : 3 }}>
                            <ListItemIcon>
                              <img src={Supply} width={20}></img>{" "}
                            </ListItemIcon>
                            <ListItemText primary="Supply" />
                          </ListItemButton> */}

                            <div
                              onClick={() => {
                                setMyText("Demand");
                                console.log(MyText);
                                console.log(text);
                                console.log(index);
                              }}
                              style={{
                                color: "Demand" === MyText ? "#5746af" : "",
                                background:
                                  "Demand" === MyText ? "#e4defc" : "",
                                borderRadius: 10,
                                margin: 5,
                              }}
                            >
                              <ListItemButton sx={{ pl: open ? 6 : 3 }}>
                                <ListItemIcon>
                                  <img
                                    src={
                                      "Demand" === MyText
                                        ? DemandColoredImg
                                        : Demand
                                    }
                                    width={20}
                                  ></img>{" "}
                                </ListItemIcon>
                                <ListItemText primary="Demand" />
                              </ListItemButton>
                            </div>

                            {/* <ListItemButton sx={{ pl: open ? 6 : 3 }}>
                            <ListItemIcon>
                              <img src={Demand} width={20}></img>{" "}
                            </ListItemIcon>
                            <ListItemText primary="Demand" />
                          </ListItemButton> */}
                          </List>
                        </Collapse>
                      </>
                    ) : (
                      <></>
                    )}
                  </ListItem>
                )
              )}
            </List>
          </Drawer>
        </Box>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
          paddingRight: "1%",
          flexDirection: "column",
        }}
      >
        <UsersTableHeader
          email1={email1}
          name1={name1}
          password1={password1}
          data3={data2}
          MyText={MyText}
          sendData={handleData}
        />

        {MyText === "User Management" ? (
          // flexDirection: width > 766 ? "column" : 0,
          <div
            style={{
              maxWidth: "100%",
              width: "100%",
              paddingTop: "0%",
              flexDirection: "row",
              flex: 1,
            }}
          >
            <UsersTableTable
              name1={name1}
              password1={password1}
              data2={data2}
            />
          </div>
        ) : MyText === "User Flow" ? (
          <>
            <UsersTableUserFlow />
          </>
        ) : MyText === "Traffic Source" ? (
          <TrafficSource name1={name1} password1={password1} data2={data2} />
        ) : MyText === "Advertiser Billing" ? (
          <AdvertiserBilling
            name1={name1}
            password1={password1}
            data2={data2}
          />
        ) : MyText === "Dashboard" ? (
          <BIDashboard
            name1={name1}
            password1={password1}
            data2={data2}
            PageId={5}
          />
        ) : MyText === "Income" ? (
          <BIIncome
            name1={name1}
            password1={password1}
            data2={data2}
            PageId={3}
          />
        ) : MyText === "Global" ? (
          <BIGlobal
            name1={name1}
            password1={password1}
            data2={data2}
            PageId={4}
          />
        ) : MyText === "Supply" ? (
          <BISupply
            name1={name1}
            password1={password1}
            data2={data2}
            PageId={2}
          />
        ) : MyText === "Demand" ? (
          <BIDemand
            name1={name1}
            password1={password1}
            data2={data2}
            PageId={1}
          />
        ) : MyText === "Seat Management" ? (
          <>
            <UsersTableSeatManagemnt name1={name1} password1={password1} />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default withRouter(UsersTableLeftBar);
//AdvertiserBilling
