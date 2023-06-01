import axios from "axios";

import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { display } from "@mui/system";
import { Input, Space, Table, Typography, Button, Checkbox, Empty } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import "antd/dist/antd.css";
import { MyUrl } from "../../App";

//import "../../Pages/styles.css";

var MyArray = [];
var Obj = {};
var Obj1 = {};
var Obj2 = {};
export default function UsersTableBIProjectConfigurationADV() {
  const [data2, setData2] = useState("");
  const [IsLoading, setIsLoading1] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [Update, setUpdate] = useState(0);
  const [TextUpdate, setTextUpdate] = useState("");

  const [AdvertiserId, setAdvertiserId] = useState("");
  const [CampaignId, setCampaignId] = useState("");

  const [UpdateBillingName, setUpdateBillingName] = useState("");
  const [UpdateCollectionBy, setUpdateCollectionBy] = useState("");

  const searchInput = useRef(null);
  const UpdateTrafficSource = (value1, value2) => {
    console.log("UpdateTrafficSource");
    console.log(value1);
    console.log(value2);
    console.log(UpdateBillingName);
    console.log(UpdateCollectionBy);
    let base64 = require("base-64"); // install it before use from npm i base-64
    var userObj = {
      advertiser: {
        id: value1,
        billingName: UpdateBillingName,
      },
      collectionBy: UpdateCollectionBy,
      campaign: {
        id: value2,
      },
    };
    const article = { title: "React PUT Request Example" };
    // const headers = {
    //   Authorization: "Basic " + base64.encode(name1 + ":" + password1),
    // };
    axios
      .put(
        `${MyUrl}/api/BIManagment/updateAdvertiserCampaign`,
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
        setUpdateBillingName("");
        setUpdateCollectionBy("");
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
      title: "SeatId",
      dataIndex: "SeatId",
      ...getColumnSearchProps("SourceName"),
      sorter: (a, b) => a.SeatId.length - b.SeatId.length,
      sortDirections: ["descend", "ascend"],
      //   render: (value) => {
      //     return value; // Number(value * 1).toLocaleString("en");
      //   },
    },
    {
      title: "AdvertiserName",
      dataIndex: "AdvertiserName",
      key: "AdvertiserName",
      ...getColumnSearchProps("AdvertiserName"),
      sorter: (a, b) => a.AdvertiserName.length - b.AdvertiserName.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "CampaignName",
      dataIndex: "CampaignName",
      editable: true,
      //   key: "CampaignName",
      ...getColumnSearchProps("CampaignName"),
      sorter: (a, b) => a.CampaignName.length - b.CampaignName.length,
      sortDirections: ["descend", "ascend"],
      render: (value) => {
        return value;
      },
    },
    {
      title: "CollectionBy",
      dataIndex: "CollictionBy",
      editable: true,
      //   key: "BillingName",
      ...getColumnSearchProps("CollictionBy"),
      sorter: (a, b) => a.CollictionBy.length - b.CollictionBy.length,
      sortDirections: ["descend", "ascend"],
      render: (value) => {
        return value;
      },
    },
    {
      title: "BillingName",
      dataIndex: "BillingName",
      editable: true,
      //   key: "BillingName",
      ...getColumnSearchProps("BillingName"),
      sorter: (a, b) => a.BillingName.length - b.BillingName.length,
      sortDirections: ["descend", "ascend"],
      render: (value) => {
        return value;
      },
    },
    {
      title: "AdvertiserId",
      dataIndex: "AdvertiserId",

      editable: true,
      //   key: "BillingName",
      ...getColumnSearchProps("AdvertiserId"),
      sorter: (a, b) => a.AdvertiserId.length - b.AdvertiserId.length,
      sortDirections: ["descend", "ascend"],

      render: (value) => {
        return (
          <div>
            <h5>Edit Billing Name</h5>
            <input
              type="text"
              value={UpdateBillingName}
              onChange={(e) => setUpdateBillingName(e.target.value)}
            ></input>
            <br></br>
            <h5>Edit CollectionBy</h5>
            <input
              type="text"
              value={UpdateCollectionBy}
              onChange={(e) => setUpdateCollectionBy(e.target.value)}
            ></input>
            <button
              onClick={() => {
                UpdateFunc(value[0], value[1]);
              }}
            >
              Edit
            </button>{" "}
          </div>
        );
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
    Obj2 = {};
    try {
      axios
        .get(
          `${MyUrl}/api/BIManagment/getAdvertisersCampaign
                  `
        )
        .then((res) => {
          const data2 = res.data;
          console.log(data2);

          for (let i = 0; i < data2.responseData.length; i++) {
            Obj2 = [
              data2.responseData[i].advertiser.id,
              data2.responseData[i].campaign.id,
            ];
            Obj = {
              SeatId: data2.responseData[i].seatName,
              AdvertiserName: data2.responseData[i].advertiser.name,
              CampaignName: data2.responseData[i].campaign.name,
              CollictionBy: data2.responseData[i].collectionBy,
              BillingName: data2.responseData[i].advertiser.billingName,
              AdvertiserId: Obj2,
              CampaignId: data2.responseData[i].campaign.id,
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

  const UpdateFunc = (value1, value2) => {
    for (let i = 0; i < MyArray.length; i++) {
      if (
        value1 === MyArray[i].AdvertiserId[0] &&
        value2 === MyArray[i].AdvertiserId[1]
      ) {
        Obj1 = {
          SeatId: MyArray[i].seatName,
          AdvertiserName: MyArray[i].AdvertiserName,
          CampaignName: MyArray[i].CampaignName,
          CollictionBy: MyArray[i].CollictionBy,
          BillingName: MyArray[i].BillingName,
          AdvertiserId: MyArray[i].AdvertiserId,
          CampaignId: MyArray[i].CampaignId,
        };
        console.log("UpdateFunc");
        console.log(Obj1.AdvertiserId[0]);
        console.log(Obj1.AdvertiserId[1]);

        console.log(Obj1);

        UpdateTrafficSource(Obj1.AdvertiserId[0], Obj1.AdvertiserId[1]);
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
        </>
      )}
    </div>
  );
}
