import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

import { MyUrl } from "../../App";
var MyArray = [];
var Obj = {};
var compName = "";
var jwtToken = "";
function BIGlobal({ PageId, name1, password1 }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [CompColor, setCompColor] = useState(0);
  const [componentId, setComponentId] = useState("");

  const [componentName, setComponentName] = useState("");
  const [impressions, setImpressions] = useState("");
  const [fillRate, setFillRate] = useState("");
  const [qualityScore, setQualityScore] = useState("");

  const handleChange = (event) => {
    setComponentName(event.target.value);
  };
  const items1 = localStorage.getItem("User");
  const [CheckTypeOfUser, setCheckTypeOfUser] = React.useState("");
  const ChckRefreshFunc = async () => {
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
            GetData(response.data.accessToken);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {}
    } else {
      GetData(jwtToken);
    }
  };
  useEffect(() => {
    ChckRefreshFunc();
  }, []);
  const GetData = (jwtToken) => {
    let base64 = require("base-64"); // install it before use from npm i base-64

    setIsLoading(true);
    MyArray.length = 0;
    Obj = {};
    try {
      axios
        .get(
          `${MyUrl}/api/BIManagment/getPageComponents?pageId=${PageId}
                          `,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )
        .then((res) => {
          const data2 = res.data;
          setData(data2);
          console.log(data2);
          if (CompColor === 0) {
            console.log("compName");
            console.log(data2.responseData[0].component.name);
            compName = data2.responseData[0].component.name;
            console.log(compName);
          }
        })
        .catch((error) => {})
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {}
  };

  const UpdateComponent = async () => {
    await ChckRefreshFunc();
    console.log("UpdateComponent");
    let base64 = require("base-64"); // install it before use from npm i base-64
    //var userObj = nonEmptyObject;
    const article = { title: "React PUT Request Example" };
    axios
      .put(
        `${MyUrl}/api/BIManagment/updatePageComponentParams?pageId=${PageId}&componentId=${componentId}`,
        {
          impression: impressions,
          fillRate: fillRate,
          qScore: qualityScore,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        GetData();
      })
      .catch((error) => {
        // setErorrMessage(error.response.data.errorMessage);
      });
  };
  return (
    <div style={{ flex: 1, width: "100%", paddingLeft: "2.5%" }}>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <>
          {" "}
          <div
            style={{
              display: "flex",
            }}
          >
            {Array.isArray(data.responseData) ? (
              data &&
              data.responseData.map((responseData, i) => (
                <div
                  style={{
                    background: "#f4f2f4",
                    borderTopLeftRadius: i === 0 ? 50 : 0,
                    borderBottomLeftRadius: i === 0 ? 50 : 0,
                    borderTopRightRadius:
                      i === data.responseData.length - 1 ? 50 : 0,
                    borderBottomRightRadius:
                      i === data.responseData.length - 1 ? 50 : 0,
                    height: 40,
                    alignItems: "center",
                    paddingLeft: i === 0 ? 3 : 0,
                    paddingRight: i === data.responseData.length - 1 ? 3 : 0,
                    //justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <button
                    //value={responseData.component.id}
                    style={{
                      borderWidth: 0,
                      borderRadius: 50,
                      background: CompColor === i ? "white" : "#f4f2f4",
                      height: 35,
                      fontWeight: CompColor === i ? "bold" : "",
                      fontSize: 14,
                    }}
                    onClick={() => {
                      setCompColor(i);
                      compName = responseData.component.name;
                      // setComponentName(responseData.component.name);
                      console.log(responseData.component.name);
                      setComponentId(responseData.component.id);
                    }}
                  >
                    {responseData.component.name}
                  </button>
                  {i !== data.responseData.length - 1 ? (
                    <div
                      style={{
                        width: 1,
                        height: 16,
                        flexGrow: 0,
                        background: "#c8c7cb",
                      }}
                    ></div>
                  ) : (
                    <></>
                  )}
                </div>
              ))
            ) : (
              <h6> You dont have components</h6>
            )}
          </div>
          <div
            style={{
              paddingTop: "2%",
              paddingBottom: "2%",
            }}
          >
            <h5 style={{}}>{compName}</h5>
          </div>
        </>
      )}
      <h5 style={{ fontSize: 14 }}>Impressions</h5>

      <TextField
        id="outlined-basic"
        label="Impressions"
        //  variant="outlined"
        style={{ width: "40%", paddingBottom: "2%" }}
        onChange={(event) => {
          setImpressions(event.target.value);
          console.log(event.target.value);
        }}
      />
      <h5 style={{ fontSize: 14 }}>fillRate</h5>

      <TextField
        style={{ width: "40%", paddingBottom: "2%" }}
        id="outlined-basic"
        label="fillRate"
        variant="outlined"
        onChange={(event) => {
          setFillRate(event.target.value);
          console.log(event.target.value);
        }}
      />
      <h5 style={{ fontSize: 14 }}>qualityScore</h5>

      <TextField
        style={{ width: "40%", paddingBottom: "1%" }}
        id="outlined-basic"
        label="qualityScore"
        variant="outlined"
        onChange={(event) => {
          setQualityScore(event.target.value);
          console.log(event.target.value);
        }}
      />
      <div>
        <br></br>
        <Button
          style={{
            textTransform: "none",
            background: "black",
            borderRadius: 10,
            width: "15%",
          }}
          variant="contained"
          onClick={() => {
            UpdateComponent();
          }}
        >
          Update
        </Button>
      </div>
    </div>
  );
}
export default withRouter(BIGlobal);
