import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  createContext,
} from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { MyUrl } from "./../../App";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import UserSeatManagementDrawer from "./UserSeatManagementDrawer";

var jwtToken = "";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export const MyContext = createContext();

// cellClassRules: {
//   'rag-green': 'x < 20',
//   'rag-amber': 'x >= 20 && x < 25',
//   'rag-red': 'x >= 25'
// }
var MyArray = [];
var SendUpdateArray = [];

var Obj = {};
var Obj1 = {};
var Obj2 = {};

var arr1 = [];
var nonEmptyObject = [];
var ForDelete = "";
function UsersTableSeatManagemnt({ name2, password2 }) {
  const [id1, setId1] = useState("");
  const [userName1, setuserName1] = useState("");
  const [password1, setpassword1] = useState("");
  const [name1, setname1] = useState("");
  const [servingFee1, setservingFee1] = useState("");
  const [scoringFee1, setscoringFee1] = useState("");
  const [partnerFee1, setpartnerFee1] = useState("");
  const [ctvCpm1, setctvCpm1] = useState("");
  const [inappCpm1, setinappCpm1] = useState("");
  const [pixalateFee1, setpixalateFee1] = useState("");
  const [color1, setcolor1] = useState("");
  console.log(userName1);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };

  const [isTrue, setIsTrue] = useState(true);

  const toggleIsTrue = () => {
    setIsTrue(!isTrue);
    setOpenDrawer(!isTrue);
  };

  // useEffect(() => {
  //   if (isTrue === false) {
  //     CallData1();
  //     setIsTrue(true);
  //   }
  // });
  const [Value, setValue] = React.useState("");
  const [Value1, setValue1] = React.useState("");
  const [Data3, setData3] = React.useState([]);

  const [OpenDrawer, setOpenDrawer] = React.useState(false);

  const items1 = localStorage.getItem("User");

  if (items1 === null) {
    const items = sessionStorage.getItem("User");
    var parsed = JSON.parse(items);
  } else {
    const items = sessionStorage.setItem("User", JSON.stringify(items1));
    var parsed = JSON.parse(items1);
  }

  console.log("Seat");
  console.log(items1);
  console.log(parsed.name);
  let base64 = require("base-64");
  console.log(base64.encode(parsed.name + ":" + parsed.password));
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const gridRef = useRef(); // Optional - for accessing Grid's API
  // const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
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

  const UpdateAdvertiserCampaign = (nonEmptyObject) => {
    console.log("UpdateTrafficSource");
    let base64 = require("base-64"); // install it before use from npm i base-64
    var userObj = nonEmptyObject;
    const article = { title: "React PUT Request Example" };
    axios
      .put(`${MyUrl}/api/SeatManagment/updateSeat`, {
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
      CallData1(jwtToken);
    }
  };
  useEffect(() => {
    ChckRefreshFunc();
  }, []);
  const CallData1 = (jwtToken) => {
    let base64 = require("base-64"); // install it before use from npm i base-64
    setIsLoading1(true);
    MyArray.length = 0;
    Obj = {};
    try {
      axios
        .get(
          `${MyUrl}/api/SeatManagment/getSeats
                  `,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )
        .then((res) => {
          const data2 = res.data;
          console.log(data2);
          for (let i = 0; i < data2.responseData.length; i++) {
            Obj = {
              id: data2.responseData[i].id,
              name: data2.responseData[i].name,
              userName: data2.responseData[i].userName,
              servingFee: data2.responseData[i].servingFee,
              CampscoringFeeaignName: data2.responseData[i].scoringFee,
              pixalateFee: data2.responseData[i].pixalateFee,
              password: data2.responseData[i].password,
              partnerFee: data2.responseData[i].partnerFee,
              inappCpm: data2.responseData[i].inappCpm,
              id: data2.responseData[i].id,
              ctvCpm: data2.responseData[i].ctvCpm,
              color: data2.responseData[i].color,
            };
            MyArray.push(Obj);
            console.log(MyArray[i].CampscoringFeeaignName);
          }
          console.log(MyArray);
        })
        .catch((error) => {})
        .finally(() => {
          setIsLoading1(false);
        });
    } catch (error) {}
  };

  function MyCustomCellRenderer(props) {
    const [value, setValue] = useState(props.value);
    return <input value={value} onChange={(e) => setValue(e.target.value)} />;
  }
  const RenderButton = ({ value }) => (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      {Array.isArray(MyArray) ? (
        MyArray &&
        MyArray.map((responseData) => (
          <>
            {value === responseData.id ? (
              <>
                <MyContext.Provider value={{ isTrue, toggleIsTrue }}>
                  <UserSeatManagementDrawer
                    open1={!OpenDrawer}
                    name={responseData.name}
                    userName={responseData.userName}
                    servingFee={responseData.servingFee}
                    CampscoringFeeaignName={responseData.CampscoringFeeaignName}
                    pixalateFee={responseData.pixalateFee}
                    password={responseData.password}
                    partnerFee={responseData.partnerFee}
                    inappCpm={responseData.inappCpm}
                    id={responseData.id}
                    ctvCpm={responseData.ctvCpm}
                    color={responseData.color}
                  />
                </MyContext.Provider>
                <Button
                  style={{ color: "red", textTransform: "none" }}
                  variant="text"
                  // onClick={() => {
                  //   // DeleteSeatFunc(value);

                  // }}
                  onClick={() => {
                    ForDelete = value;
                    handleClickOpen1();
                  }}
                >
                  Delete
                </Button>
              </>
            ) : (
              <></>
            )}
          </>
        ))
      ) : (
        <>
          <h3>emp</h3>
        </>
      )}
    </div>
  );

  const CreateSeatFunc = async () => {
    await ChckRefreshFunc();
    //  setErorrMessage("");

    let base64 = require("base-64"); // install it before use from npm i base-64
    var userObj = {
      userName: userName1,
      password: password1,
      name: name1,
      servingFee: servingFee1,
      scoringFee: scoringFee1,
      partnerFee: partnerFee1,
      ctvCpm: ctvCpm1,
      inappCpm: inappCpm1,
      pixalateFee: pixalateFee1,
      color: color1,
    };
    const article = { title: "React Post Request Example" };
    // const headers = {
    //   Authorization: "Basic " + base64.encode(name1 + ":" + password1),
    // };

    axios
      .post(`${MyUrl}/api/SeatManagment/createSeat`, userObj, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      // .then(response => setUpdatedAt(response.data.updatedAt));
      .then((response) => {
        handleClose();

        // setStatus(response.status);
        // callIt();
        // handleClose1();
        // handleClick();
        // setIsTrue(!isTrue);
        CallData1();
      })
      .catch((error) => {
        // setErorrMessage(error.response.data.errorMessage);
      });
  };
  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {
      flex: width > 766 ? 1 : null,
      field: "name",
      filter: true,
      minWidth: 150,
      headerClass: "my-header-class",

      // headerCheckboxSelection: true,
      // headerCheckboxSelectionFilteredOnly: true,
      // checkboxSelection: true,
    },
    {
      field: "userName",
      filter: true,
      minWidth: 150,
      flex: width > 766 ? 1 : null,
      headerClass: "my-header-class",
    },
    {
      field: "servingFee",
      filter: true,
      minWidth: 150,
      flex: width > 766 ? 1 : null,
      headerClass: "my-header-class",
    },
    {
      field: "password",
      filter: true,
      minWidth: 150,
      flex: width > 766 ? 1 : null,
      headerClass: "my-header-class",
    },
    {
      field: "partnerFee",
      filter: true,
      minWidth: 150,
      flex: width > 766 ? 1 : null,
      headerClass: "my-header-class",
    },
    {
      field: "CampscoringFeeaignName",
      filter: true,
      minWidth: 150,
      flex: width > 766 ? 1 : null,
      headerClass: "my-header-class",
    },
    {
      field: "inappCpm",
      filter: true,
      minWidth: 150,
      flex: width > 766 ? 1 : null,
      headerClass: "my-header-class",
    },
    {
      field: "ctvCpm",
      filter: true,
      minWidth: 150,
      flex: width > 766 ? 1 : null,
      headerClass: "my-header-class",
    },
    {
      headerName: "Button Column",
      field: "id",
      cellRenderer: "RenderButton",
      headerClass: "my-header-class",
    },
    // {
    //   minWidth: 150,
    //   flex: width > 766 ? 1 : null,
    //   field: "channelId",
    //   filter: "agNumberColumnFilter",
    //   // cellStyle: (params) =>
    //   //   params.value > 1 ? { color: "red", backgroundColor: "green" } : null,
    // },
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
    // CallData1();
    setItems([]);
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
    //console.log(rowData);
    setGridApi(params.api);
  };

  useEffect(() => {
    // console.log(selectedRows);
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
      //console.log(selectedRows);
      Obj1 = {
        advertiser: {
          id: selectedRows[i].advertiserId,
          billingName: Value,
        },
        collectionBy: Value1,
        campaign: {
          id: selectedRows[i].campaignId,
        },
      };
      items.push(Obj1);
      console.log(items);
    }
  });

  const DeleteSeatFunc = async (value) => {
    await ChckRefreshFunc();
    //  setErorrMessage("");

    let base64 = require("base-64"); // install it before use from npm i base-64
    // var userObj = {
    //   sourceId: Update,
    //   trafficSrc: TextUpdate,
    // };
    const article = { title: "React PUT Request Example" };
    // const headers = {
    //   Authorization: "Basic " + base64.encode(name1 + ":" + password1),
    // };
    axios
      .delete(
        `${MyUrl}/api/SeatManagment/deleteSeat/${value}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
        // userObj
        // {
        //   headers,
        // }
      )
      // .then(response => setUpdatedAt(response.data.updatedAt));
      .then((response) => {
        // setStatus(response.status);
        // callIt();
        // handleClose1();
        // handleClick();
        // setIsTrue(!isTrue);
        CallData1(jwtToken);
        ForDelete = "";
      })
      .catch((error) => {
        // setErorrMessage(error.response.data.errorMessage);
      });
  };
  const getRowHeight = (params) => (params.node.group ? 40 : 40);
  return (
    <div style={{ flex: 1, width: "100%", height: "100%" }}>
      {/* Example using Grid's API */}
      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div
        className="ag-theme-alpine"
        style={{ height: 400 }} //width: width > 766 ? width / 1.2 : width / 2,
      >
        {isLoading1 ? (
          <>loading...</>
        ) : (
          <>
            <div style={{ paddingLeft: "2.5%", paddingBottom: "1%" }}>
              <Button
                variant="contained"
                style={{ textTransform: "none", background: "black" }}
                onClick={handleClickOpen}
              >
                Add Seat
              </Button>
              <br></br>
              <br></br>
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
                cellClassRules={ragCellClassRules}
                ref={gridRef} // Ref for accessing Grid's API
                rowData={MyArray} // Row Data for Rows
                columnDefs={columnDefs} // Column Defs for Columns
                defaultColDef={defaultColDef} // Default Column Properties
                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                rowSelection="multiple" // Options - allows click selection of rows
                onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                onGridReady={onGridReady}
                frameworkComponents={{ RenderButton }}
                getRowHeight={getRowHeight}
                domLayout="autoHeight"
              />
              {/* {isTrue ? <>yes</> : <>no</>} */}
            </div>
          </>
        )}
      </div>
      <div>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open} //open
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
            style={{ width: "100%", minWidth: width > 776 ? 500 : 300 }}
          >
            Add Seat
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <ListItemButton>
              <ListItemIcon>
                <TextField
                  id="outlined-basic"
                  label="User name"
                  variant="outlined"
                  type="text"
                  value={userName1}
                  onChange={(e) => setuserName1(e.target.value)}
                />
              </ListItemIcon>
              <ListItemText />
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  type="text"
                  value={password1}
                  onChange={(e) => setpassword1(e.target.value)}
                />
              </ListItemIcon>
              <ListItemText />
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  type="text"
                  value={name1}
                  onChange={(e) => setname1(e.target.value)}
                />
              </ListItemIcon>
              <ListItemText />
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                <TextField
                  id="outlined-basic"
                  label="Serving Fee"
                  variant="outlined"
                  type="text"
                  value={servingFee1}
                  onChange={(e) => setservingFee1(e.target.value)}
                />
              </ListItemIcon>
              <ListItemText />
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                <TextField
                  id="outlined-basic"
                  label="Scoring Fee"
                  variant="outlined"
                  type="text"
                  value={scoringFee1}
                  onChange={(e) => setscoringFee1(e.target.value)}
                />
              </ListItemIcon>
              <ListItemText />
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                <TextField
                  id="outlined-basic"
                  label="Partner Fee"
                  variant="outlined"
                  type="text"
                  value={partnerFee1}
                  onChange={(e) => setpartnerFee1(e.target.value)}
                />
              </ListItemIcon>
              <ListItemText />
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                <TextField
                  id="outlined-basic"
                  label="CTV CPM"
                  variant="outlined"
                  type="text"
                  value={ctvCpm1}
                  onChange={(e) => setctvCpm1(e.target.value)}
                />
              </ListItemIcon>
              <ListItemText />
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                <TextField
                  id="outlined-basic"
                  label="In App CPM"
                  variant="outlined"
                  type="text"
                  value={inappCpm1}
                  onChange={(e) => setinappCpm1(e.target.value)}
                />
              </ListItemIcon>
              <ListItemText />
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                <TextField
                  id="outlined-basic"
                  label="Pixalate Fee"
                  variant="outlined"
                  type="text"
                  value={pixalateFee1}
                  onChange={(e) => setpixalateFee1(e.target.value)}
                />
              </ListItemIcon>
              <ListItemText />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <TextField
                  id="outlined-basic"
                  label="Color"
                  variant="outlined"
                  type="text"
                  value={color1}
                  onChange={(e) => setcolor1(e.target.value)}
                />
              </ListItemIcon>
              <ListItemText />
            </ListItemButton>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 10,
              }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  // toggleIsTrue(false);
                  // toggleDrawer(false);
                  // UpdateSeat();
                  CreateSeatFunc();
                }}
                style={{ height: 45, width: "30%", background: "black" }}
              >
                Done
              </Button>
            </div>
          </DialogContent>
          {/* <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Save changes
            </Button>
          </DialogActions> */}
        </BootstrapDialog>
      </div>

      <div>
        <BootstrapDialog
          onClose={handleClose1}
          aria-labelledby="customized-dialog-title"
          open={open1} //open
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose1}
            style={{ width: "100%", minWidth: width > 776 ? 500 : 300 }}
          >
            Delete Seat
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <div>
              <h4>Are you sure you want to delete this seat ?</h4>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                paddingTop: 70,
              }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  // toggleIsTrue(false);
                  // toggleDrawer(false);
                  // UpdateSeat();
                  //CreateSeatFunc();
                  handleClose1();
                  DeleteSeatFunc(ForDelete);
                }}
                style={{ height: 45, width: "30%", background: "red" }}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  // toggleIsTrue(false);
                  // toggleDrawer(false);
                  // UpdateSeat();
                  //CreateSeatFunc();
                  handleClose1();
                  ForDelete = "";
                }}
                style={{ height: 45, width: "30%", background: "black" }}
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
          {/* <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Save changes
            </Button>
          </DialogActions> */}
        </BootstrapDialog>
      </div>
    </div>
  );
}
export default UsersTableSeatManagemnt;
