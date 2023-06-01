import React from "react";
import { useState, useEffect, Dimensions } from "react";
import { withRouter, useHistory, Link } from "react-router-dom";

import "../PagesCSS/LogInPage.css";
import "antd/dist/antd.css";
import o2runbox from "../Images/o2runbox.png";
import ss from "../Images/ss.png";
import {
  PhoneOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

import "bootstrap/dist/css/bootstrap.css";
import { Button, Input } from "antd";
function ConfirmationPassword(props) {
  const [password, setPassword] = useState("");

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

  const GoToHomePage = () => {
    props.history.push("/LogInPage");
  };
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
            // width: windowWidth / 1,
            // height: windowHeight / 3,
          }}
          src={ss}
          class="rounded float-start"
          alt="image"
        ></img>
      </div>

      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
        class="position-absolute top-50 start-50 translate-middle"
      >
        <br></br>
        <h1
          style={{
            color: "#a855f7",
            fontSize: 20,
            //    fontWeight: "bold",
            textAlign: "left",
          }}
        >
          Enter password that you receive to email
        </h1>

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
        <h1
          style={{
            color: "#a855f7",
            fontSize: 20,
            //    fontWeight: "bold",
            textAlign: "left",
          }}
        >
          Enter new password
        </h1>

        <Input.Password
          style={{
            width: width > 1500 ? width / 5 : width / 2.8,
            borderRadius: 10,
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          size="large"
          placeholder="New password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
        <br></br>
        <Input.Password
          style={{
            width: width > 1500 ? width / 5 : width / 2.8,
            borderRadius: 10,
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          size="large"
          placeholder="Confirm pssword"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
        <br></br>

        <Button
          style={{
            width: width > 1400 ? width / 6 : width / 3.2,

            borderRadius: 15,
            backgroundColor: "#a855f7",
            color: "white",
          }}
          onClick={() => {
            GoToHomePage();
          }}
          // type="primary"
        >
          Set
        </Button>
      </div>

      <div class="position-absolute bottom-0 start-0">
        <img
          style={{
            width: "100%",
            height: height / 6,
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
export default withRouter(ConfirmationPassword);
