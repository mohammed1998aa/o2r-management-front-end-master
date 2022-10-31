import React from "react";
import { withRouter, useHistory, Link } from "react-router-dom";
import { useState, useEffect, Dimensions } from "react";
import {
  PhoneOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
} from "@ant-design/icons";
import "../PagesCSS/LogInPage.css";
import "antd/dist/antd.css";
import o2runbox from "../Images/o2runbox.png";
import ss from "../Images/ss.png";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Input } from "antd";

function PasswordForget(props) {
  const [email, setEmail] = useState("");
  let history = useHistory();
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
  const GoToConfirmaionPage = () => {
    history.push("/ConfirmationPassword");
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

      {/* <div
    style={{
      //  background: "white",
      //  width: windowWidth / 2,
      //    height: windowHeight / 2,
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      marginTop: 80,
    }}
    class="shadow p-3 mb-5 bg-body rounded-5 position-absolute top-50 start-50 translate-middle"
  >
    <h1 style={{ color: "#ef4444" }}>Oops</h1>

    <h1 style={{ color: "#ef4444" }}>404</h1>
  </div> */}
      <div
        style={{
          //  background: "white",
          //  width: windowWidth / 2,
          //    height: windowHeight / 2,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          //marginTop: 80,
        }}
        class="position-absolute top-50 start-50 translate-middle"
      >
        {/* <h1
          style={{
            textAlign: "center",
            color: "#a855f7",
            fontSize: 90,
            fontWeight: "bold",
          }}
        >
          Oops !
        </h1> */}
        <h1
          style={{
            textAlign: "center",
            color: "#a855f7",
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Reset password
        </h1>

        <h1
          style={{
            textAlign: "center",
            color: "#a855f7",
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          After you enter your email you will receive a new password to mail
        </h1>
        {/* then you enter the new password and you can reset it */}
        <br></br>
        <div
          style={{
            //  background: "white",
            //  width: windowWidth / 2,
            //    height: windowHeight / 2,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Input
            style={{
              width: width > 1500 ? width / 5 : width / 2.8,
              borderRadius: 10,
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="large"
            placeholder="Email"
            prefix={<MailOutlined />}
          />
        </div>
        <br></br>
        <Button
          style={{
            width: width > 1400 ? width / 6 : width / 3.2,
            borderRadius: 15,
            backgroundColor: "#a855f7",
            color: "white",
          }}
          onClick={() => {
            GoToConfirmaionPage();
          }}
          // type="primary"
        >
          confirm
        </Button>
        <br></br>
        <Link
          style={{ color: "#5b21b6" }}
          onClick={() => props.history.goBack()}
        >
          back
        </Link>
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
export default withRouter(PasswordForget);
