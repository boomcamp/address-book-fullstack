import styled from "styled-components";
import React from "react";
import { GroupName } from "./groupName";

const Span = styled.span`
  text-transform: capitalize;
`;

export const columnData = user => [
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
    title: "Group",
    field: "groupId",
    render: rowData => <GroupName groupId={rowData.groupId} user={user} />
  }
];
export const columnDataMobile = user => [
  {
    title: "Name",
    render: rowData => <Span>{rowData.firstName + " " + rowData.lastName}</Span>
  },
  {
    title: "Group",
    field: "groupId",
    render: rowData => <GroupName groupId={rowData.groupId} user={user} />
  }
];
export const action2 = (
  setAction,
  setDialog,
  setContact,
  setMultiSelect,
  handleDeleteGroup,
  setData,
  setGroupDialog,
  setDeleteDialog,
  contact,
  user,
  group
) => [
  {
    icon: "add",
    tooltip: "Add new Contact",
    isFreeAction: true,
    onClick: () => {
      setAction("add");
      setDialog(true);
      setContact({ ...contact, userId: user.id });
    }
  },
  {
    icon: "clear",
    tooltip: "Remove Selection",
    isFreeAction: true,
    onClick: () => setMultiSelect(false)
  },
  {
    icon: "delete",
    tooltip: "Delete Group",
    isFreeAction: true,
    disabled: group ? false : true,
    onClick: () => handleDeleteGroup()
  },
  {
    tooltip: "Move seleted to Group ...",
    icon: "group",
    onClick: (e, data) => {
      setData(data);
      setGroupDialog(true);
    }
  },
  {
    tooltip: "Remove selected Users",
    icon: "delete",
    onClick: (e, data) => {
      setData(data);
      setDeleteDialog(true);
    }
  }
];
export const action1 = (
  setAction,
  setDialog,
  setContact,
  setMultiSelect,
  handleDeleteGroup,
  contact,
  user,
  group
) => [
  {
    icon: "add",
    tooltip: "Add new Contact",
    isFreeAction: true,
    onClick: () => {
      setAction("add");
      setDialog(true);
      setContact({ ...contact, userId: user.id });
    }
  },
  {
    icon: "check",
    tooltip: "Multi Select",
    isFreeAction: true,
    onClick: () => setMultiSelect(true)
  },
  {
    icon: "delete",
    tooltip: "Delete Group",
    isFreeAction: true,
    disabled: group ? false : true,
    onClick: () => handleDeleteGroup()
  }
];
