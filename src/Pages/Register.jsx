import React from "react";
import { useState, useEffect, Dimensions } from "react";

import { withRouter, useHistory, Link } from "react-router-dom";
import axios from "axios";
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
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

function Register(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [DataisLoaded, setDataisLoaded] = useState(false);
  const [Client, setClient] = useState({});
  const [DoesExist, setDoesExist] = useState(null);
  const [IsEmpty, setIsEmpty] = useState("yes");
  let history = useHistory();
  const [ClientName, setClientName] = useState({});

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

  return (
    <div
      style={{
        background: "linear-gradient(#d8ccf4, #9198e5)",
        backgroundSize: "cover",
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
          width: width > 1500 ? width / 4 : width / 2.4,
          height: windowHeight / 2,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          marginTop: 80,
        }}
        class="shadow p-3 mb-5 bg-body rounded-5 position-absolute top-50 start-50 translate-middle"
      >
        <h2 style={{ fontWeight: "bold" }}>Sign Up</h2>
        <br></br>
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
            onClick={() => {}}
            // type="primary"
          >
            Sign up
          </Button>
          <div>
            <br></br>
            <h6
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Link
                style={{ color: "#a78bfa" }}
                onClick={() => {
                  props.history.goBack();
                }}
              >
                back
              </Link>
            </h6>
          </div>
        </div>
      </div>

      <div class="position-absolute bottom-0 start-0">
        <img
          style={{
            width: "100%",
            height: height / 6,
            height: windowHeight / 6,
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
export default withRouter(Register);
