import React, { useState } from "react";
import MaterialTable from "material-table";
import { columnData, columnDataMobile } from "../data/data";
import { DialogCont } from "./Dialog";
import Axios from "axios";
import { url } from "../../url";
import { getUserData } from "../customHooks/getUserData";
import { toast } from "react-toastify";

export const Contacts = props => {
  const {
    userData,
    setUserData,
    user,
    handleOnChange,
    setContact,
    contact
  } = props.data;
  const [windowWidth, setWindowWidth] = useState(() => {
    return window.innerWidth;
  });
  const [dialog, setDialog] = useState(false);
  const [action, setAction] = useState("");

  const addContact = async e => {
    e.preventDefault();
    try {
      const response = await Axios.post(`${url}/contacts`, contact, {
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
  const editContact = async e => {
    e.preventDefault();
    const id = contact.id;
    delete contact.id;
    console.log(contact);
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
  return (
    <div>
      <MaterialTable
        style={{ width: "100%" }}
        fullWidth
        title="Contact List"
        columns={windowWidth >= 600 ? columnData : columnDataMobile}
        data={userData.addressBook}
        options={{
          pageSizeOptions: [10, 15, 20],
          pageSize: 10,
          actionsColumnIndex: -1,
          selection: true,
          grouping: false
        }}
        actions={[
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
            tooltip: "Remove All Selected Users",
            icon: "delete",
            onClick: (evt, data) =>
              alert("You want to delete " + data.length + " rows")
          }
        ]}
        onRowClick={(e, rowData) => {
          setContact(rowData);
          setAction("edit");
          setDialog(true);
        }}
      />
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
    </div>
  );
};
