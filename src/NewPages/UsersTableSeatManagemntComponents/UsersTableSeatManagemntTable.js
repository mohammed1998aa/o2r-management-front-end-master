import axios from "axios";

import React, { useState, useEffect, useRef } from "react";
import { display } from "@mui/system";
import { Input, Space, Table, Typography, Button, Checkbox, Empty } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import "antd/dist/antd.css";
//import "../../Pages/styles.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { MyUrl } from "../../App";

var MyArray = [];
var Obj = {};
var Obj1 = {};
var jwtToken = "";
export default function UsersTableSeatManagemntTable() {
  const [data2, setData2] = useState("");
  const [IsLoading, setIsLoading1] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [Update, setUpdate] = useState(0);
  const [TextUpdate, setTextUpdate] = useState("");
  const [CreateSeat, setCreateSeat] = useState(false);

  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [servingFee, setservingFee] = useState("");
  const [scoringFee, setscoringFee] = useState("");
  const [partnerFee, setpartnerFee] = useState("");
  const [ctvCpm, setctvCpm] = useState("");
  const [inappCpm, setinappCpm] = useState("");
  const [pixalateFee, setpixalateFee] = useState(0);
  const [color, setcolor] = useState("");

  const [id1, setId1] = useState();
  const [userName1, setuserName1] = useState(Obj1.userName);
  const [password1, setpassword1] = useState("");
  const [name1, setname1] = useState("");
  const [servingFee1, setservingFee1] = useState("");
  const [scoringFee1, setscoringFee1] = useState("");
  const [partnerFee1, setpartnerFee1] = useState("");
  const [ctvCpm1, setctvCpm1] = useState("");
  const [inappCpm1, setinappCpm1] = useState("");
  const [pixalateFee1, setpixalateFee1] = useState("");
  const [color1, setcolor1] = useState("");

  const [OpenEdit, setOpenEdit] = useState(false);
  const [EditId, setEditId] = useState();

  const [DeleteSeat, setDeleteSeat] = useState("");

  const items1 = localStorage.getItem("User");
  const [CheckTypeOfUser, setCheckTypeOfUser] = useState("");

  const ChckRefreshFunc = async () => {
    if (items1 === null) {
      const items = sessionStorage.getItem("User");
      var parsed = JSON.parse(items);
      setCheckTypeOfUser(parsed.role);
      jwtToken = parsed.token;
      const base64Url = jwtToken.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(atob(base64));
      const expirationDate = new Date(payload.exp * 1000);
      const currentTime = new Date().getTime(); // Get the current time in milliseconds
      if (expirationDate < currentTime) {
        try {
          axios
            .post(
              `${MyUrl}/api/RefreshToken/refresh`,
              { accessToken: jwtToken },
              { withCredentials: true }
            )
            .then((response) => {
              CallData1();
              parsed.token = response.data.accessToken;
              const updatedObjString = JSON.stringify(parsed);
              sessionStorage.setItem("User", updatedObjString);
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {}
      } else {
        console.log("Token is still valid");
        CallData1();
      }
    } else {
      const items = sessionStorage.setItem("User", JSON.stringify(items1));
      var parsed = JSON.parse(items1);
      setCheckTypeOfUser(parsed.role);
      jwtToken = parsed.token;
    }
  };
  useEffect(() => {
    ChckRefreshFunc();
  }, []);
  if (items1 === null) {
    const items = sessionStorage.getItem("User");
    var parsed = JSON.parse(items);
  } else {
    const items = sessionStorage.setItem("User", JSON.stringify(items1));
    var parsed = JSON.parse(items1);
  }

  const searchInput = useRef(null);
  const UpdateSeat = async () => {
    //  setErorrMessage("");
    await ChckRefreshFunc();

    let base64 = require("base-64"); // install it before use from npm i base-64
    var userObj = {
      id: id1,
      userName: userName1,
      password: password1,
      name: name1,
      servingFee: servingFee1,
      scoringFee: scoringFee1,
      partnerFee: partnerFee1,
      ctvCpm: ctvCpm1,
      inappCpm: inappCpm1,
      pixalateFee: pixalateFee1,
      color: color1,
    };
    const article = { title: "React PUT Request Example" };
    // const headers = {
    //   Authorization: "Basic " + base64.encode(name1 + ":" + password1),
    // };
    axios
      .put(
        `${MyUrl}/api/SeatManagment/updateSeat`,
        userObj
        // {
        //   headers,
        // }
      )
      // .then(response => setUpdatedAt(response.data.updatedAt));
      .then((response) => {
        // setStatus(response.status);
        // callIt();
        // handleClose1();
        // handleClick();
        // setIsTrue(!isTrue);
        CallData1();
      })
      .catch((error) => {
        // setErorrMessage(error.response.data.errorMessage);
      });
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890FF" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#FFC069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  console.log(TextUpdate);
  useEffect(() => {
    //CallData1();
  }, []); // shoud add newArray10
  const dataSource = MyArray;
  const columns = [
    {
      title: "name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
      //   render: (value) => {
      //     return value; // Number(value * 1).toLocaleString("en");
      //   },
    },
    {
      title: "userName",
      dataIndex: "userName",
      ...getColumnSearchProps("userName"),
      sorter: (a, b) => a.userName.length - b.userName.length,
      sortDirections: ["descend", "ascend"],
      //   render: (value) => {
      //     return value; // Number(value * 1).toLocaleString("en");
      //   },
    },
    {
      title: "servingFee",
      dataIndex: "servingFee",
      key: "servingFee",
      ...getColumnSearchProps("servingFee"),
      sorter: (a, b) => a.servingFee.length - b.servingFee.length,
      sortDirections: ["descend", "ascend"],
    },
    // {
    //   title: "pixalateFee",
    //   dataIndex: "pixalateFee",
    //   editable: true,
    //   //   key: "pixalateFee",
    //   ...getColumnSearchProps("pixalateFee"),
    //   sorter: (a, b) => a.pixalateFee.length - b.pixalateFee.length,
    //   sortDirections: ["descend", "ascend"],
    //   render: (value) => {
    //     return value;
    //   },
    // },
    {
      title: "password",
      dataIndex: "password",
      editable: true,
      //   key: "partnerFee",
      ...getColumnSearchProps("password"),
      sorter: (a, b) => a.password.length - b.password.length,
      sortDirections: ["descend", "ascend"],
      render: (value) => {
        return value;
      },
    },
    {
      title: "partnerFee",
      dataIndex: "partnerFee",
      editable: true,
      //   key: "partnerFee",
      ...getColumnSearchProps("partnerFee"),
      sorter: (a, b) => a.partnerFee.length - b.partnerFee.length,
      sortDirections: ["descend", "ascend"],
      render: (value) => {
        return value;
      },
    },
    {
      title: "Scoring Fee",
      dataIndex: "CampscoringFeeaignName",
      editable: true,
      //   key: "partnerFee",
      ...getColumnSearchProps("CampscoringFeeaignName"),
      sorter: (a, b) =>
        a.CampscoringFeeaignName.length - b.CampscoringFeeaignName.length,
      sortDirections: ["descend", "ascend"],
      render: (value) => {
        return value;
      },
    },

    {
      title: "inappCpm",
      dataIndex: "inappCpm",
      editable: true,
      //   key: "partnerFee",
      ...getColumnSearchProps("inappCpm"),
      sorter: (a, b) => a.inappCpm.length - b.inappCpm.length,
      sortDirections: ["descend", "ascend"],
      render: (value) => {
        return value;
      },
    },
    {
      title: "ctvCpm",
      dataIndex: "ctvCpm",
      editable: true,
      //   key: "ctvCpm",
      ...getColumnSearchProps("ctvCpm"),
      sorter: (a, b) => a.ctvCpm.length - b.ctvCpm.length,
      sortDirections: ["descend", "ascend"],
      render: (value) => {
        return value;
      },
    },
    {
      title: "Edit",
      dataIndex: "id",
      editable: true,
      //   key: "id",
      ...getColumnSearchProps("id"),
      sorter: (a, b) => a.id.length - b.id.length,
      sortDirections: ["descend", "ascend"],
      render: (value) => {
        return (
          <>
            <>
              {/* you want delete or Edit ? */}
              <button
                onClick={() => {
                  setOpenEdit(true);
                  setEditId(value);
                  FindSeatById(value);
                  UpdateAdvertiserCampaign(value);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setDeleteSeat(value);
                  DeleteSeatFunc(value);
                }}
              >
                delete
              </button>

              {/* <button
                onClick={() => {
                  setDeleteSeat(0);
                  setOpenEdit(false);
                  setUpdate(0);
                }}
              >
                Cancel
              </button> */}
              {/* {value} */}
            </>
            {Update === value ? (
              <></>
            ) : (
              <div
                onClick={() => {
                  setUpdate(value);
                }}
              >
                {" "}
                {/* <button
                  onClick={() => {
                    setDeleteSeat(value);
                    setOpenEdit(true);
                  }}
                >
                  Edit
                </button> */}
              </div>
            )}
          </>
        );
      },
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const UpdateAdvertiserCampaign = (nonEmptyObject) => {
    console.log("UpdateTrafficSource");
    let base64 = require("base-64"); // install it before use from npm i base-64
    var userObj = nonEmptyObject;
    const article = { title: "React PUT Request Example" };
    axios
      .put(`${MyUrl}/api/SeatManagment/updateSeat`, {
        headers: {
          Authorization:
            "Basic " + base64.encode(parsed.name + ":" + parsed.password),
        },
      })
      .then((response) => {
        CallData1();
        //items.length = 0;
      })
      .catch((error) => {
        // setErorrMessage(error.response.data.errorMessage);
      });
  };
  const CallData1 = (a) => {
    setIsLoading1(true);
    MyArray.length = 0;
    Obj = {};
    try {
      axios
        .get(
          `${MyUrl}/api/SeatManagment/getSeats
                  `
        )
        .then((res) => {
          const data2 = res.data;
          console.log(data2);
          for (let i = 0; i < data2.responseData.length; i++) {
            Obj = {
              id: data2.responseData[i].id,
              name: data2.responseData[i].name,
              userName: data2.responseData[i].userName,
              servingFee: data2.responseData[i].servingFee,
              CampscoringFeeaignName: data2.responseData[i].scoringFee,
              pixalateFee: data2.responseData[i].pixalateFee,
              password: data2.responseData[i].password,
              partnerFee: data2.responseData[i].partnerFee,
              inappCpm: data2.responseData[i].inappCpm,
              id: data2.responseData[i].id,
              ctvCpm: data2.responseData[i].ctvCpm,
              color: data2.responseData[i].color,
            };
            MyArray.push(Obj);
          }
          console.log(MyArray);
        })
        .catch((error) => {})
        .finally(() => {
          setIsLoading1(false);
        });
    } catch (error) {}
  };

  const DeleteSeatFunc = (value) => {
    //  setErorrMessage("");

    let base64 = require("base-64"); // install it before use from npm i base-64
    var userObj = {
      sourceId: Update,
      trafficSrc: TextUpdate,
    };
    const article = { title: "React PUT Request Example" };
    // const headers = {
    //   Authorization: "Basic " + base64.encode(name1 + ":" + password1),
    // };
    axios
      .delete(
        `${MyUrl}/api/SeatManagment/deleteSeat/${value}`
        // userObj
        // {
        //   headers,
        // }
      )
      // .then(response => setUpdatedAt(response.data.updatedAt));
      .then((response) => {
        // setStatus(response.status);
        // callIt();
        // handleClose1();
        // handleClick();
        // setIsTrue(!isTrue);
        CallData1();
      })
      .catch((error) => {
        // setErorrMessage(error.response.data.errorMessage);
      });
  };
  const CreateSeatFunc = () => {
    //  setErorrMessage("");

    let base64 = require("base-64"); // install it before use from npm i base-64
    var userObj = {
      userName: userName,
      password: password,
      name: name,
      servingFee: servingFee,
      scoringFee: scoringFee,
      partnerFee: partnerFee,
      ctvCpm: ctvCpm,
      inappCpm: inappCpm,
      pixalateFee: pixalateFee,
      color: color,
    };
    const article = { title: "React Post Request Example" };
    // const headers = {
    //   Authorization: "Basic " + base64.encode(name1 + ":" + password1),
    // };
    axios
      .post(
        `${MyUrl}/api/SeatManagment/createSeat`,
        userObj
        // {
        //   headers,
        // }
      )
      // .then(response => setUpdatedAt(response.data.updatedAt));
      .then((response) => {
        // setStatus(response.status);
        // callIt();
        // handleClose1();
        // handleClick();
        // setIsTrue(!isTrue);
        CallData1();
      })
      .catch((error) => {
        // setErorrMessage(error.response.data.errorMessage);
      });
  };

  const FindSeatById = (value) => {
    console.log(MyArray.length);
    for (let i = 0; i < MyArray.length; i++) {
      if (value === MyArray[i].id) {
        Obj1 = {
          name: MyArray[i].name,
          userName: MyArray[i].userName,
          servingFee: MyArray[i].servingFee,
          CampscoringFeeaignName: MyArray[i].CampscoringFeeaignName,
          pixalateFee: MyArray[i].pixalateFee,
          password: MyArray[i].password,
          partnerFee: MyArray[i].partnerFee,
          inappCpm: MyArray[i].inappCpm,
          id: MyArray[i].id,
          ctvCpm: MyArray[i].ctvCpm,
          color: MyArray[i].color,
          id: MyArray[i].id,
        };
        console.log(Obj1);

        setname1(MyArray[i].name);
        setuserName1(MyArray[i].userName);
        setpassword1(MyArray[i].password);
        setservingFee1(MyArray[i].servingFee);
        setscoringFee1(MyArray[i].CampscoringFeeaignName);
        setpartnerFee1(MyArray[i].partnerFee);
        setctvCpm1(MyArray[i].ctvCpm);
        setinappCpm1(MyArray[i].inappCpm);
        setpixalateFee1(MyArray[i].pixalateFee);
        setcolor1(MyArray[i].color);
        setId1(MyArray[i].id);
      }
    }
  };
  return (
    <div>
      {IsLoading ? (
        <>Loading...</>
      ) : (
        <>
          <Table
            editable={true}
            dataSource={dataSource}
            columns={columns}
            //  onChange={onChange}
          />
          <button
            onClick={() => {
              setCreateSeat(true);
            }}
          >
            Create Seat
          </button>
          {CreateSeat ? (
            <>
              <br></br>
              <div
                style={{
                  display: "flex",
                  flexDirection: "culomn",
                  flexWrap: "wrap",
                  padding: 10,
                }}
              >
                <h5>userName</h5>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setuserName(e.target.value)}
                ></input>

                <h5>password</h5>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                ></input>

                <h5>name</h5>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                ></input>

                <h5>servingFee</h5>
                <input
                  type="text"
                  value={servingFee}
                  onChange={(e) => setservingFee(e.target.value)}
                ></input>

                <h5>scoringFee</h5>
                <input
                  type="text"
                  value={scoringFee}
                  onChange={(e) => setscoringFee(e.target.value)}
                ></input>

                <h5>partnerFee</h5>
                <input
                  type="text"
                  value={partnerFee}
                  onChange={(e) => setpartnerFee(e.target.value)}
                ></input>

                <h5>ctvCpm</h5>
                <input
                  type="text"
                  value={ctvCpm}
                  onChange={(e) => setctvCpm(e.target.value)}
                ></input>

                <h5>inappCpm</h5>
                <input
                  type="text"
                  value={inappCpm}
                  onChange={(e) => setinappCpm(e.target.value)}
                ></input>

                {/* <h5>pixalateFee</h5>
                <input
                  type="text"
                  value={pixalateFee}
                  onChange={(e) => setpixalateFee(e.target.value)}
                ></input> */}

                <h5>color</h5>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setcolor(e.target.value)}
                ></input>

                <button
                  onClick={() => {
                    CreateSeatFunc();
                    setCreateSeat(false);
                  }}
                >
                  Done
                </button>
                <button
                  onClick={() => {
                    setCreateSeat(false);
                  }}
                >
                  cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <br></br>is Close{" "}
            </>
          )}

          {OpenEdit ? (
            <>
              <br></br>
              <div
                style={{
                  display: "flex",
                  flexDirection: "culomn",
                  flexWrap: "wrap",
                  padding: 10,
                }}
              >
                <h5>userName</h5>
                <input
                  name="sss"
                  value={userName1}
                  onChange={(e) => {
                    setuserName1(e.target.value);
                  }}
                ></input>

                <h5>password</h5>
                <input
                  type="text"
                  value={password1}
                  onChange={(e) => setpassword1(e.target.value)}
                ></input>

                <h5>name</h5>
                <input
                  type="text"
                  value={name1}
                  onChange={(e) => setname1(e.target.value)}
                ></input>

                <h5>servingFee</h5>
                <input
                  type="text"
                  value={servingFee1}
                  onChange={(e) => setservingFee1(e.target.value)}
                ></input>

                <h5>scoringFee</h5>
                <input
                  type="text"
                  value={scoringFee1}
                  onChange={(e) => setscoringFee1(e.target.value)}
                ></input>

                <h5>partnerFee</h5>
                <input
                  type="text"
                  value={partnerFee1}
                  onChange={(e) => setpartnerFee1(e.target.value)}
                ></input>

                <h5>ctvCpm</h5>
                <input
                  type="text"
                  value={ctvCpm1}
                  onChange={(e) => setctvCpm1(e.target.value)}
                ></input>

                <h5>inappCpm</h5>
                <input
                  type="text"
                  value={inappCpm1}
                  onChange={(e) => setinappCpm1(e.target.value)}
                ></input>

                {/* <h5>pixalateFee</h5>
                <input
                  type="text"
                  value={pixalateFee1}
                  onChange={(e) => setpixalateFee1(e.target.value)}
                ></input> */}

                <h5>color</h5>
                <input
                  type="text"
                  value={color1}
                  onChange={(e) => setcolor1(e.target.value)}
                ></input>

                <button
                  onClick={() => {
                    UpdateSeat();
                    //      setCreateSeat(false);
                  }}
                >
                  Doneaa
                </button>
              </div>
              is open {EditId}
              <button
                onClick={() => {
                  setOpenEdit(false);
                }}
              >
                close
              </button>
            </>
          ) : (
            <>is close</>
          )}
        </>
      )}
    </div>
  );
}
