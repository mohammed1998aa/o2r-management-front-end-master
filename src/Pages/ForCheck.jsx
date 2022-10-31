import React from 'react'
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { useEffect, useState } from "react";
import axios from 'axios';

import {AppTasks}from '../Pages/sections/@dashboard/app'
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from "@mui/material";
import { ToggleButton } from 'react-bootstrap';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function ForCheck() {
  const [data3, setData3] = useState("");
  const [data5, setData5] = useState("");
  const [data6, setData6] = useState("");
  const [array,setArray] = useState([]);

  const arr1=[]
  const arr2=["1","2"]
  const [UpdateUserTypeId, setUpdateUserTypeId] = useState("");

  useEffect(() => {
  //  getUserUrls();
   getAllUrlsByTypeId()
  }, []);
  const getAllUrlsByTypeId = (urls) => {
    var userObj = {
      userId: 11,
      urlTypeId: 5
    }
    // var BasicAuth = "Basic " + window.btoa(name1 + ":" + password1);
    let base64 = require("base-64"); // install it before use from npm i base-64
    try {
      axios
        .get(
          `https://localhost:7006/api/account/getUrlsByUserType?userId=11&urlTypeId=5`,
          {
            headers: {
              Authorization: "Basic " + base64.encode("max" + ":" + "1234"),
            },
           }
        )
        .then((res) => {
          const data5 = res.data;
          setData5(data5);
          console.log(data5)

        })
        .catch((error) => {});
    } catch (error) {}
  };
 // console.log("2111")
 // console.log(arr2)
 const ww=[]
 //              27,12,10

  const PostUserUrls = (urls) => {

    let base64 = require("base-64"); // install it before use from npm i base-64
    try {
      axios
        .post(
          `https://localhost:7006/api/account/editUserUrls
          `,{
            userId: 11,
            urlsId: array
          },
          {
            headers: {
              Authorization: "Basic " + base64.encode("max" + ":" + "1234"),
            },
          }
          //urlsId
        )
        .then((res) => {
          const data3 = res.data;
          setData3(data3);
console.log("it work send data urls!")
getAllUrlsByTypeId()
setArray([])
        })
        .catch((error) => {});
    } catch (error) {}
  };

  const aa=["2","4","6","2","9"]
  const bb=["21","5","6","2","8","9","10"]
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
  //  setChecked(event.target.checked);
  };

  return (
    <div>
      <Container maxWidth="xl">
        
      <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid>
        </Grid>
        <div>
        {Array.isArray(data3.responseData) ?data3 &&
                            data3.responseData.map((responseData3) => (
                            <>
                                {responseData3.url}  
                            </>                                                        
                            )) : <h6> You dont have urls! </h6>}    


            {Array.isArray(data5.responseData) ?data5 &&
                        data5.responseData.map((responseData) => (
                          <div>
                          <MenuItem
                            value={responseData.id}
                            onClick={() => {
                              setUpdateUserTypeId(responseData.id);
                            }}
                          >     


<Checkbox
//responseData.exsists ===true ?true:false
checked={checked}
      onChange={handleChange}
      
      onClick={()=>{
        setArray(ww => [responseData.id,...ww] );
          // ww.push(...ww,responseData.id)
          // ww[]
         console.log(array)
         // PostUserUrls()
      }}
      inputProps={{ 'aria-label': 'controlled' }}
    />

                                     {responseData.exsists ===true?<h5 style={{color:"green"}}>{responseData.url}{responseData.id}</h5>:<h5 style={{color:"red"}}>{responseData.url}{responseData.id}</h5> }                                           
                        
                          </MenuItem>                       
                            </div>
                        )) : <h6> You dont have urls! </h6>}</div>
<h5>------------------</h5>
<button onClick={()=>{PostUserUrls()

}}>sett urls</button>
<div>

                        

 </div>


                        
      </Container>
    </div>
  )
}
//   <Checkbox inputProps= { 'aria-label': 'Checkbox demo' } defaultChecked size="small" />

//                               {/* {responseData.url===responseData3.url?<h5>{responseData.url}</h5>:<></>}              */}
