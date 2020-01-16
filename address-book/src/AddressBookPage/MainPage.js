import React, { useState, useEffect } from "react";
import ContactsTable from "./ContactsTable";
import Header from "./Header";
import { Redirect } from "react-router-dom";
import ContactForm from "./ContactForm";
import GroupForm from "./GroupForm";
import SideBar from "./SideBar/SideBar";

export default function MainPage() {
  const [state, setState] = useState(null);
  const [tableState, setTableState] = useState(null);

  if (!sessionStorage.getItem("token")) {
    return <Redirect to="/" />;
  }

  // useEffect(() => {

  // }, [state]);

  const tranferData = data => {
    // console.log(data)
    setState(data.data);
    // console.log(data.data)
  };

  const prepareNewData = () => {
    // console.log('call for prepare')
    setState(null);
  };

  const setTableData = data => {
    console.log(data.data);
    setTableState(data.data);
  };

  return (
    <>
      {/* <div className="black-overlay" /> */}

      <Header title="Address Book" />
      <SideBar
        setTableData={setTableData}
        contactData={state}
        prepareNewData={state === null ? true : false}
      />
      {/* <ContactForm
        contactData={state}
        // prepareNewData={state === null ? true : false}
      /> */}
      <ContactsTable
        contactTransfer={tranferData}
        prepareNewData={prepareNewData}
        tableData={tableState}
      />
    </>
  );
}
