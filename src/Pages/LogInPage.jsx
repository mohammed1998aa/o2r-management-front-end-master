import { useState, useEffect, Dimensions, useCallback } from "react";
import { withRouter, useHistory, Link } from "react-router-dom";
import axios from "axios";
import {
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

function LogInPage(props) {
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
          `https://localhost:7006/api/Account/login
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

          if (Client.userName !== null) {
            setIsEmpty("yes");
            setDoesExist(true);
            var userObj1 = {
              name: name,
              password: password,
              nextUrl: Client.nextUrl,
            };
            console.log(Client.nextUrl);
            localStorage.setItem("User", JSON.stringify(userObj1));
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
    const items = JSON.parse(localStorage.getItem("User"));
    if (items) {
      setItems(items);
      history.push(`/${items.nextUrl}`, { userObj2Send: items });
    }
  }, []);

  const [height, width] = useWindowSize();
  return (
    <div
      style={{
        background: "linear-gradient(#d8ccf4, #9198e5)",
        backgroundSize: "cover",
        width: "100vw",
        height: "100vh",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <img
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          maxWidth:
            width > 1200
              ? "40%"
              : width > 767
              ? "45%"
              : width > 481
              ? "45%"
              : "80%",
        }}
        src={ss}
        class="rounded float-start"
        alt="image"
      ></img>

      <div
        style={{
          flex: 1,
          background: "white",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          width:
            width > 1201
              ? "20%"
              : width > 1025
              ? "30%"
              : width > 769
              ? "40%"
              : width > 481
              ? "50%"
              : width > 320
              ? "80%"
              : "80%",

          height:
            width > 1201
              ? "40%"
              : width > 1025
              ? "40%"
              : width > 769
              ? "50%"
              : width > 481
              ? "50%"
              : width > 320
              ? "60%"
              : "60%",
        }}
        class="shadow p-3 mb-5 bg-body rounded-5 position-absolute top-50 start-50 translate-middle"
      >
        <h2
          style={{
            fontSize: width > 767 ? "140%" : "120%",
            fontWeight: "bold",
          }}
        >
          O2R intelligence
        </h2>
        <br></br>{" "}
        <Input
          style={{
            maxWidth: "95%",
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
            maxWidth: "95%",

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
            <div></div>
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
        <div
          style={{
            width: "50%",
            display: "flex",
          }}
        >
          <Button
            style={{
              width: "100%",
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
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>

      <div class="position-absolute bottom-0 start-0">
        <img
          style={{
            position: "relative",
            bottom: 0,
            display: "block",
            maxHeight: "auto",
            maxWidth:
              height < 570
                ? "0%"
                : width > 1201
                ? "8%"
                : width > 1025
                ? "10%"
                : width > 769
                ? "12%"
                : width > 481
                ? "20%"
                : width > 320
                ? "25%"
                : "25%",
            // maxHeight: "auto",
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
