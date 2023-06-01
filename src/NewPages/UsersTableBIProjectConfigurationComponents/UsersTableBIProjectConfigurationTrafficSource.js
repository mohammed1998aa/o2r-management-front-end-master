import axios from "axios";

import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { display } from "@mui/system";
import { Input, Space, Table, Typography, Button, Checkbox, Empty } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import "antd/dist/antd.css";
//import "../../Pages/styles.css";
import { MyUrl } from "../../App";

var MyArray = [];
var Obj = {};

export default function UsersTableBIProjectConfigurationTrafficSource() {
  const [data2, setData2] = useState("");
  const [IsLoading, setIsLoading1] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [Update, setUpdate] = useState(0);
  const [TextUpdate, setTextUpdate] = useState("");

  const searchInput = useRef(null);
  const UpdateTrafficSource = () => {
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
      .put(
        `${MyUrl}/api/BIManagment/updateTrafficSource`,
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
    CallData1();
  }, []); // shoud add newArray10
  const dataSource = MyArray;

  const columns = [
    {
      title: "seatName",
      dataIndex: "seatName",
      ...getColumnSearchProps("seatName"),
      sorter: (a, b) => a.seatName.length - b.seatName.length,
      sortDirections: ["descend", "ascend"],
      //   render: (value) => {
      //     return value; // Number(value * 1).toLocaleString("en");
      //   },
    },
    {
      title: "channelId",
      dataIndex: "channelId",
      key: "channelId",
      ...getColumnSearchProps("channelId"),
      sorter: (a, b) => a.channelId.length - b.channelId.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "channelName",
      dataIndex: "channelName",
      editable: true,
      //   key: "channelName",
      ...getColumnSearchProps("channelName"),
      sorter: (a, b) => a.channelName.length - b.channelName.length,
      sortDirections: ["descend", "ascend"],
      render: (value) => {
        return value;
      },
    },
    {
      title: "sourceId",
      dataIndex: "sourceId",
      editable: true,
      ...getColumnSearchProps("sourceId"),
      sorter: (a, b) => a.sourceId.length - b.sourceId.length,
      sortDirections: ["descend", "ascend"],
      render: (value) => {
        return value;
      },
    },
    {
      title: "sourceName",
      dataIndex: "sourceName",
      editable: true,
      ...getColumnSearchProps("sourceName"),
      sorter: (a, b) => a.sourceName.length - b.sourceName.length,
      sortDirections: ["descend", "ascend"],
      render: (value) => {
        return value;
      },
    },
    {
      title: "trafficSrc",
      dataIndex: "trafficSrc",
      editable: true,
      ...getColumnSearchProps("trafficSrc"),
      sorter: (a, b) => a.trafficSrc.length - b.trafficSrc.length,
      sortDirections: ["descend", "ascend"],
      render: (value) => {
        return value;
      },
    },
    {
      title: "Update Traffic Source",
      dataIndex: "SourceId",
      ...getColumnSearchProps("SourceId"),
      sorter: (a, b) => a.SourceId.length - b.SourceId.length,
      sortDirections: ["descend", "ascend"],
      render: (value) => {
        return (
          <>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                console.log(Update);
                console.log(TextUpdate);

                setUpdate(value);
              }}
            >
              Edit
            </div>
            {Update === value ? (
              <>
                <input
                  type="text"
                  value={TextUpdate}
                  onChange={(e) => setTextUpdate(e.target.value)}
                ></input>
                <button
                  onClick={() => {
                    console.log(Update);
                    UpdateTrafficSource();
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setUpdate(10);
                    console.log(Update);
                  }}
                >
                  cancel
                </button>
              </>
            ) : (
              <></>
            )}
          </>
        ); // value; // Number(value * 1).toLocaleString("en");
      },
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const CallData1 = (a) => {
    setIsLoading1(true);
    MyArray.length = 0;
    Obj = {};
    try {
      axios
        .get(
          `${MyUrl}/api/BIManagment/getTrafficSource
                  `
        )
        .then((res) => {
          const data2 = res.data;
          console.log(data2);

          for (let i = 0; i < data2.responseData.length; i++) {
            if (data2.responseData[i].trafficSrc === "") {
              Obj = {
                channelId: data2.responseData[i].channelId,
                channelName: data2.responseData[i].channelName,
                seatId: data2.responseData[i].seatId,
                seatName: data2.responseData[i].seatName,
                sourceId: data2.responseData[i].sourceId,
                sourceName: data2.responseData[i].sourceName,
                trafficSrc: data2.responseData[i].trafficSrc,
              };
              MyArray.push(Obj);
            }
          }
          for (let i = 0; i < data2.responseData.length; i++) {
            if (data2.responseData[i].trafficSrc !== "") {
              Obj = {
                channelId: data2.responseData[i].channelId,
                channelName: data2.responseData[i].channelName,
                seatId: data2.responseData[i].seatId,
                seatName: data2.responseData[i].seatName,
                sourceId: data2.responseData[i].sourceId,
                sourceName: data2.responseData[i].sourceName,
                trafficSrc: data2.responseData[i].trafficSrc,
              };
              MyArray.push(Obj);
            }
          }
          console.log(MyArray);
        })
        .catch((error) => {})
        .finally(() => {
          setIsLoading1(false);
        });
    } catch (error) {}
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
        </>
      )}
    </div>
  );
}
