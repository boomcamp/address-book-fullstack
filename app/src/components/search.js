import React, { Component } from "react";
import { Input } from "antd";
import axios from "axios";

export default class search extends Component {
  handleSearch = e => {
    axios
      .get(`/contact/search/${localStorage.getItem("id")}?val=${e.value}`)
      .then(res => {
        // console.log(res.data);
        this.props.user(res.data);
      });
    // console.log(this.props);
  };
  render() {
    const { Search } = Input;

    return (
      <React.Fragment>
        <Search
          placeholder="input search text"
          onKeyUp={e => {
            this.handleSearch(e.target);
          }}
          autoFocus
          style={{ width: 400 }}
        />
      </React.Fragment>
    );
  }
}
