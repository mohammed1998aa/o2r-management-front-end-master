import React from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect, Dimensions, useCallback } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { MyUrl, LinkToBI, GoToBI } from "../../App";
import { Redirect, CallUrlsApi } from "../../App";
import queryString from "query-string";

var aa = 0;
var jwtToken = "";
export default function DashboardBody({ data2, name1, password1 }) {
  const items1 = localStorage.getItem("User");
  const [CheckTypeOfUser, setCheckTypeOfUser] = React.useState("");

  const ChckRefreshFunc = () => {
    var item2 = "";
    if (items1 === null) {
      const items = sessionStorage.getItem("User");
      item2 = items;
    } else {
      const items = localStorage.getItem("User");
      item2 = items;
    }
    var parsed = JSON.parse(item2);
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
            // Store the updated object back in sessionStorage
            const updatedObjString = JSON.stringify(parsed);
            if (items1 === null) {
              sessionStorage.setItem("User", updatedObjString);
            } else {
              localStorage.setItem("User", updatedObjString);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {}
    } else {
    }
  };
  useEffect(() => {
    ChckRefreshFunc();
  }, []);

  const { pathname } = useLocation();
  let [thecolor, setthecolor] = useState();
  const [thebutton, setthebutton] = useState("");

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
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(window.location.href);
  }, [pathname]);
  return (
    <div>
      <div
        style={{
          flex: 1,
          paddingTop: "8%",
          paddingRight: width > 766 ? "20%" : "",
          paddingLeft: width > 766 ? "20%" : "",
          // backgroundColor: "blue",
        }}
      >
        <h5 style={{ fontSize: width > 766 ? "" : 10 }}>
          Good Morning, {name1}
        </h5>
        <h1 style={{ fontSize: width > 766 ? "" : 20 }}>Select Services</h1>
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
                onMouseEnter={() => {
                  aa = responseData.id;
                  setthebutton(responseData.id);
                  setthecolor("green");
                  //  console.log(thebutton);
                }}
                onMouseLeave={() => {
                  aa = 0;
                  setthecolor("black");
                }}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  flex: width > 481 ? "0 1 25%" : "0 1 45%",
                  //  border: responseData.id === aa ? `1px solid black` : "",
                }}
              >
                {responseData.imageUrl !== "" ? (
                  <div
                    onClick={(e) => {
                      ChckRefreshFunc();
                      //PostCheckUser();
                      //   let base64 = require("base-64"); // install it before use from npm i base-64
                      try {
                        // const items = sessionStorage.getItem("User");
                        // var parsed = JSON.parse(items);
                        // setCheckTypeOfUser(parsed.role);
                        // jwtToken = parsed.token;
                        // console.log(items);
                        // var parsed = JSON.parse(items);
                        // console.log(parsed);

                        // console.log("its ok ");
                        // const token = btoa(name1 + ":" + password1) || null; // encode the token with btoa or set to null
                        // console.log(token);
                        // axios
                        //   .post(
                        //     `${LinkToBI}/api/Account/login
                        //   `,
                        //     {},
                        //     {
                        //       headers: {
                        //         Authorization:
                        //           "Basic " +
                        //           base64.encode(name1 + ":" + password1),
                        //       },
                        //     }
                        //   )
                        //   .then((response) => {
                        //     console.log(response.status);
                        //     //  if (response.status === 200) {
                        //     console.log(response);
                        //     // window.open(
                        //     //   `http://${LinkToBI}?Authorization=Basic ${token}`,
                        //     //   "_blank"
                        //     // );
                        //     // const myObject = { name: "John", age: 30 };

                        //     const myObject = {
                        //       name: response.data.responseData.userName,
                        //       password: response.data.responseData.password,
                        //       role: response.data.responseData.role,
                        //       email: response.data.responseData.email,
                        //       id: response.data.responseData.id,
                        //     };
                        //   })
                        //   .catch((error) => {
                        //     console.log("error111");
                        //     console.log(error.message);

                        //     if (
                        //       error.message ===
                        //       "Request failed with status code 400"
                        //     ) {
                        //       console.log("Wrong");
                        //     } else {
                        //       console.log("Its Ok");
                        //     }
                        //   });
                        //      const encodedObject = btoa(JSON.stringify(myObject));

                        // const url = `${
                        //   responseData.url
                        // }?Authorization=Basic ${token}&myObject=${encodeURIComponent(
                        //   encodedObject
                        // )}`;

                        //For Global use
                        // const url = `https://newbi.o2rintelligence.com/?Authorization=Basic ${token}&myObject=${encodeURIComponent(
                        //   encodedObject
                        // )}`;
                        //For Local use
                        // const url = `http://localhost:3001/?Authorization=Basic ${token}&myObject=${encodeURIComponent(
                        //   encodedObject
                        // )}`;

                        //for shrat
                        // const url = `https://newbi.o2rintelligence.com/?Authorization=Bearer ${jwtToken}`;
                        // window.open(url, "_blank");
                        //for local
                        console.log("he click me!");
                        const url = `${GoToBI}/?Authorization=Bearer ${jwtToken}`;
                        window.open(url, "_blank");
                      } catch (error) {}
                    }}
                    style={{
                      margin: 5,
                      background: width < 768 ? "#f9f8f9" : "",
                      borderRadius: 20,
                      border:
                        responseData.id === aa
                          ? `1px solid #737373`
                          : "1px solid rgba(0, 0, 0, 0.0000005)",

                      //linear-gradient(to right,#d8ccf4, #ffff)"
                      cursor: "pointer",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <img
                      src={require(`../../Images/${responseData.imageUrl}.png`)}
                      height="20%"
                      width="30%"
                      class="rounded"
                      alt="..."
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
              <div style={{ paddingTop: width > 1500 ? "15%" : "8%" }}></div>
            </>
          )}
        </div>
      </div>
      <div
        style={{
          flex: 1,
          paddingRight: "30%",
          backgroundColor: "red",
          height: "25%",
        }}
      ></div>
    </div>
  );
}
