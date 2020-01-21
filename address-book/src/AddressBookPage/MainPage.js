import React, { useState, useEffect } from "react";
import ContactsTable from "./ContactsTable";
import Header from "./Header";
import { Redirect } from "react-router-dom";
import ContactForm from "./ContactForm";
import SideBar from "./SideBar/SideBar";
import { refreshMaterializedView } from "node-pg-migrate/dist/operations/viewsMaterialized";
import SelectSort from "./SelectSort/SelectSort";

export default function MainPage() {
  const [state, setState] = useState(null);
  const [tableState, setTableState] = useState(null);
  const [groupid, setGroupRef] = useState();
  const [initial, setInit] = useState(true);

  if (!sessionStorage.getItem("token")) {
    return <Redirect to="/" />;
  }

  // useEffect(() => {

  // }, [state]);

  const tranferData = data => {
    console.log(data);
    // setInit(true);
    setState(data.data);
    // console.log(data.data)
  };

  const prepareNewData = () => {
    setInit(false);
    // console.log('call for prepare')
    setState(null);
  };

  const setTableData = data => {
    setInit(true);
    console.log(data.data);
    setTableState(data.data);
  };

  const groupReference = e => {
    setGroupRef(e);
  };

  console.log(initial)

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
