import { useEffect, useState, useCallback, CSSProperties } from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import logoHome from "./../../Images/logoHome.png";

export default function LeftSide({ name1 }) {
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

  return (
    <div
      style={{
        flex: 1,
        background: " linear-gradient(to right,#ffff,#d8ccf4)",
        height: "100vh",
        padding: 10,
        //   justifyContent: "center",
        //   alignItems: "center",
        //   display: "flex",
      }}
    >
      <div style={{ flex: 1 }}>
        <img
          style={{
            maxWidth:
              height < 570
                ? "0%"
                : width > 1201
                ? "10%"
                : width > 1025
                ? "10%"
                : width > 769
                ? "10%"
                : width > 481
                ? "15%"
                : width > 320
                ? "15%"
                : "15%",
          }}
          src={logoHome}
        ></img>
      </div>
      <div
        style={{
          flex: 1,
          height: "15%",
          //  background: "white",
        }}
      ></div>
      <div
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <h5>
          Good morning, {name1}!{<br></br>}
          <h1>Select Service</h1>
        </h5>
      </div>
    </div>
  );
}
