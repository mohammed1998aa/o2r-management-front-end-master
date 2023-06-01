import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { MyUrl } from "../../App";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@material-ui/core";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Skeleton from "@mui/material/Skeleton";
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
// cellClassRules: {
//   'rag-green': 'x < 20',
//   'rag-amber': 'x >= 20 && x < 25',
//   'rag-red': 'x >= 25'
// }
var MyArray = [];
var SendUpdateArray = [];
var jwtToken = "";

var Obj = {};
var Obj1 = {};
var arr1 = [];
var nonEmptyObject = [];
const useStyles = makeStyles((theme) => ({
  select: {
    borderRadius: 12, // customize the border radius
    height: 40,
    width: "auto",
    minWidth: 112,
  },
}));
const TrafficSource = ({ name1, password1 }) => {
  const [Value, setValue] = React.useState("MS");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
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
  const [isLoading1, setIsLoading1] = useState(false);
  const [items, setItems] = useState([]);
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
            CallData1(response.data.accessToken);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {}
    } else {
      CallData1(parsed.token);
    }
  };
  useEffect(() => {
    ChckRefreshFunc();
  }, []);

  const UpdateTrafficSource = async (nonEmptyObject1) => {
    await ChckRefreshFunc();
    console.log("UpdateTrafficSource");
    let base64 = require("base-64"); // install it before use from npm i base-64
    var userObj = nonEmptyObject;
    const article = { title: "React PUT Request Example" };
    axios
      .put(`${MyUrl}/api/BIManagment/updateTrafficSource`, nonEmptyObject1, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        CallData1();
        items.length = 0;
      })
      .catch((error) => {
        // setErorrMessage(error.response.data.errorMessage);
      });
  };
  const CallData1 = (jwtToken1) => {
    let base64 = require("base-64"); // install it before use from npm i base-64

    setIsLoading1(true);
    MyArray.length = 0;
    Obj = {};
    try {
      axios
        .get(
          `${MyUrl}/api/BIManagment/getTrafficSource
                  `,
          {
            headers: {
              Authorization: `Bearer ${jwtToken1}`,
            },
          }
        )
        .then((res) => {
          const data2 = res.data;
          console.log(data2);
          for (let i = 0; i < data2.responseData.length; i++) {
            if (data2.responseData[i].trafficSrc === "") {
              Obj = {
                channelId: data2.responseData[i].channelId,
                channelName: data2.responseData[i].channelName,
                seatId: data2.responseData[i].seatId,
                seatName: data2.responseData[i].seatName,
                sourceId: data2.responseData[i].sourceId,
                sourceName: data2.responseData[i].sourceName,
                trafficSrc: data2.responseData[i].trafficSrc,
              };
              MyArray.push(Obj);
            }
          }
          for (let i = 0; i < data2.responseData.length; i++) {
            if (data2.responseData[i].trafficSrc !== "") {
              Obj = {
                channelId: data2.responseData[i].channelId,
                channelName: data2.responseData[i].channelName,
                seatId: data2.responseData[i].seatId,
                seatName: data2.responseData[i].seatName,
                sourceId: data2.responseData[i].sourceId,
                sourceName: data2.responseData[i].sourceName,
                trafficSrc: data2.responseData[i].trafficSrc,
              };
              MyArray.push(Obj);
            }
          }
          console.log(MyArray);
        })
        .catch((error) => {})
        .finally(() => {
          setIsLoading1(false);
        });
    } catch (error) {}
  };
  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {
      flex: width > 766 ? 1 : null,
      field: "seatName",
      filter: true,
      minWidth: 150,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      headerClass: "my-header-class",
    },
    {
      minWidth: 150,
      flex: width > 766 ? 1 : null,
      field: "channelId",
      filter: "agNumberColumnFilter",
      headerClass: "my-header-class",

      // cellStyle: (params) =>
      //   params.value > 1 ? { color: "red", backgroundColor: "green" } : null,
    },
    {
      field: "channelName",
      filter: true,
      minWidth: 150,
      flex: width > 766 ? 1 : null,
      headerClass: "my-header-class",
    },
    {
      minWidth: 150,
      flex: width > 766 ? 1 : null,
      field: "sourceId",
      filter: "agNumberColumnFilter",
      headerClass: "my-header-class",

      // cellStyle: (params) =>
      //   params.value > 1 ? { color: "red", backgroundColor: "green" } : null,
    },
    {
      field: "sourceName",
      filter: true,
      minWidth: 150,
      flex: width > 766 ? 1 : null,
      headerClass: "my-header-class",
    },
    {
      field: "trafficSrc",
      filter: true,
      minWidth: 150,
      flex: width > 766 ? 1 : null,
      headerClass: "my-header-class",
    },
  ]);
  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
  }));
  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);
  // Example load data from sever
  useEffect(() => {
    //CallData1();
    // fetch("https://www.ag-grid.com/example-assets/row-data.json")
    //   .then((result) => result.json())
    //   .then((rowData) => {
    //     setRowData(rowData);
    //     console.log(rowData);
    //   });
  }, []);

  // Example using Grid's API
  const buttonListener = useCallback((e) => {
    gridRef.current.api.deselectAll();
  }, []);
  var ragCellClassRules = {
    "rag-green-outer": function (params) {
      return params.value === 2008;
    },
    "rag-amber-outer": function (params) {
      return params.value === 2004;
    },
    "rag-red-outer": function (params) {
      return params.value === 2000;
    },
  };
  const [selectedRows, setSelectedRows] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  const onGridReady = (params) => {
    console.log(rowData);
    setGridApi(params.api);
  };

  useEffect(() => {
    console.log(selectedRows);
    if (gridApi) {
      gridApi.addEventListener("selectionChanged", () => {
        const selectedRows = gridApi.getSelectedRows();
        setSelectedRows(selectedRows);
      });
    }
  }, [gridApi]);

  useEffect(() => {
    items.length = 0;
    for (let i = 0; i < selectedRows.length; i++) {
      Obj1 = {
        sourceId: selectedRows[i].sourceId,
        trafficSrc: Value,
      };
      items.push(Obj1);
      console.log(items);
    }
  });
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: 500, width: "100%" }), []);

  const classes = useStyles();
  function Media(props) {
    const { loading = false } = props;

    return (
      <Card sx={{ maxWidth: "100%", width: "100%", paddingTop: "0%" }}>
        <CardHeader
          avatar={
            loading ? (
              // <Skeleton
              //   animation="wave"
              //   variant="circular"
              //   width={40}
              //   height={40}
              // />
              <></>
            ) : (
              <Avatar
                alt="Ted talk"
                src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
              />
            )
          }
          action={
            loading ? null : (
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            )
          }
          title={
            loading ? (
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            ) : (
              "Ted"
            )
          }
          subheader={
            loading ? (
              <Skeleton animation="wave" height={10} width="40%" />
            ) : (
              "5 hours ago"
            )
          }
        />
        {loading ? (
          <Skeleton
            sx={{ height: 600 }}
            animation="wave"
            variant="rectangular"
          />
        ) : (
          <CardMedia
            component="img"
            height="140"
            image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
            alt="Nicola Sturgeon on a TED talk stage"
          />
        )}

        <CardContent>
          {loading ? (
            <React.Fragment>
              <Skeleton
                animation="wave"
                height={10}
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={10} width="80%" />
            </React.Fragment>
          ) : (
            <Typography variant="body2" color="text.secondary" component="p">
              {
                "Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success:"
              }
            </Typography>
          )}
        </CardContent>
      </Card>
    );
  }
  return (
    <div
      style={{
        flex: 1,
        width: "100%",
        paddingRight: "1%",
        paddingLeft: "2.5%",
      }}
    >
      {/* Example using Grid's API */}
      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-alpine">
        {isLoading1 ? (
          <>
            <Media loading />
          </>
        ) : (
          <div style={containerStyle}>
            <div style={gridStyle} className="ag-theme-alpine">
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  paddingBottom: 15,
                  paddingTop: 30,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: 18 }}>value &nbsp;&nbsp;</span>
                </div>
                <Box>
                  <FormControl>
                    <Select
                      className={classes.select}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={Value}
                      onChange={handleChange}
                    >
                      <MenuItem value={"MS"}>MS</MenuItem>
                      <MenuItem value={"ME"}>ME</MenuItem>
                      <MenuItem value={"MT"}>MT</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                &nbsp;&nbsp;
                <Button
                  style={{
                    textTransform: "none",
                    background: "black",
                    borderRadius: 10,
                    // width: "15%",
                    height: 40,
                  }}
                  variant="contained"
                  onClick={() => {
                    UpdateTrafficSource(items);
                  }}
                >
                  Update
                </Button>
              </div>
              <style>
                {`
          .ag-theme-alpine .ag-root-wrapper {
            border: none;
          }
        `}
                {`
          .my-header-class {
            background-color: white;
          }
        `}
              </style>

              <AgGridReact
                style={{ border: "none", background: "white" }}
                cellClassRules={ragCellClassRules}
                ref={gridRef} // Ref for accessing Grid's API
                rowData={MyArray} // Row Data for Rows
                columnDefs={columnDefs} // Column Defs for Columns
                defaultColDef={defaultColDef} // Default Column Properties
                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                rowSelection="multiple" // Options - allows click selection of rows
                onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                onGridReady={onGridReady}
              />
            </div>{" "}
          </div>
        )}
      </div>
    </div>
  );
};
export default TrafficSource;
