import React, { Component } from "react";

export default class Groupmem extends Component {
  render() {
    // console.log(this.props.groupmem);
    return (
      <div>
        <h2 style={{ display: "flex", justifyContent: "center" }}>MEMBERS</h2>
        {this.props.groupmem.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "10px",
              marginTop: "10px",
              border: "1px solid black",
              backgroundColor: "#102844"
            }}
          >
            <p style={{ lineHeight: "20px", color: "#fff" }}>
              NO GROUP MEMBERS
            </p>
          </div>
        ) : (
          this.props.groupmem.map(grp => {
            // console.log(!grp.lastname ? "ew" : "op");
            return (
              <div key={grp.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "10px",
                    marginTop: "10px",
                    border: "1px solid black",
                    backgroundColor: "#102844"
                  }}
                  key={grp.id}
                >
                  <p style={{ lineHeight: "20px", color: "#fff" }} key={grp.id}>
                    {grp.lastname} {grp.firstname}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }
}
