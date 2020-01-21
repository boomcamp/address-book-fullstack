import React from "react";
import styled from "styled-components";

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
  }
`;
const Options = styled.div``;

export default class Filter extends React.Component {
  render() {
    return (
      <FilterDiv>
        <Search>
          <input
            name="search"
            onChange={this.props.changeHandler}
            type="text"
            placeholder="Search"
            className="form-control"
          />
        </Search>
        <Options>
          <select
            name="sort"
            onChange={this.props.changeHandler}
            className="browser-default custom-select"
          >
            <option value="asc">Sort by</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </Options>
      </FilterDiv>
    );
  }
}
