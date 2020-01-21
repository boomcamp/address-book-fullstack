import React,{useEffect} from "react";
import axios from "axios";

export default function Header(props) {

  // useEffect(() => {
  //   axios({
  //     method:"get",
  //     url:"http://localhost:5000/api/user/get",
  //     headers: { Authorization: sessionStorage.getItem("token") }
  //   })
  // }, [])

  const logout = () => {
    sessionStorage.removeItem("token");
    window.location.reload();
  };
  

  return (
    <>
      <div className="header-container" style={style.header}>
        <p style={style.title}>{props.title}</p>
        <div
          className="logout-container"
          style={style.logout}
          onClick={() => logout()}
        >
          <p>Logout</p>
        </div>
      </div>
    </>
  );
}

const style = {
  header: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: "50px",
    width: "100%",
    background: "#03A9F4",
    color: "#ffffff",
    fontWeight: "1000",
    borderBottom: "1px solid #ffffff",
  },
  logout: {
    background: "#0277bd",
    height: "30px",
    width: "75px",
    fontSize: "0.89em",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    cursor: "pointer",
    colort: "white"
  },
  title: {
    fontSize: "0.89em"
  }
};