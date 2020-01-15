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

export const Contacts = props => {
  const {
    userData,
    setUserData,
    user,
    handleOnChange,
    setContact,
    contact,
    group
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
  const [windowWidth, setWindowWidth] = useState(() => {
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
      getUserData(user).then(user => {
        setUserData(user);
      });
      setDialog(false);
      setContact({});
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
      getUserData(user).then(user => {
        setUserData(user);
      });
      setDialog(false);
      setContact({});
    } catch (err) {
      console.error(err);
    }
  };
  const handleDelete = e => {
    if (confirm.text !== "CONFIRM") {
      return setConfirm({ ...confirm, status: true });
    }
    data.map(async x => {
      await Axios.delete(`${url}/contacts/${x.id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      getUserData(user).then(user => {
        setUserData(user);
      });
    });

    toast.info(`Succefully deleted items!`, {
      position: toast.POSITION.TOP_CENTER
    });
    setConfirm({ ...confirm, status: false });
    setDeleteDialog(false);
    setConfirm("");
  };
  const handleMovetoGroup = async e => {
    console.log(data);
  };
  const action1 = [
    {
      icon: "add",
      tooltip: "add",
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
      onClick: () => {
        setMultiSelect(true);
      }
    }
  ];
  const action2 = [
    {
      icon: "add",
      tooltip: "add",
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
      onClick: () => {
        setMultiSelect(false);
      }
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
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <MaterialTable
          style={{ width: "100%" }}
          fullWidth
          title="Contacts"
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
      />
    </div>
  );
};
