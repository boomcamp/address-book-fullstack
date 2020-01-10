import React from "react";

export default function Header(props) {

    const logout = () => {
        console.log("logging out")
        sessionStorage.removeItem('token')
        window.location.reload();
    }

  return (
    <>
      <div className="header-container" style={style.header}>
        <p style={style.title}>{props.title}</p>
        <div className="logout-container" style={style.logout} onClick={()=>logout()}>
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
    background: "#142273",
    color: "white"
  },
  logout: {
    background: "#1B0A40",
    height: "30px",
    width: "75px",
    fontSize: "0.89em",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    cursor: "pointer"
  },
  title: {
    fontSize: "0.89em"
  }
};

// /* Color Theme Swatches in Hex */
// .mother-and-son-travel-in-mountains-at-sunset,-panorama-1-hex { color: #025159; }
// .mother-and-son-travel-in-mountains-at-sunset,-panorama-2-hex { color: #03A696; }
// .mother-and-son-travel-in-mountains-at-sunset,-panorama-3-hex { color: #F28705; }
// .mother-and-son-travel-in-mountains-at-sunset,-panorama-4-hex { color: #F25D27; }
// .mother-and-son-travel-in-mountains-at-sunset,-panorama-5-hex { color: #F20505; }
