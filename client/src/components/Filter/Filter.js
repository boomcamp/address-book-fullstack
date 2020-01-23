import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const FilterDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  width: 100%;
  height: 60px;
`;
const Search = styled.div`
  width: 40%;
  @media screen and (max-width: 600px) {
    width: 60%;
  }
`;
const Options = styled.div`
  @media screen and (max-width: 600px) {
    width: 40%;
  }
`;

export default class Filter extends React.Component {
  render() {
    return (
      <FilterDiv>
        <Search>
          <TextField
            label="Search"
            variant="outlined"
            name="search"
            fullWidth
            onChange={this.props.changeHandler}
            size="small"
          />
        </Search>
        <Options>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              name="sort"
              defaultValue={"asc"}
              onChange={this.props.changeHandler}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Options>
      </FilterDiv>
    );
  }
}
