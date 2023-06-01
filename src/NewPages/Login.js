import { useEffect, useState, useCallback, CSSProperties } from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import upright from "../Images/upright.png";
import statistic from "../Images/statistic.png";
import computerworker from "../Images/computerworker.png";
import logoHome from "../Images/logoHome.png";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

import RigthSide from "./LoginComponents/RigthSide";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Outlet, Link } from "react-router-dom";
import LeftSide from "./LoginComponents/LeftSide";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function Login() {
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

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <LeftSide />
      {width < 767 ? <></> : <RigthSide />}
    </div>
  );
}
