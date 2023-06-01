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
function BIDashboard({ PageId, name1, password1 }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const [componentName, setComponentName] = useState("");
  const [impressions, setImpressions] = useState("");
  const [fillRate, setFillRate] = useState("");
  const [qualityScore, setQualityScore] = useState("");

  const handleChange = (event) => {
    setComponentName(event.target.value);
  };
  useEffect(() => {
    GetData();
  }, []);
  const GetData = (a) => {
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
              Authorization: "Basic " + base64.encode(name1 + ":" + password1),
            },
          }
        )
        .then((res) => {
          const data2 = res.data;
          setData(data2);
          console.log(data2);
        })
        .catch((error) => {})
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {}
  };

  const UpdateComponent = () => {
    console.log("UpdateComponent");
    let base64 = require("base-64"); // install it before use from npm i base-64
    //var userObj = nonEmptyObject;
    const article = { title: "React PUT Request Example" };
    axios
      .put(
        `${MyUrl}/api/BIManagment/updatePageComponentParams?pageId=${PageId}&componentId=${componentName}`,
        {
          impression: impressions,
          fillRate: fillRate,
          qScore: qualityScore,
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
      <h5>whech component you want to update ?</h5>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label"></InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={componentName}
            //    label="componentName"
            onChange={handleChange}
          >
            {Array.isArray(data.responseData) ? (
              data &&
              data.responseData.map((responseData) => (
                <MenuItem value={responseData.component.id}>
                  {responseData.component.name}
                </MenuItem>
              ))
            ) : (
              <h6> You dont have urls! </h6>
            )}
            {/* <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}
          </Select>
        </FormControl>
      </Box>
      <h5>Impressions</h5>
      <TextField
        id="outlined-basic"
        //  label="Outlined"
        variant="outlined"
        onChange={(event) => {
          setImpressions(event.target.value);
          console.log(event.target.value);
        }}
      />
      <h5>fillRate</h5>
      <TextField
        id="outlined-basic"
        // label="Outlined"
        variant="outlined"
        onChange={(event) => {
          setFillRate(event.target.value);
          console.log(event.target.value);
        }}
      />
      <h5>qualityScore</h5>
      <TextField
        id="outlined-basic"
        // label="Outlined"
        variant="outlined"
        onChange={(event) => {
          setQualityScore(event.target.value);
          console.log(event.target.value);
        }}
      />
      <div>
        <br></br>
        <Button
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
export default withRouter(BIDashboard);
// impressions 2) fill rate 3) quality score
