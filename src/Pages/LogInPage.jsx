import { useState, useEffect, Dimensions, useCallback } from "react";
import { withRouter, useHistory, Link } from "react-router-dom";
import axios from "axios";
import {
  PhoneOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import "../PagesCSS/LogInPage.css";
import "antd/dist/antd.css";
import o2runbox from "../Images/o2runbox.png";
import ss from "../Images/ss.png";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Input } from "antd";
//const windowWidth = window.innerWidth;
//const windowHeight = window.innerHeight;

function LogInPage(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nextUrl, setNextUrl] = useState("");

  const [phone, setPhone] = useState("");
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [DataisLoaded, setDataisLoaded] = useState(false);
  const [Client, setClient] = useState({});
  const [DoesExist, setDoesExist] = useState(null);
  const [IsEmpty, setIsEmpty] = useState("yes");
  let history = useHistory();
  const [ClientName, setClientName] = useState({});

  const LogInFunc = () => {
    console.log("LogInFunc :" + ClientName);
    var userObj1 = {
      name: ClientName,
      password: "123",
    };
    history.push(`/${nextUrl}`, { userObj2Send: userObj1 });
  };

  const GoToRegisterPage = () => {
    history.push("/Register");
  };
  console.log(name);
  const callIt = useCallback(async () => {
    var userObj = {
      userName: name,
      password: password,
    };
    //    var BasicAuth = "Basic " + window.btoa(name + ":" + password);

    try {
      axios
        .post(
          `http://app.o2rintelligence.com:90/api/Account/login
        `,
          userObj,
          {
            Auth: {
              Username: name,
              Password: password,
            },
          }
        )
        .then((res) => {
          const Client = res.data;
          setClient(res.data);
          setClientName(Client.userName);
          setNextUrl(Client.nextUrl);
          console.log(Client.nextUrl);

          console.log(Client);
          console.log("Client Name:-" + Client.responseData.userName);
          // console.log("BasicAuth" + BasicAuth);

          if (Client.userName !== null) {
            setIsEmpty("yes");
            setDoesExist(true);
            var userObj1 = {
              name: name,
              password: password,
            };
            localStorage.setItem("User", JSON.stringify(userObj1));
            console.log(userObj1);
            //  if (nextUrl === "AdminHome")
            history.push(`/${Client.nextUrl}`, { userObj2Send: userObj1 });
            return;
          } else {
            setIsEmpty("no");
          }
        })
        .catch((error) => {
          if (DoesExist === null) {
          }
          setDoesExist(false);
          setIsEmpty("yes");
          console.log("for check:- " + name);
        });
    } catch (error) {}
  });
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

  useEffect(() => {
    // callIt();
  }, []);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("User"));
    console.log(items);
    if (items) {
      setItems(items);
      history.push(`/${nextUrl}`, { userObj2Send: items });
    }
  }, []);
  const myImage = () => {
    return (
      <div>
        <img
          style={{
            width: width / 6,
            height: "auto",
          }}
          src={o2runbox}
        />
      </div>
    );
  };
  const [height, width] = useWindowSize();
  return (
    <div
      style={{
        background: "linear-gradient(#d8ccf4, #9198e5)",
        backgroundSize: "cover",
        width: "100vw",
        height: "100vh",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div class="position-absolute top-0 end-0">
        <img
          style={{
            width: "100%",
            height: height / 3,
          }}
          src={ss}
          class="rounded float-start"
          alt="image"
        ></img>
      </div>

      <div
        style={{
          background: "white",
          width: "auto", // width > 1500 ? width / 4 : width / 2.4,
          height: height / 2,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          marginTop: 80,
        }}
        class="shadow p-3 mb-5 bg-body rounded-5 position-absolute top-50 start-50 translate-middle"
      >
        <h2 style={{ fontWeight: "bold" }}>O2R intelligence</h2>
        <br></br>{" "}
        <Input
          style={{
            width: width > 1500 ? width / 5 : width / 2.8,
            borderRadius: 10,
          }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          size="large"
          placeholder="Name"
          prefix={<UserOutlined />}
        />
        <h1></h1>
        <Input.Password
          style={{
            width: width > 1500 ? width / 5 : width / 2.8,
            borderRadius: 10,
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          size="large"
          placeholder="Password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
        {IsEmpty === "yes" ? (
          DoesExist !== false ? (
            <div>
              {/* <h2>name:- {Client.name}</h2> */}
              {/* <h2>Hair color:- {this.state.Client.hair_color}</h2> */}

              {/* {this.LogInFunc()} */}
            </div>
          ) : (
            <div>
              <h1></h1>

              <h6 style={{ color: "red" }}>
                Please enter your name and password !
              </h6>
            </div>
          )
        ) : (
          <div>
            <h1></h1>

            <h6 style={{ color: "red" }}>Check your name and password !</h6>
          </div>
        )}
        <br></br>
        <div>
          <Button
            style={{
              width: width > 1400 ? width / 6 : width / 3.2,

              borderRadius: 15,
              backgroundColor: "#a78bfa",
              color: "white",
            }}
            onClick={() => {
              callIt();
            }}
            // type="primary"
          >
            Login
          </Button>
          {/* <h6>
            Or{" "}
            <Link style={{ color: "#a78bfa" }} to="/Register">
              Register now!
            </Link>
          </h6> */}
          {/* <h6>
            Or{" "}
            <Link style={{ color: "#a78bfa" }} to="/ForCheck">
              ForCheck
            </Link>
          </h6> */}
          {/* <h6>
            Or{" "}
            <Link style={{ color: "#a78bfa" }} to="/PasswordForget">
              PasswordForget
            </Link>
          </h6> */}
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      {/* <h4>height</h4>
      {height}
      <h4>width</h4>
      {width} */}
      <div class="position-absolute bottom-0 start-0">
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
  );
}

export default withRouter(LogInPage);
