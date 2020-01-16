import React, { useState } from "react";
import MaterialTable from "material-table";
import { columnData, columnDataMobile } from "../data/data";
import { DialogCont, DeleteDialog, Group } from "./Dialog";
import Axios from "axios";
import { url } from "../../url";
import { getUserData } from "../customHooks/getUserData";
import { toast } from "react-toastify";
import "../../App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

const fetch = async (user, group, userData, setUserData) => {
  const response = await Axios.get(`${url}/groups/${group}/list`, {
    headers: { Authorization: `Bearer ${user.token}` }
  });

  setUserData({ ...userData, addressBook: response.data.contactList });
};
const getGroupName = async (group, user, setGroupName) => {
  const response = await Axios.get(`${url}/groups/${group}`, {
    headers: { Authorization: `Bearer ${user.token}` }
  });
  setGroupName(response.data[0].groupName);
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
    setGroup
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
          return { value: x.id, label: x.groupName };
        })
      : []
    : [];
  const [windowWidth] = useState(() => {
    return window.innerWidth;
  });
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

  const addContact = async e => {
    e.preventDefault();
    try {
      const response = await Axios.post(
        `${url}/contacts`,
        { ...contact, groupId: group },
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
        return getUserData(user).then(user => setUserData(user));
      }
      fetch(user, group, userData, setUserData);
    } catch (err) {
      console.error(err);
    }
  };
  const editContact = async e => {
    e.preventDefault();
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
        return getUserData(user).then(user => setUserData(user));
      }
      fetch(user, group, userData, setUserData);
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
        return getUserData(user).then(user => setUserData(user));
      }
      fetch(user, group, userData, setUserData);
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
        { ...contact, groupId: selectedGroup.value },
        {
          headers: { Authorization: `Bearer ${user.token}` }
        }
      );
      if (!group) {
        return getUserData(user).then(user => setUserData(user));
      }
      fetch(user, group, userData, setUserData);
    });
    toast.info(`Succefully moved to ${selectedGroup.label}!`, {
      position: toast.POSITION.TOP_CENTER
    });
    setGroupDialog(false);
  };
  const handleDeleteGroup = async () => {
    try {
      const response = await Axios.delete(`${url}/groups/${group}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.info(response.data.message, {
        position: toast.POSITION.TOP_CENTER
      });
      setGroup(null);
      setGroupName("Contacts");
      getUserData(user).then(user => setUserData(user));
    } catch (err) {
      console.error(err);
    }
  };
  const action1 = [
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
  const action2 = [
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
      tooltip: "Remove selected Users",
      icon: "group",
      onClick: (e, data) => {
        setData(data);
        setGroupDialog(true);
      }
    },
    {
      tooltip: "Move seleted to Group ...",
      icon: "delete",
      onClick: (e, data) => {
        setData(data);
        setDeleteDialog(true);
      }
    }
  ];
  React.useEffect(() => {
    if (group === null) {
      return setGroupName("Contacts");
    }
    if (group) {
      getGroupName(group, user, setGroupName);
    }
  }, [group, user]);
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <MaterialTable
          style={{ width: "100%" }}
          fullWidth
          title={groupName}
          columns={windowWidth >= 600 ? columnData(user) : columnDataMobile}
          data={userData ? userData.addressBook : []}
          options={{
            pageSizeOptions: [10, 15, 20],
            pageSize: 10,
            actionsColumnIndex: -1,
            selection: multiSelect,
            grouping: true
          }}
          actions={!multiSelect ? action1 : action2}
          onRowClick={(e, rowData) => {
            setContact(rowData);
            setAction("edit");
            setDialog(true);
          }}
        />
      </MuiThemeProvider>

      {action === "add" ? (
        <DialogCont
          title={"Add new Contact"}
          dialog={dialog}
          setDialog={setDialog}
          passedFn={addContact}
          handleOnChange={handleOnChange}
        />
      ) : action === "edit" ? (
        <DialogCont
          title={"Edit contact"}
          dialog={dialog}
          setDialog={setDialog}
          passedFn={editContact}
          rowData={contact}
          handleOnChange={handleOnChange}
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
