import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
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
import { MyUrl } from "../../App";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
var jwtToken = "";
export default function UsersTableUserServices({
  id,
  name,
  email,
  password,
  status,
  role,
  name1,
  password1,
}) {
  const [isLoading, setIsLoading] = useState();

  const [myUrlsuserId, setmyUrlsuserId] = useState(id);
  const [myUrlsurlTypeId, setmyUrlsurlTypeId] = useState();
  const [data4, setData4] = useState("");
  const [data5, setData5] = useState("");
  const [data6, setData6] = useState("");
  const [array, setArray] = useState([]);
  const [editDone, seteditDone] = useState(false);

  const items1 = localStorage.getItem("User");
  const [CheckTypeOfUser, setCheckTypeOfUser] = useState("");

  const ChckRefreshFunc = async () => {
    if (items1 === null) {
      const items = sessionStorage.getItem("User");
      var parsed = JSON.parse(items);
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
              const updatedObjString = JSON.stringify(parsed);
              sessionStorage.setItem("User", updatedObjString);
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {}
      } else {
        console.log("Token is still valid");
      }
    } else {
      const items = sessionStorage.setItem("User", JSON.stringify(items1));
      var parsed = JSON.parse(items1);
      setCheckTypeOfUser(parsed.role);
      jwtToken = parsed.token;
    }
  };
  useEffect(() => {
    ChckRefreshFunc();
  }, []);
  useEffect(() => {
    getAllUrlsByTypeId(id, role);
  }, []);
  const PostUserUrls = async (myUrlsuserId) => {
    await ChckRefreshFunc();
    let base64 = require("base-64"); // install it before use from npm i base-64
    let uniqueChars = [...new Set(array)];
    console.log(myUrlsuserId);
    console.log(uniqueChars);

    if (array !== null || array !== undefined || array == [])
      try {
        axios
          .post(
            `${MyUrl}/api/account/editUserUrls
          `,
            {
              userId: myUrlsuserId,
              urlsId: uniqueChars,
            },
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            }
            //urlsId
          )
          .then((res) => {
            const data4 = res.data;
            setData4(data4);
            seteditDone(true);
            getAllUrlsByTypeId(id, myUrlsurlTypeId);
            setArray([]);
          })
          .catch((error) => {});
      } catch (error) {}
  };
  const getAllUrlsByTypeId = useCallback((userId, urlTypeId) => {
    var userObj = {
      userId: userId,
      urlTypeId: urlTypeId,
    };
    console.log("User Ser");
    // var BasicAuth = "Basic " + window.btoa(name1 + ":" + password1);
    let base64 = require("base-64"); // install it before use from npm i base-64
    setIsLoading(true);
    console.log(urlTypeId);
    console.log(userId);

    try {
      axios
        .get(
          `${MyUrl}/api/account/getUrlsByUserType?userId=${userId}&userTypeId=${role}`, //
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )
        .then((res) => {
          const data5 = res.data;
          console.log(data5);

          setData5(data5);

          for (let i = 0; i < data5.responseData.length; i++) {
            if (data5.responseData[i].exsists === true)
              setArray((array) => [data5.responseData[i].id, ...array]);
          }
        })
        .catch((error) => {})
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 400);
        });
    } catch (error) {}
  });

  const variants = ["h3", "h3", "h3", "h3"];

  function TypographyDemo(props) {
    const { loading = false } = props;

    return (
      <div>
        {variants.map((variant) => (
          <Typography component="div" key={variant} variant={variant}>
            {loading ? <Skeleton /> : variant}
          </Typography>
        ))}
      </div>
    );
  }

  TypographyDemo.propTypes = {
    loading: PropTypes.bool,
  };

  return (
    <div>
      {isLoading ? (
        <div
          style={{ paddingRight: "2%", paddingLeft: "2%", paddingTop: "6%" }}
        >
          <h1 style={{ fontSize: 15 }}>
            The user will have access to the selected services.
          </h1>
          <Grid container spacing={8}>
            <Grid item xs>
              <TypographyDemo loading />
            </Grid>
            {/* <Grid item xs>
        <TypographyDemo />
      </Grid> */}
          </Grid>
        </div>
      ) : (
        <>
          {" "}
          <div
            style={{ paddingRight: "2%", paddingLeft: "2%", paddingTop: "6%" }}
          >
            <h1 style={{ fontSize: 15 }}>
              The user will have access to the selected services.
            </h1>
            {Array.isArray(data5.responseData) ? (
              data5 &&
              data5.responseData.map((responseData) => (
                <div
                  style={{
                    flex: 1,
                    justifyContent: "space-between",
                    // background: "blue",
                  }}
                >
                  <MenuItem value={responseData.id}>
                    {responseData.exsists === true ? (
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            flexDirection: "row",
                            display: "flex",
                            alignItems: "center",
                            // justifyContent: "center",
                          }}
                        >
                          <img
                            src={require(`../../Images/${responseData.imageUrl}.png`)}
                            width="10%"
                            class="rounded"
                            alt="..."
                            style={{ margin: 10 }}
                          ></img>
                          <h5>{responseData.name}</h5>
                        </div>
                        <Checkbox
                          // icon={<FavoriteBorder />}
                          // checkedIcon={<Favorite />}
                          defaultChecked
                          sx={{
                            color: "black",
                            "&.Mui-checked": {
                              color: "black",
                            },
                          }}
                          onClick={() => {
                            const index = array.indexOf(responseData.id);
                            if (index > -1) {
                              // only splice array when item is found
                              array.splice(index, 1); // 2nd parameter means remove one item only
                            } else {
                              setArray((array) => [responseData.id, ...array]);
                            }
                          }}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            flexDirection: "row",
                            display: "flex",
                            alignItems: "center",
                            // justifyContent: "center",
                          }}
                        >
                          <img
                            src={require(`../../Images/${responseData.imageUrl}.png`)}
                            width="10%"
                            class="rounded"
                            alt="..."
                            style={{ margin: 10 }}
                          ></img>
                          <h5>{responseData.name}</h5>
                        </div>
                        <Checkbox
                          //  sx={{
                          //   color: pink[800],
                          //   "&.Mui-checked": {
                          //     color: pink[600],
                          //   },
                          // }}

                          // icon={<FavoriteBorder />}
                          // checkedIcon={<Favorite />}
                          sx={{
                            color: "black",
                            "&.Mui-checked": {
                              color: "black",
                            },
                          }}
                          onClick={() => {
                            const index = array.indexOf(responseData.id);
                            if (index > -1) {
                              // only splice array when item is found
                              array.splice(index, 1); // 2nd parameter means remove one item only
                            } else {
                              setArray((array) => [responseData.id, ...array]);
                            }
                          }}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </div>
                    )}
                  </MenuItem>
                </div>
              ))
            ) : (
              <h6> You dont have urls! </h6>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              flex: 1,
              position: "absolute",
              width: "100%",
              paddingRight: "2%",
              paddingLeft: "2%",
              bottom: 10,
            }}
          >
            <Button
              style={{
                color: "black",
                fontWeight: "bold",
                width: "30%",
                textTransform: "none",
              }}
              variant="text"
              onClick={() => {
                setArray([]);
                array.splice(0, array.length);
                seteditDone(false);
              }}
            >
              Cancel
            </Button>
            <Button
              style={{
                background: "black",
                borderRadius: 10,
                width: "30%",
                textTransform: "none",
              }}
              variant="contained"
              onClick={() => {
                PostUserUrls(myUrlsuserId);
              }}
            >
              Done
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
