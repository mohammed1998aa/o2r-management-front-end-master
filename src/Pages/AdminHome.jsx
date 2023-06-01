import React from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect, Dimensions } from "react";
import o2runbox from "../Images/o2runbox.png";
import ss from "../Images/ss.png";
import Button from "@mui/material/Button";
import system from "../Images/system.png";

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
  const GoToforcheck = async () => {
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
    >      <img
    style={{
      position: "absolute",
      top: 60,
      right: 0,
      maxWidth:
        width > 1200
          ? "40%"
          : width > 767
          ? "45%"
          : width > 481
          ? "45%"
          : "80%",
      //         maxHeight: "auto",
      // height: "auto",
    }}
    src={ss}
    class="rounded float-start"
    alt="image"
  ></img>

              <nav class="navbar" style={{ background: "#c084fc" }}>
          <a class="navbar-brand" style={{ marginLeft: 10 }}>
            {/* <img
              style={{
                width: width > 1500 ? "30" : "30",
                //              width: width > 1500 ? width / 20 : width / 12,

                //  width: width / 10,
                height: height / 20,
              }}
              src={logoHomeOnlyO}
              //class="rounded "
              alt="image"
            ></img> */}
          </a>

          <div style={{ marginRight: 10 }}>
            <button
              type="button"
              class="btn btn-outline-primary"
              onClick={() => {
                LogOut();
              }}
            >
              Log Out{" "}
            </button>
            <img
              style={{
                marginRight: 10,
                marginLeft: 10,
                width: width > 1500 ? "30" : "30",
                //              width: width > 1500 ? width / 20 : width / 12,

                //  width: width / 10,
                height: height / 16,
              }}
              src={system}
              //class="rounded "
              alt="image"
            ></img>
          </div>
        </nav>

      <div className="position-absolute top-50 start-50 translate-middle">

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
            GoToforcheck();
          }}
          variant="contained"
        >
          Go to Forcheck
        </Button> */}
                <div
          style={{
            margin: 10,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
                  <br></br>

          {/* <Button
            variant="contained"
            onClick={() => {
              LogOut();
            }}
          >
            logout
          </Button> */}
        </div>
      </div>

        <img
          style={{
            position: "absolute", bottom: 0, left: 0,
            display: "block",
            maxWidth:
              width > 1201
                ? "8%"
                : width > 1025
                ? "10%"
                : width > 769
                ? "12%"
                : width > 481
                ? "15%"
                : width > 320
                ? "25%"
                : "25%",
            // maxHeight: "auto",
            marginLeft: 10,
            marginBottom: 10,
          }}
          src={o2runbox}
          class="rounded float-start"
          alt="image"
        ></img>
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
