import React, { useEffect, useState, useCallback, CSSProperties } from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import UnboxtheBlackbox from "../UnboxtheBlackbox.json";
import DashboardHeader from "./DashboardComponents/DashboardHeader";
import DashboardBody from "./DashboardComponents/DashboardBody";
import { MyUrl } from "../App";
import axios from "axios";
import DashboardBody2 from "./DashboardComponents/DashboardBody2";
import { width } from "@mui/system";
var jwtToken = "";
function AdminDashboard(props) {
  const name1 = props.location.state.userObj2Send.name;
  const password1 = props.location.state.userObj2Send.password;
  const email1 = props.location.state.userObj2Send.email;
  const [CheckTypeOfUser, setCheckTypeOfUser] = React.useState("");
  const items1 = localStorage.getItem("User");
  const [Data, setData] = useState([]);
  const [data2, setData2] = useState("");

  const [IsLoading, setIsLoading] = useState(false);

  const ChckRefreshFunc = () => {
    function handleFocus() {
      console.log("Component is focused");
    }
    function handleBlur() {
      console.log("Component is unfocused");
    }
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
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
            console.log("Not Valid");
            console.log(parsed.token);
            getUrl(response.data.accessToken);
            GetLinkes(response.data.accessToken);
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
      console.log(jwtToken);
      getUrl(jwtToken);
      GetLinkes(jwtToken);
    }
    //   }
  };
  useEffect(() => {
    ChckRefreshFunc();
  }, []);

  const GetLinkes = async (jwtToken1) => {
    //  await ChckRefreshFunc();
    let base64 = require("base-64"); // install it before use from npm i base-64
    try {
      setIsLoading(false);
      axios
        .get(
          `${MyUrl}/api/Account/getQuickLinks
          `,
          {
            headers: {
              Authorization: `Bearer ${jwtToken1}`,
            },
          }
        )
        .then((res) => {
          const data = res.data;
          setData(data);
          setIsLoading(true);
        })
        .catch((error) => {});
    } catch (error) {}
  };
  let history = useHistory();
  const GoToUsersTbale = async () => {
    var userObj = {
      name: name1,
      password: password1,
    };
    history.push("/UsersTable", { userObj2Send: userObj });
  };

  const [Loading, setLoading] = useState(true);
  const [Loading1, setLoading1] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 1500);
  useEffect(() => {
    //getUrl();
  }, []);
  const getUrl = (jwtToken1) => {
    setLoading1(true);
    let base64 = require("base-64"); // install it before use from npm i base-64
    try {
      axios
        .get(
          `${MyUrl}/api/Account/myUrls
          `,
          {
            headers: {
              Authorization: `Bearer ${jwtToken1}`,
            },
          }
        )
        .then((res) => {
          const data2 = res.data;
          setData2(data2);
          setLoading1(false);
        })
        .catch((error) => {});
    } catch (error) {}
  };
  return (
    <div>
      <div
        style={{
          flex: 1,
          background: " linear-gradient(to bottom,#d8ccf4, #ffff,#ffff)",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 10,
        }}
      >
        {Loading ? (
          <>
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                paddingTop: "15%",
              }}
            >
              <Lottie
                style={{ height: 200, width: 200 }}
                animationData={UnboxtheBlackbox}
              />
              <h3>Unbox the blackbox</h3>
            </div>
          </>
        ) : (
          <>
            <DashboardHeader
              data2={data2}
              name1={name1}
              password1={password1}
              email1={email1}
            />
            {Loading1 ? (
              <>loading...</>
            ) : (
              <>
                <DashboardBody
                  data2={data2}
                  name1={name1}
                  password1={password1}
                />
              </>
            )}
            {IsLoading ? (
              <>
                {" "}
                <DashboardBody2
                  Data={Data}
                  name1={name1}
                  password1={password1}
                  email1={email1}
                />
              </>
            ) : (
              <>
                <h1>loading...</h1>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
export default withRouter(AdminDashboard);
