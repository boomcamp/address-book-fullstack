import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import axios from "axios";
import table from "./addressbooktable";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
export default class Search extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSearch } = this.props;
    // console.log(this.props);
    return (
      <React.Fragment>
        <Grid
          container
          spacing={2}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
           
          }}
        >
          <Grid
            item
            lg={2}
            md={3}
            sm={4}
            xs={6}
            
          >
            <TextField
              style={{
                width:"92%",
                marginLeft:"10%"
              }}
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
              onChange={e => handleSearch(e)}
            />
          </Grid>
          <Grid
            item
            lg={2}
            md={3}
            sm={4}
            xs={6}
          >
            <FormControl style={{ width: "93%" }}>
              <InputLabel htmlFor="age-simple">By Last Name</InputLabel>
              <Select onChange={(e) => this.props.handleSort(e)}>
                <MenuItem value="ASC">A-Z</MenuItem>
                <MenuItem value="DESC">Z-A</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
