import { useEffect, useState, useCallback, CSSProperties } from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import logoHome from "./../../Images/logoHome.png";
import O2RLogo1 from "./../../Images/O2RLogo1.png";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Outlet, Link } from "react-router-dom";
import { MyUrl, LinkToBI, GoToBI } from "../../App";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
var jwtToken = "";

export default function LeftSide() {
  // localStorage.removeItem("User");
  // sessionStorage.removeItem("User");
  const [KeepSignIn, setKeepSignIn] = useState(false);
  const { pathname } = useLocation();
  const [height, width] = useWindowSize();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nextUrl, setNextUrl] = useState("");
  const [items, setItems] = useState([]);
  const [Client, setClient] = useState({});
  const [DoesExist, setDoesExist] = useState(null);
  const [IsEmpty, setIsEmpty] = useState("yes");
  let history = useHistory();
  const [ClientName, setClientName] = useState({});

  const callIt = useCallback(async () => {
    var userObj = {
      userName: name,
      password: password,
    };
    try {
      axios
        .post(
          `${MyUrl}/api/Account/login
        `,
          userObj,
          {
            withCredentials: true,
            Auth: {
              Username: name,
              Password: password,
            },
          }
          //{ withCredentials: true }
        )
        .then((res) => {
          const Client = res.data;
          console.log("Client");
          console.log(Client);
          console.log(Client.nextUrl);
          console.log(Client.userData.email);
          console.log("Headers is");
          setClient(res.data);
          setClientName(Client.userName);
          setNextUrl(Client.nextUrl);
          if (Client.userData.userName !== null) {
            setIsEmpty("yes");
            setDoesExist(true);
            var userObj1 = {
              name: name,
              //password: password,
              email: Client.userData.email,
              nextUrl: Client.nextUrl,
              role: Client.userData.role,
              token: Client.jwtToken,
            };
            if (Client.userData.role !== "Partner") {
              if (KeepSignIn === true) {
                const jsonString = JSON.stringify(userObj1);
                localStorage.setItem("User", JSON.stringify(userObj1));
                //const items = JSON.parse(localStorage.getItem("User"));
                //sessionStorage.setItem("User", JSON.stringify(userObj1));
              }
            }
            if (Client.userData.role === "Partner") {
              console.log("Partner");
              let base64 = require("base-64"); // install it before use from npm i base-64
              const url = `${GoToBI}/?Authorization=Bearer ${Client.jwtToken}`;
              window.open(url, "_blank");
            } else {
              console.log("Not Partner");
              history.push(`/${Client.nextUrl}`, { userObj2Send: userObj1 });
            }
            console.log(userObj1);
            console.log("here1");
            sessionStorage.setItem("User", JSON.stringify(userObj1));
            return;
          } else {
            console.log("here");
            setIsEmpty("no");
          }
        })
        .catch((error) => {
          if (DoesExist === null) {
          }
          setDoesExist(false);
          setIsEmpty("yes");
        });
    } catch (error) {}
  });
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("User"));
    console.log(items);
    if (items) {
      setItems(items);
      history.push(`/${items.nextUrl}`, { userObj2Send: items });
    }

    //      history.push(`/${items.nextUrl}`, { userObj2Send: items });
    // } else {
    //   history.push(`/login`); //
    // }
  }, []);

  return (
    <div
      style={{
        flex: 1,
        padding: 10,
        height: "100vh",
        background:
          width < 767 ? " linear-gradient(to right,#d8ccf4, #ffff)" : "",
        display: "flow",
        alignItems: "center",
      }}
    >
      <div
        style={{
          flex: 1,
          alignItems: "center",
          display: "flex",
        }}
      >
        <img
          style={{
            width: "auto",
            maxWidth: width < 1500 ? 50 : 80,
          }}
          src={O2RLogo1}
        ></img>
      </div>

      <div
        style={{
          flex: 1,
          height: "15%",
          paddingLeft: "10%",
        }}
      ></div>
      <div
        style={{
          paddingLeft: "10%",
          flex: 1,
          height: "15%",
          minHeight: 150,
          maxHeight: 200,
        }}
      >
        <h1 style={{ fontSize: "auto" }}>Login</h1>
        <h5 style={{ fontSize: "auto" }}>Username</h5>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: width < 768 ? "100%" : "80%",
            borderRadius: 50,
          }}
          id="outlined-basic"
          label="Enter your name"
          variant="outlined"
        />
      </div>
      <div
        style={{
          flex: 1,
          height: "13%",
          minHeight: 90,
          maxHeight: 100,

          paddingLeft: "10%",
        }}
      >
        <h5>Password</h5>
        <FormControl
          style={{ width: width < 768 ? "100%" : "80%", borderRadius: 50 }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Enter your password
          </InputLabel>
          <OutlinedInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
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
            label="Enter your password"
          />
        </FormControl>
        {IsEmpty === "yes" ? (
          DoesExist !== false ? (
            <div></div>
          ) : (
            <div>
              <h1></h1>

              <h6 style={{ color: "red" }}>
                Please Check your Name Or Password!
              </h6>
            </div>
          )
        ) : (
          <div>
            <h1></h1>
            <h6 style={{ color: "red" }}>
              Please Check your Name Or Password!
            </h6>
          </div>
        )}
      </div>
      <div
        style={{
          flex: 1,
          paddingLeft: "10%",

          height: "10%",
          minHeight: 80,
          maxHeight: 100,

          width: "80%",
          flexDireciotn: "row",
          display: width > 800 ? "flex" : "",
          justifyContent: "space-between",
          alignItems: "center",
          //height: "100%",
        }}
      >
        <a>
          {
            <Checkbox
              onClick={() => {
                setKeepSignIn(!KeepSignIn);
              }}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
              {...label}
            />
          }
          Keep me sign in
        </a>
        <Link style={{ fontSize: 15 }} to="/ForgotPassword">
          Forgot password?
        </Link>
      </div>
      <div
        style={{
          width: "80%",
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: "10%",
        }}
      >
        <Button
          style={{
            height: 65,
            width: "80%",
            backgroundColor: "black",
            textTransform: "none",
            fontSize: "100%",
            borderRadius: "12px",
          }}
          variant="contained"
          onClick={() => {
            callIt();
          }}
        >
          Login
        </Button>
      </div>
      <div
        style={{
          paddingLeft: "10%",
          paddingTop: "2%",
          // height: width < 1441 ? "8%" : "3%",
        }}
      >
        <h6>Have trouble or need help?</h6>
      </div>
    </div>
  );
}
