import React, { useState, useEffect } from "react";
import ContactsTable from "./ContactsTable";
import Header from "./Header";
import { Redirect } from "react-router-dom";
import SideBar from "./SideBar/SideBar";
import SelectSort from "./SelectSort/SelectSort";

export default function MainPage() {
  const [state, setState] = useState(null);
  const [tableState, setTableState] = useState(null);
  const [groupid, setGroupRef] = useState();
  const [initial, setInit] = useState(true);

  if (!sessionStorage.getItem("token")) {
    return <Redirect to="/" />;
  }

  const tranferData = data => {
    console.log(data);
    setState(data.data);
  };

  const prepareNewData = () => {
    setInit(false);
    setState(null);
  };

  const setTableData = data => {
    setInit(true);
    console.log(data.data);
    setTableState(data.data);
  };

  const groupReference = e => {
    setInit(true);
    setState(null);
    setGroupRef(e);
  };

  return (
    <>
      <Header title="Address Book" />
      <SideBar
        setTableData={setTableData}
        contactData={state}
        prepareNewData={[state === null ? true : false, initial]}
        passGroupRef={groupReference}
      />
      <ContactsTable
        contactTransfer={tranferData}
        prepareNewData={prepareNewData}
        tableData={tableState}
      />

      <SelectSort setTableData={setTableData} setGroupRef={groupid} />
    </>
  );
}
