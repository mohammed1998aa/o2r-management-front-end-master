import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Close from "../../Images/Close.png";
import TextField from "@mui/material/TextField";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { MyUrl } from "../../App";
import { MyContext } from "./UsersTableSeatManagemnt";
var jwtToken = "";
export default function UserSeatManagementDrawer({
  name,
  userName,
  servingFee,
  CampscoringFeeaignName,
  pixalateFee,
  password,
  partnerFee,
  inappCpm,
  id,
  ctvCpm,
  color,
}) {
  const { isTrue, toggleIsTrue } = useContext(MyContext);

  const [id1, setId1] = useState(id);
  const [userName1, setuserName1] = useState(userName);
  const [password1, setpassword1] = useState(password);
  const [name1, setname1] = useState(name);
  const [servingFee1, setservingFee1] = useState(servingFee);
  const [scoringFee1, setscoringFee1] = useState(CampscoringFeeaignName);
  const [partnerFee1, setpartnerFee1] = useState(partnerFee);
  const [ctvCpm1, setctvCpm1] = useState(ctvCpm);
  const [inappCpm1, setinappCpm1] = useState(inappCpm);
  const [pixalateFee1, setpixalateFee1] = useState(pixalateFee);
  const [color1, setcolor1] = useState(color);

  console.log(CampscoringFeeaignName);
  const items1 = localStorage.getItem("User");
  const [CheckTypeOfUser, setCheckTypeOfUser] = useState("");
  useEffect(() => {
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
  }, []);
  if (items1 === null) {
    const items = sessionStorage.getItem("User");
    var parsed = JSON.parse(items);
  } else {
    const items = sessionStorage.setItem("User", JSON.stringify(items1));
    var parsed = JSON.parse(items1);
  }

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (open) => (event) => {
    // if (
    //   event &&
    //   event.type === "keydown" &&
    //   (event.key === "Tab" || event.key === "Shift")
    // ) {
    //   return;
    // }

    setState({ ...state, ["right"]: open });
  };
  const UpdateSeat = () => {
    //  setErorrMessage("");
    let base64 = require("base-64"); // install it before use from npm i base-64
    var userObj = {
      id: id1,
      userName: userName1,
      password: password1,
      name: name1,
      servingFee: servingFee1,
      scoringFee: scoringFee1,
      partnerFee: partnerFee1,
      ctvCpm: ctvCpm1,
      inappCpm: inappCpm1,
      pixalateFee: pixalateFee1,
      color: color1,
    };
    const article = { title: "React PUT Request Example" };
    // const headers = {
    //   Authorization: "Basic " + base64.encode(name1 + ":" + password1),
    // };
    axios
      .put(
        `${MyUrl}/api/SeatManagment/updateSeat`,
        userObj,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
        // {
        //   headers,
        // }
      )
      // .then(response => setUpdatedAt(response.data.updatedAt));
      .then((response) => {
        // setStatus(response.status);
        // callIt();
        // handleClose1();
        // handleClick();
        // setIsTrue(!isTrue);
        //CallData1();
      })
      .catch((error) => {
        // setErorrMessage(error.response.data.errorMessage);
      });
  };
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 400 }}
      role="presentation"
      //  onClick={toggleDrawer(false)}
      //    onKeyDown={toggleDrawer(false)}
    >
      <div
        style={{
          //justifyContent: "flex-end",
          display: "flex",
          //  paddingRight: 10,
          paddingLeft: 10,
        }}
      >
        <img
          style={{ cursor: "pointer" }}
          src={Close}
          width={50}
          onClick={toggleDrawer(false)}
        ></img>
      </div>
      <Divider />
      <ListItemButton>
        <ListItemIcon>
          <TextField
            id="outlined-basic"
            label="User name"
            variant="outlined"
            type="text"
            value={userName1}
            onChange={(e) => setuserName1(e.target.value)}
          />
        </ListItemIcon>
        <ListItemText />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="text"
            value={password1}
            onChange={(e) => setpassword1(e.target.value)}
          />
        </ListItemIcon>
        <ListItemText />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            type="text"
            value={name1}
            onChange={(e) => setname1(e.target.value)}
          />
        </ListItemIcon>
        <ListItemText />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <TextField
            id="outlined-basic"
            label="Serving Fee"
            variant="outlined"
            type="text"
            value={servingFee1}
            onChange={(e) => setservingFee1(e.target.value)}
          />
        </ListItemIcon>
        <ListItemText />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <TextField
            id="outlined-basic"
            label="Scoring Fee"
            variant="outlined"
            type="text"
            value={scoringFee1}
            onChange={(e) => setscoringFee1(e.target.value)}
          />
        </ListItemIcon>
        <ListItemText />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <TextField
            id="outlined-basic"
            label="Partner Fee"
            variant="outlined"
            type="text"
            value={partnerFee1}
            onChange={(e) => setpartnerFee1(e.target.value)}
          />
        </ListItemIcon>
        <ListItemText />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <TextField
            id="outlined-basic"
            label="CTV CPM"
            variant="outlined"
            type="text"
            value={ctvCpm1}
            onChange={(e) => setctvCpm1(e.target.value)}
          />
        </ListItemIcon>
        <ListItemText />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <TextField
            id="outlined-basic"
            label="In App CPM"
            variant="outlined"
            type="text"
            value={inappCpm1}
            onChange={(e) => setinappCpm1(e.target.value)}
          />
        </ListItemIcon>
        <ListItemText />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <TextField
            id="outlined-basic"
            label="Color"
            variant="outlined"
            type="text"
            value={color1}
            onChange={(e) => setcolor1(e.target.value)}
          />
        </ListItemIcon>
        <ListItemText />
      </ListItemButton>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 10,
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            toggleIsTrue(false);
            toggleDrawer(false);
            UpdateSeat();
          }}
          style={{ height: 45, width: "30%", background: "black" }}
        >
          Done
        </Button>
      </div>
    </Box>
  );

  return (
    <>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            style={{ textTransform: "none" }}
            onClick={toggleDrawer(anchor, true)}
          >
            Edit
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </>
  );
}
