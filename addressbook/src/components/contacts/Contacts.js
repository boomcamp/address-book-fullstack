import React, { useState } from "react";
import MaterialTable from "material-table";
import { columnData, columnDataMobile, action2, action1 } from "../data/data";
import { DialogCont, DeleteDialog, Group } from "./Dialog";
import Axios from "axios";
import { url } from "../../url";
import { getUserData, fetch } from "../customHooks/getUserData";
import { toast } from "react-toastify";
import "../../App.css";
import { MuiThemeProvider, createMuiTheme, TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { useWindowSize } from "../customHooks/useWindowSize";
import { ContactDetails } from "./ContactDetails";
import styled from "styled-components";

const getGroupName = async (group, user, setGroupName) => {
  const response = await Axios.get(`${url}/groups/${group}`, {
    headers: { Authorization: `Bearer ${user.token}` }
  });
  setGroupName(response.data[0].group_name);
};
export const Contacts = props => {
  const {
    userData,
    setUserData,
    user,
    handleOnChange,
    setContact,
    contact,
    group,
    setGroup,
    sort,
    setSort
  } = props.data;
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#5f6dbd"
      },
      secondary: {
        main: "#5f6dbd"
      }
    }
  });
  const options = userData
    ? userData.groups
      ? userData.groups.map(x => {
          return { value: x.id, label: x.group_name };
        })
      : []
    : [];
  const [windowWidth] = useWindowSize();
  const [dialog, setDialog] = useState(false);
  const [action, setAction] = useState("");
  const [confirm, setConfirm] = useState({
    status: false
  });
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [data, setData] = useState([]);
  const [groupDialog, setGroupDialog] = useState(false);
  const [multiSelect, setMultiSelect] = useState(false);
  const [groupName, setGroupName] = useState("Contacts");
  const [selectedGroup, setSelectedGroup] = useState();
  const [search, setSearch] = useState("");

  const addContact = async () => {
    try {
      const response = await Axios.post(
        `${url}/contacts`,
        { ...contact, group_id: group },
        {
          headers: { Authorization: `Bearer ${user.token}` }
        }
      );
      toast.info(response.data.message, {
        position: toast.POSITION.TOP_CENTER
      });
      setDialog(false);
      setContact({});

      if (!group) {
        return getUserData(user, sort).then(user => setUserData(user));
      }
      fetch(user, group, userData, setUserData, sort);
    } catch (err) {
      console.error(err);
    }
  };
  const editContact = async () => {
    const id = contact.id;
    delete contact.id;
    try {
      const response = await Axios.patch(`${url}/contacts/${id}`, contact, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.info(response.data.message, {
        position: toast.POSITION.TOP_CENTER
      });
      setDialog(false);
      setContact({});

      if (!group) {
        return getUserData(user, sort).then(user => setUserData(user));
      }
      fetch(user, group, userData, setUserData, sort);
    } catch (err) {
      console.error(err);
    }
  };
  const handleDelete = e => {
    e.preventDefault();
    if (confirm.text !== "CONFIRM") {
      return setConfirm({ ...confirm, status: true });
    }

    data.map(async x => {
      await Axios.delete(`${url}/contacts/${x.id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      if (!group) {
        return getUserData(user, sort).then(user => setUserData(user));
      }
      fetch(user, group, userData, setUserData, sort);
    });

    toast.info(`Succefully deleted items!`, {
      position: toast.POSITION.TOP_CENTER
    });
    setConfirm({ ...confirm, status: false, text: "" });
    setDeleteDialog(false);
  };
  const handleMovetoGroup = async e => {
    e.preventDefault();
    data.map(async x => {
      await Axios.patch(
        `${url}/contacts/${x.id}`,
        { ...contact, group_id: selectedGroup.value },
        {
          headers: { Authorization: `Bearer ${user.token}` }
        }
      );
      if (!group) {
        return getUserData(user, sort).then(user => setUserData(user));
      }
      fetch(user, group, userData, setUserData, sort);
    });
    toast.info(`Succefully moved to ${selectedGroup.label}!`, {
      position: toast.POSITION.TOP_CENTER
    });
    setGroupDialog(false);
  };
  const handleDeleteGroup = async e => {
    e.preventDefault();
    try {
      const response = await Axios.delete(`${url}/groups/${group}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.info(response.data.message, {
        position: toast.POSITION.TOP_CENTER
      });
      setGroup(null);
    } catch (err) {
      console.error(err);
    }
  };
  React.useEffect(() => {
    if (group === null) {
      console.log("try");
      getUserData(user, sort).then(user => setUserData(user));
      return setGroupName("Contacts");
    }
    if (group) {
      return () => getGroupName(group, user, setGroupName);
    }
  }, [group, user]);
  return (
    <div>
      <Div>
        <div style={{ width: "350px", display: "flex" }}>
          <TextField
            fullWidth
            label="Search"
            onChange={e => {
              setSearch(e.target.value);
            }}
          />
          <Select
            value={sort}
            onChange={e => {
              setSort(e.target.value);
              if (group === null) {
                return getUserData(user, e.target.value).then(user =>
                  setUserData(user)
                );
              }
              fetch(user, group, userData, setUserData, e.target.value);
            }}
            displayEmpty
          >
            <MenuItem value={""}>Sort by</MenuItem>
            <MenuItem value={"asc"}>Ascending</MenuItem>
            <MenuItem value={"desc"}>Descending</MenuItem>
          </Select>
        </div>
      </Div>
      <MuiThemeProvider theme={theme}>
        <MaterialTable
          style={{ width: "100%" }}
          fullWidth
          title={groupName}
          columns={
            windowWidth >= 600 ? columnData(user) : columnDataMobile(user)
          }
          data={
            userData
              ? userData.addressBook
                ? userData.addressBook.filter(x => {
                    const regex = new RegExp(search, "gi");
                    if (x.first_name.match(regex) || x.last_name.match(regex)) {
                      return x;
                    }
                    return null;
                  })
                : []
              : []
          }
          options={{
            pageSizeOptions: [10, 15, 20],
            pageSize: 10,
            actionsColumnIndex: -1,
            selection: multiSelect,
            search: false,
            sorting: false
          }}
          actions={
            !multiSelect
              ? action1(
                  setAction,
                  setDialog,
                  setContact,
                  setMultiSelect,
                  handleDeleteGroup,
                  contact,
                  user,
                  group
                )
              : action2(
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
                )
          }
          detailPanel={[
            {
              icon: "account_circle",
              tooltip: "View Details",
              render: rowData => (
                <ContactDetails
                  windowWidth={windowWidth}
                  rowData={rowData}
                  setContact={setContact}
                  setAction={setAction}
                  setDialog={setDialog}
                  user={user}
                />
              )
            }
          ]}
          onRowClick={(event, rowData, togglePanel) => togglePanel()}
        />
      </MuiThemeProvider>
      {action === "add" ? (
        <DialogCont
          title={"Add new Contact"}
          dialog={dialog}
          setDialog={setDialog}
          passedFn={addContact}
          handleOnChange={handleOnChange}
          data={props.data}
        />
      ) : action === "edit" ? (
        <DialogCont
          title={"Edit contact"}
          dialog={dialog}
          setDialog={setDialog}
          passedFn={editContact}
          rowData={contact}
          handleOnChange={handleOnChange}
          data={props.data}
        />
      ) : (
        ""
      )}
      <DeleteDialog
        deleteDialog={deleteDialog}
        setDeleteDialog={setDeleteDialog}
        handleDelete={handleDelete}
        confirm={confirm}
        setConfirm={setConfirm}
      />
      <Group
        groupDialog={groupDialog}
        setGroupDialog={setGroupDialog}
        handleMovetoGroup={handleMovetoGroup}
        options={options}
        setSelectedGroup={setSelectedGroup}
      />
    </div>
  );
};
const Div = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 0 10px 15px 10px;
`;
