import React, { Component } from "react";
import { Input } from "antd";
import axios from "axios";

export default class search extends Component {
  handleSearch = e => {
    const contactData = [];
    axios
      .get(`/contact/search/${localStorage.getItem("id")}?val=${e.value}`)
      .then(res => {
        res.data.forEach(data => {
          contactData.push({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            home_phone: data.home_phone,
            mobile_phone: data.mobile_phone,
            work_phone: data.work_phone,
            postal_code: data.postal_code,
            state_or_province: data.state_or_province,
            city: data.city,
            key: `'${data.id}'`,
            country: data.country
          });
        });
        this.props.user(contactData);
      });
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
