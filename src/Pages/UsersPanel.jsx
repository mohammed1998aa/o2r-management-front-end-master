import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useEffect, useState, useCallback, CSSProperties } from "react";
import { sample } from "lodash";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Menu, message, Space, Tooltip } from "antd";
import React from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import system from "../Images/system.png";
import google from "../Images/google.png";
import waze from "../Images/waze.png";
import yahoo from "../Images/yahoo.png";
import youtube from "../Images/youtube.png";
import twitter from "../Images/twitter.png";
import o2runbox from "../Images/o2runbox.png";
import ModeIcon from "@mui/icons-material/Mode";
import axios from "axios";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  validEmail,
  validPassword,
  validUserName,
  validUrlName,
  validUrl,
  validEditEmail,
} from "./Regex.jsx";
import ClipLoader from "react-spinners/ClipLoader";

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
// components
import Label from "./components/label";
import Iconify from "./components/iconify";
// sections
import { UserListHead, UserListToolbar } from "./sections/@dashboard/user";
// mock
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
  { id: "urls", label: "Urls", alignRight: false },

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

  //For popup4
  const [show4, setShow4] = useState(false);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);
  //end for popup4

  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data1, setData1] = useState("");

  const [data, setData] = useState(null);
  const [userUpdateUserTypeId, setuserUpdateUserTypeId] = useState(undefined);

  //For Register
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isActive, setIsActive] = useState(null);
  const [userTypeId, setUserTypeId] = useState(null);
  const [erorrMessage, setErorrMessage] = useState("");

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
  const [emailErr1, setEmailErr1] = useState(false);

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

  // Response If website url and website name is good with regEx
  const [urlErorr, seturlErorr] = useState(false);
  const [urlNameError, seturlNameError] = useState(false);
  //End  Response If email and password is good with regEx

  // for see urls
  const [myUrlsuserId, setmyUrlsuserId] = useState();
  const [myUrlsurlTypeId, setmyUrlsurlTypeId] = useState();
  const [data4, setData4] = useState("");
  const [data5, setData5] = useState("");
  const [data6, setData6] = useState("");
  const [array, setArray] = useState([]);
  const [editDone, seteditDone] = useState(false);

  // end for see urls

  //Add Url
  const [url, setUrl] = useState("");
  const [urlName, setUrlName] = useState("");
  const [urlTypeId, seturlTypeId] = useState("");
  // also we need userTypeId (it already exists) //  const [userTypeId, setUserTypeId] = useState(null);
  const [ImageUrl, setImageUrl] = useState("");
  //End Add Url

  const [status, setStatus] = useState("");
  const [data2, setData2] = useState("");
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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //  getUserUrls();
    getAllUrlsByTypeId();
  }, [myUrlsurlTypeId, myUrlsuserId]);
  const getAllUrlsByTypeId = useCallback((userId, urlTypeId) => {
    var userObj = {
      userId: userId,
      urlTypeId: urlTypeId,
    };
    // var BasicAuth = "Basic " + window.btoa(name1 + ":" + password1);
    let base64 = require("base-64"); // install it before use from npm i base-64
    setIsLoading(true);
    try {
      axios
        .get(
          `https://localhost:7006/api/account/getUrlsByUserType?userId=${userId}&urlTypeId=${urlTypeId}`,
          {
            headers: {
              Authorization: "Basic " + base64.encode(name1 + ":" + password1),
            },
          }
        )
        .then((res) => {
          const data5 = res.data;
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

  const PostUserUrls = (myUrlsuserId) => {
    let base64 = require("base-64"); // install it before use from npm i base-64
    let uniqueChars = [...new Set(array)];

    if (array !== null || array !== undefined || array == [])
      try {
        axios
          .post(
            `https://localhost:7006/api/account/editUserUrls
          `,
            {
              userId: myUrlsuserId,
              urlsId: uniqueChars,
            },
            {
              headers: {
                Authorization:
                  "Basic " + base64.encode(name1 + ":" + password1),
              },
            }
            //urlsId
          )
          .then((res) => {
            const data4 = res.data;
            setData4(data4);
            seteditDone(true);
            getAllUrlsByTypeId(myUrlsuserId, myUrlsurlTypeId);
            setArray([]);
          })
          .catch((error) => {});
      } catch (error) {}
  };

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

  const AddUrls = () => {
    var newUrl = {
      url: url,
      name: urlName,
      urlTypeId: urlTypeId,
      userTypeId: UpdateUserTypeId,
      ImageUrl: ImageUrl,

      //  registrationDate: null,
    };

    var BasicAuth = "Basic " + window.btoa(name1 + ":" + password1);
    let base64 = require("base-64"); // install it before use from npm i base-64
    try {
      axios
        .post(
          `https://localhost:7006/api/account/addUrl
            `,
          newUrl,
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
          handleClose4();
        })
        .catch((error) => {});
    } catch (error) {}
  };
  useEffect(() => {
    callIt();
  }, []);
  const callIt = () => {
    var userObj = {
      userName: name1,
      password: password1,
    };
    var BasicAuth = "Basic " + window.btoa(name1 + ":" + password1);
    let base64 = require("base-64"); // install it before use from npm i base-64
    try {
      axios
        .get(
          `https://localhost:7006/api/Account/getUsers/
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

  const handleButtonClick = (e) => {
    message.info("Click on left button.");
  };
  const handleMenuClick = (e) => {
    message.info("Click on menu item.");
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
        })
        .catch((error) => {});
    } catch (error) {}
  };

  const UpdateFunc = () => {
    setErorrMessage("");
    if (validEditEmail.test(userUpdateEmail)) {
      let base64 = require("base-64"); // install it before use from npm i base-64
      var userObj = {
        id: userUpdateId1,
        userName: userUpdateName,
        isActive: userUpdateisActive,
        userTypeId: UpdateUserTypeId,
        email: userUpdateEmail,
      };
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
        })
        .catch((error) => {
          setErorrMessage(error.response.data.errorMessage);
        });
    } else {
      setEmailErr1(true);
    }
  };
  const UpdatePassFunc = () => {
    if (newpassword === newpassword2 && validPassword.test(newpassword)) {
      setPwdError(false);
      let base64 = require("base-64"); // install it before use from npm i base-64
      var userObj = {
        userName: userUpdateName,
        oldPass: password,
        newPass: newpassword,
      };
      const article = { title: "React PUT Request Example" };
      setNewpasswordError(false);

      const headers = {
        Authorization: "Basic " + base64.encode(name1 + ":" + password1),
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
      userName: name1,
      password: password1,
    };
    var BasicAuth = "Basic " + window.btoa(name1 + ":" + password1);
    let base64 = require("base-64"); // install it before use from npm i base-64
    try {
      axios
        .get(
          `https://localhost:7006/api/Account/gettypes
          `,
          {
            headers: {
              Authorization: "Basic " + base64.encode(name1 + ":" + password1),
            },
          }
        )
        .then((res) => {
          const data2 = res.data;
          setData2(data2);
        })
        .catch((error) => {});
    } catch (error) {}
  };

  const validate2 = () => {
    if (!newpasswordError) {
      setNewpasswordError(true);
    }
  };
  //for new user
  const validate = () => {
    if (!validEmail.test(email)) {
      setEmailErr(true);
    } else {
      setEmailErr(false);
    }
    if (!validUserName.test(userName)) {
      setNameError(true);
    } else {
      setNameError(false);
    }

    if (!validPassword.test(password)) {
      setPwdError(true);
    } else {
      setPwdError(false);
    }
  };
  //End for new user

  //  for update user
  const validate3 = () => {
    if (!validEditEmail.test(userUpdateEmail)) {
      setEmailErr1(true);
    } else {
      setEmailErr1(false);
    }
  };
  // Endfor update user

  //for Add url
  const validate1 = () => {
    if (!validUrlName.test(urlName)) {
      seturlNameError(true);
    } else {
      seturlNameError(false);
    }
    if (!validUrl.test(url)) {
      seturlErorr(true);
    } else {
      seturlErorr(false);
    }
  };
  //End for Add url
  let history = useHistory();

  const LogOut = () => {
    localStorage.removeItem("User");
    history.push("/LogInPage");
  };

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
        width: "100%",
        height: "100vh",
        background: "linear-gradient(#d8ccf4, #9198e5)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        display: "flex",
      }}
    >
      <nav class="navbar" style={{ background: "#c084fc" }}>
        <a class="navbar-brand" style={{ marginLeft: 10 }}></a>
        <div style={{ marginRight: 10 }}>
          <button
            type="button"
            class="btn btn-outline-primary"
            onClick={() => {
              LogOut();
            }}
          >
            Log Out{" "}
          </button>
          <img
            style={{
              marginRight: 10,
              marginLeft: 10,
              width: width > 1500 ? "30" : "30",
              height: height / 16,
            }}
            src={system}
            alt="image"
          ></img>
        </div>
      </nav>
      <div
        style={{
          paddingTop: 30,
        }}
      ></div>
      <div style={{ flex: 1 }}>
        {/* Register new User Modal */}
        <Modal
          show={show}
          onHide={() => {
            handleClose();
            setNameError(false);
            setEmailErr(false);
            setPwdError(false);
          }}
          size="lg"
        >
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
            {emailErr && <p style={{ color: "red" }}>Your Email is invalid</p>}
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
                <Button
                  variant="contained"
                  onClick={() => {
                    handleClose();
                    setNameError(false);
                    setEmailErr(false);
                    setPwdError(false);
                  }}
                >
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
        {/* End Register new User Modal */}
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
                <a4 style={{ flexDirection: "column", color: "white" }}> </a4>
                Table
              </a5>
            </Typography>
            <div style={{ justifyContent: "space-between" }}>
              <Button
                style={{
                  marginRight: 10,
                  width: "45%",
                  height: height / 18,
                  borderRadius: 35,
                  backgroundColor: "#8b5cf6",

                  padding: "15px 33px",
                  fontSize: "70%",
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
                Add User
              </Button>
              <Button
                style={{
                  width: "45%",
                  height: height / 18,
                  borderRadius: 35,
                  backgroundColor: "#8b5cf6",
                  padding: "20px 33px",
                  fontSize: "70%",
                }}
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                onClick={() => {
                  handleShow4();
                  setUserName(null);
                  setPassword(null);
                  setIsActive(null);
                  setUserTypeId(null);
                  setEmail(null);
                  setRegisterWrongInput(false);
                }}
              >
                Add URL
              </Button>
            </div>
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
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => {
                                setuserUpdateName(name);
                                setuserUpdateUserTypeId(role);

                                handleShow3();
                                setmyUrlsuserId(urls[0]);
                                setmyUrlsurlTypeId(urls[1]);
                                getAllUrlsByTypeId(urls[0], urls[1]);
                              }}
                            >
                              Edit Urls
                            </Button>
                          </TableCell>

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
            <Modal
              show={show1}
              onHide={() => {
                handleClose1();
                setErorrMessage("");
              }}
              size="lg"
            >
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
                {emailErr1 && (
                  <>
                    <p style={{ color: "red" }}>Your email is invalid</p>
                  </>
                )}
                <div></div>
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

                <h5 style={{ color: "red" }}>{erorrMessage}</h5>

                <br></br>
                <br></br>
                <br></br>

                <Modal.Footer>
                  <Stack spacing={3} direction="row">
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleClose1();
                        setErorrMessage("");
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      variant="contained"
                      onClick={() => {
                        validate3();
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

            {/* See Urls Modal */}
            <Modal
              show={show3}
              onHide={() => {
                handleClose3();
                setArray([]);
                seteditDone(false);

                array.splice(0, array.length);
              }}
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>Client Urls </Modal.Title>
              </Modal.Header>
              <Modal.Body>Edit Urls </Modal.Body>
              {isLoading ? (
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 1,
                    flexDirection: "column",
                    display: "flex",
                  }}
                >
                  <ClipLoader
                    color="black"
                    loading={isLoading}
                    //   cssOverride={override}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              ) : (
                <>
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
                        Role:- {userUpdateUserTypeId}
                      </h3>
                      {Array.isArray(data5.responseData) ? (
                        data5 &&
                        data5.responseData.map((responseData) => (
                          <div>
                            <MenuItem value={responseData.id}>
                              {responseData.exsists === true ? (
                                <h5>
                                  <Checkbox
                                    defaultChecked
                                    onClick={() => {
                                      const index = array.indexOf(
                                        responseData.id
                                      );
                                      if (index > -1) {
                                        // only splice array when item is found
                                        array.splice(index, 1); // 2nd parameter means remove one item only
                                      } else {
                                        setArray((array) => [
                                          responseData.id,
                                          ...array,
                                        ]);
                                      }
                                    }}
                                    inputProps={{ "aria-label": "controlled" }}
                                  />
                                  {responseData.url}
                                </h5>
                              ) : (
                                <h5>
                                  <Checkbox
                                    onClick={() => {
                                      const index = array.indexOf(
                                        responseData.id
                                      );
                                      if (index > -1) {
                                        // only splice array when item is found
                                        array.splice(index, 1); // 2nd parameter means remove one item only
                                      } else {
                                        setArray((array) => [
                                          responseData.id,
                                          ...array,
                                        ]);
                                      }
                                    }}
                                    inputProps={{ "aria-label": "controlled" }}
                                  />
                                  {responseData.url}
                                </h5>
                              )}
                            </MenuItem>
                          </div>
                        ))
                      ) : (
                        <h6> You dont have urls! </h6>
                      )}

                      {editDone ? (
                        <>
                          <h5 style={{ color: "green" }}>Edit Done!</h5>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Modal.Footer>
                      <Stack spacing={3} direction="row">
                        <Button
                          variant="contained"
                          onClick={() => {
                            handleClose3();
                            setArray([]);
                            array.splice(0, array.length);
                            handleClose3();
                            seteditDone(false);
                          }}
                        >
                          Cancel
                        </Button>

                        <Button
                          variant="contained"
                          onClick={() => {
                            PostUserUrls(myUrlsuserId);
                          }}
                        >
                          Edit Urls
                        </Button>
                      </Stack>
                    </Modal.Footer>
                  </div>
                </>
              )}
            </Modal>
            {/*End See Urls Modal */}

            {/*add new Url Modal */}
            <Modal
              show={show4}
              onHide={() => {
                handleClose4();
                seturlErorr(false);
                seturlNameError(false);
              }}
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>Add New website</Modal.Title>
              </Modal.Header>
              <Modal.Body>Add Website </Modal.Body>
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 1,
                  flexDirection: "column",
                  display: "flex",
                }}
              >
                <br></br>
                <TextField
                  id="outlined-basic"
                  label="Website Url"
                  variant="outlined"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                {urlErorr && <p style={{ color: "red" }}>Url is invalid</p>}

                <br></br>

                <TextField
                  id="outlined-basic"
                  label="Website name"
                  variant="outlined"
                  value={urlName}
                  onChange={(e) => setUrlName(e.target.value)}
                />

                <br></br>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      UrlTypeId
                    </InputLabel>
                    <Select
                      defaultValue="Default Value"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={urlTypeId}
                      label="userTypeId"
                      onChange={(e) => seturlTypeId(e.target.value)}
                    >
                      <MenuItem value={1}>Internal</MenuItem>
                      <MenuItem value={2}>External</MenuItem>
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

                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Image</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={ImageUrl}
                      label="Age"
                      onChange={(e) => {
                        setImageUrl(e.target.value);
                      }}
                    >
                      <MenuItem value={"google"}>
                        Google{"  "}{" "}
                        <img
                          style={{ heigth: 20, width: 20 }}
                          src={google}
                          alt="Logo"
                        />
                      </MenuItem>
                      <MenuItem value={"waze"}>
                        waze {"  "}
                        <img
                          style={{ heigth: 20, width: 20 }}
                          src={waze}
                          alt="Logo"
                        />
                      </MenuItem>
                      <MenuItem value={"yahoo"}>
                        yahoo {"  "}{" "}
                        <img
                          style={{ heigth: 20, width: 20 }}
                          src={yahoo}
                          alt="Logo"
                        />
                      </MenuItem>
                      <MenuItem value={"youTube"}>
                        YouTube {"  "}{" "}
                        <img
                          style={{ heigth: 20, width: 20 }}
                          src={youtube}
                          alt="Logo"
                        />
                      </MenuItem>{" "}
                      <MenuItem value={"twitter"}>
                        Twitter {"  "}{" "}
                        <img
                          style={{ heigth: 20, width: 20 }}
                          src={twitter}
                          alt="Logo"
                        />
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <br></br>
                <br></br>
                <br></br>

                <Modal.Footer>
                  <Stack spacing={3} direction="row">
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleClose4();
                        seturlErorr(false);
                        seturlNameError(false);
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      variant="contained"
                      onClick={() => {
                        validate1();
                        AddUrls();
                      }}
                    >
                      {" "}
                      add data
                    </Button>
                  </Stack>
                </Modal.Footer>
              </div>
            </Modal>
            {/*End Add new Url Modal */}
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
        </Container>
      </div>
      <img
        style={{
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 10,
          position: "relative",
          bottom: 0,
          //    minHeight: "100vh",
          maxWidth:
            width > 1201
              ? "8%"
              : width > 1025
              ? "10%"
              : width > 769
              ? "12%"
              : width > 481
              ? "15%"
              : width > 320
              ? "25%"
              : "25%",
        }}
        src={o2runbox}
        class="rounded float-start"
        alt="image"
      ></img>
    </div>
  );
}
export default withRouter(UsersPanel);
