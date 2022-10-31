import React from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import "../PagesCSS/LogInPage.css";
import "antd/dist/antd.css";
import o2runbox from "../Images/o2runbox.png";
import ss from "../Images/ss.png";
import Business from "../Images/Business.png";
import automatic from "../Images/automatic.png";
import accounting from "../Images/accounting.png";
import analysis from "../Images/analysis.png";
import logoHome from "../Images/logoHome.png";
import logoHomeOnlyO from "../Images/logoHomeOnlyO.png";
import system from "../Images/system.png";

import { useState, useEffect, Dimensions } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.css";
import { Button, Input } from "antd";

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
    // console.log(userObj.name);
    history.push("/UsersPanel", { userObj2Send: userObj });
  };
  const [isShown1, setIsShown1] = useState(false);
  const [isShown2, setIsShown2] = useState(false);
  const [isShown3, setIsShown3] = useState(false);
  const [isShown4, setIsShown4] = useState(false);
  const [data2, setData2] = useState("");

  // useEffect(() => {
  //   getUrl();
  // }, []);
  // const getUrl = () => {
  //   var userObj = {
  //     userName: "max",
  //     password: "1234",
  //   };
  //   var BasicAuth = "Basic " + window.btoa("jhon" + ":" + "1234");
  //   let base64 = require("base-64"); // install it before use from npm i base-64
  //   try {
  //     axios
  //       .get(
  //         `https://localhost:7006/api/Account/myUrls
  //         `,
  //         {
  //           headers: {
  //             Authorization: "Basic " + base64.encode("jhon" + ":" + "1234"),
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         const data2 = res.data;
  //         setData2(data2);
  //         //   console.log(data1.responseData);
  //         // if(data1.responseData.isActive===true)
  //         // {
  //         //   data1.responseData.isActive===""
  //         // }
  //         // else
  //         // {
  //         //   data1.responseData.isActive==="2"

  //         // }
  //         //     console.log("BasicAuth" + BasicAuth);
  //       })
  //       .catch((error) => {});
  //   } catch (error) {}
  // };
  return (
    <div>
      <div
        style={{
          background: "linear-gradient(#d8ccf4, #9198e5)",
          backgroundSize: "cover",
          width: "auto",
          height: "100vh",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div class="position-absolute top-0 end-0">
          <img
            style={{
              width: "auto",
              height: height / 3,
              // width: windowWidth / 1,
              // height: windowHeight / 3,
            }}
            src={ss}
            class="rounded float-start"
            alt="image"
          ></img>
        </div>
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

        {/* <div
        style={{
          //  background: "white",
          //  width: windowWidth / 2,
          //    height: windowHeight / 2,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          marginTop: 80,
        }}
        class="shadow p-3 mb-5 bg-body rounded-5 position-absolute top-50 start-50 translate-middle"
      >
        <h1 style={{ color: "#ef4444" }}>Oops</h1>

        <h1 style={{ color: "#ef4444" }}>404</h1>
      </div> */}
        <div
          style={{
            //  background: "white",
            //  width: windowWidth / 2,
            //    height: windowHeight / 2,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            marginTop: 80,
          }}
          class="position-absolute top-50 start-50 translate-middle"
        >
          {/* <h1
            style={{
              textAlign: "center",
              color: "#a855f7",
              fontSize: 90,
              fontWeight: "bold",
            }}
          >
            Oops !
          </h1> */}
          <div>
            {data2 &&
              data2.responseData.map((responseData) => (
                <button
                  class="button1"
                  key={responseData.name}
                  onClick={() => {}}
                >
                  {responseData.name}
                </button>
              ))}
          </div>
          <h1
            style={{
              textAlign: "center",
              color: "#9333ea",
              fontSize: 30,
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
              //    fontWeight: "bold",
              textAlign: "center",
            }}
          >
            What service would you like to use ?
          </h1>
          <div
            class="shadow rounded-4"
            style={{
              justifyContent: "center",
              alignItems: "center",
              margin: 5,
              display: "flex",
            }}
          >
            <div
              // onClick={() => {
              //   GoToErorrPage();
              // }}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "http://google.com";
              }}
              onMouseEnter={() => setIsShown1(true)}
              onMouseLeave={() => setIsShown1(false)}
              class="shadow rounded-4"
              style={{
                cursor: "pointer",

                background: isShown1 ? "#e9d5ff" : "#f3e8ff",
                width: "auto",
                height:
                  height > 1400
                    ? height / 7
                    : height > 1000
                    ? height / 5
                    : height > 500
                    ? height / 3
                    : height / 2,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                margin: 8,
              }}
            >
              <img
                //   style={{ width: "75%", height: height / 10 }}
                src={Business}
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
                Business
                <br></br>
                Intelligence
              </h4>
            </div>

            <div
              onMouseEnter={() => setIsShown2(true)}
              onMouseLeave={() => setIsShown2(false)}
              class="shadow rounded-4"
              style={{
                cursor: "pointer",

                background: isShown2 ? "#e9d5ff" : "#f3e8ff",
                width: "auto",
                height:
                  height > 1400
                    ? height / 7
                    : height > 1000
                    ? height / 5
                    : height > 500
                    ? height / 3
                    : height / 2,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                margin: 8,
              }}
            >
              <img
                //   style={{ width: "75%", height: height / 10 }}
                src={automatic}
                height="30%"
                width="50%"
                class="rounded-circle"
                alt="..."
                style={{ margin: 25 }}
              ></img>
              <h4
                style={{
                  color: "#9333ea",
                  fontSize: "100%",
                  //    fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Automatic <br></br> Optimization
              </h4>
            </div>

            <div
              onMouseEnter={() => setIsShown3(true)}
              onMouseLeave={() => setIsShown3(false)}
              class="shadow rounded-4"
              style={{
                cursor: "pointer",

                background: isShown3 ? "#e9d5ff" : "#f3e8ff",
                width: width > 1500 ? width / 7 : width / 5,
                height: height / 3,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                margin: 8,
              }}
            >
              <img
                //   style={{ width: "75%", height: height / 10 }}
                src={accounting}
                height="90"
                width="90"
                class="rounded"
                alt="..."
                style={{ margin: 25 }}
              ></img>
              <h4
                style={{
                  color: "#9333ea",
                  fontSize: 20,
                  //    fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Bundle
              </h4>
              <h4
                style={{
                  color: "#9333ea",
                  fontSize: 20,
                  //    fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Management
              </h4>
            </div>

            <div
              onMouseEnter={() => setIsShown4(true)}
              onMouseLeave={() => setIsShown4(false)}
              style={{
                cursor: "pointer",
                background: isShown4 ? "#e9d5ff" : "#f3e8ff",
                width: width > 1500 ? width / 7 : width / 5,
                height: height / 3,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                margin: 8,
              }}
              onClick={() => {
                console.log("hi");
              }}
              class="shadow rounded-4"
            >
              <img
                //   style={{ width: "75%", height: height / 10 }}
                src={analysis}
                height="90"
                width="90"
                class="rounded"
                alt="..."
                style={{ margin: 25 }}
              ></img>
              <h4
                style={{
                  color: "#9333ea",
                  fontSize: 20,
                  //    fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Analytics
              </h4>
              <h4
                style={{
                  color: "#9333ea",
                  fontSize: 20,
                  //    fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Platform
              </h4>
            </div>
          </div>

          <br></br>
        </div>
        <div class="position-absolute bottom-0 start-0">
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
    </div>
  );
}
export default withRouter(Home);
