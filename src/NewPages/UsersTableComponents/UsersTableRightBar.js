import * as React from "react";
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
import UsersTableAccountPassword from "./UsersTableAccountPassword";
import UsersTableAccountSetting from "./UsersTableAccountSetting";
import UsersTableUserServices from "./UsersTableUserServices";
import Close from "./../../Images/Close.png";
import freelancer from "./../../Images/freelancer.png";
import ProfilePicture1 from "./../../Images/ProfilePicture1.png";
import { withRouter, useHistory, useLocation } from "react-router-dom";

import { MyContext } from "./UsersTableTable";
import { MyContext2 } from "./UsersTableTable";

import { useState, useEffect } from "react";
export default function UsersTableRightBar({
  id,
  name,
  email,
  password,
  status,
  role,
  name1,
  password1,
}) {
  const [ChooseEdit, setChooseEdit] = useState(0);
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
  const [data, setData] = useState(true);

  useEffect(() => {
    toggleDrawer(data);
    console.log("Button clicked, count: ", data);
  }, [data]);
  const handleData = (data) => {
    setState({ ...state, ["right"]: false });
    // toggleDrawer("right", data);
    console.log(data);
    setData(data);
  };
  const [Show, setShow] = useState(false);
  const handleCountChange = (newCount) => {
    setShow(newCount);
  };
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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

  const list = (anchor) => (
    <Box
      sx={{
        minWidth: width > 500 ? 500 : 320,
        width: anchor === "top" || anchor === "bottom" ? "auto" : "auto",
      }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      //   onKeyDown={toggleDrawer(anchor, false)}
    >
      <div
        style={{
          padding: 20,
          justifyContent: "space-between",
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
        }}
      >
        <h4 style={{ fontweight: "bold" }}>Edit User</h4>

        <img
          style={{ cursor: "pointer" }}
          src={Close}
          width={30}
          onClick={toggleDrawer(false)}
        ></img>
      </div>
      <Divider style={{ opacity: 1 }} />
      <div
        style={{
          flex: 1,
          padding: 20,
          background: "#e0f2fe",
          margin: 20,
          borderRadius: 80,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <img src={ProfilePicture1} width="15%"></img>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h4 style={{ color: "#20134b", fontSize: 24 }}>{name}</h4>
          <h5 style={{ color: "#5746af", fontSize: 16 }}>{email}</h5>
        </div>
      </div>
      <div
        style={
          {
            // flex: 1,
            // display: "flex",
            // flexDirection: "row",
            // justifyContent: "space-evenly",
            // margin: 10,
          }
        }
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            margin: 10,
          }}
        >
          <a
            style={{
              paddingRight: 10,
              fontSize: 15,
              fontWeight: ChooseEdit === 0 ? "bold" : "",
            }}
            onClick={() => {
              setChooseEdit(0);
            }}
          >
            Account Settings
            <div
              style={{
                border: ChooseEdit === 0 ? "1px solid rgba(0, 0, 0, 5)" : "",
              }}
            ></div>
            <Divider style={{ opacity: 1 }} />
          </a>

          <a
            onClick={() => {
              setChooseEdit(1);
            }}
            style={{
              paddingRight: 10,
              fontSize: 15,
              fontWeight: ChooseEdit === 1 ? "bold" : "",
            }}
          >
            Account Password
            <div
              style={{
                border: ChooseEdit === 1 ? "1px solid rgba(0, 0, 0, 5)" : "",
              }}
            ></div>
            <Divider style={{ opacity: 1 }} />
          </a>
          <a
            onClick={() => {
              setChooseEdit(2);
            }}
            style={{ fontSize: 15, fontWeight: ChooseEdit === 2 ? "bold" : "" }}
          >
            User Services
            <div
              style={{
                border: ChooseEdit === 2 ? "1px solid rgba(0, 0, 0, 5)" : "",
              }}
            ></div>
            <Divider style={{ opacity: 1 }} />
          </a>
        </div>
      </div>

      <div>
        {ChooseEdit === 0 ? (
          <>
            <MyContext.Consumer>
              {({ dataP, setDataP }) => (
                <UsersTableAccountSetting
                  id={id}
                  name={name}
                  email={email}
                  status={status}
                  role={role}
                  name1={name1}
                  password1={password1}
                  sendData={handleData}
                  handleCountChange={handleCountChange}
                  dataP={dataP}
                  setDataP={setDataP}
                />
              )}
            </MyContext.Consumer>

            {/* {data ? <h1>yes</h1> : <h1>no</h1>} */}
          </>
        ) : ChooseEdit === 1 ? (
          <>
            <MyContext2.Consumer>
              {({ dataP2, setDataP2 }) => (
                <UsersTableAccountPassword
                  id={id}
                  name={name}
                  email={email}
                  status={status}
                  role={role}
                  name1={name1}
                  password={password}
                  password1={password1}
                  dataP2={dataP2}
                  setDataP2={setDataP2}
                  sendData={handleData}
                />
              )}
            </MyContext2.Consumer>
            {/* {data ? <h1>yes</h1> : <h1>no</h1>} */}
          </>
        ) : ChooseEdit === 2 ? (
          <UsersTableUserServices
            id={id}
            name={name}
            email={email}
            status={status}
            role={role}
            name1={name1}
            password={password}
            password1={password1}
          />
        ) : (
          ""
        )}
      </div>
    </Box>
  );

  return (
    <div>
      <Button
        style={{ textTransform: "none" }}
        onClick={toggleDrawer("right", true)}
      >
        Edit
      </Button>
      <React.Fragment>
        <SwipeableDrawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          onOpen={toggleDrawer("right", true)}
        >
          {list("right")}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}

// export default function ForCheck() {
//   const [Show, setShow] = useState(false);

//   const handleCountChange = (newCount) => {
//     setShow(newCount);
//   };

//   return (
//     <div>
//       <ForCheck1 handleCountChange={handleCountChange} />
//       {Show ? <h1>yes</h1> : <h1>no</h1>}
//     </div>
//   );
// }
