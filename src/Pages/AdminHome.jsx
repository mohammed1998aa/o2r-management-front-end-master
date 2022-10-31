import React from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect, Dimensions } from "react";
import o2runbox from "../Images/o2runbox.png";
import ss from "../Images/ss.png";
import Button from "@mui/material/Button";

function AdminHome(props) {
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
  const name1 = props.location.state.userObj2Send.name;
  const password1 = props.location.state.userObj2Send.password;
  let history = useHistory();

  const GoToUsersPanel = async () => {
    var userObj = {
      name: name1,
      password: password1,
    };
    history.push("/UsersPanel", { userObj2Send: userObj });
  };

  const GoToForCheck = async () => {
    var userObj = {
      name: name1,
      password: password1,
    };
    history.push("/ForCheck", { userObj2Send: userObj });
  };
  const LogOut = () => {
    localStorage.removeItem("User");
    console.log("User deleted");
    history.push("/LogInPage");
  };

  return (
    <div
      style={{
        background: "linear-gradient(#d8ccf4, #9198e5)",
        backgroundSize: "cover",
        width: "auto",
        height: "100vh",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="position-absolute top-0 end-0">
        <img
          style={{
            width: "auto",
            height: height / 3,
            // width: windowWidth / 1,
            // height: windowHeight / 3,
          }}
          src={ss}
          // class="rounded float-start"
          alt="image"
        ></img>
      </div>

      <div className="position-absolute top-50 start-50 translate-middle">
        <div
          style={{
            margin: 10,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <button
            onClick={() => {
              LogOut();
            }}
          >
            logout
          </button>
        </div>
        <br></br>
        <Button
          onClick={() => {
            GoToUsersPanel();
          }}
          variant="contained"
        >
          Go to Clients list
        </Button>

        {/* <Button
          onClick={() => {
            GoToForCheck();
          }}
          variant="contained"
        >
          Go to GoToForCheck
        </Button> */}
      </div>

      <div className="position-absolute bottom-0 start-0">
        <img
          style={{
            //  width: width / 5,
            width:
              width > 1400
                ? width / 12
                : width > 1000
                ? width / 10
                : width > 500
                ? width / 8
                : width / 6,

            height: "auto",
            marginLeft: 10,
            marginBottom: 10,
          }}
          src={o2runbox}
          class="rounded float-start"
          alt="image"
        ></img>
      </div>
    </div>
  );
  let styles = {
    CardsTitle: {
      color: "#9333ea",
      fontSize: 20,
      textAlign: "center",
    },
    CardsImage: {
      height: "auto",
      marginLeft: 10,
      marginBottom: 10,
    },
  };
}
export default withRouter(AdminHome);
