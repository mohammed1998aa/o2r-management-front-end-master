import React from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import "../PagesCSS/LogInPage.css";
import "antd/dist/antd.css";
import o2runbox from "../Images/o2runbox.png";
import system from "../Images/system.png";
import { useState, useEffect, Dimensions } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.css";

function Home(props) {
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
  let history = useHistory();

  const LogOut = () => {
    localStorage.removeItem("User");
    console.log("User deleted");
    history.push("/LogInPage");
  };
  const GoToErorrPage = () => {
    history.push("/ErorrPage");
  };
  const name1 = props.location.state.userObj2Send.name;
  const password1 = props.location.state.userObj2Send.password;
  const GoToUsersPanel = async (props) => {
    var userObj = {
      name: name1,
      password: password1,
    };
    history.push("/UsersPanel", { userObj2Send: userObj });
  };
  const [isShown1, setIsShown1] = useState(false);
  const [data2, setData2] = useState("");

  useEffect(() => {
    getUrl();
  }, []);
  const getUrl = () => {
    let base64 = require("base-64"); // install it before use from npm i base-64
    try {
      axios
        .get(
          `https://localhost:7006/api/Account/myUrls
          `,
          {
            headers: {
              Authorization: "Basic " + base64.encode(name1 + ":" + password1),
            },
          }
        )
        .then((res) => {
          const data2 = res.data;
          setData2(data2);
        })
        .catch((error) => {});
    } catch (error) {}
  };
  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "100vh",
          background: "linear-gradient(#d8ccf4, #9198e5)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          display: "flex",
        }}
      >
        <nav class="navbar" style={{ background: "#c084fc" }}>
          <a class="navbar-brand" style={{ marginLeft: 10 }}></a>

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
                height: height / 16,
              }}
              src={system}
              alt="image"
            ></img>
          </div>
        </nav>

        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            marginTop: height > 1200 ? 160 : 80,
          }}
        >
          <h1
            style={{
              textAlign: "center",
              color: "#9333ea",
              fontSize: 25,
              fontWeight: "bold",
            }}
          >
            Hi {name1} !{/* {props.location.state.userObj2Send.password}! */}
          </h1>
          <h1></h1>
          <h1
            style={{
              color: "#9333ea",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            What service would you like to use ?
          </h1>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {Array.isArray(data2.responseData) ? (
              data2 &&
              data2.responseData.map((responseData) => (
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    flex: width > 481 ? "0 1 33%" : "0 1 45%",
                  }}
                >
                  <br></br>
                  {responseData.imageUrl !== "" ? (
                    <>
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = `http://${responseData.url}`;
                        }}
                        class="shadow rounded-4"
                        style={{
                          cursor: "pointer",
                          background: isShown1 ? "#e9d5ff" : "#f3e8ff",
                          width:
                            width > 1400
                              ? width / 6
                              : width > 1000
                              ? width / 5
                              : width > 500
                              ? width / 4
                              : width / 3,
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                          flexDirection: "column",
                          margin: 8,
                        }}
                      >
                        <img
                          src={require(`../Images/${responseData.imageUrl}.png`)}
                          height="30%"
                          width="50%"
                          class="rounded"
                          alt="..."
                          style={{ margin: 25 }}
                        ></img>
                        <h4
                          style={{
                            color: "#9333ea",
                            fontSize: "100%",
                            textAlign: "center",
                          }}
                        >
                          {responseData.name}
                        </h4>
                      </div>
                    </>
                  ) : (
                    <>
                      {" "}
                      <Button variant="contained"> {responseData.url}</Button>
                    </>
                  )}

                  <br></br>
                </div>
              ))
            ) : (
              <>
                <h5>You dont have any website!</h5>
              </>
            )}
          </div>
          <br></br>
        </div>
        <img
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            position: "absolute",
            bottom: 0,
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
          }}
          src={o2runbox}
          class="rounded float-start"
          alt="image"
        ></img>
      </div>
    </div>
  );
}
export default withRouter(Home);
