import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { sample } from "lodash";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Menu, message, Space, Tooltip } from "antd";
import React from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ss from "../Images/ss.png";
import o2runbox from "../Images/o2runbox.png";
import ModeIcon from "@mui/icons-material/Mode";
import axios from "axios";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { validEmail, validPassword, validUserName } from "./Regex.jsx";

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
import Label from "./components/label";
import Iconify from "./components/iconify";
import Scrollbar from "./components/scrollbar";
// sections
import { UserListHead, UserListToolbar } from "./sections/@dashboard/user";
// mock
import USERLIST from "./_mock/user";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "password", label: "Password", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "role", label: "Role", alignRight: false },
  { id: "URLs", label: "URLs", alignRight: false },

  // { id: "isVerified", label: "Verified", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

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

function UsersPanel(props) {
  //For popup
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //end for popup

  //For popup1
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  //end for popup1

  //For popup2
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  //end for popup2

    //For popup3
    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);
    //end for popup3
  

  const [SizeOfHeight, setSizeOfHeight] = useState(1);
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data1, setData1] = useState("");

  const [data, setData] = useState(null);
  const [character, setCharacter] = useState(null);
  const [userUpdateIt, setuserUpdateIt] = useState("");
  const [userUpdateUserTypeId, setuserUpdateUserTypeId] = useState(undefined);

  //For Register
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isActive, setIsActive] = useState(null);
  const [userTypeId, setUserTypeId] = useState(null);

  //Response for Wrong Input
  const [RegisterWrongInput, setRegisterWrongInput] = useState(false);

  //End response for Wrong Input
  //End for Register

  //For Update Func
  const [userUpdateId1, setuserUpdateId1] = useState("");
  const [userUpdateName, setuserUpdateName] = useState("");
  const [userUpdateisActive, setUserUpdateIsActive] = useState("");
  const [UpdateUserTypeId, setUpdateUserTypeId] = useState("");
  const [userUpdateEmail, setuserUpdateEmail] = useState("");
  //End for Update Func

  //For Update password
  const [newpassword, setNewpassword] = useState(null);
  const [newpassword2, setNewpassword2] = useState(null);
  const [newpasswordError, setNewpasswordError] = useState(false);

  //End for Update password

  // Response If email and password is good with regEx
  const [emailErr, setEmailErr] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [nameError, setNameError] = useState(false);
  //End  Response If email and password is good with regEx

  const [status, setStatus] = useState("");
  const [data2, setData2] = useState("");
  const [data3, setData3] = useState("");

  //Show Urls
  const [urls, seturls] = useState("");
  const [name, setname] = useState("");
  const [data5, setData5] = useState("");

  //End show Urls
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  // This data from AdminHome unsing Props
  const name1 = props.location.state.userObj2Send.name;
  const password1 = props.location.state.userObj2Send.password;
  // End data from AdminHome unsing Props

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

  useEffect(() => {
    callIt();
  }, []);
  const callIt = () => {
    var userObj = {
      userName: name1,
      password: password1,
    };
    //          https://localhost:7006/api/Account/getUsers/
    var BasicAuth = "Basic " + window.btoa(name1 + ":" + password1);
    let base64 = require("base-64"); // install it before use from npm i base-64
    try {
      axios
        .get(
          `http://app.o2rintelligence.com:90/api/Account/getUsers
          `,
          {
            headers: {
              Authorization: "Basic " + base64.encode(name1 + ":" + password1),
            },
          }
        )
        .then((res) => {
          const data1 = res.data;
          setData1(data1);
        })
        .catch((error) => {});
    } catch (error) {}
  };
  const getAllUrlsByTypeId = (urls) => {
    // var userObj = {
    //   userName: name1,
    //   password: password1,
    // };
    // var BasicAuth = "Basic " + window.btoa(name1 + ":" + password1);
    let base64 = require("base-64"); // install it before use from npm i base-64
    try {
      axios
        .get(
          `https://localhost:7006/api/account/getUrlsByUserType?id=5
          `,
          {
            headers: {
              Authorization: "Basic " + base64.encode("max" + ":" + "1234"),
            },
          }
        )
        .then((res) => {
          const data3 = res.data;
          setData3(data3);
          console.log("data5")
          console.log(data5)

        })
        .catch((error) => {});
    } catch (error) {}
  };
  const getUserUrls = (urls) => {
    var userObj = {
      userName: name1,
      password: password1,
    };
    var BasicAuth = "Basic " + window.btoa(name1 + ":" + password1);
    let base64 = require("base-64"); // install it before use from npm i base-64
    try {
      axios
        .get(
          `https://localhost:7006/api/Account/userUrls?id=${urls}
          `,
          {
            headers: {
              Authorization: "Basic " + base64.encode(name1 + ":" + password1),
            },
          }
        )
        .then((res) => {
          const data3 = res.data;
          setData3(data3);
          console.log("data3")
       //   console.log(data3)

        })
        .catch((error) => {});
    } catch (error) {}
  };
  const users = Array.isArray(data1.responseData)
    ? data1 &&
      data1.responseData.map((responseData) => ({
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
        Urls:responseData.id,
        // role: sample([
        //   "Leader",
        //   "Hr Manager",
        //   "UI Designer",
        //   "UX Designer",
        //   "UI/UX Designer",
        //   "Project Manager",
        //   "Backend Developer",
        //   "Full Stack Designer",
        //   "Front End Developer",
        //   "Full Stack Developer",
        // ]),
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

  const handleButtonClick = (e) => {
    message.info("Click on left button.");
    console.log("click left button", e);
  };
  const handleMenuClick = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };
  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: "Edit",
          key: "1",
          icon: <UserOutlined />,
        },
        {
          label: "Change status Or delete",
          key: "2",
          icon: <UserOutlined />,
        },
      ]}
    />
  );

  const { pathname } = useLocation();
  const [height, width] = useWindowSize();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, height]);

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

  const RegisterFunc = () => {
    var userObj = {
      userName: userName,
      password: password,
      isActive: isActive,
      userTypeId: userTypeId,
      email: email,

      //  registrationDate: null,
    };

    var BasicAuth = "Basic " + window.btoa(name1 + ":" + password1);
    let base64 = require("base-64"); // install it before use from npm i base-64
    try {
      if (
        userName === null ||
        userName === "" ||
        password === null ||
        password === "" ||
        isActive === null ||
        isActive === "" ||
        userTypeId === null ||
        userTypeId === "" ||
        email === null ||
        email === ""
      ) {
        setRegisterWrongInput(true);
      } else {
        setRegisterWrongInput(false);
      }

      axios
        .post(
          `https://localhost:7006/api/Account/addUser
            `,
          userObj,
          {
            headers: {
              Authorization: "Basic " + base64.encode(name1 + ":" + password1),
            },
          }
        )
        .then((res) => {
          const data = res.data;
          handleClose();
          setData(data);

          callIt();
          setUserName(null);
          setPassword(null);
          setIsActive(null);
          setUserTypeId(null);
          setEmail(null);
          console.log("BasicAuth" + BasicAuth);
        })
        .catch((error) => {
          console.log("error" + error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(userUpdateEmail);

  const UpdateFunc = () => {
    if (validPassword.test(userUpdateEmail)) {
      let base64 = require("base-64"); // install it before use from npm i base-64
      var userObj = {
        id: userUpdateId1,
        userName: userUpdateName,
        isActive: userUpdateisActive,
        userTypeId: UpdateUserTypeId,
        email: userUpdateEmail,
      };
      console.log("it work UpdateFunc!");
      setEmailErr(false);

      // if (!validEmail.test(userUpdateEmail)) {
      //   setPwdError(true);
      // } else {
      //   setPwdError(false);
      // }
      const article = { title: "React PUT Request Example" };
      const headers = {
        Authorization: "Basic " + base64.encode(name1 + ":" + password1),
      };
      axios
        .put("https://localhost:7006/api/Account/updateUser", userObj, {
          headers,
        })
        // .then(response => setUpdatedAt(response.data.updatedAt));
        .then((response) => {
          setStatus(response.status);
          callIt();
          handleClose1();
        });
    } else {
      setEmailErr(true);

      console.log("Wrong Edit Email data");
    }
  };
  const UpdatePassFunc = () => {
    console.log("it work UpdatePassFunc!");
    // if (!validPassword.test(password)) {
    //   setPwdError(true);
    // } else {
    //   setPwdError(false);
    // }
    console.log(newpassword);
    console.log(newpassword2);
    console.log(validPassword.test(newpassword));
    if (newpassword === newpassword2 && validPassword.test(newpassword)) {
      setPwdError(false);
      console.log("Nice Password");
      let base64 = require("base-64"); // install it before use from npm i base-64
      var userObj = {
        userName: userUpdateName,
        oldPass: password,
        newPass: newpassword,
      };
      const article = { title: "React PUT Request Example" };
      setNewpasswordError(false);

      const headers = {
        Authorization: "Basic " + base64.encode("max" + ":" + "1234"),
      };
      axios
        .put("https://localhost:7006/api/Account/updatePass", userObj, {
          headers,
        })
        // .then(response => setUpdatedAt(response.data.updatedAt));
        .then((response) => {
          setStatus(response.status);
          callIt();
          handleClose2();
          setNewpassword(null);
          setNewpassword2(null);
        });
    } else {
      setPwdError(true);

      setNewpasswordError(true);
      // setNewpassword(null);
      // setNewpassword2(null);
      console.log("Bad Password");
    }
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  // end for choose admin or clinet

  const handleChange2 = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword2 = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    callRole();
  }, []);

  const callRole = () => {
    var userObj = {
      userName: "max",
      password: "1234",
    };
    var BasicAuth = "Basic " + window.btoa("momo" + ":" + "1234");
    let base64 = require("base-64"); // install it before use from npm i base-64
    try {
      axios
        .get(
          `https://localhost:7006/api/Account/gettypes
          `,
          {
            headers: {
              Authorization: "Basic " + base64.encode("max" + ":" + "1234"),
            },
          }
        )
        .then((res) => {
          const data2 = res.data;
          setData2(data2);
          console.log(data2);
        })
        .catch((error) => {});
    } catch (error) {}
  };
  //  console.log(userName);

  //  console.log(RegisterWrongInput);

  const validate2 = () => {
    if (!newpasswordError) {
      setNewpasswordError(true);
    }
  };
  const validate = () => {
    if (!validUserName.test(userName)) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (!validEmail.test(email)) {
      setEmailErr(true);
    } else {
      setEmailErr(false);
    }
    if (!validPassword.test(password)) {
      setPwdError(true);
    } else {
      setPwdError(false);
    }
  };
  console.log("nameError");

  console.log(nameError);
  const checkpassword = () => {
    return (
      <div>
        {newpassword !== newpassword2 && newpasswordError ? (
          <h5>Wrong Input</h5>
        ) : (
          <h5></h5>
        )}
      </div>
    );
  };
  return (
    <div
      style={{
        //  background: "transparent",
        width: "100%",
        height: height > 1300 ? height * 1 : "auto",
        // height > 900 && rowsPerPage === 5
        //   ? height * 1.2
        //   : height > 1500 && width > 2000
        //   ? height * 1.2
        //   : "100%",
        background: "linear-gradient(#d8ccf4, #9198e5)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          paddingTop: 30,
        }}
      ></div>
      {/* <h1>height: {height}</h1>
      <h1>width: {width}</h1> */}

      <div>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Create New Client</Modal.Title>
          </Modal.Header>
          <Modal.Body>Enter the data for new client!</Modal.Body>
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              margin: 1,
              flexDirection: "column",
              display: "flex",
            }}
          >
            <TextField
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              id="outlined-basic"
              label="User name"
              variant="outlined"
            />
            <div>
              {nameError && (
                <p style={{ color: "red" }}>Your name is invalid</p>
              )}

              {data1 &&
                data1.responseData.map((responseData) =>
                  responseData.userName === userName ? (
                    <h6 style={{ color: "red" }}>This name is already exist</h6>
                  ) : (
                    <></>
                  )
                )}
            </div>

            <br></br>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
            <div>
              {data1 &&
                data1.responseData.map((responseData) =>
                  responseData.email === email ? (
                    <h6 style={{ color: "red" }}>
                      This email is allready exist
                    </h6>
                  ) : (
                    <></>
                  )
                )}
            </div>
            {emailErr && <p style={{ color: "red" }}>Your email is invalid</p>}
            <br></br>
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {pwdError && (
              <p style={{ color: "red" }}>Your password is invalid</p>
            )}

            <br></br>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">IsActive</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={isActive}
                  label="userTypeId"
                  onChange={(e) => setIsActive(e.target.value)}
                >
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Not Active</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <br></br>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">User type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={userTypeId}
                  label="userTypeId"
                  onChange={(e) => setUserTypeId(e.target.value)}
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
            </Box>

            {RegisterWrongInput === true || RegisterWrongInput === "" ? (
              <h6 style={{ color: "red" }}>Please fill all fields</h6>
            ) : (
              <h6></h6>
            )}

            <br></br>
            <br></br>
            <br></br>

            <Modal.Footer>
              <Stack spacing={3} direction="row">
                <Button variant="contained" onClick={handleClose}>
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  onClick={() => {
                    validate();
                    RegisterFunc();
                  }}
                >
                  {" "}
                  Add New Client
                </Button>
              </Stack>
            </Modal.Footer>
          </div>
        </Modal>

        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={8}
          >
            <Typography variant="h4" gutterBottom>
              Clients{" "}
              <a5 style={{ flexDirection: "column", color: "white" }}>
                <a4 style={{ flexDirection: "column", color: "white" }}> </a4>{" "}
                Table
              </a5>
            </Typography>
            <Button
              style={{
                width: "10%",
                height: height / 18,
                borderRadius: 35,
                backgroundColor: "#8b5cf6",
                //padding: "15px 33px",
                fontSize: "60%",
              }}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={() => {
                handleShow();
                setUserName(null);
                setPassword(null);
                setIsActive(null);
                setUserTypeId(null);
                setEmail(null);
                setRegisterWrongInput(false);
              }}
            >
              New User
            </Button>
          </Stack>

          <Card>
            <UserListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <TableContainer>
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
                        id,
                        name,
                        password,
                        role,
                        userTypeId,
                        status,
                        email,
                        avatarUrl,
                        Urls,
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
                          <TableCell align="left">{password}</TableCell>
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
                            <button
                            onClick={()=>{
                              getUserUrls(Urls)
                              handleShow3();
                              seturls(Urls)
                              setname(name)
                            }}>Open Urls</button>
                            {Urls}</TableCell>

                          
                          <TableCell align="right">
                            <ModeIcon
                              style={{
                                cursor: "pointer",
                              }}
                              color="primary"
                              onClick={() => {
                                setuserUpdateId1(id);
                                setuserUpdateName(name);
                                setuserUpdateEmail(email);
                                setUserUpdateIsActive(
                                  status === "active" ? true : false
                                );
                                setUpdateUserTypeId(userTypeId);
                                handleShow1();
                              }}
                            />

                            <ModeIcon
                              style={{
                                cursor: "pointer",
                              }}
                              color="action"
                              onClick={() => {
                                setuserUpdateId1(id);
                                setuserUpdateName(name);
                                setuserUpdateEmail(email);
                                setPassword(password);
                                setUserUpdateIsActive(
                                  status === "active" ? true : false
                                );
                                setUpdateUserTypeId(userTypeId);
                                handleShow2();
                              }}
                            />
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
            {/*Update data Modal */}
            <Modal show={show1} onHide={handleClose1} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Edit client account</Modal.Title>
              </Modal.Header>
              <Modal.Body>Edit data that you want </Modal.Body>
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 1,
                  flexDirection: "column",
                  display: "flex",
                }}
              >
                <h3>{userUpdateName}</h3>

                <br></br>

                <br></br>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  value={userUpdateEmail}
                  onChange={(e) => setuserUpdateEmail(e.target.value)}
                />
                {emailErr && (
                  <p style={{ color: "red" }}>Your email is invalid</p>
                )}

                <br></br>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      IsActive
                    </InputLabel>
                    <Select
                      defaultValue="Default Value"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={userUpdateisActive}
                      label="userTypeId"
                      onChange={(e) => setUserUpdateIsActive(e.target.value)}
                    >
                      <MenuItem value={true}>Active</MenuItem>
                      <MenuItem value={false}>Not Active</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <br></br>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      User type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={UpdateUserTypeId}
                      label="userTypeId"
                      onChange={(e) => setUserTypeId(e.target.value)}
                    >
                      {data2 &&
                        data2.responseData.map((responseData) => (
                          <MenuItem
                            value={responseData.id}
                            onClick={() => {
                              setUpdateUserTypeId(responseData.id);
                            }}
                          >
                            {responseData.permissionType}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Box>

                <br></br>
                <br></br>
                <br></br>

                <Modal.Footer>
                  <Stack spacing={3} direction="row">
                    <Button variant="contained" onClick={handleClose1}>
                      Cancel
                    </Button>

                    <Button
                      variant="contained"
                      onClick={() => {
                        UpdateFunc();
                      }}
                    >
                      {" "}
                      Edit data
                    </Button>
                  </Stack>
                </Modal.Footer>
              </div>
            </Modal>
            {/*End Update data Modal */}

            {/* Update password Modal */}
            <Modal
              show={show2}
              onHide={() => {
                handleClose2();
                setNewpassword(null);
                setNewpassword2(null);
              }}
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>Edit password client </Modal.Title>
              </Modal.Header>
              <Modal.Body>Edit password </Modal.Body>
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 1,
                  flexDirection: "column",
                  display: "flex",
                }}
              >
                <div>
                  <h3>
                    Client name:- {userUpdateName}
                    <br></br>
                    Old password:- {password}
                  </h3>
                </div>
                <br></br>
                <h5>please enter new password:</h5>
                <Box>
                  <div>
                    <FormControl variant="outlined"></FormControl>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? "text" : "password"}
                        value={newpassword}
                        onChange={(e) => setNewpassword(e.target.value)}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword2}
                              onMouseDown={handleMouseDownPassword2}
                              // edge="end"
                            >
                              {values.showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                  </div>
                </Box>
                <br></br>
                <h5>confirm password:</h5>
                {/* <TextField
                  value={newpassword2}
                  onChange={(e) => setNewpassword2(e.target.value)}
                  id="outlined-basic"
                  label="User name"
                  variant="outlined"
                /> */}
                <Box>
                  <div>
                    <FormControl variant="outlined"></FormControl>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? "text" : "password"}
                        value={newpassword2}
                        onChange={(e) => setNewpassword2(e.target.value)}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword2}
                              onMouseDown={handleMouseDownPassword2}
                              // edge="end"
                            >
                              {values.showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                  </div>
                </Box>
                {checkpassword()}
                <br></br>
                <br></br>
                <br></br>
                {pwdError && (
                  <p style={{ color: "red" }}>Your password is invalid</p>
                )}

                <Modal.Footer>
                  <Stack spacing={3} direction="row">
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleClose2();
                        // setNewpassword(null);
                        // setNewpassword2(null);
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      variant="contained"
                      onClick={() => {
                        UpdatePassFunc();
                      }}
                    >
                      {" "}
                      Edit password
                    </Button>
                  </Stack>
                </Modal.Footer>
              </div>
            </Modal>
            {/*End Update password Modal */}


            {/* Show Urls Modal */}
            <Modal
              show={show3}
              onHide={() => {
                handleClose3();
                setNewpassword(null);
                setNewpassword2(null);
              }}
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>Check and Edit client Urls </Modal.Title>
              </Modal.Header>
              <Modal.Body> </Modal.Body>
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 1,
                  flexDirection: "column",
                  display: "flex",
                }}
              >
                <div>
                  <h3>
                    Client id:- {urls}
                    <br></br>
                    Client name:- {name}
                  </h3>
                </div>
                <br></br>

                <br></br>
                <h5>List Of Urls:</h5>
                {/* <TextField
                  value={newpassword2}
                  onChange={(e) => setNewpassword2(e.target.value)}
                  id="outlined-basic"
                  label="User name"
                  variant="outlined"
                /> */}
  <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      User type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={UpdateUserTypeId}
                      label="userTypeId"
                      onChange={(e) => setUserTypeId(e.target.value)}
                    >
                      { Array.isArray(data3.responseData) ?data3 &&
                        data3.responseData.map((responseData) => (
                          <MenuItem
                            value={responseData.id}
                            onClick={() => {
                              setUpdateUserTypeId(responseData.id);
                            }}
                          >
                         
                            {responseData.url}
                          </MenuItem>
                        )) : <h6> You dont have urls! </h6>}
                        <div 
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                        }}>
                    <button
                    style={{color:"red"}}
                    >delete</button>
                    </div>
                    </Select>
                  </FormControl>
                </Box>
                <br></br>
                <br></br>
                <br></br>
                {pwdError && (
                  <p style={{ color: "red" }}>Your password is invalid</p>
                )}

                <Modal.Footer>
                  <Stack spacing={3} direction="row">
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleClose3();
                        // setNewpassword(null);
                        // setNewpassword2(null);
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      variant="contained"
                      onClick={() => {
                        // UpdatePassFunc();
                      }}
                    >
                      {" "}
                      Set Urls
                    </Button>
                  </Stack>
                </Modal.Footer>
              </div>
            </Modal>
            {/*Show Urls Modal */}
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
          {/* <div className="position-absolute bottom-0 start-0">
           
          </div> */}
        </Container>
        <div
          style={{
            paddingTop: 300,
          }}
        >
          {/* <div
            style={{
              paddingBottom: 150,
            }}
          ></div> */}
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
export default withRouter(UsersPanel);
