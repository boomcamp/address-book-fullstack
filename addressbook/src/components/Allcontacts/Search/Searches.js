import React, { Component } from "react";
import { Icon, Input } from "antd";
import "./search.css";
const { Search } = Input;
export default class Searches extends Component {
  render() {
    return (
      //   <div className="searchBarMain">
      //     <input className="searchBar" onChange={e => this.props.search(e)} />
      //     <Icon type="search" />
      //   </div>
      //
      <div>
        <Search
          placeholder="Search Name"
          onChange={e => this.props.search(e)}
          style={{ width: 200 }}
        />
      </div>
    );
  }
}
