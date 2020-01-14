import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";

export default class search extends Component {
  render() {
    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "95%",
          }}
        >
          <TextField
        
            required
            id="standard-required"
            margin="normal"
            type="text"
            name="search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: "grey" }} />
                </InputAdornment>
              )
            }}
          />
        </div>
      </React.Fragment>
    );
  }
}
