import styled from "styled-components";
import React from "react";
import { GroupName } from "./groupName";

const Span = styled.span`
  text-transform: capitalize;
`;

export const columnData = user => [
  {
    title: "First Name",
    field: "firstName"
  },
  {
    title: "Last Name",
    field: "lastName"
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
    field: "groupId",
    render: rowData => <GroupName groupId={rowData.groupId} user={user} />
  }
];
export const columnDataMobile = [
  {
    title: "Name",
    render: rowData => <Span>{rowData.firstName + " " + rowData.lastName}</Span>
  }
];
