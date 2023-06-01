import React from "react";
import { useEffect, useState, useCallback, CSSProperties } from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import upright from "./../../Images/upright.png";
import statistic from "./../../Images/statistic.png";
import computerworker from "./../../Images/computerworker.png";
import Arrrow from "./../../Images/Arrrow.png";
import Bars from "./../../Images/Bars.png";

import ProfilePicture from "./../../Images/ProfilePicture.png";

import MovingText from "react-moving-text";
//MovingComponent
import TextTransition, { presets } from "react-text-transition";
import MovingComponent from "react-moving-text";
const TEXTS = [
  "Increased customer acquistion",
  "Upsell and cross-sell opportunities.",
  " Improved customer retention, lifetime value, and loyalty.",
];

export default function RigthSide() {
  const { pathname } = useLocation();
  const [height, width] = useWindowSize();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      4000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

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

  return (
    <div
      style={{
        flex: 1,
        background: " linear-gradient(to right,#d8ccf4, #ffff)",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <div
        style={{
          flex: 1,
          padding: "8%",
        }}
      >
        <h1>Manage your O2R clients {<br></br>}data in one place.</h1>
        <h5>
          <TextTransition springConfig={presets.wobbly}>
            {TEXTS[index % TEXTS.length]}
          </TextTransition>
        </h5>
        {/* <h5>Increased customer acquisition.</h5> */}
        <br></br>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              padding: 20,
              background: "white",
              width: "40%",
              // height: height / 15,
              borderRadius: 15,
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <img
                alt="image"
                class="rounded float-start"
                style={{
                  position: "relative",
                  bottom: 0,
                  display: "block",
                  maxHeight: "auto",
                  maxWidth:
                    height < 570
                      ? "5%"
                      : width > 1201
                      ? "15%"
                      : width > 1025
                      ? "20%"
                      : width > 769
                      ? "25%"
                      : width > 481
                      ? "30%"
                      : width > 320
                      ? "25%"
                      : "25%",
                }}
                src={ProfilePicture}
              ></img>
              <h6 style={{ paddingLeft: 5 }}>
                Terry Price {<br></br>}
                <h1 style={{ fontSize: width / 100 }}>t.price@o2r.com</h1>
              </h6>
            </div>
            <div
              style={{
                paddingTop: "15%",
                height: width < 777 ? "30%" : "40%",
                flex: 3,
              }}
            ></div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h1
                style={{
                  fontSize: width <= 769 ? 10 : 16,
                }}
              >
                admin
              </h1>
              <div
                style={{
                  width: width <= 1441 ? "45%" : "30%",
                  background: "#dcfce7",
                  borderRadius: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h1
                  style={{
                    fontSize: width <= 769 ? 10 : 16,
                  }}
                >
                  active
                </h1>
              </div>
            </div>
          </div>
          <div
            style={{
              padding: 5,
              paddingTop: 10,
              background: "white",
              width: "40%",
              borderRadius: 15,
            }}
          >
            <h6 style={{ opacity: 0.7 }}>Income 2022</h6>
            <img
              style={{ width: "80%", height: "50%", paddingTop: "5%" }}
              src={Bars}
            ></img>
          </div>
        </div>
        <div
          style={{
            borderRadius: 15,
            marginLeft: "40%",
            background: "white",
            width: "20%",
            minHeight: height / 10,
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img style={{ width: "25%", height: "auto" }} src={Arrrow}></img>
        </div>
      </div>
    </div>
  );
}
