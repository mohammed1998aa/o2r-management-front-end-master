import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useState, useEffect, forwardRef, createContext } from "react";
import * as React from "react";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Close from "./../../Images/Close.png";
import UsersTableAccountSetting from "./UsersTableAccountSetting";
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
// components
import Label from "../../Pages/components/label";
import Iconify from "../../Pages/components/iconify";
import Scrollbar from "../../Pages/components/scrollbar";
import UsersTableRightBar from "./../UsersTableComponents/UsersTableRightBar";
import { sample } from "lodash";
import ModeIcon from "@mui/icons-material/Mode";

// sections
import {
  UserListHead,
  UserListToolbar,
} from "../../Pages/sections/@dashboard/user";
// mock
import USERLIST from "../../Pages/_mock/user";
import UsersTableHeader from "./UsersTableHeader";
import { ChooesPage } from "./UsersTableLeftBar";
// ----------------------------------------------------------------------
import { MyUrl } from "../../App";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Select from "@mui/material/Select";

import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Skeleton from "@mui/material/Skeleton";

import { Divider } from "antd";
export const MyContext = createContext();
export const MyContext2 = createContext();

const TABLE_HEAD = [
  { id: "name", label: "User", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "password", label: "Password", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "role", label: "Role", alignRight: false },
  { id: "urls", label: "Actions", alignRight: false },
];

// ----------------------------------------------------------------------

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

