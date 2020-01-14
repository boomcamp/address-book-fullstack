import styled from "styled-components";
import React from "react";

const Span = styled.span`
  text-transform: capitalize;
`;

export const columnData = [
  {
    title: "Name",
    render: rowData => <Span>{rowData.firstName + " " + rowData.lastName}</Span>
  },
  {
    title: "Mobile Phone",
    field: "mobilePhone"
  },
  {
    title: "Email Address",
    field: "email"
  },
  {
    title: "City",
    field: "city"
  },
  {
    title: "State or Province",
    field: "state"
  },
  {
    title: "Postal Code",
    field: "postalCode"
  },
  {
    title: "Country",
    field: "country"
  },
  {
    title: "Group",
    field: "groupId"
  }
];
export const columnDataMobile = [
  {
    title: "Name",
    render: rowData => <Span>{rowData.firstName + " " + rowData.lastName}</Span>
  }
];
