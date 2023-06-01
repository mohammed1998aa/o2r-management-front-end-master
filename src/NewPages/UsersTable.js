import React, { useEffect, useState } from "react";
import UsersTableLeftBar from "./UsersTableComponents/UsersTableLeftBar";
import UsersTableRightBar from "./UsersTableComponents/UsersTableRightBar";
import UsersTableTable from "./UsersTableComponents/UsersTableTable";
import UsersTableHeader from "./UsersTableComponents/UsersTableHeader";
import axios from "axios";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import UsersTableAccountSetting from "./UsersTableComponents/UsersTableAccountSetting";

function UsersTable(props) {
  const { pathname } = useLocation();
  const name1 = props.location.state.userObj2Send.name;
  const password1 = props.location.state.userObj2Send.password;
  const data2 = props.location.state.userObj2Send.data2;
  const email1 = props.location.state.userObj2Send.email1;

  console.log("UsersTable");
  console.log(email1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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

  const [AllUsers, setAllUsers] = useState();

  // const handleChildFunctionalCall = () => {
  //   console.log("Child called this function!");
  // };
  useEffect(() => {}, []);
  return (
    <div>
      {/* <UsersTableAccountSetting
        callParentFunction={handleChildFunctionalCall}
      /> */}
      <div
        style={{
          flex: 1,
        }}
        //For Phone number i will delete this and do drop down from header
      >
        <div style={{}}>
          {width > 766 ? <> </> : <></>}
          <UsersTableLeftBar
            name1={name1}
            password1={password1}
            data2={data2}
            email1={email1}
          />
          {/* <UsersTableTable /> */}
        </div>
      </div>
    </div>
  );
}
export default withRouter(UsersTable);
