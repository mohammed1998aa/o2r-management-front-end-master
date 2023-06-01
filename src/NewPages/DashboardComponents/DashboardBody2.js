import React from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect, Dimensions } from "react";
import { MyUrl } from "../../App";
import axios from "axios";
var jwtToken = "";
export default function DashboardBody2({ Data, name1, password1 }) {
  const { pathname } = useLocation();
  let [thecolor, setthecolor] = useState();
  const [thebutton, setthebutton] = useState("");

  const [ButtonName, setButtonName] = useState(0);
  //const [Data, setData2] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const items1 = localStorage.getItem("User");
  const [CheckTypeOfUser, setCheckTypeOfUser] = React.useState("");
  // const ChckRefreshFunc = async () => {
  //   var item2 = "";
  //   if (items1 === null) {
  //     const items = sessionStorage.getItem("User");
  //     item2 = items;
  //   } else {
  //     const items = localStorage.getItem("User");
  //     item2 = items;
  //   }
  //   var parsed = JSON.parse(item2);
  //   setCheckTypeOfUser(parsed.role);
  //   jwtToken = parsed.token;
  //   const base64Url = jwtToken.split(".")[1];
  //   const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  //   const payload = JSON.parse(atob(base64));
  //   const expirationDate = new Date(payload.exp * 1000);
  //   const currentTime = new Date().getTime(); // Get the current time in milliseconds
  //   if (expirationDate < currentTime) {
  //     try {
  //       axios
  //         .post(
  //           `${MyUrl}/api/RefreshToken/refresh`,
  //           { accessToken: jwtToken },
  //           { withCredentials: true }
  //         )
  //         .then((response) => {
  //           parsed.token = response.data.accessToken;
  //           // Store the updated object back in sessionStorage
  //           const updatedObjString = JSON.stringify(parsed);
  //           if (items1 === null) {
  //             sessionStorage.setItem("User", updatedObjString);
  //           } else {
  //             localStorage.setItem("User", updatedObjString);
  //           }
  //           getUrl(updatedObjString);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     } catch (error) {}
  //   } else {
  //     getUrl(jwtToken);
  //   }
  // };
  // useEffect(() => {
  //   ChckRefreshFunc();
  // }, []);

  // const getUrl = async () => {
  //   //  await ChckRefreshFunc();
  //   let base64 = require("base-64"); // install it before use from npm i base-64
  //   try {
  //     setIsLoading(false);
  //     axios
  //       .get(
  //         `${MyUrl}/api/Account/getQuickLinks
  //         `,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${jwtToken}`,
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         const data2 = res.data;
  //         setData2(data2);
  //         setIsLoading(true);
  //       })
  //       .catch((error) => {});
  //   } catch (error) {}
  // };
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

  function CustomButton({ ImageName }) {
    return (
      <>
        <div
          style={{
            display: "flex",
            //  background: "red",
            width: 100,
            height: 100,
            flexDirection: "column",
            // bottom: 0,
            // position: width < 768 ? "absolute" : "",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              //  background: "blue",
              width: 100,
              height: 50,
            }}
          >
            <img
              onMouseEnter={() => {
                {
                  ImageName === "linkedin" ? setButtonName(1) : <></>;
                }
                {
                  ImageName === "slack" ? setButtonName(2) : <></>;
                }
                {
                  ImageName === "skype" ? setButtonName(3) : <></>;
                }
                {
                  ImageName === "github" ? setButtonName(4) : <></>;
                }
                {
                  ImageName === "discord" ? setButtonName(5) : <></>;
                }
                {
                  ImageName === "SmartAdServer" ? setButtonName(6) : <></>;
                }
                {
                  ImageName === "Medium" ? setButtonName(7) : <></>;
                }
                console.log(ImageName);
              }}
              onMouseOut={() => {
                setButtonName(0);
              }}
              src={require(`../../Images/${ImageName}.png`)}
              style={{ objectFit: "contain", width: 80 }} // object-fit: contain;
            ></img>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              //  background: "yellow",
              width: 100,
              height: 30,
            }}
          >
            {ButtonName === 1 && ImageName === "linkedin" ? (
              <h6>LinkedIn</h6>
            ) : (
              <></>
            )}
            {ButtonName === 2 && ImageName === "slack" ? <h6>Slack</h6> : <></>}
            {ButtonName === 3 && ImageName === "skype" ? <h6>Skype</h6> : <></>}
            {ButtonName === 4 && ImageName === "github" ? (
              <h6>Github</h6>
            ) : (
              <></>
            )}
            {ButtonName === 5 && ImageName === "discord" ? (
              <h6>Discord</h6>
            ) : (
              <></>
            )}
            {ButtonName === 6 && ImageName === "SmartAdServer" ? (
              <h6>Smart Ad Server</h6>
            ) : (
              <></>
            )}
            {ButtonName === 7 && ImageName === "Medium" ? (
              <h6>Medium</h6>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div
          style={{
            height: 80,
          }}
        >
          {ImageName === "discord" ? (
            <></>
          ) : (
            <div style={{ opacity: 0.3 }}>&#8226;</div>
          )}
        </div>
      </>
    );
  }
  return (
    <div
      style={{
        position: "absolute",
        bottom: "0",
        alignItems: "center",
        display: "contents", //contents
        justifyContent: "center",
      }}
    >
      <div
        style={{
          flex: 1,
          //  background: "blue",
          display: "flex",
          paddingLeft: width < 766 ? "5%" : "25%",
          paddingRight: width < 766 ? "5%" : "25%",
          justifyContent: "space-between",

          alignItems: "center",
          paddingTop: width > 766 ? "8%" : "20%",
        }}
      >
        <h4 style={{ fontSize: width > 766 ? "" : 20 }}>Quick Links</h4>
        <h4 style={{ opacity: 0.5, fontSize: 18 }}>Customize</h4>
      </div>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          paddingLeft: width < 766 ? "5%" : "25%",
          paddingRight: width < 766 ? "5%" : "25%",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "80%",
            height: "1px",
            backgroundColor: "black",
            opacity: 0.1,
          }}
        />
      </div>
      <div style={{ paddingTop: "2%" }}></div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflowX: width > 766 ? "" : "scroll",

          //flexWrap: "wrap",
        }}
      >
        <>
          {Array.isArray(Data.responseData) ? (
            Data.responseData.map((responseData, i) => (
              <div
                style={{
                  display: "flex",
                  //  background: "red",
                  width: 100,
                  height: 100,
                  flexDirection: "column",
                  // bottom: 0,
                  // position: width < 768 ? "absolute" : "",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    //  background: "blue",
                    width: 100,
                    height: 50,
                  }}
                >
                  <img
                    onMouseEnter={() => {
                      {
                        Data.responseData[i].name === "linkedin" ? (
                          setButtonName(1)
                        ) : (
                          <></>
                        );
                      }
                      {
                        Data.responseData[i].name === "slack" ? (
                          setButtonName(2)
                        ) : (
                          <></>
                        );
                      }
                      {
                        Data.responseData[i].name === "Adtelligent" ? (
                          setButtonName(3)
                        ) : (
                          <></>
                        );
                      }
                      {
                        Data.responseData[i].name === "Pixalate" ? (
                          setButtonName(4)
                        ) : (
                          <></>
                        );
                      }
                      {
                        Data.responseData[i].name === "Gmail" ? (
                          setButtonName(5)
                        ) : (
                          <></>
                        );
                      }
                      {
                        Data.responseData[i].name === "SmartAdServer" ? (
                          setButtonName(6)
                        ) : (
                          <></>
                        );
                      }
                      {
                        Data.responseData[i].name === "Medium" ? (
                          setButtonName(7)
                        ) : (
                          <></>
                        );
                      }
                      console.log(Data.responseData[i].name);
                    }}
                    onMouseOut={() => {
                      setButtonName(0);
                    }}
                    onClick={() => {
                      window.open(`${Data.responseData[i].url}`, "_blank");
                    }}
                    //src={require(`../../Images/${Data.responseData[i].name}.png`)}
                    src={`${MyUrl}/images/logos/${Data.responseData[i].logoUrl}`}
                    style={{ objectFit: "contain", width: 60 }} // object-fit: contain;
                  ></img>
                  <br></br>
                  {/* {Data.responseData[i].name} */}
                  {Data.responseData[i].name === "Gmail" ? (
                    <></>
                  ) : (
                    <div
                      style={{ opacity: 0.4, paddingTop: 10, paddingLeft: 5 }}
                    >
                      &#8226;
                    </div>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    //  background: "yellow",
                    width: 100,
                    height: 30,
                  }}
                >
                  {ButtonName === 1 &&
                  Data.responseData[i].name === "linkedin" ? (
                    <h6>LinkedIn</h6>
                  ) : (
                    <></>
                  )}
                  {ButtonName === 2 && Data.responseData[i].name === "slack" ? (
                    <h6>Slack</h6>
                  ) : (
                    <></>
                  )}
                  {ButtonName === 3 &&
                  Data.responseData[i].name === "Adtelligent" ? (
                    <h6>Adtelligent</h6>
                  ) : (
                    <></>
                  )}
                  {ButtonName === 4 &&
                  Data.responseData[i].name === "Pixalate" ? (
                    <h6>Pixalate</h6>
                  ) : (
                    <></>
                  )}
                  {ButtonName === 5 && Data.responseData[i].name === "Gmail" ? (
                    <h6>Gmail</h6>
                  ) : (
                    <></>
                  )}
                  {ButtonName === 6 &&
                  Data.responseData[i].name === "SmartAdServer" ? (
                    <h6>Smart Ad Server</h6>
                  ) : (
                    <></>
                  )}
                  {ButtonName === 7 &&
                  Data.responseData[i].name === "Medium" ? (
                    <h6>Medium</h6>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))
          ) : (
            <>no image</>
          )}

          {/* {Data.responseData[1].name} */}
        </>

        {/* {CustomButton({ ImageName: "linkedin" })}
        {CustomButton({ ImageName: "slack" })}
        {CustomButton({ ImageName: "Medium" })}
        {CustomButton({ ImageName: "SmartAdServer" })}
        {CustomButton({ ImageName: "skype" })}
        {CustomButton({ ImageName: "github" })}
        {CustomButton({ ImageName: "discord" })} */}
      </div>
    </div>
  );
}
// onMouseEnter={() => {
//   console.log("in");
// }}
// onMouseOut={() => {
//   console.log("out");
// }}
{
  /* <div
style={{
  flex: 1,
  //background: "red",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "8%",
}}
>
<div
  style={{
    flex: 1,
    //   background: "blue",
    display: "flex",
    paddingLeft: "25%",
    paddingRight: "25%",
    justifyContent: "space-between",
  }}
>
  <h4>Quick Links</h4>
  <h4>Customize</h4>
</div>
</div>
<div
style={{
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  paddingLeft: "25%",
  paddingRight: "25%",
}}
>
<div
  style={{
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: "1px",
    backgroundColor: "black",
    opacity: 0.1,
  }}
/>
</div>

<div
style={{
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  paddingRight: width > 766 ? "20%" : "",
  paddingLeft: width > 766 ? "20%" : "",
}}
>
<img
  onMouseEnter={() => {
    console.log("in");
  }}
  onMouseOut={() => {
    console.log("out");
  }}
  src={require(`../../Images/linkedin.png`)}
  class="rounded"
  alt="..."
  style={{ margin: 25, width: width > 766 ? "4%" : "15%" }}
></img>
&#8226;
<img
  src={require(`../../Images/slack.png`)}
  class="rounded"
  alt="..."
  style={{ margin: 25, width: width > 766 ? "4%" : "15%" }}
></img>
&#8226; &#8226; &#8226;
<img
  src={require(`../../Images/skype.png`)}
  class="rounded"
  alt="..."
  style={{ margin: 25, width: width > 766 ? "4%" : "15%" }}
></img>
&#8226;
<img
  src={require(`../../Images/github.png`)}
  class="rounded"
  alt="..."
  style={{ margin: 25, width: width > 766 ? "4%" : "15%" }}
></img>
&#8226;
<img
  src={require(`../../Images/discord.png`)}
  class="rounded"
  alt="..."
  style={{ margin: 25, width: width > 766 ? "4%" : "15%" }}
></img>
</div> */
}