var jwtToken = "";
function UsersTableTable(props, Eff) {
  const [data1, setData1] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const name1 = props.location.state.userObj2Send.name;
  const password1 = props.location.state.userObj2Send.password;
  const data3 = props.location.state.userObj2Send.data2;
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
            GetUsers(response.data.accessToken);
            callRole(response.data.accessToken);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {}
    } else {
      GetUsers(jwtToken);
      callRole(jwtToken);
    }
  };
  useEffect(() => {
    ChckRefreshFunc();
  }, []);

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

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(7);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };
  const RegisterFunc = () => {
    //ChckRefreshFunc()
    var userObj = {
      userName: addName,
      password: addNewPassword,
      isActive: addStatus,
      userTypeId: addType,
      email: addEmail,

      //  registrationDate: null,
    };

    var BasicAuth = "Basic " + window.btoa(name1 + ":" + password1);
    let base64 = require("base-64"); // install it before use from npm i base-64
    try {
      if (
        addName === null ||
        addName === "" ||
        addNewPassword === null ||
        addNewPassword === "" ||
        addStatus === null ||
        addStatus === "" ||
        addType === null ||
        addType === "" ||
        addEmail === null ||
        addEmail === ""
      ) {
        setRegisterWrongInput(true);
      } else {
        setRegisterWrongInput(false);
      }

      axios
        .post(
          `${MyUrl}/api/Account/addUser
            `,
          userObj,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )
        .then((res) => {
          const data = res.data;
          //  setData(data);

          GetUsers(jwtToken);
          setAddStatus(null);
          setAddNewPassword(null);
          setAddName(null);
          setAddEmail(null);
          setaddType(null);
          // setUserName(null);
          // setPassword(null);
          // setIsActive(null);
          // setUserTypeId(null);
          // setEmail(null);
        })
        .catch((error) => {});
    } catch (error) {}
  };
  useEffect(() => {
    // GetUsers();
    // callRole();
  }, []);

  // useEffect(() => {
  //   if (dataP.message === true) {
  //     console.log("render");
  //     GetUsers(jwtToken);
  //     callRole(jwtToken);
  //     setDataP(false);
  //   }
  // }, []);

  const GetUsers = (jwtToken) => {
    setisLoading(true);
    try {
      axios
        .get(
          `${MyUrl}/api/Account/getUsers/
          `,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )
        .then((res) => {
          const data1 = res.data;
          console.log(data1.responseData);
          setData1(data1);
          setisLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {}
  };

  const users = Array.isArray(data1.responseData)
    ? data1 &&
      data1.responseData.map((responseData) => ({
        SendUserType: responseData.userTypeId,
        SendStatus: responseData.isActive,
        id: responseData.id,
        //avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
        name: responseData.userName,
        email: responseData.email,
        //  isVerified: faker.datatype.boolean(),
        password: responseData.password,

        status: responseData.isActive
          ? sample(["active"])
          : sample(["NotActive"]),
        role: responseData.role,
        userTypeId: responseData.userTypeId,
        urls: [responseData.id, responseData.userTypeId],
      }))
    : [];
  const filteredUsers = applySortFilter(
    users,
    getComparator(order, orderBy),
    filterName
  );

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const isNotFound = !filteredUsers.length && !!filterName;
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  const [password, setPassword] = React.useState();

  const [CurrentPassword, setCurrentPassword] = React.useState(password);
  const [showPassword, setShowPassword] = React.useState(false);
  const [newpassword, setNewPassword] = React.useState();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [data2, setData2] = useState();
  const [isLoading1, setIsLoading1] = React.useState(true);
  const [userTypeId, setUserTypeId] = React.useState();

  const [addName, setAddName] = useState();
  const [addEmail, setAddEmail] = useState();
  const [addNewPassword, setAddNewPassword] = useState();
  const [addStatus, setAddStatus] = useState();
  const [addType, setaddType] = useState();

  //Response for Wrong Input
  const [RegisterWrongInput, setRegisterWrongInput] = useState(false);

  const handleChange = (event) => {
    setUserTypeId(event.target.value);
  };
  function handleFocus() {
    console.log("Component is focused");
  }
  function handleBlur() {
    console.log("Component is unfocused");
  }
  window.addEventListener("focus", handleFocus);
  window.addEventListener("blur", handleBlur);
  const callRole = (jwtToken) => {
    function handleFocus() {
      console.log("Component is focused");
    }
    function handleBlur() {
      console.log("Component is unfocused");
    }
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
    var userObj = {
      userName: name1,
      password: password1,
    };
    var BasicAuth = "Basic " + window.btoa(name1 + ":" + password1);
    let base64 = require("base-64"); // install it before use from npm i base-64
    try {
      axios
        .get(
          `${MyUrl}/api/Account/gettypes
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
          setData2(data2);
          setIsLoading1(false);
        })
        .catch((error) => {});
    } catch (error) {}
    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  };
  const [data, setData] = useState(true);
  const handleData = (data) => {
    // setState({ ...state, ["right"]: false });
    // toggleDrawer("right", data);
    console.log(data);
    setData(data);
  };
  const [dataP, setDataP] = useState({ message: false });
  const [dataP2, setDataP2] = useState({ message2: false });

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
    <>
      {/* {dataP.message ? (
        <>{(GetUsers(jwtToken), callRole(jwtToken), setDataP(false))}</>
      ) : (
        <></>
      )} */}

      {/* {dataP2.message2 ? (
        <>
          {
            (GetUsers(jwtToken),
            callRole(jwtToken),
            setDataP(false),
            setDataP2(false))
          }
        </>
      ) : (
        <></>
      )} */}

      {/* <button
  onClick={() => {
    setDataP2(false);
  }}
>
  Change
</button> */}
      {/* <h2>aaa</h2>
      {data ? <>yes</> : <>no</>} */}
      {isLoading ? (
        <>
          <Media loading />
        </>
      ) : (
        <>
          <Card
            style={{
              width: "100%",
              paddingLeft: "1%",
            }}
          >
            {/* <UsersTableHeader
              name1={name1}
              password1={password1}
              data3={data3}
            /> */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={5}
            >
              <UserListToolbar
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
              />
              {width < 766 ? (
                <div style={{ paddingRight: 10 }}>
                  <Button
                    style={{
                      background: "#f9f8f9",
                      height: 50,
                      textTransform: "none",
                      borderRadius: 12,
                    }}
                    onClick={handleClickOpen2}
                  >
                    {
                      <Iconify
                        icon="eva:plus-fill"
                        color="black"
                        style={{ fontSize: "80px" }}
                      />
                    }
                  </Button>
                  {/* <Button
                    style={{
                      background: "#f9f8f9",
                      height: 50,
                      textTransform: "none",
                      borderRadius: 12,
                    }}
                    variant="contained"
                    startIcon={<Iconify icon="eva:plus-fill" color="black" />}
                    onClick={handleClickOpen2}
                  ></Button> */}
                </div>
              ) : (
                <>
                  <Button
                    style={{
                      background: "black",
                      height: 50,
                      textTransform: "none",
                      borderRadius: 12,
                    }}
                    variant="contained"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    onClick={handleClickOpen2}
                  >
                    New User
                  </Button>
                </>
              )}
            </Stack>
            <Dialog
              open={open2} //open2
              TransitionComponent={Transition}
              keepMounted
              // onClose={handleClose2}
              aria-describedby="alert-dialog-slide-description"
              style={{
                height: "100%",
                borderRadius: 50,
              }}
            >
              <div
                style={{
                  height: width < 766 ? "" : 600,
                  width: width < 766 ? "" : 450,
                  borderRadius: 50,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "5%",
                    paddingLeft: "5%",
                    paddingRight: "5%",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleClose2();
                  }}
                >
                  <h4 style={{}}>Add New User</h4>
                  <img src={Close} width={30}></img>
                </div>
                <div>
                  <Divider />
                </div>
                <div style={{ padding: 20 }}>
                  <h4 style={{ fontSize: 15, fontWeight: "bold" }}>Username</h4>
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    value={addName} //{UpdateEmail}
                    //  label={addName}
                    onChange={(e) => setAddName(e.target.value)}
                    variant="outlined"
                  />
                  <h4
                    style={{ fontSize: 15, fontWeight: "bold", paddingTop: 20 }}
                  >
                    Email
                  </h4>
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    value={addEmail} //{UpdateEmail}
                    //label={email}
                    onChange={(e) => setAddEmail(e.target.value)}
                    variant="outlined"
                  />
                  <h1
                    style={{ fontSize: 15, fontWeight: "bold", paddingTop: 20 }}
                  >
                    New Password
                  </h1>
                  <FormControl sx={{ width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      value={addNewPassword}
                      onChange={(e) => setAddNewPassword(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                  <div
                    style={{
                      justifyContent: "space-between",
                      display: "flex",
                      flex: 1,
                      paddingTop: 20,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flex: 1,
                        flexDirection: "column",
                      }}
                    >
                      <h1 style={{ fontSize: 15, fontWeight: "bold" }}>
                        User Status
                      </h1>

                      <FormControl style={{ width: "100%" }}>
                        <InputLabel id="demo-simple-select-label">
                          Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={Status1}
                          label="Status"
                          onChange={(e) => setAddStatus(e.target.value)}
                        >
                          <MenuItem value={true}>Active</MenuItem>
                          <MenuItem value={false}>Not Active</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flex: 1,
                        flexDirection: "column",
                      }}
                    >
                      <h1 style={{ fontSize: 15, fontWeight: "bold" }}>
                        User Type
                      </h1>
                      <FormControl style={{ width: "100%" }}>
                        <InputLabel id="demo-simple-select-label">
                          User type
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={userTypeId}
                          label="userTypeId"
                          onChange={(e) => setaddType(e.target.value)}
                        >
                          {data2 &&
                            data2.responseData.map((responseData) => (
                              <MenuItem
                                value={responseData.id}
                                onClick={() => {
                                  //     setuserUpdateUserTypeId(responseData.id);
                                }}
                              >
                                {responseData.permissionType}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    paddingRight: "4%",
                    paddingLeft: "4%",
                  }}
                >
                  <Button
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      width: "45%",
                      textTransform: "none",
                    }}
                    variant="text"
                    onClick={() => {
                      handleClose2();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    style={{
                      background: "black",
                      borderRadius: 10,
                      width: "45%",
                      textTransform: "none",
                    }}
                    variant="contained"
                    onClick={() => {
                      RegisterFunc();
                      handleClose2();
                      //          UpdateFunc();
                    }}
                  >
                    Add User
                  </Button>
                </div>
              </div>

              {/* <DialogActions style={{ width: 400 }}>
          <Button onClick={handleClose2}>Disagree</Button>
          <Button onClick={handleClose2}>Agree</Button>
        </DialogActions> */}
            </Dialog>
            {/* <Typography variant="h4" gutterBottom>
          User Management
        </Typography> */}

            <TableContainer sx={{ width: "100%" }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={users.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        SendUserType,
                        SendStatus,
                        id,
                        name,
                        password,
                        role,
                        userTypeId,
                        status,
                        urls,
                        email,
                        avatarUrl,
                        isVerified,
                      } = row;
                      const selectedUser = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedUser}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedUser}
                              onChange={(event) => handleClick(event, name)}
                            />
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar alt={name} src={avatarUrl} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">
                            {password
                              .slice(password.length)
                              .padStart(password.length, "*")}
                            {/* {password.padStart("10", "*")} */}
                            {/* {[password].map((password, index) => (
                              <h1 key={index}>*</h1>
                            ))} */}
                          </TableCell>
                          <TableCell align="left">
                            <Label
                              color={
                                (status === "NotActive" && "error") || "success"
                              }
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell>
                          <TableCell>{role}</TableCell>
                          <TableCell>
                            {/* <Button variant="outlined" size="small">
                              Edit Urls
                            </Button> */}
                            <MyContext2.Provider value={{ dataP2, setDataP2 }}>
                              <MyContext.Provider value={{ dataP, setDataP }}>
                                <UsersTableRightBar
                                  id={id}
                                  name={name}
                                  email={email}
                                  password={password}
                                  status={SendStatus}
                                  role={SendUserType}
                                  name1={name1}
                                  password1={password1}
                                  sendData={handleData}
                                />
                              </MyContext.Provider>
                            </MyContext2.Provider>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete
                            words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
          <Popover
            open={Boolean(open)}
            anchorEl={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              sx: {
                p: 1,
                width: 140,
                "& .MuiMenuItem-root": {
                  px: 1,
                  typography: "body2",
                  borderRadius: 0.75,
                },
              },
            }}
          >
            <MenuItem>
              <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
              Edit
            </MenuItem>

            <MenuItem sx={{ color: "error.main" }}>
              <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
              Delete
            </MenuItem>
          </Popover>
        </>
      )}
    </>
  );
}
export default withRouter(UsersTableTable);
