import React from "react";
import { withRouter, useHistory, Link } from "react-router-dom";
import { useState, useEffect, Dimensions } from "react";

import "../PagesCSS/LogInPage.css";
import "antd/dist/antd.css";
import o2runbox from "../Images/o2runbox.png";
import ss from "../Images/ss.png";

import "bootstrap/dist/css/bootstrap.css";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, message, Space, Tooltip } from "antd";
function ErorrPage(props) {
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
  const handleButtonClick = (e) => {
    message.info("Click on left button.");
    console.log("click left button", e);
  };
  const handleMenuClick = (e) => {
    message.info("Click on menu item." + e.key + " page:-" + e.label);
    console.log("click", e);
  };
  const menu = (
    <Menu
      onClick={handleButtonClick}
      items={[
        {
          label: "1st menu item",
          key: "1",
          icon: <UserOutlined />,
          page: "ee",
        },
        {
          label: (
            <div
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "http://google.com";
              }}
            >
              <h5>sss</h5>
            </div>
          ),
          key: "2",
          icon: <UserOutlined />,
          page: "ee",
        },
        {
          label: "3rd menu item",
          key: "3",
          icon: <UserOutlined />,
          page: "ee",
        },
      ]}
    />
  );
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
        <h1>aaa</h1>
        <Space wrap>
          <Dropdown.Button
            overlay={menu}
            placement="bottom"
            icon={<UserOutlined />}
          >
            {/* <h6>Dropdown</h6> */}
          </Dropdown.Button>
        </Space>
        <h1
          style={{
            textAlign: "center",
            color: "#a855f7",
            fontSize: 90,
            fontWeight: "bold",
          }}
        >
          Oops !
        </h1>
        <h1
          style={{
            textAlign: "center",
            color: "#a855f7",
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          404 - PAGE NOT FOUND
        </h1>
        <h1
          style={{
            color: "#a855f7",
            fontSize: 20,
            //    fontWeight: "bold",
            textAlign: "center",
          }}
        >
          The page you are looking for might have been removed had its name
          changed or temporarily unavailable.
        </h1>
        <br></br>
        <Button
          style={{
            width: width > 1400 ? width / 6 : width / 3.2,

            borderRadius: 15,
            backgroundColor: "#a855f7",
            color: "white",
          }}
          onClick={() => props.history.goBack()}
          // type="primary"
        >
          back
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
export default withRouter(ErorrPage);
