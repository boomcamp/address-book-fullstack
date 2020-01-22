import styled from "styled-components";
import React from "react";
import { GroupName } from "./groupName";

const GroupSpan = styled.span`
  font-size: 14px;
  border: 2px solid #5c6ed4;
  color: #3f51b5;
  border-radius: 5px;
  font-style: italic;
  padding: 5px 10px 5px 10px;
`;
const None = styled.span`
  font-size: 14px;
  border: 2px solid #b222;
  color: #b22;
  border-radius: 5px;
  font-style: italic;
  padding: 5px 10px 5px 10px;
`;
const Span = styled.span`
  text-transform: capitalize;
`;

export const columnData = user => [
  {
    title: "Name",
    render: rowData => (
      <Span>{rowData.first_name + " " + rowData.last_name}</Span>
    )
  },
  {
    title: "Mobile Phone",
    field: "mobile_phone"
  },
  {
    title: "Email Address",
    field: "email"
  },
  {
    title: "Group",
    field: "group_id",
    render: rowData =>
      rowData.group_id ? (
        <GroupSpan>
          <GroupName group_id={rowData.group_id} user={user} />
        </GroupSpan>
      ) : (
        <None>
          <GroupName group_id={rowData.group_id} user={user} />
        </None>
      )
  }
];
export const columnData1080 = user => [
  {
    title: "Name",
    render: rowData => (
      <Span>{rowData.first_name + " " + rowData.last_name}</Span>
    )
  },
  {
    title: "Mobile Phone",
    field: "mobile_phone"
  },
  {
    title: "Group",
    field: "group_id",
    render: rowData =>
      rowData.group_id ? (
        <GroupSpan>
          <GroupName group_id={rowData.group_id} user={user} />
        </GroupSpan>
      ) : (
        <None>
          <GroupName group_id={rowData.group_id} user={user} />
        </None>
      )
  }
];
export const columnDataMobile = user => [
  {
    title: "Name",
    render: rowData => (
      <Span>{rowData.first_name + " " + rowData.last_name}</Span>
    )
  },
  {
    title: "Group",
    field: "group_id",
    render: rowData =>
      rowData.group_id ? (
        <GroupSpan>
          <GroupName group_id={rowData.group_id} user={user} />
        </GroupSpan>
      ) : (
        <None>
          <GroupName group_id={rowData.group_id} user={user} />
        </None>
      )
  }
];
export const action2 = (
  setAction,
  setDialog,
  setContact,
  setMultiSelect,
  setData,
  setGroupDialog,
  setDeleteDialog,
  contact,
  user,
  group,
  setDel
) => [
  {
    icon: "add",
    tooltip: "Add new Contact",
    isFreeAction: true,
    onClick: () => {
      setAction("add");
      setDialog(true);
      setContact({ ...contact, user_id: user.id });
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
    onClick: () => {
      setDel("group");
      setDeleteDialog(true);
    }
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
      setDel("contacts");
      setDeleteDialog(true);
    }
  }
];
export const action1 = (
  setAction,
  setDialog,
  setContact,
  setMultiSelect,
  contact,
  user,
  group,
  setDel,
  setDeleteDialog
) => [
  {
    icon: "add",
    tooltip: "Add new Contact",
    isFreeAction: true,
    onClick: () => {
      setAction("add");
      setDialog(true);
      setContact({ ...contact, user_id: user.id });
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
    onClick: () => {
      setDel("group");
      setDeleteDialog(true);
    }
  }
];
